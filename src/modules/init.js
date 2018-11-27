import { _initFieldsFirstLoad } from './initFieldsFirstLoad.js';

export function _init(){
    const self = this,
          formEl = self.formEl;

    if( !formEl || !formEl.matches('[novalidate]') ){ return false; }
    
    let fieldOptions = self.options.fieldOptions,
        formOptions = self.options.formOptions;

    // HANDLE FIELD VALIDATION
    if( fieldOptions.handleValidation ){
        // INIT FIELDS FOR FIRST LOAD
        _initFieldsFirstLoad.call(self, formEl, fieldOptions);
        
        // INIT EVENTS LISTENER
        fieldOptions.validateOnEvents.split(' ').forEach(function( eventName ){
            let useCapturing = (eventName === 'blur' ? true : false);
            formEl.addEventListener(eventName, self.listenerCallbacks.validation, useCapturing);
        });
        
        if( fieldOptions.strictHtmlValidation ){
            // VALIDATION WITH ATTRIBUTES LIKE HTML ONES ( ALSO FOR BUG FIXING, EG: maxlength IN ANDROID )
            formEl.addEventListener('keypress', self.listenerCallbacks.keypressMaxlength, false);
        }
        
        if( fieldOptions.preventPasteFields && formEl.querySelectorAll( fieldOptions.preventPasteFields ).length ){
            // INIT EVENT LISTENER FOR "PASTE" EVENT TO PREVENT IT ON SPECIFIED FIELDS
            formEl.addEventListener('paste', self.listenerCallbacks.pastePrevent, false);
        }
    }
    
    // HANDLE FORM SUBMIT
    if( formOptions.handleSubmit ){
        // INIT FORM SUBMIT ( DEFAULT AND AJAX )
        formEl.addEventListener('submit', self.listenerCallbacks.submit);

        if( formOptions.ajaxSubmit ){
            if( formEl.getAttribute('enctype') ){
                formOptions.ajaxOptions.contentType = formEl.getAttribute('enctype');
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