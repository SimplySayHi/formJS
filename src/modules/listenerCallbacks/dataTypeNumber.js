
export const dataTypeNumber = function( event ){

    const $field = event.target;
    
    if( $field.matches('[data-type="number"]') ){
        let fieldValue = $field.value;
        const hasInvalidChars = /[^\d.,+-]/.test(fieldValue);
        
        if( hasInvalidChars ){
            event.stopImmediatePropagation();
            let valueReplaced = fieldValue.replace(/[^\d.,+-]/g, '');
            $field.value = valueReplaced;
        }
    }

}
