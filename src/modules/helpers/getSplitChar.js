
export const getSplitChar = string => {
    let splitChar = '.';

    if( string.indexOf(splitChar) === -1 ){
        if( string.indexOf('-') >= 0 ){
            splitChar = '-';
        } else if( string.indexOf('/') >= 0 ){
            splitChar = '/';
        }
    }

    return splitChar;
}
