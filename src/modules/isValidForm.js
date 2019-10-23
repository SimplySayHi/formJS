
import { fieldsStringSelector, getUniqueFields, mergeObjects, validateFormObjDefault } from './helpers';
import { isValidField } from './isValidField';

export function isValidForm( fieldOptionsObj = {} ){

    const self = this,
          formEl = self.formEl,
          obj = mergeObjects({}, validateFormObjDefault),
          fieldOptions = mergeObjects( {}, fieldOptionsObj, {focusOnRelated: false} ),
          fieldsList = getUniqueFields( formEl.querySelectorAll(fieldsStringSelector) );

    return Promise.all( fieldsList.map(function( fieldEl ){
        
        return isValidField.call( self, fieldEl, fieldOptions );

    }) ).then(list => {

        let areAllFieldsValid = list.filter(fieldObj => !fieldObj.result).length === 0;
        obj.result = areAllFieldsValid;
        obj.fields = list;

        return obj;

    });

}
