
export const minlength = function( fieldEl ){
    const obj = { result: fieldEl.value.length >= fieldEl.minLength * 1 };

    if( !obj.result ){
        obj.errors = { minlength: true };
    }

    return obj;
}
