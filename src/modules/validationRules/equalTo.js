
export const equalTo = function( value, $field ){
    const $checkFrom = $field.form.querySelector( `[name="${$field.dataset.equalTo}"]` )
    return { result: value === $checkFrom.value }
}
