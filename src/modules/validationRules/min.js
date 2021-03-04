
import { getDateAsNumber } from '../helpers';

export const min = function( value, fieldEl ){
    let minVal = fieldEl.min;
    const dateFormat = fieldEl.getAttribute('data-date-format');
    
    if( fieldEl.type === 'date' || dateFormat ){
        value = getDateAsNumber( value, dateFormat );
        minVal = minVal.split('-').join('');
    }

    value = value * 1;
    minVal = minVal * 1;
    
    return { result: value >= minVal };
}
