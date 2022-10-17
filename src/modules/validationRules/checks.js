
export const checks = function( $field ){
    const attrValue = JSON.parse( $field.getAttribute('data-checks') )
    const checkedLength = $field.form.querySelectorAll(`[name="${$field.name}"]:checked`).length
    const isMinOk = checkedLength >= attrValue[0]
    const isMaxOk = checkedLength <= attrValue[1]
    const obj = { result: isMinOk && isMaxOk }

    if( !obj.result ){
        obj.errors = { checks: true }
        if( !isMinOk ){ obj.errors.minChecks = true }
        if( !isMaxOk ){ obj.errors.maxChecks = true }
    }

    return obj
}
