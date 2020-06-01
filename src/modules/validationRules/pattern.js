
export const pattern = function( fieldEl ){
    let fieldPattern = fieldEl.pattern,
        fieldRegex = new RegExp( fieldPattern ),
        obj = { result: fieldRegex.test( fieldEl.value ) };

    if( !obj.result ){
        obj.errors = { pattern: true };
    }

    return obj;
}
