
import { getFormFields } from '../helpers'

export const equalTo = function( value, $field ){
    const $checkFrom = getFormFields($field.form).find( $el => $el.matches(`[name="${$field.dataset.equalTo}"]`) )
    return { result: value === $checkFrom.value }
}
