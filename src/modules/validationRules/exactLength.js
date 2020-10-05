
export const exactLength = function( value, $field ){
    const valueLength = value.length,
          exactLength = $field.getAttribute('data-exact-length') * 1,
          obj = { result: valueLength === exactLength };

    if( !obj.result ){
        obj.errors = {};
        if( valueLength < exactLength ){ obj.errors.minlength = true; }
        else { obj.errors.maxlength = true; }
    }

    return obj;
}
