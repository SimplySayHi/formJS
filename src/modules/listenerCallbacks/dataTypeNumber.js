
export const dataTypeNumber = function( event ){

    const $field = event.target
    
    if( $field.matches('[data-type="number"]') ){
        const fieldValue = $field.value
        const hasInvalidChars = /[^\d.,+\-]/.test(fieldValue)
        
        if( hasInvalidChars ){
            event.stopImmediatePropagation()
            const valueReplaced = fieldValue.replace(/[^\d.,+\-]/g, '')
            $field.value = valueReplaced
        }
    }

}
