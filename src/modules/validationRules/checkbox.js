
import { checks } from './checks';

export const checkbox = function( data ){
    let formEl = data.fieldEl.closest('form'),
        dataChecksEl = formEl.querySelector('[name="' + data.fieldEl.name + '"][data-checks]'),
        obj = { result: data.fieldEl.checked };

    if( dataChecksEl !== null ){
        obj = checks({ attrValue: dataChecksEl.getAttribute('data-checks'), fieldEl: dataChecksEl});
    }

    return obj;
}
