
export const length = function( data ){
    try {
        let valueL = data.fieldEl.value.length,
            attrValue = JSON.parse(data.attrValue),
            isMinlengthOk = valueL >= attrValue[0],
            isMaxlengthOk = valueL <= attrValue[1],
            obj = { result: isMinlengthOk && isMaxlengthOk };

        if( !obj.result ){
            obj.errors = { stringLength: true };
            if( !isMinlengthOk ){ obj.errors.minlength = true; }
            if( !isMaxlengthOk ){ obj.errors.maxlength = true; }
        }

        return obj;
    } catch(e){
        throw new Error('"data-length" attribute is not a valid array!');
    }
}
