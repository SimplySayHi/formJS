
import { getFormFields } from './getFormFields'

export const getFilledFields = $form => {
    const $formFields = getFormFields($form, { unique: true, hidden: false })
    return $formFields.map($field => {

        const { dataset, name, type, value } = $field
        const isCheckboxOrRadio = ['checkbox', 'radio'].includes(type)
        const fieldChecked = $formFields.find($el => $el.matches(`[name="${name}"]:checked`))
        const isReqFrom = $field.matches('[data-required-from]')
        const $reqMore = (isReqFrom ? $formFields.find($el => $el.matches(dataset.requiredFrom)) : null)

        return (
            isCheckboxOrRadio ? (fieldChecked || null) :
            (isReqFrom && $reqMore.checked) || (!isReqFrom && value) ? $field : null
        )

    })
    .filter($field => $field !== null)
}
