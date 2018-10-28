import { _fieldsStringSelector } from './helper.js';

import { _checkDirtyField } from './checkDirtyField.js';

export const _initFieldsFirstLoad = function( formEl, fieldOptions ){
    const self = this,
          formFields = formEl.querySelectorAll( _fieldsStringSelector )

    Array.from( formFields ).forEach(function( fieldEl ){
        const isCheckboxOrRadio = (fieldEl.type === 'checkbox' || fieldEl.type === 'radio'),
              fieldChecked = self.formEl.querySelector('[name="' + fieldEl.name + '"]:checked');
        
        if( !isCheckboxOrRadio ){
            if( fieldOptions.checkDirtyField ){
                _checkDirtyField( fieldEl, fieldOptions.cssClasses.dirty );
            }

            if( fieldEl.matches('[data-char-count]') ){
                if( fieldEl.matches('[maxlength]') ){
                    let maxlength = fieldEl.getAttribute('maxlength');
                    fieldEl.closest('[data-formjs-question]').querySelector('[data-char-maxlength]').textContent = maxlength;
                }

                self.listenerCallbacks.charCount.call( fieldEl );
                fieldEl.addEventListener('input', self.listenerCallbacks.charCount, false);
            }

            if( fieldEl.type === 'file' && fieldOptions.maxFileSize > 0 ){
                if( formEl.querySelector('[data-max-file-size]') !== null ){
                    formEl.querySelector('[data-max-file-size]').textContent = fieldOptions.maxFileSize;
                }
            }
        }
        
        if(
            (!isCheckboxOrRadio && fieldEl.value) || 
            (isCheckboxOrRadio && fieldChecked !== null)
        ){
            if( isCheckboxOrRadio ){
                fieldEl = fieldChecked;
            }
            self.isValidField( fieldEl, fieldOptions );
        }
    });
}