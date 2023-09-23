
export const addClass = ( $el, cssClasses = '' ) => {
    $el && $el.classList.add( ...cssClasses.split(' ') )
}
