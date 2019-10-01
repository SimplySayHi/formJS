
import { fieldsStringSelector, mergeObjects, validateFormObjDefault } from './helper';
import { isValidField } from './isValidField';

export function isValidForm( fieldOptionsObj = {} ){

    const self = this,
          formEl = self.formEl,
          obj = mergeObjects({}, validateFormObjDefault),
          fieldOptions = mergeObjects( {}, fieldOptionsObj, {focusOnRelated: false} );

    let currentFieldName = '',
        currentFieldType = '';

    const fieldsList = Array.from( formEl.querySelectorAll(fieldsStringSelector) ).filter(fieldEl => {
        let name = fieldEl.name,
            type = fieldEl.type;

        if( name === currentFieldName && type === currentFieldType ){
            return false;
        }

        if( !fieldEl.matches('[data-required-from]') ){
            currentFieldName = name;
            currentFieldType = type;
        }

        return true;
    });

    return Promise.all( fieldsList.map(function( fieldEl ){
        
        return isValidField.call( self, fieldEl, fieldOptions );

    }) ).then(list => {

        let areAllFieldsValid = list.filter(fieldObj => !fieldObj.result).length === 0;
        obj.result = areAllFieldsValid;
        obj.fields = list;

        return obj;

    });

}
