
import { fieldsStringSelector } from './fieldsStringSelector';
import { getUniqueFields } from './getUniqueFields';

export const getFilledFields = $form => {
    return getUniqueFields( $form.querySelectorAll(fieldsStringSelector) )
    .map($field => {

        const name = $field.name,
              type = $field.type,
              isCheckboxOrRadio = type === 'checkbox' || type === 'radio',
              fieldChecked = $form.querySelector('[name="' + name + '"]:checked'),
              isReqFrom = $field.matches('[data-required-from]'),
              $reqMore = (isReqFrom ? $form.querySelector($field.getAttribute('data-required-from')) : null);

        return (
            isCheckboxOrRadio ? (fieldChecked || null) :
            (isReqFrom && $reqMore.checked) || (!isReqFrom && $field.value) ? $field : null
        );

    })
    .filter($field => $field !== null);
}
