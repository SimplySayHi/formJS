
import { checkTouchedField } from '../helpers';

export const blurHandler = function( event ){

    const $field = event.target;
    const { fieldOptions } = $field.form.formjs.options;

    checkTouchedField( $field, fieldOptions );

}
