
import { isDOMNode } from './isDOMNode'

export const checkFormEl = form => {
    const isString = typeof form
    const isValidNodeSelector = isString === 'string' && isDOMNode(document.querySelector(form))
    const isFormSelector = isValidNodeSelector && document.querySelector(form).tagName.toLowerCase() === 'form'
    
    return {
        result: isDOMNode(form) || isFormSelector,
        $el: (isString === 'string' ? document.querySelector(form) : form)
    }
}
