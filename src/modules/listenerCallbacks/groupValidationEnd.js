
import { addClass, checkTouchedField, removeClass } from '../helpers';

export const groupValidationEnd = function( event ){

    const $form = event.target;
    const { result, group, fields } = event.detail;
    const { fieldOptions, formOptions } = $form.formjs.options;

    if( result ){
        $form.formjs.currentGroup = group.next;
    }

    if( fields[0].isCheckingGroup ){
        fields.forEach(({ $field }) => {
            checkTouchedField( $field, fieldOptions );
        });
    } else {
        fields.forEach(({ $field }) => {
            removeClass( $field.closest(fieldOptions.questionContainer), fieldOptions.cssClasses.pending );
        });
    }

    if( !fieldOptions.skipUIfeedback ){
        removeClass( $form, (`${formOptions.cssClasses.pending} ${formOptions.cssClasses.valid} ${formOptions.cssClasses.error}`) );

        const feedbackClassesKey = !result ? 'error' : (!group.next ? 'valid' : '');
        if( feedbackClassesKey ){
            addClass( $form, formOptions.cssClasses[feedbackClassesKey] );
        }
    }
    
}
