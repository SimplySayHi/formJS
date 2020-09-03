
export const exactLength = function( value, fieldEl ){
    const valueLength = value.length,
          exactLength = fieldEl.getAttribute('data-exact-length') * 1,
          obj = { result: valueLength === exactLength };

    if( !obj.result ){
        obj.errors = {};
        if( valueLength < exactLength ){ obj.errors.minlength = true; }
        else { obj.errors.maxlength = true; }
    }

    return obj;
}
