
export const exactLength = function( fieldEl ){
    try {
        let valueLength = fieldEl.value.length,
            exactLength = fieldEl.getAttribute('data-exact-length') * 1,
            obj = { result: !Number.isNaN(exactLength) && valueLength === exactLength };

        if( !obj.result ){
            obj.errors = { exactLength: true };
            if( valueLength < exactLength ){ obj.errors.minlength = true; }
            else { obj.errors.maxlength = true; }
        }

        return obj;
    }catch(e){
        throw new Error('"data-exact-length" attribute is not a number!');
    }
}
