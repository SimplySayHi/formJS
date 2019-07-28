
import { addClass, isNodeList, removeClass } from './helper.js';

export function checkDirtyField( fields, cssClasses = this.options.fieldOptions.cssClasses.dirty ){

    var fields = (isNodeList(fields) ? Array.from( fields ) : [fields]);
    
    fields.forEach(function(fieldEl){
        if( fieldEl.type !== 'checkbox' && fieldEl.type !== 'radio' ){
            let containerEl = fieldEl.closest('[data-formjs-question]') || fieldEl;

            if( fieldEl.value ){
                
                addClass( containerEl, cssClasses );
                
            } else {
                
                removeClass( containerEl, cssClasses );
                
            }
        }
    });
    
}
