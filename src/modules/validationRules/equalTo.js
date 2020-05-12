
export const equalTo = function( data ){
    let fieldEl = data.fieldEl,
        formEl = fieldEl.closest('form'),
        checkFromEl = formEl.querySelector( '[name="' + fieldEl.getAttribute('data-equal-to') + '"]' ),
        obj = { result: fieldEl.value === checkFromEl.value };

    if( !obj.result ){
        obj.errors = { equalTo: true };
    }

    return obj;
}
