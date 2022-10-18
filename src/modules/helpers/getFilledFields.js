
import { fieldsStringSelector } from './fieldsStringSelector'
import { getUniqueFields } from './getUniqueFields'

export const getFilledFields = $form => {
    return getUniqueFields( $form.querySelectorAll(fieldsStringSelector) )
    .map($field => {

        const name = $field.name
        const type = $field.type
        const isCheckboxOrRadio = ['checkbox', 'radio'].includes(type)
        const fieldChecked = $form.querySelector(`[name="${name}"]:checked`)
        const isReqFrom = $field.matches('[data-required-from]')
        const $reqMore = (isReqFrom ? $form.querySelector($field.dataset.requiredFrom) : null)

        return (
            isCheckboxOrRadio ? (fieldChecked || null) :
            (isReqFrom && $reqMore.checked) || (!isReqFrom && $field.value) ? $field : null
        )

    })
    .filter($field => $field !== null)
}
