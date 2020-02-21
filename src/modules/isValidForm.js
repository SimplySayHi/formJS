
import { fieldsStringSelector, getUniqueFields, mergeObjects, validateFormObjDefault } from './helpers';
import { isValidField } from './isValidField';

export function isValidForm( formEl, fieldOptions, validationRules, validationErrors ){

    fieldOptions = mergeObjects( {}, fieldOptions, {focusOnRelated: false} );

    const obj = mergeObjects({}, validateFormObjDefault),
          fieldsList = getUniqueFields( formEl.querySelectorAll(fieldsStringSelector) );

    return Promise.all( fieldsList.map(fieldEl => {
        
        return isValidField( fieldEl, fieldOptions, validationRules, validationErrors );

    }) ).then(list => {

        let areAllFieldsValid = list.filter(fieldObj => !fieldObj.result).length === 0;
        obj.result = areAllFieldsValid;
        obj.fields = list;

        return obj;

    });

}
