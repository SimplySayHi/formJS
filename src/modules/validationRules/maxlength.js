
export const maxlength = function( value, fieldEl ){
    const obj = { result: value.length <= fieldEl.maxLength * 1 };

    if( !obj.result ){
        obj.errors = { maxlength: true };
    }

    return obj;
}
