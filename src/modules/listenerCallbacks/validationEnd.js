
import { addClass, getFormFields, getJSONobjectFromFieldAttribute, removeClass, mergeObjects } from '../helpers'

export const validationEnd = function( event ){

    const eventDetail = event.detail
    const $field = eventDetail.$field
    const dataFieldOptions = getJSONobjectFromFieldAttribute( $field, 'data-field-options' )
    const fieldOptions = mergeObjects({}, $field.form.formjs.options.fieldOptions, dataFieldOptions)
    const $container = $field.closest( fieldOptions.questionContainer )
    const isReqFrom = $field.matches('[data-required-from]')
    const $reqMore = getFormFields($field.form).find($el => $el.matches($field.dataset.requiredFrom))

    if( !fieldOptions.skipUIfeedback ){

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
            const checkedElLength = (isChecks ? getFormFields($field.form).filter($el => $el.matches(`[name="${$field.name}"]:checked`)).length : 0)

            if( (!isChecks && (eventDetail.errors && eventDetail.errors.empty)) || (isChecks && checkedElLength === 0) ){
                extraErrorClass = fieldOptions.cssClasses.errorEmpty
            }

            let errorClasses = `${fieldOptions.cssClasses.error} ${extraErrorClass}`
            let errorClassToRemove = `${fieldOptions.cssClasses.errorEmpty} ${fieldOptions.cssClasses.errorRule}`
            removeClass( $container, `${fieldOptions.cssClasses.valid} ${errorClassToRemove}` )
            addClass( $container, errorClasses )

        }
    }

}
