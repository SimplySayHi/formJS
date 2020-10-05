
import { addClass } from './addClass';
import { isNodeList } from './isNodeList';
import { removeClass } from './removeClass';

export const checkDirtyField = ( $fields, fieldOptions ) => {

    $fields = isNodeList($fields) ? Array.from( $fields ) : [$fields];
    $fields.forEach($field => {
        if( $field.type !== 'checkbox' && $field.type !== 'radio' ){
            const $container = $field.closest( fieldOptions.questionContainer ) || $field;
            if( $field.value ){
                addClass( $container, fieldOptions.cssClasses.dirty );
            } else {
                removeClass( $container, fieldOptions.cssClasses.dirty );
            }
        }
    });
    
}
