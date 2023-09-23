
export const removeClass = ( $el, cssClasses = '' ) => {
    $el && $el.classList.remove( ...cssClasses.split(' ') )
}
