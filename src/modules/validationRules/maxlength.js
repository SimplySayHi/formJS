
export const maxlength = function( fieldEl ){
    try {
        const obj = { result: fieldEl.value.length <= fieldEl.maxLength * 1 };

        if( !obj.result ){
            obj.errors = { maxlength: true };
        }

        return obj;
    }catch(e){
        throw new Error('"maxlength" is not a number!');
    }
}
