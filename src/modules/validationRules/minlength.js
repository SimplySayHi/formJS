
export const minlength = function( fieldEl ){
    try {
        const obj = { result: fieldEl.value.length >= fieldEl.minLength * 1 };

        if( !obj.result ){
            obj.errors = { minlength: true };
        }

        return obj;
    }catch(e){
        throw new Error('"minlength" is not a number!');
    }
}
