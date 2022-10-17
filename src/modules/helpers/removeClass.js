
export const removeClass = ( element, cssClasses ) => {
    element.classList.remove( ...cssClasses.split(' ') )
}
