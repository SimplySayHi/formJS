
import { isDOMNode } from './isDOMNode'

export const checkFormEl = form => {
    const typeofForm = typeof form
    const isValidNodeSelector = typeofForm === 'string' && isDOMNode(document.querySelector(form))
    const isFormSelector = isValidNodeSelector && document.querySelector(form).tagName.toLowerCase() === 'form'
    
    return {
        result: isDOMNode(form) || isFormSelector,
        $el: (typeofForm === 'string' ? document.querySelector(form) : form)
    }
}
