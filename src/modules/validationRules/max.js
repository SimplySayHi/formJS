
import { getDateAsNumber } from '../helpers';

export const max = function( value, fieldEl ){
    let maxVal = fieldEl.max,
        dateFormat = fieldEl.getAttribute('data-date-format');
    
    if( fieldEl.type === 'date' || dateFormat ){
        value = getDateAsNumber( value, dateFormat );
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
