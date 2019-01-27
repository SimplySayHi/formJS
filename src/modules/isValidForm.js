
import { _fieldsStringSelector, _isDOMNode, _mergeObjects } from './helper.js';

export function isValidForm( options = {} ){

    const self = this,
          formEl = self.formEl;

    let obj = {
            fields: [],
            result: true
        };

    if( !_isDOMNode(formEl) || !formEl.matches('[novalidate]') ){
        obj.result = false;
        return obj;
    }
    
    var fieldOptions = _mergeObjects( {}, options.fieldOptions || {}, self.options.fieldOptions ),
        currentFieldName = '',
        currentFieldType = '';
    
    if( typeof fieldOptions.focusOnRelated === 'undefined' ){
        fieldOptions.focusOnRelated = false;
    }
    
    Array.from( formEl.querySelectorAll(_fieldsStringSelector) ).forEach(function( fieldEl ){
        let name = fieldEl.name,
            type = fieldEl.type,
            fieldData = {
                field: fieldEl,
                result: true
            };
        
        if( (name === currentFieldName && type === currentFieldType) ){ return true; }
        
        if( !fieldEl.matches('[data-required-from]') ){
            currentFieldName = name;
            currentFieldType = type;
        }
        
        const fieldResult = self.isValidField( fieldEl, fieldOptions );
        fieldData.result = fieldResult;

        if( !fieldResult ){
            obj.result = false;
        }
        
        obj.fields.push( fieldData );
    });
    
    return obj;

}
