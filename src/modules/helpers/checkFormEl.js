
import { isDOMNode } from './isDOMNode';

export const checkFormEl = form => {
    let isString = typeof form,
        isValidNodeSelector = isString === 'string' && isDOMNode(document.querySelector(form)),
        isFormSelector = isValidNodeSelector && document.querySelector(form).tagName.toLowerCase() === 'form',
        obj = {
            result: isDOMNode(form) || isFormSelector,
            $el: (isString === 'string' ? document.querySelector(form) : form)
        };

    return obj;
}
