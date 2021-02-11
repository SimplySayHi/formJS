
import { fieldsStringSelector, isFieldForChangeEvent } from '../helpers';

export const validation = function( event ){

    const isChangeEvent = event.type === 'change',
          fieldEl = event.target,
          self = fieldEl.closest('form').formjs;

    if( fieldEl.matches( fieldsStringSelector ) ){
        const isFieldForChangeEventBoolean = isFieldForChangeEvent(fieldEl);
        const hasOnlyChangeEvent = self.options.fieldOptions.validateOnEvents === 'change';
        
        if(
            (isFieldForChangeEventBoolean && isChangeEvent) ||
            (!isFieldForChangeEventBoolean && (!isChangeEvent || hasOnlyChangeEvent))
        ){
            
            return self.validateField( fieldEl ).then(obj => {
                const type = obj.fieldEl.type,
                      realtedFieldEqualTo = obj.fieldEl.closest('form').querySelector('[data-equal-to="'+ obj.fieldEl.name +'"]');

                if(
                    // FIELD IS ( required OR data-validate-if-filled ) AND RELATED FIELD data-equal-to HAS A VALUE
                    (obj.fieldEl.required || obj.fieldEl.matches('[data-validate-if-filled]')) && 
                    !(type === 'checkbox' || type === 'radio') && 
                    realtedFieldEqualTo && realtedFieldEqualTo.value.trim() !== ''
                ){
                    self.validateField( realtedFieldEqualTo );
                }

                return obj;
            });

        }
    }
    
}
