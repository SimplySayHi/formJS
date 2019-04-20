
/**! formJS v3.0.0 | Valerio Di Punzio (@SimplySayHi) | http://simplysayhi.github.io/formJS | https://github.com/SimplySayHi/formJS | MIT license */

import { _mergeObjects }        from './modules/helper.js';
import { _setCallbackFunctionsInOptions } from './modules/optionsUtils.js';

import { options }              from './modules/options.js';
import { validationRules }      from './modules/validationRules.js';
import { validationErrors }     from './modules/validationErrors.js';

// CONSTRUCTOR FUNCTION & PUBLIC METHODS
import { _constructor }         from './modules/constructor.js';
import { destroy }              from './modules/destroy.js';
import { getFormData }          from './modules/getFormData.js';
import { init }                 from './modules/init.js';
import { isValidField }         from './modules/isValidField.js';
import { isValidForm }          from './modules/isValidForm.js';
import { submit }               from './modules/submit.js';
import { validateField }        from './modules/validateField.js';
import { validateForm }         from './modules/validateForm.js';

const version = '3.0.0';

class Form {

    constructor( formEl, optionsObj ){
        _constructor.call(this, formEl, optionsObj);
    }

    destroy(){
        destroy.call(this);
    }
    
    getFormData( customFn ){
        return getFormData.call(this, customFn);
    }

    init(){
        return init.call(this);
    }
    
    isValidField( fieldEl, fieldOptions ){
        return isValidField.call(this, fieldEl, fieldOptions);
    }
    
    isValidForm( optionsObj ){
        return isValidForm.call(this, optionsObj);
    }

    submit( optionsObj, event ){
        submit.call(this, optionsObj, event);
    }

    validateField( fieldElem, fieldOptions ){
        return validateField.call(this, fieldElem, fieldOptions);
    }

    validateForm( optionsObj ){
        return validateForm.call(this, optionsObj);
    }
    
    static addValidationErrors( errorsObj ){
        this.prototype.validationErrors = _mergeObjects({}, this.prototype.validationErrors, errorsObj);
    }

    static addValidationRules( rulesObj ){
        this.prototype.validationRules = _mergeObjects({}, this.prototype.validationRules, rulesObj);
    }
    
    static setOptions( optionsObj ){
        this.prototype.options = _mergeObjects({}, this.prototype.options, optionsObj);
    }

}

Form.prototype.isInitialized = false;
Form.prototype.listenerCallbacks = {};
Form.prototype.options = options;
Form.prototype.validationErrors = validationErrors;
Form.prototype.validationRules = validationRules;
Form.prototype.version = version;

_setCallbackFunctionsInOptions.call(Form.prototype);

if( !window.Form ){ window.Form = Form; }
if( !window.FormJS ) { window.FormJS = Form; }
