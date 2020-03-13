
import { customEvents } from './helpers';
import { listenerCallbacks } from './listenerCallbacks';

export function formStartup( formEl, options ){

    formEl.noValidate = true;

    let fieldOptions = options.fieldOptions,
        formOptions = options.formOptions;

    // HANDLE FIELD VALIDATION
    if( fieldOptions.handleValidation ){
        
        // VALIDATION WITH ATTRIBUTES LIKE HTML ONES ( ALSO FOR BUG FIXING, EG: maxlength IN ANDROID )
        if( fieldOptions.strictHtmlValidation ){
            
            // maxlength
            // MAXLENGTH IS BUGGY IN ANDROID BROWSERS
            formEl.addEventListener('keypress', listenerCallbacks.keypressMaxlength, false);

            // data-type="number"
            // SINCE VALIDATING type="number" WITH NON NUMERIC CHARS WILL RETURN EMPTY STRING IN SOME BROWSERS ( EG: FIREFOX )
            formEl.addEventListener('input', listenerCallbacks.dataTypeNumber, false);
            
        }
        
        if( fieldOptions.preventPasteFields && formEl.querySelectorAll( fieldOptions.preventPasteFields ).length ){
            // INIT EVENT LISTENER FOR "PASTE" EVENT TO PREVENT IT ON SPECIFIED FIELDS
            formEl.addEventListener('paste', listenerCallbacks.pastePrevent, false);
        }

        // INIT EVENTS LISTENER ( AS IN fieldOptions )
        fieldOptions.validateOnEvents.split(' ').forEach(function( eventName ){
            let useCapturing = (eventName === 'blur' ? true : false);
            formEl.addEventListener(eventName, listenerCallbacks.validation, useCapturing);
        });

        formEl.addEventListener(customEvents.field.validation, listenerCallbacks.validationEnd, false);

    }
    
    // HANDLE FORM SUBMIT
    if( formOptions.handleSubmit ){
        // INIT FORM SUBMIT ( DEFAULT AND AJAX )
        formEl.addEventListener('submit', listenerCallbacks.submit);

        if( formOptions.ajaxSubmit ){
            if( formEl.getAttribute('enctype') ){
                formOptions.ajaxOptions.headers['Content-Type'] = formEl.getAttribute('enctype');
            }

            if( formEl.getAttribute('method') ){
                formOptions.ajaxOptions.method = formEl.getAttribute('method').toUpperCase();
            }

            if( formEl.getAttribute('action') ){
                formOptions.ajaxOptions.url = formEl.getAttribute('action');
            }
        }
    }

}
