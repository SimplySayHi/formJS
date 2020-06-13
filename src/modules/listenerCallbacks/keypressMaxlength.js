
export const keypressMaxlength = function( event ){

    const fieldEl = event.target;
    
    if( fieldEl.matches( '[maxlength]' ) ){
        const maxLength = fieldEl.maxLength * 1,
            keyPressed = event.which || event.keyCode,
            allowedKeys = [8, 37, 38, 39, 46];

        if( fieldEl.value.length >= maxLength && allowedKeys.indexOf(keyPressed) === -1 ){
            return false;
        }
    }

}
