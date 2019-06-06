/**! formJS v2.3.3 | Valerio Di Punzio (@SimplySayHi) | https://valeriodipunzio.com/plugins/formJS/ | https://github.com/SimplySayHi/formJS | MIT license */

import { _checkFormEl, _isNodeList, _mergeObjects } from './modules/helper.js';
import { _callbackFns }         from './modules/listenerCallbacks.js';
import { _setCallbackFunctionsInOptions } from './modules/optionsUtils.js';

import { options }              from './modules/options.js';
import { validationRules }      from './modules/validationRules.js';

import { _formStartup }         from './modules/formStartup.js';

import { destroy }              from './modules/destroy.js';
import { getFormJSON }          from './modules/getFormJSON.js';
import { init }                 from './modules/init.js';
import { isValidField }         from './modules/isValidField.js';
import { isValidForm }          from './modules/isValidForm.js';
import { submit }               from './modules/submit.js';

const version = '2.3.3';
const _listenerCallbacks = new WeakMap();

class Form {
    constructor( formEl, optionsObj = {} ){
        let self = this,
            argsL = arguments.length,
            checkFormEl = _checkFormEl(formEl);

        if( argsL === 0 || (argsL > 0 && !formEl) ){ throw new Error('First argument "formEl" is missing or falsy!'); }
        if( _isNodeList(formEl) ){ throw new Error('First argument "formEl" must be a single DOM node or a form CSS selector, not a NodeList!'); }
        if( !checkFormEl.result ){ throw new Error('First argument "formEl" is not a DOM node nor a form CSS selector!'); }

        self.formEl = checkFormEl.element;
        self.options = _mergeObjects({}, Form.prototype.options, optionsObj);

        _listenerCallbacks.set(self, {
            charCount:          _callbackFns.charCount,
            dataTypeNumber:     _callbackFns.dataTypeNumber,
            keypressMaxlength:  _callbackFns.keypressMaxlength,
            pastePrevent:       _callbackFns.pastePrevent.bind(self),
            submit:             _callbackFns.submit.bind(self),
            validation:         _callbackFns.validation.bind(self)
        });

        _formStartup.call( self );
    }

    get listenerCallbacks(){
        return _listenerCallbacks.get(this);
    }

    destroy(){
        destroy.call(this);
    }
    
    getFormJSON( customFn ){
        return getFormJSON.call(this, customFn);
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
    
    static addValidationRules( rulesObj ){
        this.prototype.validationRules = _mergeObjects({}, this.prototype.validationRules, rulesObj);
    }
    
    static setOptions( optionsObj ){
        this.prototype.options = _mergeObjects({}, this.prototype.options, optionsObj);
    }
}

Form.prototype.isInitialized = false;
Form.prototype.validationRules = validationRules;
Form.prototype.options = options;
Form.prototype.version = version;

_setCallbackFunctionsInOptions.call(Form.prototype);

if( !window.Form ){ window.Form = Form; }
if( !window.FormJS ) { window.FormJS = Form; }
