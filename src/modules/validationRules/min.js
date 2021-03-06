
import { getDateAsNumber } from '../helpers';

export const min = function( value, $field ){
    let minVal = $field.min;
    const dateFormat = $field.getAttribute('data-date-format');
    
    if( $field.type === 'date' || dateFormat ){
        value = getDateAsNumber( value, dateFormat );
        minVal = minVal.split('-').join('');
    }

    value = value * 1;
    minVal = minVal * 1;
    
    return { result: value >= minVal };
}
