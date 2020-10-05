
import { customEvents } from './helpers';
import { keypressMaxlength, dataTypeNumber, pastePrevent, submit, validation, validationEnd } from './listenerCallbacks';

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

    // INIT EVENTS LISTENER ( AS IN fieldOptions )
    fieldOptions.validateOnEvents.split(' ').forEach(eventName => {
        const useCapturing = eventName === 'blur' ? true : false;
        $form.addEventListener(eventName, validation, useCapturing);
    });

    $form.addEventListener(customEvents.field.validation, validationEnd, false);
    
    // HANDLE FORM SUBMIT
    if( formOptions.handleSubmit ){
        // INIT FORM SUBMIT ( DEFAULT AND AJAX )
        $form.addEventListener('submit', submit);

        if( formOptions.ajaxSubmit ){
            if( $form.getAttribute('enctype') ){
                formOptions.ajaxOptions.headers['Content-Type'] = $form.getAttribute('enctype');
            }

            if( $form.getAttribute('method') ){
                formOptions.ajaxOptions.method = $form.getAttribute('method').toUpperCase();
            }

            if( $form.getAttribute('action') ){
                formOptions.ajaxOptions.url = $form.getAttribute('action');
            }
        }
    }

}
