
export const checks = function( data ){
    try {
        let attrValue = JSON.parse(data.attrValue),
            fieldEl = data.fieldEl,
            formEl = fieldEl.closest('form'),
            checkedElLength = formEl.querySelectorAll('[name="' + fieldEl.name + '"]:checked').length,
            isMinOk = checkedElLength >= attrValue[0],
            isMaxOk = checkedElLength <= attrValue[1],
            obj = { result: isMinOk && isMaxOk };

        if( !obj.result ){
            obj.errors = { checks: true };
            if( !isMinOk ){ obj.errors.minChecks = true; }
            if( !isMaxOk ){ obj.errors.maxChecks = true; }
        }

        return obj;
    } catch(e){
        throw new Error('"data-checks" attribute is not a valid array!');
    }
}
