
import { version }              from '../package.json';
import { 
    addClass,
    checkFormEl, 
    checkTouchedField, 
    customEvents, 
    dispatchCustomEvent, 
    excludeSelector, 
    fieldsStringSelector, 
    finalizeFieldPromise, 
    finalizeFieldsGroupPromise, 
    finalizeFormPromise, 
    getFilledFields, 
    getInitialValues,
    getUniqueFields,
    isNodeList,
    mergeObjects, 
    mergeValidateFormDefault, 
    removeClass }               from './modules/helpers';
import { options }              from './modules/options';
import { validationRules }      from './modules/validationRules';
import { formStartup }          from './modules/formStartup';
import { destroy }              from './modules/destroy';
import { checkFieldValidity }   from './modules/checkFieldValidity';
import { checkFieldsValidity }  from './modules/checkFieldsValidity';

class Form {

    constructor( form, optionsObj ){
        const argsL = arguments.length,
              checkFormElem = checkFormEl(form);

        if( argsL === 0 || (argsL > 0 && !form) ){
            throw new Error('First argument "form" is missing or falsy!');
        }
        if( isNodeList(form) ){
            throw new Error('First argument "form" must be a single DOM node or a form CSS selector, not a NodeList!');
        }
        if( !checkFormElem.result ){
            throw new Error('First argument "form" is not a DOM node nor a form CSS selector!');
        }

        const self = this;

        self.$form = checkFormElem.$el;
        self.$form.formjs = self;
        self.options = mergeObjects({}, Form.prototype.options, optionsObj);
        self.currentGroup = self.options.formOptions.groups[0];

        // BINDING CONTEXT FOR FUTURE EXECUTION
        const cbList = [
            // IN fieldOptions
            'beforeValidation',
            // IN formOptions
            'beforeSend',
            'getFormData'
        ];
        cbList.forEach(cbName => {
            const optionType = self.options.formOptions[cbName] ? 'formOptions' : 'fieldOptions';
            let cbOpt = self.options[optionType][cbName];

            if( cbOpt ){
                self.options[optionType][cbName] = ( Array.isArray(cbOpt) ? cbOpt.map(cbFn => cbFn.bind(self)) : cbOpt.bind(self) );
            }
        });

        self._ = {
            initialValues: getInitialValues(self.$form),
            // WORKAROUND FOR SURVEYJS: initialValues IS {} AFTER SURVEY INIT
            asyncInitEnd: function () {
                const onInitCheckFilled = self.options.formOptions.onInitCheckFilled;
                this.initialValues = getInitialValues(self.$form);
                return onInitCheckFilled ? self.validateFilledFields().catch(fields => fields) : Promise.resolve([]);
            }
        }

        formStartup( self.$form, self.options );

        const initOptions = {};
        if( self.options.formOptions.onInitCheckFilled ){
            initOptions.detail = self.validateFilledFields().catch(fields => fields);
        }
        dispatchCustomEvent( self.$form, customEvents.form.init, initOptions );
    }

    destroy(){
        destroy(this.$form, this.options);
        dispatchCustomEvent( this.$form, customEvents.form.destroy );
    }
    
    getFormData( trimValues = this.options.fieldOptions.trimValue ){
        const $formFields = this.$form.querySelectorAll('input, select, textarea'),
              $filteredFields = Array.from( $formFields ).filter( elem => elem.matches(excludeSelector) );
        return this.options.formOptions.getFormData( $filteredFields, trimValues );
    }

    validateField( field, fieldOptions ){
        const self = this;
        const $form = self.$form;
        const $field = typeof field === 'string' ? $form.querySelector(field) : field;

        fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptions);
        
        return checkFieldValidity($field, fieldOptions, self.validationRules, self.validationErrors)
            .then(obj => {
                dispatchCustomEvent( obj.$field, customEvents.field.validation, { detail: obj } );
                if( obj.result ){
                    if( fieldOptions.onValidationCheckAll ){
                        const selector = self.currentGroup || fieldsStringSelector;
                        const $fields = $form.querySelectorAll(selector);
                        checkFieldsValidity( $fields, fieldOptions, self.validationRules, self.validationErrors, obj.$field )
                            .then(dataForm => {
                                const groups = self.options.formOptions.groups;
                                const validationEventName = self.currentGroup ? customEvents.group.validation : customEvents.form.validation;
                                if( groups.length > 0 ){
                                    dataForm.group = {
                                        prev: groups[groups.indexOf(selector) - 1],
                                        current: selector,
                                        next: groups[groups.indexOf(selector) + 1]
                                    }
                                    dataForm.canSubmit = dataForm.result && !dataForm.group.next;
                                }
                                dispatchCustomEvent( $form, validationEventName, { detail: dataForm } );
                            });
                    }
                } else {
                    removeClass( $form, self.options.formOptions.cssClasses.valid );
                    addClass( $form, self.options.formOptions.cssClasses.error );
                }
                return obj;
            })
            .then(finalizeFieldPromise);
    }

    validateFieldsGroup( group = this.currentGroup, fieldOptions ){
        const self = this;

        fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptions);
        
        const $fields = self.$form.querySelectorAll(group);
        const skipUIfeedback = fieldOptions.skipUIfeedback;

        if( !skipUIfeedback ){
            addClass( self.$form, self.options.formOptions.cssClasses.pending );
        }

        return checkFieldsValidity($fields, fieldOptions, self.validationRules, self.validationErrors)
            .then(data => {
                data.fields.forEach(obj => {
                    obj.isCheckingGroup = true;
                    dispatchCustomEvent( obj.$field, customEvents.field.validation, { detail: obj } );
                });
                const groups = self.options.formOptions.groups;
                if( groups.length > 0 ){
                    data.group = {
                        prev: groups[groups.indexOf(group) - 1],
                        current: group,
                        next: groups[groups.indexOf(group) + 1]
                    }
                    data.canSubmit = data.result && !data.group.next;
                }
                dispatchCustomEvent( self.$form, customEvents.group.validation, { detail: data } );
                return data;
            })
            .then(finalizeFieldsGroupPromise);
    }

    validateFilledFields( fieldOptions ){
        const self = this;
        const $form = self.$form;
        const $filledFields = getFilledFields( $form );
        const requiredFieldsLength = getUniqueFields( $form.querySelectorAll(fieldsStringSelector) ).filter($field => $field.required).length;
        const formClasses = self.options.formOptions.cssClasses;

        if( $filledFields.length === 0 ){
            const obj = mergeValidateFormDefault({result: true, fields: []})
            return Promise.resolve(obj);
        }

        fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptions);

        const skipUIfeedback = fieldOptions.skipUIfeedback;

        if( !skipUIfeedback ){
            addClass( $form, formClasses.pending );
        }

        return checkFieldsValidity($filledFields, fieldOptions, self.validationRules, self.validationErrors)
            .then(data => {
                data.fields.forEach(obj => {
                    checkTouchedField( obj.$field, fieldOptions );
                    dispatchCustomEvent( obj.$field, customEvents.field.validation, { detail: obj } );
                });
            
                if( !skipUIfeedback ){
                    removeClass( $form, (`${formClasses.pending} ${formClasses.valid} ${formClasses.error}`) );
                    
                    if( data.result && $filledFields.length === requiredFieldsLength ) {
                        addClass( $form, formClasses.valid );
                    } else if( !data.result ) {
                        addClass( $form, formClasses.error );
                    }
                }
                
                return data;
            })
            .then(finalizeFormPromise);
    }

    validateForm( fieldOptions ){
        const self = this;

        fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptions);

        if( self.currentGroup ){
            return self.validateFieldsGroup( self.currentGroup, fieldOptions )
        }

        const $form = self.$form;
        const $fields = $form.querySelectorAll(fieldsStringSelector);

        if( !fieldOptions.skipUIfeedback ){
            addClass( $form, self.options.formOptions.cssClasses.pending );
        }

        return checkFieldsValidity($fields, fieldOptions, self.validationRules, self.validationErrors)
            .then(data => {
                data.fields.forEach(obj => {
                    obj.isCheckingForm = true;
                    dispatchCustomEvent( obj.$field, customEvents.field.validation, { detail: obj } );
                });
                dispatchCustomEvent( $form, customEvents.form.validation, { detail: data } );
                return data;
            })
            .then(finalizeFormPromise);
    }
    
    static addValidationErrors( errorsObj ){
        Form.prototype.validationErrors = mergeObjects({}, Form.prototype.validationErrors, errorsObj);
    }

    static addValidationRules( rulesObj ){
        Form.prototype.validationRules = mergeObjects({}, Form.prototype.validationRules, rulesObj);
    }
    
    static setOptions( optionsObj ){
        Form.prototype.options = mergeObjects({}, Form.prototype.options, optionsObj);
    }

}

Form.prototype.options = options;
Form.prototype.validationErrors = {};
Form.prototype.validationRules = validationRules;
Form.prototype.version = version;

export default Form;
