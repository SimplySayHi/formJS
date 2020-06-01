
export const equalTo = function( fieldEl ){
    let checkFromEl = fieldEl.closest('form').querySelector( '[name="' + fieldEl.getAttribute('data-equal-to') + '"]' ),
        obj = { result: fieldEl.value === checkFromEl.value };

    if( !obj.result ){
        obj.errors = { equalTo: true };
    }

    return obj;
}
