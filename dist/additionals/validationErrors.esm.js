
export const cap = function( string ){

    const obj = {};
    const strLength = string.length;
    
    if( strLength > 5 ){ obj.maxlength = true; }
    if( strLength > 0 && strLength < 5 ){ obj.minlength = true; }
    if( /[^0-9]/.test(string) ){ obj.invalidChars = true; }

    return obj;

}

export const email = function ( string ) {
    const obj = {};

    if( string.indexOf('@') === -1 ){

        // @ IS MISSING
        obj.missingAtChar = true;

    } else {

        const splitAt_at = string.split('@');
        if( splitAt_at[0].length === 0 ){

            // USER NAME IS MISSING
            obj.missingUserName = true;

        }

        if( splitAt_at[1].length === 0 ){

            // IS EMPTY AFTER @
            obj.missingDomain = true;
            obj.missingExtensionDot = true;
            obj.missingExtension = true;

        } else if( splitAt_at[1].indexOf('.') === -1 ) {

            // DOT IS MISSING
            obj.missingExtensionDot = true;
            obj.missingExtension = true;

        } else {

            // EXTENSION MISSING OR NOT LONG ENOUGH
            const splitAt_dot = splitAt_at[1].split('.'),
                  extLength = splitAt_dot[1].length;
            if( extLength === 0 ) {
                obj.missingExtension = true;
            } else if( extLength < 2 ){
                obj.minlengthExtension = true;
            }

        }
    }

    return obj;

}

export const password = function( string ){

    const obj = {};

    if( string.length < 8 ){ obj.minlength = true; }
    if( !/\d/.test(string) ){ obj.missingNumber = true; }
    if( !/[a-z]/.test(string) ){ obj.missingLowercase = true; }
    if( !/[A-Z]/.test(string) ){ obj.missingUppercase = true; }
    if( /[^0-9a-zA-Z]/.test(string) ){ obj.invalidChars = true; }

    return obj;

}

export const username = function( string ){

    const obj = {};
    const strLength = string.length;

    if( strLength < 3 ){ obj.minlength = true; }
    if( strLength > 24 ){ obj.maxlength = true; }
    if( /[^\w\-\.\@]/.test(string) ){ obj.invalidChars = true; }
    if( !/^[\w]/.test(string) ){ obj.invalidStartChar = true; }

    return obj;

}

export const vatNumber = function( string ){

    const obj = {};
    const strLength = string.length,
        indexOfIT = string.indexOf('IT'),
        checkLength = (indexOfIT === 0 ? 13 : 11);

    if( indexOfIT < 1 ){
        if( strLength < checkLength ){ obj.minlength = true; }
        else { obj.maxlength = true; }
    }

    return obj;

}
