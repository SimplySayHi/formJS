
import { getFormFields } from '../helpers'
import { checks } from './checks'

export const checkbox = function( value, $field ){
    const $dataChecks = getFormFields($field.form).find( $el => $el.matches(`[name="${$field.name}"][data-checks]`) )
    return $dataChecks ? checks($dataChecks) : { result: $field.checked }
}
