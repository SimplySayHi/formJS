
import { fieldsStringSelector, mergeValidateFieldDefault, isFieldForChangeEvent } from '../helpers';

export const validation = function( event ){

    const isChangeEvent = event.type === 'change',
          $field = event.target,
          self = $field.closest('form').formjs;

    if( $field.matches( fieldsStringSelector ) ){
        const isFieldForChangeEventBoolean = isFieldForChangeEvent($field);
        
        if(
            (isFieldForChangeEventBoolean && isChangeEvent) ||
            (!isFieldForChangeEventBoolean && !isChangeEvent)
        ){
            
            return self.validateField( $field )
                .then(() => {
                    const type = $field.type,
                          $realtedEqualTo = $field.closest('form').querySelector('[data-equal-to="'+ $field.name +'"]');

                    if(
                        // FIELD IS ( required OR data-validate-if-filled ) AND RELATED FIELD data-equal-to HAS A VALUE
                        ($field.required || $field.matches('[data-validate-if-filled]')) && 
                        !(type === 'checkbox' || type === 'radio') && 
                        $realtedEqualTo && $realtedEqualTo.value.trim() !== ''
                    ){
                        self.validateField( $realtedEqualTo ).catch(errors => {});
                    }

                    return mergeValidateFieldDefault({ result: true, $field });
                })
                .catch(errors => mergeValidateFieldDefault({$field, errors}));

        }
    }
    
}
