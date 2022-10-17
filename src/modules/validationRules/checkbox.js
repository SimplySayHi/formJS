
import { checks } from './checks'

export const checkbox = function( value, $field ){
    const $dataChecks = $field.form.querySelector(`[name="${$field.name}"][data-checks]`)
    return $dataChecks ? checks($dataChecks) : { result: $field.checked }
}
