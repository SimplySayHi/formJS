
export const addClass = ( element, cssClasses ) => {
    cssClasses.split(' ').forEach(className => {
        element.classList.add( className );
    });
}
