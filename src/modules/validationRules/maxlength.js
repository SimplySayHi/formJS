
export const maxlength = function( value, $field ){
    return { result: value.length <= $field.maxLength * 1 };
}
