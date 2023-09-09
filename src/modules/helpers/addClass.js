
export const addClass = ( element, cssClasses = '' ) => {
    element && element.classList.add( ...cssClasses.split(' ') )
}
