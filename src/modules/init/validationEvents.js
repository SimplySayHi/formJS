import { _fieldsStringSelector } from '../helper.js';

export function _initValidationEvents( formEl, fieldOptions ){
    const self = this;

    fieldOptions.validateOnEvents.split(' ').forEach(function( eventName ){
        let useCapturing = (eventName === 'blur' ? true : false);
        
        formEl.addEventListener(eventName, function( event ){
            const fieldEl = event.target;

            if( fieldEl.matches( _fieldsStringSelector ) ){
                const isFieldForChangeEvent = fieldEl.matches( 'select, [type="radio"], [type="checkbox"]' );
                
                if(
                    (isFieldForChangeEvent && eventName === 'change') ||
                    (!isFieldForChangeEvent && eventName === 'input') ||
                    (eventName !== 'change' && eventName !== 'input')
                ){
                    
                    const validationResult = self.isValidField( fieldEl, fieldOptions );
                    if( typeof fieldOptions.onValidation === 'function' ){
                        
                        const callbackData = [ { field: fieldEl, result: validationResult} ];
                        
                        fieldOptions.onValidation( callbackData );
                        
                    }
                    
                }
            }
        }, useCapturing);
    });
}