
import { fieldsStringSelector, isFieldForChangeEvent } from '../helpers';

export const validation = function( event ){

    const isChangeEvent = event.type === 'change',
          $field = event.target,
          self = $field.closest('form').formjs;

    if( $field.matches( fieldsStringSelector ) ){
        const isFieldForChangeEventBoolean = isFieldForChangeEvent($field);
        const hasOnlyChangeEvent = self.options.fieldOptions.validateOnEvents === 'change';
        
        if(
            (isFieldForChangeEventBoolean && isChangeEvent) ||
            (!isFieldForChangeEventBoolean && (!isChangeEvent || hasOnlyChangeEvent))
        ){
            
            self.validateField( $field )
                .then(() => {
                    const type = $field.type;
                    const $relatedEqualTo = $field.closest('form').querySelector('[data-equal-to="'+ $field.name +'"]');

                    if(
                        // FIELD IS ( required OR data-validate-if-filled ) AND RELATED FIELD data-equal-to HAS A VALUE
                        ($field.required || $field.matches('[data-validate-if-filled]')) && 
                        !(type === 'checkbox' || type === 'radio') && 
                        $relatedEqualTo && $relatedEqualTo.value.trim() !== ''
                    ){
                        self.validateField( $relatedEqualTo ).catch(() => {});
                    }
                })
                .catch(() => {});

        }
    }
    
}
