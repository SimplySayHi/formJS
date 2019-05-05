
import { fieldsStringSelector, isDOMNode, mergeObjects, validateFormObjDefault } from './helper.js';
import { isValidField } from './isValidField.js';

export function isValidForm( fieldOptionsObj = {} ){

    const self = this,
          formEl = self.formEl;

    let obj = mergeObjects({}, validateFormObjDefault);

    if( !isDOMNode(formEl) || !formEl.matches('[novalidate]') ){
        obj.result = false;
        return obj;
    }
    
    let fieldOptions = mergeObjects( {}, self.options.fieldOptions, fieldOptionsObj, {focusOnRelated: false} ),
        currentFieldName = '',
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
