
import { fieldsStringSelector, mergeObjects, validateFormObjDefault } from './helper.js';
import { isValidField } from './isValidField.js';

export function isValidForm( fieldOptionsObj = {} ){

    const self = this,
          formEl = self.formEl,
          obj = mergeObjects({}, validateFormObjDefault),
          fieldOptions = mergeObjects( {}, self.options.fieldOptions, fieldOptionsObj, {focusOnRelated: false} );

    let currentFieldName = '',
        currentFieldType = '';
    
    Array.from( formEl.querySelectorAll(fieldsStringSelector) ).forEach(function( fieldEl ){
        let name = fieldEl.name,
            type = fieldEl.type,
            fieldData = {};
        
        if( (name === currentFieldName && type === currentFieldType) ){ return true; }
        
        if( !fieldEl.matches('[data-required-from]') ){
            currentFieldName = name;
            currentFieldType = type;
        }
        
        fieldData = isValidField.call( self, fieldEl, fieldOptions );

        if( !fieldData.result ){
            obj.result = false;
        }
        
        obj.fields.push( fieldData );
    });
    
    return obj;

}
