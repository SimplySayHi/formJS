
import { isDOMNode } from './isDOMNode'

export const checkFormEl = form => {
    const formIsString = typeof form === 'string'
    const isValidNodeSelector = formIsString && isDOMNode(document.querySelector(form))
    const isFormSelector = isValidNodeSelector && document.querySelector(form).tagName.toLowerCase() === 'form'
    
    return {
        result: isDOMNode(form) || isFormSelector,
        $el: (formIsString ? document.querySelector(form) : form)
    }
}
