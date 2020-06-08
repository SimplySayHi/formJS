
import { addClass } from './addClass';
import { isNodeList } from './isNodeList';
import { removeClass } from './removeClass';

export const checkDirtyField = ( fields, fieldOptions ) => {

    fields = isNodeList(fields) ? Array.from( fields ) : [fields];
    fields.forEach(fieldEl => {
        if( fieldEl.type !== 'checkbox' && fieldEl.type !== 'radio' ){
            const containerEl = fieldEl.closest( fieldOptions.questionContainer ) || fieldEl;
            if( fieldEl.value ){
                addClass( containerEl, fieldOptions.cssClasses.dirty );
            } else {
                removeClass( containerEl, fieldOptions.cssClasses.dirty );
            }
        }
    });
    
}
