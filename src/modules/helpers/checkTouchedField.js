
import { addClass } from './addClass';

export const checkTouchedField = ( $field, fieldOptions ) => {

    const $container = $field.closest( fieldOptions.questionContainer ) || $field;
    addClass( $container, fieldOptions.cssClasses.touched );
    
}
