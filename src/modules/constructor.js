
import { checkFormEl, isNodeList, mergeObjects }   from './helpers';
import { callbackFns }                             from './listenerCallbacks';
import { formStartup }                             from './formStartup';

export function constructorFn( self, formEl, optionsObj ){

    let argsL = arguments.length,
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

    // BINDING CONTEXT FOR FUTURE EXECUTION
    const cbList = [
        // IN fieldOptions
        'beforeValidation',
        // IN formOptions
        'beforeSend'
    ];
    cbList.forEach(cbName => {
        let optionType = Array.isArray(self.options.formOptions[cbName]) ? 'formOptions' : 'fieldOptions',
            cbOpt = self.options[optionType][cbName];

        if( cbOpt && Array.isArray(cbOpt) ){
            self.options[optionType][cbName] = cbOpt.map(cbFn => cbFn.bind(self));
        }
    });

    self.listenerCallbacks = {
        dataTypeNumber:     callbackFns.dataTypeNumber,
        keypressMaxlength:  callbackFns.keypressMaxlength,
        pastePrevent:       callbackFns.pastePrevent,
        submit:             callbackFns.submit,
        validation:         callbackFns.validation.bind(self),
        validationEnd:      callbackFns.validationEnd
    };
    Object.freeze(self.listenerCallbacks);

    formStartup( self.formEl, self.options, self.listenerCallbacks );
    
}
