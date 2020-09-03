
export const pattern = function( value, fieldEl ){
    const obj = { result: new RegExp(fieldEl.pattern).test(value) };

    if( !obj.result ){
        obj.errors = { pattern: true };
    }

    return obj;
}
