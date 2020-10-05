
export const length = function( value, $field ){
    const valueL = value.length,
          attrValue = JSON.parse( $field.getAttribute('data-length') ),
          isMinlengthOk = valueL >= attrValue[0],
          isMaxlengthOk = valueL <= attrValue[1],
          obj = { result: isMinlengthOk && isMaxlengthOk };

    if( !obj.result ){
        obj.errors = {};
        if( !isMinlengthOk ){ obj.errors.minlength = true; }
        if( !isMaxlengthOk ){ obj.errors.maxlength = true; }
    }

    return obj;
}
