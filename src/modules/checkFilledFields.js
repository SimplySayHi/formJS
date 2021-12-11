
import { getFilledFields, mergeValidateFieldDefault } from './helpers';

export const checkFilledFields = $form => {

    const formFields = getFilledFields( $form );
    return Promise.all( formFields.map($field => {
        return $form.formjs.validateField( $field )
            .then(() => mergeValidateFieldDefault({ result: true, $field }))
            .catch(errors => mergeValidateFieldDefault({ $field, errors }));

    }) )

}
