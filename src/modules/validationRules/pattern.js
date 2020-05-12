
export const pattern = function( data ){
    let fieldEl = data.fieldEl,
        fieldPattern = fieldEl.pattern,
        fieldRegex = new RegExp( fieldPattern ),
        obj = { result: fieldRegex.test( fieldEl.value ) };

    if( !obj.result ){
        obj.errors = { pattern: true };
    }

    return obj;
}
