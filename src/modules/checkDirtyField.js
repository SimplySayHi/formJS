import { _addClass, _isNodeList, _removeClass } from './helper.js';

export function _checkDirtyField( fields, cssClasses = '' ){ 
    var fields = (_isNodeList(fields) ? Array.from( fields ) : [fields]);
    
    fields.forEach(function(fieldEl){
        if( fieldEl.type !== 'checkbox' && fieldEl.type !== 'radio' ){
            let containerEl = fieldEl.closest('[data-formjs-question]') || fieldEl;

            if( fieldEl.value ){
                
                _addClass( containerEl, cssClasses );
                
            } else {
                
                _removeClass( containerEl, cssClasses );
                
            }
        }
    });
}