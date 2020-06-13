
export const pastePrevent = function( event ){

    const fieldEl = event.target;
    let fieldOptions = fieldEl.closest('form').formjs.options.fieldOptions;

    if( fieldEl.matches( fieldOptions.preventPasteFields ) ){     
        event.preventDefault();
    }

}
