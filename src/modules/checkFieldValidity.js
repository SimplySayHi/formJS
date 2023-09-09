
import {    
    getJSONobjectFromFieldAttribute,
    isDOMNode,
    mergeObjects,
    mergeValidateFieldDefault,
    removeClass,
    runFunctionsSequence
}                   from './helpers'
import { isValid }  from './isValid'

export async function checkFieldValidity( $field, fieldOptions, validationRules, validationErrors ){

    if( !isDOMNode($field) ){
        const obj = mergeValidateFieldDefault({$field})
        return Promise.resolve(obj)
    }

    const $form = $field.form
    const isValidValue = $field.value.trim().length > 0
    const dataFieldOptions = getJSONobjectFromFieldAttribute( $field, 'data-field-options' )

    fieldOptions = mergeObjects( fieldOptions, dataFieldOptions )

    // HANDLE FIELD data-required-from WHEN CHANGING ITS RELATED RADIO
    if( $field.type === 'radio' ){
        const $checked = $field.checked ? $field : $form.querySelector(`[name="${$field.name}"]:checked`)
        const reqMoreIsChecked = $checked && $checked.matches('[data-require-more]')
        const $findReqMore = reqMoreIsChecked ? $checked : $form.querySelector(`[data-require-more][name="${$field.name}"]`)
        const $findReqFrom = $findReqMore ? $form.querySelector(`[data-required-from="#${$findReqMore.id}"]`) : null
        
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
        const $reqMore = $form.querySelector( $field.dataset.requiredFrom )
        $reqMore.checked = true
        $field.required = $reqMore.required
    }

    const dataBeforeValidation = (await runFunctionsSequence({
        functionsList: fieldOptions.beforeValidation,
        data: { $field, fieldOptions }
    })).pop()

    const needsValidation = $field.required || ($field.matches('[data-validate-if-filled]') && isValidValue)

    if( !needsValidation ){
        delete dataBeforeValidation.fieldOptions
        dataBeforeValidation.result = true
    }
    
    const validationResult = needsValidation ? await isValid($field, fieldOptions, validationRules, validationErrors) : dataBeforeValidation

    const $container = fieldOptions.questionContainer && validationResult.$field.closest( fieldOptions.questionContainer )
    if( $container ){
        removeClass( $container, fieldOptions.cssClasses.pending )
    }
    
    return validationResult

}
