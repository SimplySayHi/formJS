
export const pattern = function( value, fieldEl ){
    return { result: new RegExp(fieldEl.pattern).test(value) };
}
