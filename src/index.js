
import { version }              from './modules/version';
import { checkFormEl, customEvents, dispatchCustomEvent, excludeSelector, finalizeFieldPromise, finalizeFormPromise, isNodeList, mergeObjects, removeClass } from './modules/helpers';
import { options }              from './modules/options';
import { validationRules }      from './modules/validationRules';
import { formStartup }          from './modules/formStartup';
import { destroy }              from './modules/destroy';
import { checkFilledFields }    from './modules/checkFilledFields';
import { checkFieldValidity }   from './modules/checkFieldValidity';
import { checkFormValidity }    from './modules/checkFormValidity';

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

        let initOptions = {};
        if( self.options.formOptions.onInitCheckFilled ){
            const focusOnRelated = self.options.fieldOptions.focusOnRelated;
            self.options.fieldOptions.focusOnRelated = false;
            initOptions.detail = checkFilledFields(self.$form)
                            .then(fields => {
                                self.options.fieldOptions.focusOnRelated = focusOnRelated;
                                return fields;
                            });
        }
        dispatchCustomEvent( self.$form, customEvents.form.init, initOptions );
    }

    destroy(){
        destroy(this.$form, this.options);
    }
    
    getFormData(){
        const $formFields = this.$form.querySelectorAll('input, select, textarea'),
              $filteredFields = Array.from( $formFields ).filter( elem => elem.matches(excludeSelector) );
        return this.options.formOptions.getFormData($filteredFields);
    }

    validateField( field, fieldOptions ){
        const self = this;
        const $field = typeof field === 'string' ? self.$form.querySelector(field) : field;
        fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptions);
        const $form = self.$form;
        return checkFieldValidity($field, fieldOptions, self.validationRules, self.validationErrors)
            .then(obj => {
                dispatchCustomEvent( obj.$field, customEvents.field.validation, { detail: obj } );
                if( obj.result && fieldOptions.onValidationCheckAll ){
                    checkFormValidity( $form, fieldOptions, self.validationRules, self.validationErrors, obj.$field )
                        .then(dataForm => {
                            dispatchCustomEvent( $form, customEvents.form.validation, { detail: dataForm } );
                        });
                } else if( !obj.result ){
                    removeClass( $form, self.options.formOptions.cssClasses.valid );
                }
                return obj;
            })
            .then(finalizeFieldPromise);
    }

    validateForm( fieldOptions ){
        const self = this;
        fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptions);
        const $form = self.$form;
        return checkFormValidity($form, fieldOptions, self.validationRules, self.validationErrors)
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
