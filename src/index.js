
import { version }              from './modules/version';
import { customEvents, dispatchCustomEvent, excludeSelector, finalizeFieldPromise, finalizeFormPromise, mergeObjects, removeClass } from './modules/helpers';
import { options }              from './modules/options';
import { validationRules }      from './modules/validationRules';
import { validationEnd }        from './modules/listenerCallbacks';
import { constructorFn }        from './modules/constructor';
import { destroy }              from './modules/destroy';
import { init }                 from './modules/init';
import { checkFieldValidity }   from './modules/checkFieldValidity';
import { checkFormValidity }    from './modules/checkFormValidity';

class Form {

    constructor( formEl, optionsObj ){
        constructorFn(this, formEl, optionsObj);
    }

    destroy(){
        destroy(this.formEl, this.options);
    }
    
    getFormData(){
        const formFieldsEl = this.formEl.querySelectorAll('input, select, textarea'),
              filteredFields = Array.from( formFieldsEl ).filter( elem => elem.matches(excludeSelector) );
        return this.options.formOptions.getFormData(filteredFields);
    }

    init(){
        return init(this.formEl);
    }

    validateField( fieldEl, fieldOptions ){
        fieldEl = (typeof fieldEl === 'string' ? this.formEl.querySelector(fieldEl) : fieldEl);
        fieldOptions = mergeObjects({}, this.options.fieldOptions, fieldOptions);
        const formEl = this.formEl;
        const skipUIfeedback = this.options.fieldOptions.skipUIfeedback;
        return checkFieldValidity(fieldEl, fieldOptions, this.validationRules, this.validationErrors)
            .then(obj => {
                return new Promise(resolve => {
                    if( obj.fieldEl ){
                        dispatchCustomEvent( obj.fieldEl, customEvents.field.validation, { bubbles: false, detail: obj } );
                        dispatchCustomEvent( formEl, customEvents.field.validation, { detail: obj } );
                        if( fieldOptions.onValidationCheckAll && obj.result ){
                            // FORCE skipUIfeedback TO true
                            fieldOptions.skipUIfeedback = true;
                            resolve(
                                checkFormValidity( formEl, fieldOptions, this.validationRules, this.validationErrors, obj.fieldEl )
                                    .then(dataForm => {
                                        const clMethodName = dataForm.result ? 'add' : 'remove';
                                        formEl.classList[clMethodName]( this.options.formOptions.cssClasses.valid );
                                        dispatchCustomEvent( formEl, customEvents.form.validation, { detail: dataForm } );
                                        // RESTORE skipUIfeedback TO THE ORIGINAL VALUE
                                        fieldOptions.skipUIfeedback = skipUIfeedback;
                                        return obj;
                                    })
                            );
                        } else if( !obj.result ){
                            removeClass( formEl, this.options.formOptions.cssClasses.valid );
                        }
                    }
                    resolve( obj );
                });
            })
            .then(finalizeFieldPromise);
    }

    validateForm( fieldOptions ){
        fieldOptions = mergeObjects({}, this.options.fieldOptions, fieldOptions);
        const formEl = this.formEl;
        return checkFormValidity(formEl, fieldOptions, this.validationRules, this.validationErrors)
            .then(data => {
                const clMethodName = data.result ? 'add' : 'remove';
                formEl.classList[clMethodName]( this.options.formOptions.cssClasses.valid );
                validationEnd( {detail:data} );
                dispatchCustomEvent( formEl, customEvents.form.validation, { detail: data } );
                return data;
            })
            .then(finalizeFormPromise);
    }
    
    static addValidationErrors( errorsObj ){
        this.prototype.validationErrors = mergeObjects({}, this.prototype.validationErrors, errorsObj);
    }

    static addValidationRules( rulesObj ){
        this.prototype.validationRules = mergeObjects({}, this.prototype.validationRules, rulesObj);
    }
    
    static setOptions( optionsObj ){
        this.prototype.options = mergeObjects({}, this.prototype.options, optionsObj);
    }

}

Form.prototype.isInitialized = false;
Form.prototype.options = options;
Form.prototype.validationErrors = {};
Form.prototype.validationRules = validationRules;
Form.prototype.version = version;

export default Form;
