import { _addClass, _isNodeList, _removeClass } from './helper.js';

export function _checkDirtyField( fields, cssClass ){ 
    var fields = (_isNodeList(fields) ? Array.from( fields ) : [fields]),
        cssClasses = cssClass || defaultFieldOptions.cssClasses.dirty;
    
    fields.forEach(function(field){
        if( field.type !== 'checkbox' && field.type !== 'radio' ){
            if( field.value ){
                
                _addClass( field, cssClasses );
                
            } else {
                
                _removeClass( field, cssClasses );
                
            }
        }
    });
}