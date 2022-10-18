
import { mergeValidateFieldDefault, mergeObjects, toCamelCase } from './helpers'

export async function isValid( $field, fieldOptions, validationRules, validationErrors ){

    const fieldValue = $field.value
    const obj = mergeValidateFieldDefault({result: fieldValue.trim().length > 0, $field})
    const isCheckboxOrRadio = ['checkbox', 'radio'].includes($field.type)
    const hasSelectedInput = $field.form.querySelectorAll(`[name="${$field.name}"]:checked`).length > 0

    if( (!isCheckboxOrRadio && !obj.result) || (isCheckboxOrRadio && !hasSelectedInput) ){
        obj.result = false
        obj.errors = { empty: true }
        return Promise.resolve(obj)
    }

    // COLLECT VALIDATION METHOD NAMES ( USED TO RUN VALIDATIONS AND GET ERRORS )
    const validationMethods = Array.from($field.attributes).reduce((accList, attr) => {
        const attrName = toCamelCase( attr.name.replace('data-', '') )
        const attrValue = toCamelCase( attr.value )
        const isAttrValueWithFn = ['type', 'subtype'].includes(attrName) && validationRules[attrValue]
        const isAttrNameWithFn = validationRules[attrName]

        if( isAttrValueWithFn || isAttrNameWithFn ){
            accList.push( isAttrValueWithFn ? attrValue : attrName )
        }
        return accList
    }, [])

    const validity = await new Promise(resolve => {

        // RUN VALIDATIONS
        const validationsResult = validationMethods.reduce((accPromise, methodName) => {
            return accPromise.then(accObj => {
                return new Promise(resolveVal => {
                    // RUN VALIDATION INSIDE A PROMISE IS USEFUL FOR ASYNC VALIDATIONS
                    resolveVal( validationRules[methodName](fieldValue, $field, fieldOptions) )
                }).then(valObj => {
                    // ADD CUSTOM ERROR-KEY FOR EACH VALIDATION RULE
                    if( !valObj.result ){
                        const errorObj = {}
                        if( typeof valObj.errors === 'undefined' || typeof valObj.errors[methodName] === 'undefined' ){
                            errorObj[methodName] = true
                        }
                        valObj.errors = mergeObjects({}, valObj.errors, errorObj)
                    }
                    valObj = valObj.result ? {} : valObj
                    return mergeObjects(accObj, valObj)
                })
            })
        }, Promise.resolve(obj))
        resolve(validationsResult)

    })

    if( !validity.result ){
        validity.errors = validationMethods.reduce((accObj, methodName) => {
            const errors = (validationErrors[methodName] && validationErrors[methodName](fieldValue, $field)) || {}
            return mergeObjects(accObj, errors)
        }, validity.errors)
    }

    return validity

}
