
import { customEvents } from './helpers';

export function formStartup(){

    const self = this,
          formEl = self.formEl;

    formEl.noValidate = true;

    let fieldOptions = self.options.fieldOptions,
        formOptions = self.options.formOptions;

    // HANDLE FIELD VALIDATION
    if( fieldOptions.handleValidation ){
        
        // VALIDATION WITH ATTRIBUTES LIKE HTML ONES ( ALSO FOR BUG FIXING, EG: maxlength IN ANDROID )
        if( fieldOptions.strictHtmlValidation ){
            
            // maxlength
            // MAXLENGTH IS BUGGY IN ANDROID BROWSERS
            formEl.addEventListener('keypress', self.listenerCallbacks.keypressMaxlength, false);

            // data-type="number"
            // SINCE VALIDATING type="number" WITH NON NUMERIC CHARS WILL RETURN EMPTY STRING IN SOME BROWSERS ( EG: FIREFOX )
            formEl.addEventListener('input', self.listenerCallbacks.dataTypeNumber, false);
            
        }
        
        if( fieldOptions.preventPasteFields && formEl.querySelectorAll( fieldOptions.preventPasteFields ).length ){
            // INIT EVENT LISTENER FOR "PASTE" EVENT TO PREVENT IT ON SPECIFIED FIELDS
            formEl.addEventListener('paste', self.listenerCallbacks.pastePrevent, false);
        }

        // INIT EVENTS LISTENER ( AS IN fieldOptions )
        fieldOptions.validateOnEvents.split(' ').forEach(function( eventName ){
            let useCapturing = (eventName === 'blur' ? true : false);
            formEl.addEventListener(eventName, self.listenerCallbacks.validation, useCapturing);
        });

        formEl.addEventListener(customEvents.field.validation, self.listenerCallbacks.validationEnd, false);

    }
    
    // HANDLE FORM SUBMIT
    if( formOptions.handleSubmit ){
        // INIT FORM SUBMIT ( DEFAULT AND AJAX )
        formEl.addEventListener('submit', self.listenerCallbacks.submit);

        if( formOptions.ajaxSubmit ){
            if( formEl.getAttribute('enctype') ){

                // FOR XMLHttpRequest API
                formOptions.ajaxOptions.contentType = formEl.getAttribute('enctype');

                // FOR fetch API
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
