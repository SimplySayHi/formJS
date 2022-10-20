
import { addClass, checkDirtyField, checkModifiedField, isFieldForChangeEvent } from '../helpers';

export const beforeValidation = function beforeValidationDefault ( { $field, fieldOptions } ) {

    const initialValues = $field.form.formjs._.initialValues

    if( fieldOptions.trimValue && !isFieldForChangeEvent($field) ){
        $field.value = $field.value.trim();
    }

    checkDirtyField( $field, fieldOptions );
    checkModifiedField( $field, initialValues, fieldOptions );

    if( !fieldOptions.skipUIfeedback ){
        addClass( $field.closest( fieldOptions.questionContainer ), fieldOptions.cssClasses.pending );
    }

}
