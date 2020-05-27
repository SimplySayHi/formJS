
export const checks = function( fieldEl ){
    try {
        let attrValue = JSON.parse( fieldEl.getAttribute('data-checks') ),
            checkedElLength = fieldEl.closest('form').querySelectorAll('[name="' + fieldEl.name + '"]:checked').length,
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
