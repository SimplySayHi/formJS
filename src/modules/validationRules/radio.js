
export const radio = function( data ){
    let fieldEl = data.fieldEl,
        fieldChecked = fieldEl.closest('form').querySelector( '[name="'+ fieldEl.name +'"]:checked' ),
        isValid = fieldChecked !== null && fieldChecked.value.trim().length > 0,
        obj = { result: isValid };

    return obj;
}
