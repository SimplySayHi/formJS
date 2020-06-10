
export const requiredFrom = function( value ){
    return {
        result: value.trim().length > 0
    };
}
