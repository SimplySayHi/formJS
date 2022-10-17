
export const getJSONobjectFromFieldAttribute = ( $field, attrName ) => {
    const $customAttr = $field.closest(`[${attrName}]`)
    return ($customAttr && JSON.parse($customAttr.getAttribute(attrName))) || {}
}
