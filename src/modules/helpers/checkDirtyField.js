
import { addClass } from './addClass';
import { isNodeList } from './isNodeList';
import { removeClass } from './removeClass';

export const checkDirtyField = ( fields, cssClasses ) => {

    var fields = (isNodeList(fields) ? Array.from( fields ) : [fields]);
    
    fields.forEach(fieldEl => {
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
