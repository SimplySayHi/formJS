
export const minlength = function( data ){
    const obj = {
        result: data.fieldEl.value.length >= (data.attrValue * 1)
    };

    if( !obj.result ){
        obj.errors = { minlength: true };
    }

    return obj;
}
