
export const keypressMaxlength = function( event ){

    const $field = event.target
    
    if( $field.matches( '[maxlength]' ) ){
        const maxLength = $field.maxLength * 1
        const keyPressed = event.which || event.keyCode
        const allowedKeys = [8, 37, 38, 39, 46]

        if( $field.value.length >= maxLength && allowedKeys.indexOf(keyPressed) === -1 ){
            return false
        }
    }

}
