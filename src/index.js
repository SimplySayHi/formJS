
/**! formJS v3.0.0 | Valerio Di Punzio (@SimplySayHi) | https://valeriodipunzio.com/plugins/formJS/ | https://github.com/SimplySayHi/formJS | MIT license */

import { _mergeObjects }        from './modules/helper.js';
import { _callbackFns }         from './modules/listenerCallbacks.js';
import { _setCallbackFunctionsInOptions } from './modules/optionsUtils.js';

import { options }              from './modules/options.js';
import { validationRules }      from './modules/validationRules.js';

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
const _listenerCallbacks = new WeakMap();

class Form {

    constructor( formEl, optionsObj ){
        const self = this;

        _listenerCallbacks.set(self, {
            charCount:          _callbackFns.charCount,
            dataTypeNumber:     _callbackFns.dataTypeNumber,
            keypressMaxlength:  _callbackFns.keypressMaxlength,
            pastePrevent:       _callbackFns.pastePrevent.bind(self),
            submit:             _callbackFns.submit.bind(self),
            validation:         _callbackFns.validation.bind(self)
        });
        
        _constructor.call( self, formEl, optionsObj );
    }

    get listenerCallbacks(){
        return _listenerCallbacks.get(this);
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
    
    static addValidationRules( rulesObj ){
        this.prototype.validationRules = _mergeObjects({}, this.prototype.validationRules, rulesObj);
    }
    
    static setOptions( optionsObj ){
        this.prototype.options = _mergeObjects({}, this.prototype.options, optionsObj);
    }

}

Form.prototype.isInitialized = false;
Form.prototype.options = options;
Form.prototype.validationRules = validationRules;
Form.prototype.version = version;

_setCallbackFunctionsInOptions.call(Form.prototype);

if( !window.Form ){ window.Form = Form; }
if( !window.FormJS ) { window.FormJS = Form; }
