
import { getUniqueFields } from './getUniqueFields'

// TO SIMULATE fieldsStringSelector => { hidden: false }
// TO SIMULATE excludeSelector ( USED IN METHOD getFormData ) => { file: false, excludeData: false } => ':not([type="reset"]):not([type="submit"]):not([type="button"]):not([type="file"]):not([data-exclude-data])'
export const getFormFields = ( $form, { unique = false, hidden = true, file = true, excludeData = true } = {} ) => {
    const BASIC_SELECTOR = 'select, textarea, input:not([type="reset"]):not([type="submit"]):not([type="button"])'
    const FIELDS_SELECTOR = `${BASIC_SELECTOR}${hidden ? '' : ':not([type="hidden"])'}${file ? '' : ':not([type="file"])'}${excludeData ? '' : ':not([data-exclude-data])'}`
    
    const $fields = unique ? getUniqueFields($form.elements) : Array.from($form.elements)

    return $fields.filter( $el => $el.matches( FIELDS_SELECTOR ) )
}
