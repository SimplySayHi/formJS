
import { getDateAsNumber } from '../helpers';

export const min = function( value, fieldEl ){
    let minVal = fieldEl.min;
    const dateFormat = fieldEl.getAttribute('data-date-format');
    
    if( fieldEl.type === 'date' || fieldEl.getAttribute('data-date-format') ){
        value = getDateAsNumber( value, dateFormat );
        minVal = minVal.split('-').join('');
    }

    value = value * 1;
    minVal = minVal * 1;

    const obj = { result: value >= minVal };

    if( !obj.result ){
        obj.errors = { min: true };
    }
    
    return obj;
}
