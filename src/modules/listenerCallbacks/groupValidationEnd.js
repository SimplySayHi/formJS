
import { addClass, checkTouchedField, removeClass } from '../helpers';

export const groupValidationEnd = function( event ){

    const $form = event.target;
    const detail = event.detail;
    const { fieldOptions, formOptions } = $form.formjs.options;

    if( detail.result ){
        $form.formjs.currentGroup = detail.group.next;
    }

    if( detail.fields[0].isCheckingGroup ){
        detail.fields.forEach(({ $field }) => {
            checkTouchedField( $field, fieldOptions );
        });
    }

    if( !fieldOptions.skipUIfeedback ){
        removeClass( $form, (`${formOptions.cssClasses.pending} ${formOptions.cssClasses.valid} ${formOptions.cssClasses.error}`) );

        const feedbackClassesKey = !detail.result ? 'error' : (!detail.group.next ? 'valid' : '');
        if( feedbackClassesKey ){
            addClass( $form, formOptions.cssClasses[feedbackClassesKey] );
        }
    }
    
}
