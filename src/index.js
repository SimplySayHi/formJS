
/**! formJS v3.0.0 | Valerio Di Punzio (@SimplySayHi) | https://valeriodipunzio.com/plugins/formJS/ | https://github.com/SimplySayHi/formJS | MIT license */

import { 
        _checkFormEl,
        _executeCallback,
        _isDOMNode,
        _isNodeList,
        _mergeObjects
        }                       from './modules/helper.js';
import { _callbackFns }         from './modules/listenerCallbacks.js';

import {
        options,
        _setCallbackFunctionsInOptions
        }                       from './modules/options.js';
import { validationRules }      from './modules/validationRules.js';

import { _formStartup }         from './modules/formStartup.js';

import { destroy }              from './modules/destroy.js';
import { getFormData }          from './modules/getFormData.js';
import { init }                 from './modules/init.js';
import { isValidField }         from './modules/isValidField.js';
import { isValidForm }          from './modules/isValidForm.js';
import { submit }               from './modules/submit.js';

const version = '3.0.0';
const _listenerCallbacks = new WeakMap();

class Form {

    constructor( formEl, optionsObj = {} ){
        let self = this,
            argsL = arguments.length,
            checkFormEl = _checkFormEl(formEl);

        if( argsL === 0 || (argsL > 0 && !formEl) ){
            throw new Error('First argument "formEl" is missing or falsy!');
        }
        if( _isNodeList(formEl) ){
            throw new Error('First argument "formEl" must be a single DOM node or a form CSS selector, not a NodeList!');
        }
        if( !checkFormEl.result ){
            throw new Error('First argument "formEl" is not a DOM node nor a form CSS selector!');
        }

        self.formEl = checkFormEl.element;
        self.options = _mergeObjects({}, optionsObj, Form.prototype.options);
        _setCallbackFunctionsInOptions.call( self );

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
    
    getFormData( customFn ){
        return getFormData.call(this, customFn);
    }

    init(){
        const self = this;

        init.call(self);
        self.isInitialized = true;

        return self;
    }
    
    isValidField( fieldEl, fieldOptions ){
        // TODO:
        // NEED TO IMPLEMENT THIS IN validationRules.js
        // RETURN A OBJECT LIKE:
        /*
        {
            field: fieldEl,
            result: false,
            errors: {
                minCheck: false,
                maxCheck: true
            }
        }
        OR
        {
            field: fieldEl,
            result: true
        }
        */
        return isValidField.call(this, fieldEl, fieldOptions);
    }
    
    isValidForm( optionsObj ){
        return isValidForm.call(this, optionsObj);
    }

    submit( optionsObj, event ){
        submit.call(this, optionsObj, event);
    }

    validateField( fieldElem ){
        const self = this,
              fieldEl = (typeof fieldElem === 'string' ? self.formEl.querySelector(fieldElem) : fieldElem);

        if( _isDOMNode(fieldEl) ){
            let data = [{
                    field: fieldEl,
                    result: self.isValidField( fieldEl )
                }];
            
            _executeCallback.call( self, self.options.fieldOptions.onValidation, data );
        }

        return self;
    }

    validateForm(){
        const self = this,
              result = self.isValidForm();

        _executeCallback.call( self, self.options.fieldOptions.onValidation, result.fields );

        return self;
    }
    
    static addValidationRules( rulesObj ){
        this.prototype.validationRules = _mergeObjects({}, rulesObj, this.prototype.validationRules);
    }
    
    static setOptions( optionsObj ){
        this.prototype.options = _mergeObjects({}, optionsObj, this.prototype.options);
    }

}

Form.prototype.isInitialized = false;
Form.prototype.options = options;
Form.prototype.validationRules = validationRules;
Form.prototype.version = version;

if( !window.Form ){ window.Form = Form; }
if( !window.FormJS ) { window.FormJS = Form; }
