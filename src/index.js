
/**! formJS v3.0.0 | Valerio Di Punzio (@SimplySayHi) | https://www.valeriodipunzio.com/plugins/formJS/ | https://github.com/SimplySayHi/formJS | MIT license */

import { mergeObjects }         from './modules/helper.js';
import { options }              from './modules/options.js';
import { validationRules }      from './modules/validationRules.js';
import { validationErrors }     from './modules/validationErrors.js';

// CONSTRUCTOR FUNCTION & PUBLIC METHODS
import { constructorFn }        from './modules/constructor.js';
import { destroy }              from './modules/destroy.js';
import { getFormData }          from './modules/getFormData.js';
import { init }                 from './modules/init.js';
import { validateField }        from './modules/validateField.js';
import { validateForm }         from './modules/validateForm.js';

const version = '3.0.0';

class Form {

    constructor( formEl, optionsObj ){
        constructorFn.call(this, formEl, optionsObj);
    }

    destroy(){
        destroy.call(this);
    }
    
    getFormData(){
        return getFormData.call(this);
    }

    init(){
        return init.call(this);
    }

    validateField( fieldEl, fieldOptions ){
        return validateField.call(this, fieldEl, fieldOptions);
    }

    validateForm( fieldOptions ){
        return validateForm.call(this, fieldOptions);
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

if( !window.Form ){ window.Form = Form; }
if( !window.FormJS ) { window.FormJS = Form; }
