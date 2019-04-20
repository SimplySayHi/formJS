
import { _checkFormEl, _isNodeList, _mergeObjects } from './helper.js';
import { _callbackFns }                             from './listenerCallbacks.js';
import { _formStartup }                             from './formStartup.js';

export function _constructor( formEl, optionsObj = {} ){

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

    if( !Object.isFrozen(Form.prototype.listenerCallbacks) ){
        Form.prototype.listenerCallbacks = {
                charCount:          _callbackFns.charCount,
                dataTypeNumber:     _callbackFns.dataTypeNumber,
                keypressMaxlength:  _callbackFns.keypressMaxlength,
                pastePrevent:       _callbackFns.pastePrevent.bind(self),
                submit:             _callbackFns.submit.bind(self),
                validation:         _callbackFns.validation.bind(self)
            };
        Object.freeze(Form.prototype.listenerCallbacks);
    }

    self.formEl = checkFormEl.element;
    self.options = _mergeObjects({}, Form.prototype.options, optionsObj);

    _formStartup.call( self );

    // EASY ACCESS TO THE FORM INSTANCE FROM THE FORM DOM ELEMENT
    self.formEl.formjs = self;
    
}
