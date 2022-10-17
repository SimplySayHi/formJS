
export const getUniqueFields = $nodeList => {

    let currentFieldName = ''
    let currentFieldType = ''

    return Array.from( $nodeList ).filter($field => {
        const name = $field.name
        const type = $field.type

        if( name === currentFieldName && type === currentFieldType ){
            return false
        }
        
        if( !$field.matches('[data-required-from]') ){
            currentFieldName = name
            currentFieldType = type
        }
        
        return true
    })
    
}
