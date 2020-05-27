
export const requiredFrom = function( fieldEl ){
    let formEl = fieldEl.closest('form'),
        isValidValue = fieldEl.value.trim().length > 0,
        reqMoreEl = formEl.querySelector( fieldEl.getAttribute('data-required-from') ),
        checkedEl = formEl.querySelector( '[name="'+ reqMoreEl.name +'"]:checked' ),
        obj = { result: checkedEl !== null };

    if( reqMoreEl.checked && reqMoreEl.required ){
        obj.result = isValidValue;
    }

    if( !obj.result ){
        obj.errors = { requiredFrom: true };
    }
    
    return obj;
}
