/**! formJS v2.2.0 | Valerio Di Punzio (@SimplySayHi) | https://valeriodipunzio.com/plugins/formJS/ | https://github.com/SimplySayHi/formJS | MIT license */

import { _checkFormEl, _isNodeList, _mergeObjects } from './modules/helper.js';

import { options }              from './modules/options.js';
import { validationRules }      from './modules/validationRules.js';

import { _charCountCallback, _keypressMaxlengthCallback, _pastePreventCallback, _submitCallback, _validationCallback } from './modules/listenerCallbacks.js';

import { destroy }              from './modules/destroy.js';
import { getFormJSON }          from './modules/getFormJSON.js';
import { isValidField }         from './modules/isValidField.js';
import { isValidForm }          from './modules/isValidForm.js';
import { submit }               from './modules/submit.js';

import { _init }                from './modules/init.js';

const _listenerCallbacks = new WeakMap();

class Form {
    constructor( formEl, optionsObj = {} ){
        let argsL = arguments.length,
            checkFormEl = _checkFormEl(formEl);

        if( argsL === 0 || (argsL > 0 && !formEl) ){ throw new Error('First argument "formEl" is missing or falsy!'); }
        if( _isNodeList(formEl) ){ throw new Error('First argument "formEl" must be a single DOM node or a form CSS selector, not a NodeList!'); }
        if( !checkFormEl.result ){ throw new Error('First argument "formEl" is not a DOM node nor a form CSS selector!'); }

        this.formEl = checkFormEl.element;
        this.options = _mergeObjects({}, optionsObj, Form.prototype.options);

        _listenerCallbacks.set(this, {
            charCount:          _charCountCallback,
            validation:         _validationCallback.bind(this),
            keypressMaxlength:  _keypressMaxlengthCallback.bind(this),
            pastePrevent:       _pastePreventCallback.bind(this),
            submit:             _submitCallback.bind(this)
        });

        _init.call( this );
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
        this.prototype.validationRules = _mergeObjects({}, rulesObj, this.prototype.validationRules);
    }
    
    static setOptions( optionsObj ){
        this.prototype.options = _mergeObjects({}, optionsObj, this.prototype.options);
    }
}

Form.prototype.validationRules = validationRules;

Form.prototype.options = options;

if( !window.Form ){ window.Form = Form; }
if( !window.FormJS ) { window.FormJS = Form; }
