
export const pastePrevent = function( event ){

    const $field = event.target;
    const fieldOptions = $field.closest('form').formjs.options.fieldOptions;

    if( $field.matches( fieldOptions.preventPasteFields ) ){     
        event.preventDefault();
    }

}
