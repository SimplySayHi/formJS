
import { mergeObjects }         from './modules/helpers';
import { options }              from './modules-lite/options';
import { validationRules }      from './modules/validationRules';
import { constructorFn }        from './modules-lite/constructor';
import { checkFieldValidity }   from './modules/checkFieldValidity';
import { checkFormValidity }    from './modules/checkFormValidity';

const version = '4.0.2';

class Form {

    constructor( formEl, optionsObj ){
        constructorFn(this, formEl, optionsObj);
    }

    destroy(){
        delete this.formEl.formjs;
    }

    validateField( fieldEl, fieldOptions ){
        fieldEl = (typeof fieldEl === 'string' ? this.formEl.querySelector(fieldEl) : fieldEl);
        fieldOptions = mergeObjects({}, this.options.fieldOptions, fieldOptions);
        return checkFieldValidity(fieldEl, fieldOptions, this.validationRules, this.validationErrors);
    }

    validateForm( fieldOptions ){
        fieldOptions = mergeObjects({}, this.options.fieldOptions, fieldOptions);
        return checkFormValidity(this.formEl, fieldOptions, this.validationRules, this.validationErrors);
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
