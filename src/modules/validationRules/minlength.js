
export const minlength = function( value, fieldEl ){
    return { result: value.length >= fieldEl.minLength * 1 };
}
