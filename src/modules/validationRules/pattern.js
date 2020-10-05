
export const pattern = function( value, $field ){
    return { result: new RegExp($field.pattern).test(value) };
}
