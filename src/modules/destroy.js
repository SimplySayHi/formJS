
import { customEvents } from './helpers';
import { dataTypeNumber, formValidationEnd, keypressMaxlength, pastePrevent, submit, validation, validationEnd } from './listenerCallbacks';


export function destroy( $form, options ){

    if( options.fieldOptions.strictHtmlValidation ){
        $form.removeEventListener('keypress', keypressMaxlength, false);
        $form.removeEventListener('input', dataTypeNumber, false);
    }

    if( options.fieldOptions.preventPasteFields ){
        $form.removeEventListener('paste', pastePrevent, false);
    }

    if( options.formOptions.handleSubmit ){
        $form.removeEventListener('submit', submit);
    }

    options.fieldOptions.validateOnEvents.split(' ').forEach(eventName => {
        const useCapturing = eventName === 'blur' ? true : false;
        $form.removeEventListener(eventName, validation, useCapturing);
    });

    $form.removeEventListener(customEvents.field.validation, validationEnd, false);
    $form.removeEventListener(customEvents.form.validation, formValidationEnd, false);

    delete $form.formjs;
    
}
