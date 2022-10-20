
import { checkTouchedField } from '../helpers';

export const formValidationEnd = function( event ){
    const $form = event.target;
    const options = $form.formjs.options;
    
    if( !options.fieldOptions.skipUIfeedback ){
        const clMethodName = event.detail.result ? 'add' : 'remove';
        $form.classList[clMethodName]( options.formOptions.cssClasses.valid );
    }

    if( event.detail.fields[0].isCheckingForm ){
        event.detail.fields.forEach(({ $field }) => {
            checkTouchedField( $field, options.fieldOptions );
        });
    }
}
