
import { version }              from './modules/version';
import { checkFormEl, customEvents, dispatchCustomEvent, excludeSelector, finalizeFieldPromise, finalizeFormPromise, isNodeList, mergeObjects, removeClass } from './modules/helpers';
import { options }              from './modules/options';
import { validationRules }      from './modules/validationRules';
import { validationEnd }        from './modules/listenerCallbacks';
import { formStartup }          from './modules/formStartup';
import { destroy }              from './modules/destroy';
import { checkFilledFields }    from './modules/checkFilledFields';
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
    
    getFormData(){
        const formFieldsEl = this.formEl.querySelectorAll('input, select, textarea'),
              filteredFields = Array.from( formFieldsEl ).filter( elem => elem.matches(excludeSelector) );
        return this.options.formOptions.getFormData(filteredFields);
    }

    validateField( fieldEl, fieldOptions ){
        const self = this;
        fieldEl = typeof fieldEl === 'string' ? this.formEl.querySelector(fieldEl) : fieldEl;
        fieldOptions = mergeObjects({}, this.options.fieldOptions, fieldOptions);
        const formEl = this.formEl;
        return checkFieldValidity(fieldEl, fieldOptions, this.validationRules, this.validationErrors)
            .then(obj => {
                return new Promise(resolve => {
                    dispatchCustomEvent( obj.fieldEl, customEvents.field.validation, { bubbles: false, detail: obj } );
                    dispatchCustomEvent( formEl, customEvents.field.validation, { detail: obj } );
                    if( obj.result && fieldOptions.onValidationCheckAll ){
                        // FORCE skipUIfeedback TO BE TEMPORARY true
                        fieldOptions.skipUIfeedback = true;
                        checkFormValidity( formEl, fieldOptions, self.validationRules, self.validationErrors, obj.fieldEl )
                            .then(dataForm => {
                                const clMethodName = dataForm.result ? 'add' : 'remove';
                                formEl.classList[clMethodName]( self.options.formOptions.cssClasses.valid );
                                dispatchCustomEvent( formEl, customEvents.form.validation, { detail: dataForm } );
                            });
                    } else if( !obj.result ){
                        removeClass( formEl, self.options.formOptions.cssClasses.valid );
                    }
                    return obj;
                });
            })
            .then(finalizeFieldPromise);
    }

    validateFilledFields(){
        return checkFilledFields(this.formEl);
    }

    validateForm( fieldOptions ){
        const self = this;
        fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptions);
        const formEl = self.formEl;
        return checkFormValidity(formEl, fieldOptions, self.validationRules, self.validationErrors)
            .then(data => {
                const clMethodName = data.result ? 'add' : 'remove';
                formEl.classList[clMethodName]( self.options.formOptions.cssClasses.valid );
                validationEnd( {detail:data} );
                dispatchCustomEvent( formEl, customEvents.form.validation, { detail: data } );
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
