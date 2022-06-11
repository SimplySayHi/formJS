
import { version }              from '../package.json';
import { 
    checkFormEl, 
    customEvents, 
    dispatchCustomEvent, 
    excludeSelector, 
    fieldsStringSelector, 
    finalizeFieldPromise, 
    finalizeFieldsGroupPromise, 
    finalizeFormPromise, 
    getFilledFields, 
    isInteger, 
    isNodeList,
    isValidSelector, 
    mergeObjects, 
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

        formStartup( self.$form, self.options );

        const initOptions = {};
        if( self.options.formOptions.onInitCheckFilled ){
            initOptions.detail = self.validateFilledFields().catch(fields => {});
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
                        const groups = self.options.formOptions.groups;
                        checkFieldsValidity( $fields, fieldOptions, self.validationRules, self.validationErrors, obj.$field )
                            .then(dataForm => {
                                const validationEventName = self.currentGroup ? customEvents.group.validation : customEvents.form.validation;
                                if( self.currentGroup ){
                                    dataForm.group = {
                                        prev: groups[groups.indexOf(selector) - 1],
                                        current: selector,
                                        next: groups[groups.indexOf(selector) + 1]
                                    }
                                    if( dataForm.result ){
                                        self.currentGroup = dataForm.group.next;
                                    }
                                    dataForm.canSubmit = !self.currentGroup;
                                }
                                dispatchCustomEvent( $form, validationEventName, { detail: dataForm } );
                            });
                    }
                } else {
                    removeClass( $form, self.options.formOptions.cssClasses.valid );
                }
                return obj;
            })
            .then(finalizeFieldPromise);
    }

    validateFieldsGroup( selectorOrGroupIndex = this.currentGroup, fieldOptions ){
        const self = this;

        fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptions);

        const groups = self.options.formOptions.groups;
        const selector = isInteger(selectorOrGroupIndex) ? 
                            groups[selectorOrGroupIndex] : 
                            (isValidSelector(selectorOrGroupIndex) ? selectorOrGroupIndex : false);
        const $fields = selector ? self.$form.querySelectorAll(selector) : selectorOrGroupIndex;
        return checkFieldsValidity($fields, fieldOptions, self.validationRules, self.validationErrors)
            .then(data => {
                data.fields.forEach(obj => {
                    obj.isCheckingGroup = true;
                    dispatchCustomEvent( obj.$field, customEvents.field.validation, { detail: obj } );
                });
                if( groups.length > 0 ){
                    data.group = {
                        prev: groups[groups.indexOf(selector) - 1],
                        current: selector,
                        next: groups[groups.indexOf(selector) + 1]
                    }
                    data.canSubmit = !data.group.next;
                }
                dispatchCustomEvent( self.$form, customEvents.group.validation, { detail: data } );
                return data;
            })
            .then(finalizeFieldsGroupPromise);
    }

    validateFilledFields( fieldOptions ){
        const self = this;
        const $filledFields = getFilledFields( self.$form );

        fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptions);

        return checkFieldsValidity($filledFields, fieldOptions, self.validationRules, self.validationErrors)
            .then(data => {
                data.fields.forEach(obj => {
                    dispatchCustomEvent( obj.$field, customEvents.field.validation, { detail: obj } );
                });
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
