
import { getUniqueFields, mergeValidateFormDefault, mergeObjects } from './helpers'
import { checkFieldValidity } from './checkFieldValidity'

export async function checkFieldsValidity( $fields, fieldOptions, validationRules, validationErrors, fieldToSkip = {} ){

    const fieldOptionsTemp = mergeObjects( {}, fieldOptions, {focusOnRelated: false} )
    const $fieldsList = getUniqueFields( $fields )

    const fieldsValidity = await Promise.all( $fieldsList.map(async $field => {

        if( fieldToSkip.$field && $field === fieldToSkip.$field ){
            return Promise.resolve(fieldToSkip)
        }
        return await checkFieldValidity( $field, fieldOptionsTemp, validationRules, validationErrors )

    }) )

    const areAllFieldsValid = fieldsValidity.every(({result}) => result)

    return mergeValidateFormDefault({result: areAllFieldsValid, fields:fieldsValidity})

}
