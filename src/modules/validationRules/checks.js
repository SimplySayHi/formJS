
import { getFormFields } from '../helpers'

export const checks = function( $field ){
    const attrValue = JSON.parse( $field.dataset.checks )
    const checkedLength = getFormFields($field.form).filter($el => $el.matches(`[name="${$field.name}"]:checked`)).length
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
