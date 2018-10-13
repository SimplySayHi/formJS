import { _fieldsStringSelector, _mergeObjects } from './helper.js';

export function isValidForm( options = {} ){
    const self = this,
          formEl = self.formEl;

    if( formEl === null || !formEl.matches('[novalidate]') ){ return false; }
    
    var fieldOptions = _mergeObjects( {}, options.fieldOptions || {}, self.options.fieldOptions ),
        obj = {
            fields: [],
            result: true
        },
        fieldName = '',
        fieldType = '';
    
    if( typeof fieldOptions.focusOnRelated === 'undefined' ){
        fieldOptions.focusOnRelated = false;
    }
    
    Array.from( formEl.querySelectorAll( _fieldsStringSelector ) ).forEach(function( fieldEl ){
        let name = fieldEl.name,
            type = fieldEl.type,
            fieldData = {
                field: fieldEl,
                result: true
            };
        
        if( (name === fieldName && type === fieldType) ){ return true; }
            
        if( !fieldEl.matches('[data-required-from]') ){
            fieldName = name;
            fieldType = type;
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