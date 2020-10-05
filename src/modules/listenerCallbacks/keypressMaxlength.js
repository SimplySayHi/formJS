
export const keypressMaxlength = function( event ){

    const $field = event.target;
    
    if( $field.matches( '[maxlength]' ) ){
        const maxLength = $field.maxLength * 1,
              keyPressed = event.which || event.keyCode,
              allowedKeys = [8, 37, 38, 39, 46];

        if( $field.value.length >= maxLength && allowedKeys.indexOf(keyPressed) === -1 ){
            return false;
        }
    }

}
