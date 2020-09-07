
import { fieldsStringSelector, mergeValidateFieldDefault, isFieldForChangeEvent } from '../helpers';

export const validation = function( event ){

    const isChangeEvent = event.type === 'change',
          fieldEl = event.target,
          self = fieldEl.closest('form').formjs;

    if( fieldEl.matches( fieldsStringSelector ) ){
        const isFieldForChangeEventBoolean = isFieldForChangeEvent(fieldEl);
        
        if(
            (isFieldForChangeEventBoolean && isChangeEvent) ||
            (!isFieldForChangeEventBoolean && !isChangeEvent)
        ){
            
            return self.validateField( fieldEl )
                .then(() => {
                    const type = fieldEl.type,
                          realtedFieldEqualTo = fieldEl.closest('form').querySelector('[data-equal-to="'+ fieldEl.name +'"]');

                    if(
                        // FIELD IS ( required OR data-validate-if-filled ) AND RELATED FIELD data-equal-to HAS A VALUE
                        (fieldEl.required || fieldEl.matches('[data-validate-if-filled]')) && 
                        !(type === 'checkbox' || type === 'radio') && 
                        realtedFieldEqualTo && realtedFieldEqualTo.value.trim() !== ''
                    ){
                        self.validateField( realtedFieldEqualTo ).catch(errors => {});
                    }

                    return mergeValidateFieldDefault({ result: true, fieldEl });
                })
                .catch(errors => mergeValidateFieldDefault({fieldEl, errors}));

        }
    }
    
}
