
import { customEvents } from './helpers';
import { blurHandler, dataTypeNumber, formValidationEnd, groupValidationEnd, keypressMaxlength, pastePrevent, submit, validation, validationEnd } from './listenerCallbacks';

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

    $form.removeEventListener('blur', blurHandler, true);

    options.fieldOptions.validateOnEvents.split(' ').forEach(eventName => {
        const useCapturing = ['blur', 'focus'].includes(eventName);
        $form.removeEventListener(eventName, validation, useCapturing);
    });

    $form.removeEventListener(customEvents.field.validation, validationEnd, false);
    if( options.formOptions.groups.length > 0 ){
        $form.removeEventListener(customEvents.group.validation, groupValidationEnd, false);
    }
    $form.removeEventListener(customEvents.form.validation, formValidationEnd, false);

    delete $form.formjs;
    
}
