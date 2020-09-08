
export const maxlength = function( value, fieldEl ){
    return { result: value.length <= fieldEl.maxLength * 1 };
}
