
export const length = function( value, $field ){
    const valueL = value.length
    const attrValue = JSON.parse( $field.dataset.length )
    const isMinlengthOk = valueL >= attrValue[0]
    const isMaxlengthOk = valueL <= attrValue[1]
    const obj = { result: isMinlengthOk && isMaxlengthOk }

    if( !obj.result ){
        obj.errors = {}
        if( !isMinlengthOk ){ obj.errors.minlength = true }
        if( !isMaxlengthOk ){ obj.errors.maxlength = true }
    }

    return obj
}
