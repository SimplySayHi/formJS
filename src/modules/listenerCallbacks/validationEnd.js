
import { addClass, getFormFields, getJSONobjectFromFieldAttribute, removeClass, mergeObjects } from '../helpers'

export const validationEnd = function( event ){

    const eventDetail = event.detail
    const $field = eventDetail.$field
    const $form = $field.form
    const dataFieldOptions = getJSONobjectFromFieldAttribute( $field, 'data-field-options' )
    const fieldOptions = mergeObjects({}, $form.formjs.options.fieldOptions, dataFieldOptions)
    const $container = $field.closest( fieldOptions.questionContainer )
    const isReqFrom = $field.matches('[data-required-from]')
    const $reqMore = getFormFields($form).find($el => $el.matches($field.dataset.requiredFrom))

    if( !fieldOptions.skipUIfeedback ){
        removeClass( $container, fieldOptions.cssClasses.pending )

        if( eventDetail.result ){

            if( !isReqFrom || (isReqFrom && $reqMore.checked) ){
                // IF FIELD IS VALID
                const errorClasses = `${fieldOptions.cssClasses.error} ${fieldOptions.cssClasses.errorEmpty} ${fieldOptions.cssClasses.errorRule}`
                removeClass( $container, errorClasses )
                addClass( $container, fieldOptions.cssClasses.valid )
            }

        } else {

            // IF FIELD IS NOT VALID
            let extraErrorClass = fieldOptions.cssClasses.errorRule

            // HANDLE CASE OF FIELD data-checks
            const isChecks = $field.matches('[data-checks]')
            const checkedElLength = (isChecks ? getFormFields($form).filter($el => $el.matches(`[name="${$field.name}"]:checked`)).length : 0)

            if( (!isChecks && (eventDetail.errors && eventDetail.errors.empty)) || (isChecks && checkedElLength === 0) ){
                extraErrorClass = fieldOptions.cssClasses.errorEmpty
            }

            const errorClasses = `${fieldOptions.cssClasses.error} ${extraErrorClass}`
            const errorClassToRemove = `${fieldOptions.cssClasses.errorEmpty} ${fieldOptions.cssClasses.errorRule}`
            removeClass( $container, `${fieldOptions.cssClasses.valid} ${errorClassToRemove}` )
            addClass( $container, errorClasses )

            removeClass( $form, $form.formjs.options.formOptions.cssClasses.valid )

        }
    }

}
