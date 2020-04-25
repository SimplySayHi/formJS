
import { fieldsStringSelector, getUniqueFields, getValidateFieldDefault, getValidateFormDefault, mergeObjects } from './helpers';
import { checkFieldValidity } from './checkFieldValidity';

export function checkFormValidity( formEl, fieldOptions, validationRules, validationErrors, fieldToSkip = null ){

    fieldOptions = mergeObjects( {}, fieldOptions, {focusOnRelated: false} );

    const obj = getValidateFormDefault(),
          fieldsList = getUniqueFields( formEl.querySelectorAll(fieldsStringSelector) );

    return Promise.all( fieldsList.map(fieldEl => {

        if( fieldToSkip && fieldEl === fieldToSkip ){
            const obj2 = getValidateFieldDefault({fieldEl, result: true});
            return Promise.resolve(obj2);
        }
        
        return checkFieldValidity( fieldEl, fieldOptions, validationRules, validationErrors );

    }) ).then(list => {

        let areAllFieldsValid = list.filter(fieldObj => !fieldObj.result).length === 0;
        obj.result = areAllFieldsValid;
        obj.fields = list;

        return obj;

    });

}
