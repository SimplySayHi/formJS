
export const removeClass = ( element, cssClasses ) => {
    cssClasses.split(' ').forEach(className => {
        element.classList.remove( className );
    });
}
