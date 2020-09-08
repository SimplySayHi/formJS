
export const length = function( value, fieldEl ){
    const valueL = value.length,
          attrValue = JSON.parse( fieldEl.getAttribute('data-length') ),
          isMinlengthOk = valueL >= attrValue[0],
          isMaxlengthOk = valueL <= attrValue[1],
          obj = { result: isMinlengthOk && isMaxlengthOk };

    if( !obj.result ){
        obj.errors = { stringLength: true };
        if( !isMinlengthOk ){ obj.errors.minlength = true; }
        if( !isMaxlengthOk ){ obj.errors.maxlength = true; }
    }

    return obj;
}
