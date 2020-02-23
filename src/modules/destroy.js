
import { customEvents } from './helpers';
import { listenerCallbacks } from './listenerCallbacks';


export function destroy( formEl, options ){

    if( options.fieldOptions.strictHtmlValidation ){
        formEl.removeEventListener('keypress', listenerCallbacks.keypressMaxlength, false);
        formEl.removeEventListener('input', listenerCallbacks.dataTypeNumber, false);
    }

    if( options.fieldOptions.preventPasteFields ){
        formEl.removeEventListener('paste', listenerCallbacks.pastePrevent, false);
    }

    if( options.formOptions.handleSubmit ){
        formEl.removeEventListener('submit', listenerCallbacks.submit);
    }

    options.fieldOptions.validateOnEvents.split(' ').forEach(function( eventName ){
        let useCapturing = (eventName === 'blur' ? true : false);
        formEl.removeEventListener(eventName, listenerCallbacks.validation, useCapturing);
    });

    formEl.removeEventListener(customEvents.field.validation, listenerCallbacks.validationEnd, false);

    delete formEl.formjs;
    
}
