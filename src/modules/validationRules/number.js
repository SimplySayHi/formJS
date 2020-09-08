
/*
    ALL NUMBERS ( INTEGERS AND FLOATING )
    VALID NUMBERS: 123 | 123.456 | .123
*/

export const number = function( string ){
    return {
        result: /[+-]?([0-9]*[.])?[0-9]+/.test( string )
    };
}