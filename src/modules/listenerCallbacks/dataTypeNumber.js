
export const dataTypeNumber = function( event ){

    const fieldEl = event.target;
    
    if( fieldEl.matches('[data-type="number"]') ){
        let fieldValue = fieldEl.value;
        const hasInvalidChars = /[^\d.,+\-]/.test(fieldValue);
        
        if( hasInvalidChars ){
            event.stopImmediatePropagation();
            let valueReplaced = fieldValue.replace(/[^\d.,+\-]/g, '');
            fieldEl.value = valueReplaced;
        }
    }

}
