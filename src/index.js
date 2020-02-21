
import { excludeSelector, mergeObjects } from './modules/helpers';
import { options }              from './modules/options';
import { validationRules }      from './modules/validationRules';
import { validationErrors }     from './modules/validationErrors';

// CONSTRUCTOR FUNCTION & PUBLIC METHODS
import { constructorFn }        from './modules/constructor';
import { destroy }              from './modules/destroy';
import { init }                 from './modules/init';
import { validateField }        from './modules/validateField';
import { validateForm }         from './modules/validateForm';

const version = '4.0.0';

class Form {

    constructor( formEl, optionsObj ){
        // REFACTORING OK
        constructorFn(this, formEl, optionsObj);
    }

    destroy(){
        // REFACTORING OK
        destroy(this.formEl, this.options, this.listenerCallbacks);
    }
    
    getFormData(){
        // REFACTORING OK
        const formFieldsEl = this.formEl.querySelectorAll('input, select, textarea'),
              filteredFields = Array.from( formFieldsEl ).filter( elem => elem.matches(excludeSelector) );
        return this.options.formOptions.getFormData.call(this, filteredFields);
    }

    init(){
        // REFACTORING OK
        return init( this, this.formEl, this.listenerCallbacks );
    }

    validateField( fieldEl, fieldOptions = {} ){
        // REFACTORING OK
        fieldEl = (typeof fieldEl === 'string' ? this.formEl.querySelector(fieldEl) : fieldEl);
        const options = mergeObjects({}, this.options, {fieldOptions});
        return validateField( fieldEl, options, this.validationRules, this.validationErrors );
    }

    validateForm( fieldOptions = {} ){
        // REFACTORING OK
        const options = mergeObjects({}, this.options, {fieldOptions});
        options.fieldOptions.beforeValidation = options.fieldOptions.beforeValidation.map( func => func.bind( this ) );
        return validateForm( this.formEl, options, this.listenerCallbacks, this.validationRules, this.validationErrors );
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
Form.prototype.validationErrors = validationErrors;
Form.prototype.validationRules = validationRules;
Form.prototype.version = version;

export default Form;
