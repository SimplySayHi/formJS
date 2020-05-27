
import { getSplitChar } from '../helpers';

export const max = function( fieldEl ){
    let value = fieldEl.value,
        maxVal = fieldEl.max;
    
    //  if( fieldEl.type === 'date' || fieldEl.getAttribute('data-date-format') ){
    if( fieldEl.type === 'date' ){
        let splitChar = getSplitChar( value );
        value = value.split( splitChar ).join('');
        maxVal = maxVal.split('-').join('');
    }

    value = value * 1;
    maxVal = maxVal * 1;

    let obj = { result: value <= maxVal };

    if( !obj.result ){
        obj.errors = { max: true };
    }
    
    return obj;
}
