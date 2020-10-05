
import { checks } from './checks';

export const checkbox = function( value, $field ){
    const $dataChecks = $field.closest('form').querySelector('[name="' + $field.name + '"][data-checks]');
    return $dataChecks ? checks($dataChecks) : { result: $field.checked };
}
