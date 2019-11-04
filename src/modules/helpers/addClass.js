/**
 * @function addClass
 * @description Add provided CSS classes to provided HTMLElement
 * 
 * @param {HTMLElement} element HTMLelement to add classes to 
 * @param {String} cssClasses CSS to be added to the element, blank separated 
 */
export const addClass = (element, cssClasses) => {
    if (element && element.classList && element.classList.add) {
        cssClasses.trim()
            .split(' ')
            .filter(token => !!token)
            .forEach(function (className) {
                element.classList.add(className);
            });
    }
};