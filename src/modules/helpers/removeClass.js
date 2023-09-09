
export const removeClass = ( element, cssClasses = '' ) => {
    element && element.classList.remove( ...cssClasses.split(' ') )
}
