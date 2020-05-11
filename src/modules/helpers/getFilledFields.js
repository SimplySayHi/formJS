
import { fieldsStringSelector } from './fieldsStringSelector';
import { getUniqueFields } from './getUniqueFields';

export const getFilledFields = formEl => {
    return getUniqueFields( formEl.querySelectorAll(fieldsStringSelector) )
    .map(fieldEl => {

        const name = fieldEl.name,
              type = fieldEl.type,
              isCheckboxOrRadio = (type === 'checkbox' || type === 'radio'),
              fieldChecked = formEl.querySelector('[name="' + name + '"]:checked'),
              isReqFrom = fieldEl.matches('[data-required-from]'),
              reqMoreEl = (isReqFrom ? formEl.querySelector(fieldEl.getAttribute('data-required-from')) : null);

        return (
            isCheckboxOrRadio ? (fieldChecked || null) :
            (isReqFrom && reqMoreEl.checked) || (!isReqFrom && fieldEl.value) ? fieldEl : null
        );

    })
    .filter(fieldEl => fieldEl !== null);
}
