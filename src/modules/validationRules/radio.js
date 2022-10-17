
export const radio = function( value, $field ){
    const $fieldChecked = $field.form.querySelector( `[name="${$field.name}"]:checked` )
    const isValid = $fieldChecked !== null && $fieldChecked.value.trim().length > 0

    return { result: isValid }
}
