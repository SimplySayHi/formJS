
export const addClass = ( element, cssClasses ) => {
    element.classList.add( ...cssClasses.split(' ') )
}
