
export const radio = function( value, $field ){
    const $fieldChecked = $field.closest('form').querySelector( '[name="'+ $field.name +'"]:checked' ),
          isValid = $fieldChecked !== null && $fieldChecked.value.trim().length > 0;

    return { result: isValid };
}
