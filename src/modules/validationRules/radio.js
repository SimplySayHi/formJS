
import { getFormFields } from '../helpers'

export const radio = function( value, $field ){
    const $fieldChecked = getFormFields($field.form).find( $el => $el.matches(`[name="${$field.name}"]:checked`) )
    const isValid = $fieldChecked !== null && $fieldChecked.value.trim().length > 0

    return { result: isValid }
}
