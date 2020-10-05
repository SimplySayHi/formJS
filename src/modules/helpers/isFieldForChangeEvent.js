
export const isFieldForChangeEvent = $field => {
    return $field.matches('select, [type="radio"], [type="checkbox"], [type="file"]');
}
