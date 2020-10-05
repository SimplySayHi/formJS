
import { getDateAsNumber } from '../helpers';

export const max = function( value, $field ){
    let maxVal = $field.max;
    const dateFormat = $field.getAttribute('data-date-format');
    
    if( $field.type === 'date' || dateFormat ){
        value = getDateAsNumber( value, dateFormat );
        maxVal = maxVal.split('-').join('');
    }

    value = value * 1;
    maxVal = maxVal * 1;
    
    return { result: value <= maxVal };
}
