
import { getSplitChar } from '../helpers';

export const min = function( fieldEl ){
    let value = fieldEl.value,
        minVal = fieldEl.min;
    
    //  if( fieldEl.type === 'date' || fieldEl.getAttribute('data-date-format') ){
    if( fieldEl.type === 'date' ){
        let splitChar = getSplitChar( value );
        value = value.split( splitChar ).join('');
        minVal = minVal.split('-').join('');
    }

    value = value * 1;
    minVal = minVal * 1;

    let obj = { result: value >= minVal };

    if( !obj.result ){
        obj.errors = { min: true };
    }
    
    return obj;
}
