
export const radio = function( value, fieldEl ){
    const fieldChecked = fieldEl.closest('form').querySelector( '[name="'+ fieldEl.name +'"]:checked' ),
          isValid = fieldChecked !== null && fieldChecked.value.trim().length > 0;

    return { result: isValid };
}
