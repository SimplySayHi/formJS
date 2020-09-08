
export const validationErrors = {

    email: function ( string ) {
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

}
