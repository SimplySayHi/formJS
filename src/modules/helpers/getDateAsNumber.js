
import { getSplitChar } from './getSplitChar';

const formatMap = {
    'YYYY-MM-DD': function(dateArray){
        return dateArray;
    },
    'MM-DD-YYYY': function(dateArray){
        return [dateArray[2], dateArray[0], dateArray[1]];
    },
    'DD-MM-YYYY': function(dateArray){
        return dateArray.reverse();
    }
};

export const getDateAsNumber = ( dateString, dateFormat ) => {
    dateFormat = dateFormat || 'YYYY-MM-DD';
    const splitChar = getSplitChar(dateString);

    if( dateFormat.indexOf(splitChar) < 0 ){
        return;
    }

    dateFormat = dateFormat.replace(/[^YMD]/g, '-');
    dateString = dateString.split(splitChar);
    dateString = formatMap[dateFormat](dateString).join('');
    
    return dateString;
}
