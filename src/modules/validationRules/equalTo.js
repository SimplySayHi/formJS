
export const equalTo = function( value, $field ){
    const $checkFrom = $field.form.querySelector( `[name="${$field.getAttribute('data-equal-to')}"]` )
    return { result: value === $checkFrom.value }
}
