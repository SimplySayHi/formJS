
export const getJSONobjectFromFieldAttribute = ( fieldEl, attrName ) => {
    const customAttrEl = fieldEl.closest('['+ attrName +']');
    return (customAttrEl && JSON.parse(customAttrEl.getAttribute(attrName))) || {};
}
