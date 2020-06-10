
export const equalTo = function( value, fieldEl ){
    let checkFromEl = fieldEl.closest('form').querySelector( '[name="' + fieldEl.getAttribute('data-equal-to') + '"]' ),
        obj = { result: value === checkFromEl.value };

    if( !obj.result ){
        obj.errors = { equalTo: true };
    }

    return obj;
}
