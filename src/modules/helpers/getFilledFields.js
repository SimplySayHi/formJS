
import { getFormFields } from './getFormFields'

export const getFilledFields = $form => {
    const $formFields = getFormFields($form, { unique: true, hidden: false })
    return $formFields.map($field => {

        const name = $field.name
        const type = $field.type
        const isCheckboxOrRadio = ['checkbox', 'radio'].includes(type)
        const fieldChecked = $formFields.find($el => $el.matches(`[name="${name}"]:checked`))
        const isReqFrom = $field.matches('[data-required-from]')
        const $reqMore = (isReqFrom ? $formFields.find($el => $el.matches($field.dataset.requiredFrom)) : null)

        return (
            isCheckboxOrRadio ? (fieldChecked || null) :
            (isReqFrom && $reqMore.checked) || (!isReqFrom && $field.value) ? $field : null
        )

    })
    .filter($field => $field !== null)
}
