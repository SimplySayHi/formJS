
import { addClass, checkDirtyField, isFieldForChangeEvent } from '../helpers';

export const beforeValidation = function beforeValidationDefault ( { $field, fieldOptions } ) {

    if( fieldOptions.trimValue && !isFieldForChangeEvent($field) ){
        $field.value = $field.value.trim();
    }

    checkDirtyField( $field, fieldOptions );

    if( !fieldOptions.skipUIfeedback ){
        addClass( $field.closest( fieldOptions.questionContainer ), fieldOptions.cssClasses.pending );
    }

}
