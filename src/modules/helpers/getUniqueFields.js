
export const getUniqueFields = nodeList => {

    let currentFieldName = '',
        currentFieldType = '';

    return Array.from( nodeList ).filter(fieldEl => {
        const name = fieldEl.name,
              type = fieldEl.type;

        if( name === currentFieldName && type === currentFieldType ){
            return false;
        }
        
        if( !fieldEl.matches('[data-required-from]') ){
            currentFieldName = name;
            currentFieldType = type;
        }
        return true;
    });
    
}
