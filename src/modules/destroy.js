
import { customEvents } from './helpers';
import { keypressMaxlength, dataTypeNumber, pastePrevent, submit, validation, validationEnd } from './listenerCallbacks';


export function destroy( formEl, options ){

    if( options.fieldOptions.strictHtmlValidation ){
        formEl.removeEventListener('keypress', keypressMaxlength, false);
        formEl.removeEventListener('input', dataTypeNumber, false);
    }

    if( options.fieldOptions.preventPasteFields ){
        formEl.removeEventListener('paste', pastePrevent, false);
    }

    if( options.formOptions.handleSubmit ){
        formEl.removeEventListener('submit', submit);
    }

    options.fieldOptions.validateOnEvents.split(' ').forEach(eventName => {
        const useCapturing = eventName === 'blur' ? true : false;
        formEl.removeEventListener(eventName, validation, useCapturing);
    });

    formEl.removeEventListener(customEvents.field.validation, validationEnd, false);

    delete formEl.formjs;
    
}
