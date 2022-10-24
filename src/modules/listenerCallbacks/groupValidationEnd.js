
import { checkTouchedField, removeClass } from '../helpers';

export const groupValidationEnd = function( event ){

    const detail = event.detail;
    const { fieldOptions, formOptions } = event.target.formjs.options;

    if( detail.result ){
        event.target.formjs.currentGroup = detail.group.next;
    }

    if( detail.fields[0].isCheckingGroup ){
        detail.fields.forEach(({ $field }) => {
            checkTouchedField( $field, fieldOptions );
        });
    }

    if( !fieldOptions.skipUIfeedback ){
        removeClass( $form, formOptions.cssClasses.pending );
    }
    
}
