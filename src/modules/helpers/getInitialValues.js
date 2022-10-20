
import { excludeSelector } from './excludeSelector'

export const getInitialValues = $form => {
    const $fields = [...$form.querySelectorAll('input, select, textarea')].filter($el => $el.matches(excludeSelector))

    const data = $fields.reduce((accData, { tagName, type, name, value, checked, multiple, options }) => {
        const isCheckboxOrRadio = ['checkbox', 'radio'].includes(type)
        const isMultiCheckbox = type === 'checkbox' && $form.querySelectorAll(`[name="${name}"]`).length > 1

        if( typeof accData[name] !== 'undefined' && isCheckboxOrRadio && !checked ){
            return accData
        }
        
        if( typeof accData[name] === 'undefined' ){
            if( isCheckboxOrRadio && !checked ){
                accData[name] = isMultiCheckbox ? [] : null
                return accData
            }

            const isMultiSelect = tagName === 'SELECT' && multiple
            const multiSelectValues = options && [...options].filter(opt => opt.selected)
            accData[name] = isMultiSelect ? multiSelectValues : (isMultiCheckbox ? [value] : value)
        } else if( isMultiCheckbox ){
            accData[name].push(value)
        } else {
            accData[name] = value
        }

        return accData
    }, {})

    return data
}
