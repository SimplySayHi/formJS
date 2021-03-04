
import { version }              from './modules/version';
import { checkFormEl, customEvents, dispatchCustomEvent, excludeSelector, isNodeList, mergeObjects, removeClass } from './modules/helpers';
import { options }              from './modules/options';
import { validationRules }      from './modules/validationRules';
import { validationErrors }     from './modules/validationErrors';
import { formStartup }          from './modules/formStartup';
import { destroy }              from './modules/destroy';
import { init }                 from './modules/init';
import { checkFieldValidity }   from './modules/checkFieldValidity';
import { checkFormValidity }    from './modules/checkFormValidity';

class Form {

    constructor( formEl, optionsObj ){
        const argsL = arguments.length,
              checkFormElem = checkFormEl(formEl);

        if( argsL === 0 || (argsL > 0 && !formEl) ){
            throw new Error('First argument "formEl" is missing or falsy!');
        }
        if( isNodeList(formEl) ){
            throw new Error('First argument "formEl" must be a single DOM node or a form CSS selector, not a NodeList!');
        }
        if( !checkFormElem.result ){
            throw new Error('First argument "formEl" is not a DOM node nor a form CSS selector!');
        }

        const self = this;

        self.formEl = checkFormElem.element;
        self.formEl.formjs = self;
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

        formStartup( self.formEl, self.options );
    }

    destroy(){
        destroy(this.formEl, this.options);
    }
    
    getFormData( trimValues = this.options.fieldOptions.trimValue ){
        const formFieldsEl = this.formEl.querySelectorAll('input, select, textarea'),
              filteredFields = Array.from( formFieldsEl ).filter( elem => elem.matches(excludeSelector) );
        return this.options.formOptions.getFormData( filteredFields, trimValues );
    }

    init(){
        const focusOnRelated = this.options.fieldOptions.focusOnRelated;
        this.options.fieldOptions.focusOnRelated = false;
        return init(this.formEl)
            .then(initObj => {
                this.options.fieldOptions.focusOnRelated = focusOnRelated;
                return initObj;
            });
    }

    validateField( fieldEl, fieldOptions ){
        const self = this;
        fieldEl = typeof fieldEl === 'string' ? self.formEl.querySelector(fieldEl) : fieldEl;
        fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptions);
        const formEl = self.formEl;
        return checkFieldValidity(fieldEl, fieldOptions, self.validationRules, self.validationErrors)
            .then(obj => {
                dispatchCustomEvent( obj.fieldEl, customEvents.field.validation, obj );
                if( obj.result && fieldOptions.onValidationCheckAll ){
                    checkFormValidity( formEl, fieldOptions, self.validationRules, self.validationErrors, obj.fieldEl )
                        .then(dataForm => {
                            dispatchCustomEvent( formEl, customEvents.form.validation, dataForm );
                        });
                } else if( !obj.result ){
                    removeClass( formEl, self.options.formOptions.cssClasses.valid );
                }
                return obj;
            });
    }

    validateForm( fieldOptions ){
        const self = this;
        fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptions);
        const formEl = self.formEl;
        return checkFormValidity(formEl, fieldOptions, self.validationRules, self.validationErrors)
            .then(data => {
                data.fields.forEach(obj => {
                    obj.isCheckingForm = true;
                    dispatchCustomEvent( obj.fieldEl, customEvents.field.validation, obj );
                });
                dispatchCustomEvent( formEl, customEvents.form.validation, data );
                return data;
            });
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

Form.prototype.isInitialized = false;
Form.prototype.options = options;
Form.prototype.validationErrors = validationErrors;
Form.prototype.validationRules = validationRules;
Form.prototype.version = version;

export default Form;
