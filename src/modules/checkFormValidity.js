
import { fieldsStringSelector, getUniqueFields, mergeValidateFieldDefault, mergeValidateFormDefault, mergeObjects } from './helpers';
import { checkFieldValidity } from './checkFieldValidity';

export function checkFormValidity( formEl, fieldOptions, validationRules, validationErrors, fieldToSkip = null ){

    fieldOptions = mergeObjects( {}, fieldOptions, {focusOnRelated: false} );
    const fieldsList = getUniqueFields( formEl.querySelectorAll(fieldsStringSelector) );

    return Promise.all( fieldsList.map(fieldEl => {

        if( fieldToSkip && fieldEl === fieldToSkip ){
            const obj = mergeValidateFieldDefault({fieldEl, result: true});
            return Promise.resolve(obj);
        }
        return checkFieldValidity( fieldEl, fieldOptions, validationRules, validationErrors );

    }) ).then(fields => {

        const areAllFieldsValid = fields.filter(fieldObj => !fieldObj.result).length === 0;
        return mergeValidateFormDefault({result: areAllFieldsValid, fields});

    });

}
