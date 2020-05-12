
import { getSplitChar } from '../helpers';

export const max = function( data ){
    let fieldEl = data.fieldEl,
        isDate = (fieldEl.matches('[type="date"]') || fieldEl.matches('[data-subtype="date"]') || fieldEl.matches('[data-subtype="dateDDMMYYYY"]')),
        value = data.fieldEl.value,
        maxVal = data.attrValue;
    
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
