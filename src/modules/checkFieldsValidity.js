
import { getUniqueFields, mergeValidateFieldDefault, mergeValidateFormDefault, mergeObjects } from './helpers';
import { checkFieldValidity } from './checkFieldValidity';

export function checkFieldsValidity( $fields, fieldOptions, validationRules, validationErrors, fieldToSkip = null ){

    fieldOptions = mergeObjects( {}, fieldOptions, {focusOnRelated: false} );
    const $fieldsList = getUniqueFields( $fields );

    return Promise.all( $fieldsList.map($field => {

        if( fieldToSkip && $field === fieldToSkip ){
            const obj = mergeValidateFieldDefault({$field, result: true});
            return Promise.resolve(obj);
        }
        return checkFieldValidity( $field, fieldOptions, validationRules, validationErrors );

    }) ).then(fields => {

        const areAllFieldsValid = fields.every(({result}) => result);
        return mergeValidateFormDefault({result: areAllFieldsValid, fields});

    });

}
