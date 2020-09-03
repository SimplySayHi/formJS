
import { checks } from './checks';

export const checkbox = function( value, fieldEl ){
    const dataChecksEl = fieldEl.closest('form').querySelector('[name="' + fieldEl.name + '"][data-checks]');
    return dataChecksEl ? checks(dataChecksEl) : { result: fieldEl.checked };
}
