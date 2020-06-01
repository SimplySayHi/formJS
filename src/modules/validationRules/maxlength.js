
export const maxlength = function( fieldEl ){
    const obj = { result: fieldEl.value.length <= fieldEl.maxLength * 1 };

    if( !obj.result ){
        obj.errors = { maxlength: true };
    }

    return obj;
}
