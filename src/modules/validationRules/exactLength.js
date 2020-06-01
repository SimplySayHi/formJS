
export const exactLength = function( fieldEl ){
    let valueLength = fieldEl.value.length,
        exactLength = fieldEl.getAttribute('data-exact-length') * 1,
        obj = { result: valueLength === exactLength };

    if( !obj.result ){
        obj.errors = { exactLength: true };
        if( valueLength < exactLength ){ obj.errors.minlength = true; }
        else { obj.errors.maxlength = true; }
    }

    return obj;
}
