
import { getSplitChar } from '../helpers';

export const min = function( data ){
    let fieldEl = data.fieldEl,
        isDate = (fieldEl.matches('[type="date"]') || fieldEl.matches('[data-subtype="date"]') || fieldEl.matches('[data-subtype="dateDDMMYYYY"]')),
        value = data.fieldEl.value,
        minVal = data.attrValue;
    
    if( isDate ){
        let splitChar = getSplitChar( value );

        if( value.indexOf(splitChar) === 2 ){
            // DD MM YYYY
            value = value.split( splitChar ).reverse();
        } else {
            // YYYY MM DD
            value = value.split( splitChar );
        }

        value = value.join('');
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
