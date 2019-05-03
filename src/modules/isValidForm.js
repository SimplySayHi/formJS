
import { fieldsStringSelector, isDOMNode, mergeObjects, validateFormObjDefault } from './helper.js';

export function isValidForm( options = {} ){

    const self = this,
          formEl = self.formEl;

    let obj = mergeObjects({}, validateFormObjDefault);

    if( !isDOMNode(formEl) || !formEl.matches('[novalidate]') ){
        obj.result = false;
        return obj;
    }
    
    let fieldOptions = mergeObjects( {}, self.options.fieldOptions, options.fieldOptions ),
        currentFieldName = '',
        currentFieldType = '';
    
    if( typeof fieldOptions.focusOnRelated === 'undefined' ){
        fieldOptions.focusOnRelated = false;
    }
    
    Array.from( formEl.querySelectorAll(fieldsStringSelector) ).forEach(function( fieldEl ){
        let name = fieldEl.name,
            type = fieldEl.type,
            fieldData = {};
        
        if( (name === currentFieldName && type === currentFieldType) ){ return true; }
        
        if( !fieldEl.matches('[data-required-from]') ){
            currentFieldName = name;
            currentFieldType = type;
        }
        
        fieldData = self.isValidField( fieldEl, fieldOptions );

        if( !fieldData.result ){
            obj.result = false;
        }
        
        obj.fields.push( fieldData );
    });
    
    return obj;

}
