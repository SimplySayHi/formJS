
import { addClass } from './addClass'
import { isNodeList } from './isNodeList'
import { removeClass } from './removeClass'

export const checkDirtyField = ( $fields, fieldOptions ) => {

    const $fieldsNew = isNodeList($fields) ? Array.from( $fields ) : [$fields]

    $fieldsNew.forEach($field => {
        const isNotCheckboxOrRadio = !['checkbox', 'radio'].includes($field.type)
        if( isNotCheckboxOrRadio ){
            const $container = $field.closest( fieldOptions.questionContainer ) || $field
            if( $field.value ){
                addClass( $container, fieldOptions.cssClasses.dirty )
            } else {
                removeClass( $container, fieldOptions.cssClasses.dirty )
            }
        }
    })
    
}
