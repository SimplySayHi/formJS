
export const pattern = function( fieldEl ){
    try {
        let fieldPattern = fieldEl.pattern,
            fieldRegex = new RegExp( fieldPattern ),
            obj = { result: fieldRegex.test( fieldEl.value ) };

        if( !obj.result ){
            obj.errors = { pattern: true };
        }

        return obj;
    }catch(e){
        throw new Error('"pattern" is not a valid RegExp!');
    }
}
