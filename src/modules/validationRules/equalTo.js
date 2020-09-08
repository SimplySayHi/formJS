
export const equalTo = function( value, fieldEl ){
    const checkFromEl = fieldEl.closest('form').querySelector( '[name="' + fieldEl.getAttribute('data-equal-to') + '"]' );
    return { result: value === checkFromEl.value };
}
