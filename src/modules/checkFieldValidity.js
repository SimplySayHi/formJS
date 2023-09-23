
import { getJSONobjectFromFieldAttribute, isDOMNode, mergeObjects, mergeValidateFieldDefault, runFunctionsSequence } from './helpers'
import { isValid }  from './isValid'

export async function checkFieldValidity( $field, fieldOptions, validationRules, validationErrors ){

    if( !isDOMNode($field) ){
        const obj = mergeValidateFieldDefault({$field})
        return Promise.resolve(obj)
    }

    const dataFieldOptions = getJSONobjectFromFieldAttribute( $field, 'data-field-options' )
    const fieldOptionsTemp = mergeObjects( {}, fieldOptions, dataFieldOptions )
    
    const dataBeforeValidation = (await runFunctionsSequence({
        functionsList: fieldOptionsTemp.beforeValidation,
        data: { $field, fieldOptions: fieldOptionsTemp }
    })).pop()
    
    const isValidValue = $field.value.trim().length > 0
    const needsValidation = $field.required || ($field.matches('[data-validate-if-filled]') && isValidValue)

    if( !needsValidation ){
        delete dataBeforeValidation.fieldOptions
        dataBeforeValidation.result = true
    }
    
    return needsValidation ? await isValid($field, fieldOptionsTemp, validationRules, validationErrors) : dataBeforeValidation

}
