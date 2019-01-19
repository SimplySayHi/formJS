import { _executeCallback, _fieldsStringSelector } from './helper.js';

export const init = function(){
    const self = this,
          fieldOptions = self.options.fieldOptions,
          formEl = self.formEl,
          formFields = formEl.querySelectorAll( _fieldsStringSelector );

    Array.from( formFields ).forEach(function( fieldEl ){
        const containerEl = fieldEl.closest('[data-formjs-question]'),
              isCheckboxOrRadio = (fieldEl.type === 'checkbox' || fieldEl.type === 'radio'),
              fieldChecked = formEl.querySelector('[name="' + fieldEl.name + '"]:checked'),
              isReqFrom = fieldEl.matches('[data-required-from]'),
              reqMoreEl = (isReqFrom ? formEl.querySelector(fieldEl.getAttribute('data-required-from')) : null);
        
        if( !isCheckboxOrRadio ){
            if( fieldEl.matches('[data-char-count]') ){
                // PRINT RELATED MAX LENGTH IN HTML
                if( fieldEl.matches('[maxlength]') && containerEl.querySelector('[data-char-maxlength]') ){
                    let maxlength = fieldEl.getAttribute('maxlength');
                    containerEl.querySelector('[data-char-maxlength]').textContent = maxlength;
                }

                // PRINT CHAR COUNT IN HTML
                self.listenerCallbacks.charCount.call( null, fieldEl );
            }

            // PRINT MAX FILE SIZE FOR INPUTS WITH type="file"
            if( fieldEl.type === 'file' && fieldOptions.maxFileSize > 0 ){
                if( containerEl && containerEl.querySelector('[data-max-file-size]') ){
                    containerEl.querySelector('[data-max-file-size]').textContent = fieldOptions.maxFileSize;
                }
            }
        }
        
        // VALIDATE FIELDS WITH SELECTED/INSERTED VALUE
        if(
            (!isCheckboxOrRadio && fieldEl.value) || 
            (isCheckboxOrRadio && fieldChecked !== null) ||
            (isReqFrom && reqMoreEl.checked)
        ){

            if( isCheckboxOrRadio ){
                fieldEl = fieldChecked;
            }

            const validationResult = self.isValidField( fieldEl ),
                  callbackData = [ { field: fieldEl, result: validationResult} ];

            _executeCallback.call( self, fieldOptions.onValidation, callbackData );

        }
    });
}