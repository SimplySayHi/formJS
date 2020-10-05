
import { fieldsStringSelector, getUniqueFields, mergeValidateFieldDefault, mergeValidateFormDefault, mergeObjects } from './helpers';
import { checkFieldValidity } from './checkFieldValidity';

export function checkFormValidity( $form, fieldOptions, validationRules, validationErrors, fieldToSkip = null ){

    fieldOptions = mergeObjects( {}, fieldOptions, {focusOnRelated: false} );
    const $fieldsList = getUniqueFields( $form.querySelectorAll(fieldsStringSelector) );

    return Promise.all( $fieldsList.map($field => {

        if( fieldToSkip && $field === fieldToSkip ){
            const obj = mergeValidateFieldDefault({$field, result: true});
            return Promise.resolve(obj);
        }
        return checkFieldValidity( $field, fieldOptions, validationRules, validationErrors );

    }) ).then(fields => {

        const areAllFieldsValid = fields.filter(fieldObj => !fieldObj.result).length === 0;
        return mergeValidateFormDefault({result: areAllFieldsValid, fields});

    });

}
