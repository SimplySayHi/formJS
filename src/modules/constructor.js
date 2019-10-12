
import { checkFormEl, isNodeList, mergeObjects }   from './helper';
import { callbackFns }                             from './listenerCallbacks';
import { formStartup }                             from './formStartup';

export function constructorFn( formEl, optionsObj = {} ){

    let self = this,
        argsL = arguments.length,
        checkFormElem = checkFormEl(formEl);

    if( argsL === 0 || (argsL > 0 && !formEl) ){
        throw new Error('First argument "formEl" is missing or falsy!');
    }
    if( isNodeList(formEl) ){
        throw new Error('First argument "formEl" must be a single DOM node or a form CSS selector, not a NodeList!');
    }
    if( !checkFormElem.result ){
        throw new Error('First argument "formEl" is not a DOM node nor a form CSS selector!');
    }

    self.formEl = checkFormElem.element;
    self.formEl.formjs = self;
    self.options = mergeObjects({}, self.constructor.prototype.options, optionsObj);
    self.listenerCallbacks = {
        dataTypeNumber:     callbackFns.dataTypeNumber,
        keypressMaxlength:  callbackFns.keypressMaxlength,
        pastePrevent:       callbackFns.pastePrevent.bind(self),
        submit:             callbackFns.submit.bind(self),
        validation:         callbackFns.validation.bind(self)
    };
    Object.freeze(self.listenerCallbacks);

    formStartup.call( self );
    
}
