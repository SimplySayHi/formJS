
import { addClass, checkDirtyField, getFormFields, isFieldForChangeEvent } from '../helpers'

export const beforeValidationExtraLogic = function beforeValidationExtraLogic ( { $field, fieldOptions } ) {

    const $form = $field.form
    const $formFields = getFormFields($form)
    const isValidValue = $field.value.trim().length > 0

    // HANDLE FIELD data-required-from WHEN CHANGING ITS RELATED RADIO
    if( $field.type === 'radio' ){
        const $checked = $field.checked ? $field : $formFields.find($el => $el.matches(`[name="${$field.name}"]:checked`))
        const reqMoreIsChecked = $checked && $checked.matches('[data-require-more]')
        const $findReqMore = reqMoreIsChecked ? $checked : $formFields.find($el => $el.matches(`[data-require-more][name="${$field.name}"]`))
        const $findReqFrom = $findReqMore ? $formFields.find($el => $el.matches(`[data-required-from="#${$findReqMore.id}"]`)) : null
        
        if( $checked && $findReqFrom ){
            $findReqFrom.required = $findReqMore.required && $findReqMore.checked
            if( !reqMoreIsChecked ){
                $findReqFrom.value = ''
            } else if( fieldOptions.focusOnRelated ) {
                $findReqFrom.focus()
            }
        }
    }

    // HANDLE FIELD data-require-more & data-required-from WHEN *-from IT'S FILLED
    if( $field.matches('[data-required-from]') && isValidValue ){
        const $reqMore = $formFields.find( $el => $el.matches($field.dataset.requiredFrom) )
        $reqMore.checked = true
        $field.required = $reqMore.required
    }

}

export const beforeValidationUI = function beforeValidationUI ( { $field, fieldOptions } ) {

    if( fieldOptions.trimValue && !isFieldForChangeEvent($field) ){
        $field.value = $field.value.trim()
    }

    checkDirtyField( $field, fieldOptions )

    if( !fieldOptions.skipUIfeedback ){
        addClass( $field.closest( fieldOptions.questionContainer ), fieldOptions.cssClasses.pending )
    }

}
