
import { customEvents } from './helpers'
import { dataTypeNumber, formValidationEnd, groupValidationEnd, keypressMaxlength, pastePrevent, submit, validation, validationEnd } from './listenerCallbacks'


export function destroy( $form, options ){

    const { fieldOptions, formOptions } = options

    if( fieldOptions.strictHtmlValidation ){
        $form.removeEventListener('keypress', keypressMaxlength, false)
        $form.removeEventListener('input', dataTypeNumber, false)
    }

    if( fieldOptions.preventPasteFields ){
        $form.removeEventListener('paste', pastePrevent, false)
    }

    if( formOptions.handleSubmit ){
        $form.removeEventListener('submit', submit)
    }

    fieldOptions.validateOnEvents.split(' ').forEach(eventName => {
        const useCapturing = eventName === 'blur' ? true : false
        $form.removeEventListener(eventName, validation, useCapturing)
    })

    $form.removeEventListener(customEvents.field.validation, validationEnd, false)
    if( formOptions.groups.length > 0 ){
        $form.removeEventListener(customEvents.group.validation, groupValidationEnd, false)
    }
    $form.removeEventListener(customEvents.form.validation, formValidationEnd, false)

    delete $form.formjs
    
}
