
export const pattern = function( value, fieldEl ){
    let fieldPattern = fieldEl.pattern,
        fieldRegex = new RegExp( fieldPattern ),
        obj = { result: fieldRegex.test( value ) };

    if( !obj.result ){
        obj.errors = { pattern: true };
    }

    return obj;
}
