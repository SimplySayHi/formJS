
import { customEvents } from './helpers';
import { 
    blurHandler,
    dataTypeNumber,
    formValidationEnd,
    groupValidationEnd,
    keypressMaxlength,
    pastePrevent,
    submit,
    validation, 
    validationEnd 
} from './listenerCallbacks';

export function formStartup( $form, options ){

    $form.noValidate = true;

    const fieldOptions = options.fieldOptions,
          formOptions = options.formOptions;
        
    // VALIDATION WITH ATTRIBUTES LIKE HTML ONES ( ALSO FOR BUG FIXING, EG: maxlength IN ANDROID )
    if( fieldOptions.strictHtmlValidation ){
        
        // maxlength
        // MAXLENGTH IS BUGGY IN ANDROID BROWSERS
        $form.addEventListener('keypress', keypressMaxlength, false);

        // data-type="number"
        // SINCE VALIDATING type="number" WITH NON NUMERIC CHARS WILL RETURN EMPTY STRING IN SOME BROWSERS ( EG: FIREFOX )
        $form.addEventListener('input', dataTypeNumber, false);
        
    }
    
    if( fieldOptions.preventPasteFields && $form.querySelectorAll( fieldOptions.preventPasteFields ).length ){
        // INIT EVENT LISTENER FOR "PASTE" EVENT TO PREVENT IT ON SPECIFIED FIELDS
        $form.addEventListener('paste', pastePrevent, false);
    }

    $form.addEventListener('blur', blurHandler, true);

    // INIT EVENTS LISTENER ( AS IN fieldOptions )
    fieldOptions.validateOnEvents.split(' ').forEach(eventName => {
        const useCapture = /^(blur|focus)$/.test(eventName);
        $form.addEventListener(eventName, validation, useCapture);
    });

    $form.addEventListener(customEvents.field.validation, validationEnd, false);
    if( formOptions.groups.length > 0 ){
        $form.addEventListener(customEvents.group.validation, groupValidationEnd, false);
    }
    $form.addEventListener(customEvents.form.validation, formValidationEnd, false);
    
    // HANDLE FORM SUBMIT
    if( formOptions.handleSubmit ){
        // INIT FORM SUBMIT ( DEFAULT AND AJAX )
        $form.addEventListener('submit', submit);

        if( formOptions.ajaxSubmit ){
            const enctype = $form.getAttribute('enctype')
            if( enctype && !enctype.includes('multipart/form-data') ){
                formOptions.ajaxOptions.headers['Content-Type'] = enctype;
            }

            const method = $form.getAttribute('method');
            if( method ){
                formOptions.ajaxOptions.method = method.toUpperCase();
            }

            const action = $form.getAttribute('action')
            if( action ){
                formOptions.ajaxOptions.url = action;
            }
        }
    }

}
