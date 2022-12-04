
import { addClass, checkTouchedField, removeClass } from '../helpers';

export const formValidationEnd = function( event ){

    const { result, fields } = event.detail;
    const $form = event.target;
    const { fieldOptions, formOptions: { cssClasses } } = $form.formjs.options;

    if( fields[0].isCheckingForm ){
        fields.forEach(({ $field }) => {
            checkTouchedField( $field, fieldOptions );
        });
    } else {
        fields.forEach(({ $field }) => {
            removeClass( $field.closest(fieldOptions.questionContainer), fieldOptions.cssClasses.pending );
        });
    }

    if( !fieldOptions.skipUIfeedback ){
        const feedbackClassesKey = result ? 'valid' : 'error';
        removeClass( $form, (`${cssClasses.pending} ${cssClasses.valid} ${cssClasses.error}`) );
        addClass( $form, cssClasses[feedbackClassesKey] );
    }
    
}
