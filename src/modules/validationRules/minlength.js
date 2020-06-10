
export const minlength = function( value, fieldEl ){
    const obj = { result: value.length >= fieldEl.minLength * 1 };

    if( !obj.result ){
        obj.errors = { minlength: true };
    }

    return obj;
}
