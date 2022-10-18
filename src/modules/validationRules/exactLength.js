
export const exactLength = function( value, $field ){
    const valueLength = value.length
    const exactLength = $field.dataset.exactLength * 1
    const obj = { result: valueLength === exactLength }

    if( !obj.result ){
        obj.errors = {}
        if( valueLength < exactLength ){ obj.errors.minlength = true }
        else { obj.errors.maxlength = true }
    }

    return obj
}
