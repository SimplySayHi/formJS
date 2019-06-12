
export function formStartup(){

    const self = this,
          formEl = self.formEl;

    if( !formEl.matches('[novalidate]') ){ return null; }

    let fieldOptions = self.options.fieldOptions,
        formOptions = self.options.formOptions;

    // INIT FORM UTILITIES - START
    let charLengthElems = formEl.querySelectorAll('[data-char-length]');
    if( charLengthElems.length > 0 ){
        Array.from( charLengthElems ).forEach(function( element ){
            try {
                let containerEl = element.closest('[data-formjs-question]'),
                    fieldEl = containerEl.querySelector('[data-char-count]');

                if( fieldEl !== null && fieldEl.matches('[maxlength]') ){
                    // PRINT RELATED MAX LENGTH IN HTML
                    let maxlength = fieldEl.getAttribute('maxlength');
                    containerEl.querySelector('[data-char-maxlength]').textContent = maxlength;
                }

                // PRINT CHAR COUNT IN HTML
                self.listenerCallbacks.charCount.call( null, fieldEl );
            } catch (error) {}
        });
        if( formEl.querySelectorAll('[data-char-count]').length > 0 ){
            // INIT EVENT LISTENER FOR FIELDS WITH "data-char-count" ATTRIBUTE
            formEl.addEventListener('input', self.listenerCallbacks.charCount, false);
        }
    }

    if( fieldOptions.maxFileSize > 0 ){
        let maxFileSizeElems = formEl.querySelectorAll('[data-max-file-size]');
        if( maxFileSizeElems.length > 0 ){
            Array.from( maxFileSizeElems ).forEach(function( element ){
                try {
                    let fieldEl = element.closest('[data-formjs-question]').querySelector('[type="file"]');

                    if( fieldEl !== null ){
                        // PRINT MAX FILE SIZE FOR INPUTS WITH type="file"
                        element.textContent = fieldOptions.maxFileSize;
                    }
                } catch (error) {}
            });
        }
    }
    // INIT FORM UTILITIES - END

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
