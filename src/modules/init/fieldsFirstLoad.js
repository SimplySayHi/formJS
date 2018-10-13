import { _fieldsStringSelector } from '../helper.js';

import { _checkDirtyField } from '../checkDirtyField.js';

export const _initFieldsFirstLoad = function( formEl, fieldOptions ){
    const self = this,
          formFields = formEl.querySelectorAll( _fieldsStringSelector )

    Array.from( formFields ).forEach(function( fieldEl ){
        const isCheckboxOrRadio = (fieldEl.type === 'checkbox' || fieldEl.type === 'radio');
        
        if( !isCheckboxOrRadio ){
            if( fieldOptions.checkDirtyField ){
                _checkDirtyField( fieldEl, fieldOptions.cssClasses.dirty );
            }

            if( fieldEl.matches('[data-char-count]') ){
                const _printCharLength = function( field ){
                        let usedChars = field.value.length;
                        field.closest('[data-formjs-question]').querySelector('[data-char-length]').textContent = usedChars;
                    };

                if( fieldEl.matches('[maxlength]') ){
                    let maxlength = fieldEl.getAttribute('maxlength');
                    fieldEl.closest('[data-formjs-question]').querySelector('[data-char-maxlength]').textContent = maxlength;
                }

                _printCharLength( fieldEl );

                fieldEl.addEventListener('input', function(){
                    _printCharLength( this );
                }, false);
            }

            if( fieldEl.type === 'file' && fieldOptions.maxFileSize > 0 ){
                if( formEl.querySelector('[data-max-file-size]') !== null ){
                    formEl.querySelector('[data-max-file-size]').textContent = fieldOptions.maxFileSize;
                }
            }
        }
        
        if(
            (!isCheckboxOrRadio && fieldEl.value) || 
            (isCheckboxOrRadio && fieldEl.closest('[data-formjs-question]').querySelectorAll(':checked').length > 0)
        ){
            if( isCheckboxOrRadio ){
                fieldEl = fieldEl.closest('[data-formjs-question]').querySelector(':checked');
            }
            self.isValidField( fieldEl, fieldOptions );
        }
    });
}