
export const minlength = function( value, $field ){
    return { result: value.length >= $field.minLength * 1 };
}
