
export const exactLength = function( data ){
    let valueLength = data.fieldEl.value.length,
        exactLength = (data.attrValue * 1),
        obj = { result: valueLength === exactLength };

    if( !obj.result ){
        obj.errors = { exactLength: true };
        if( valueLength < exactLength ){ obj.errors.minlength = true; }
        else { obj.errors.maxlength = true; }
    }

    return obj;
}
