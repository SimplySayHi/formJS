
import { customEvents } from './helpers';
import { dataTypeNumber, formValidationEnd, keypressMaxlength, pastePrevent, submit, validation, validationEnd } from './listenerCallbacks';


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

    options.fieldOptions.validateOnEvents.split(' ').forEach(function( eventName ){
        const useCapturing = eventName === 'blur' ? true : false;
        formEl.removeEventListener(eventName, validation, useCapturing);
    });

    formEl.removeEventListener(customEvents.field.validation, validationEnd, false);
    formEl.removeEventListener(customEvents.form.validation, formValidationEnd, false);

    delete formEl.formjs;
    
}
