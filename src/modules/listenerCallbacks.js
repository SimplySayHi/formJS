
import { _executeCallback, _fieldsStringSelector } from './helper.js';

export const _callbackFns = {

    charCount: function( eventOrField ){

        const fieldEl = eventOrField.target || eventOrField;

        if( fieldEl.matches( '[data-char-count]' ) ){
            try {
                let charLengthEl = fieldEl.closest('[data-formjs-question]').querySelector('[data-char-length]');

                if( charLengthEl !== null ){
                    let usedChars = fieldEl.value.length;
                    charLengthEl.textContent = usedChars;
                }
            } catch (error) {}
        }

    },

    dataTypeNumber: function( event ){

        const fieldEl = event.target;
        
        if( fieldEl.matches('[data-type="number"]') ){
            let fieldValue = fieldEl.value,
                hasInvalidChars = /[^\d.,+\-]/.test(fieldValue);
            
            if( hasInvalidChars ){
                event.stopImmediatePropagation();
                let valueReplaced = fieldValue.replace(/[^\d.,+\-]/g, '');
                fieldEl.value = valueReplaced;
            }
        }

    },

    keypressMaxlength: function( event ){

        const fieldEl = event.target;
        
        if( fieldEl.matches( '[maxlength]' ) ){
            const maxLength = fieldEl.maxLength * 1,
                keyPressed = event.which || event.keyCode,
                allowedKeys = [8, 37, 38, 39, 46];

            if( fieldEl.value.length >= maxLength && allowedKeys.indexOf(keyPressed) === -1 ){
                return false;
            }
        }

    },

    pastePrevent: function( event ){

        const self = this,
              fieldEl = event.target;
        let fieldOptions = self.options.fieldOptions;

        if( fieldEl.matches( fieldOptions.preventPasteFields ) ){     
            event.preventDefault();
            _executeCallback.call( self, fieldOptions.onPastePrevented, fieldEl );
        }

    },

    submit: function( event ){
        this.submit( {}, event );
    },

    validation: function( event ){

        const self = this,
            eventName = event.type,
            fieldEl = event.target;

        if( fieldEl.matches( _fieldsStringSelector ) ){
            const isFieldForChangeEvent = fieldEl.matches( 'select, [type="radio"], [type="checkbox"], [type="file"]' ),
                isRadio = fieldEl.type === 'radio',
                isReqFrom = fieldEl.matches('[data-required-from]'),
                isReqMore = fieldEl.matches('[data-require-more]'),
                isValidValue = fieldEl.value.trim().length > 0;

            // HANDLE data-require-more FIELDS
            if( isRadio && eventName === 'change' ){
                let findReqMoreEl = (isReqMore ? fieldEl : self.formEl.querySelector('[name="'+ fieldEl.name +'"][data-require-more]')),
                    findReqFromEl = (findReqMoreEl !== null ? self.formEl.querySelector('[data-required-from="#'+ findReqMoreEl.id +'"]') : null);

                if( isReqMore ){

                    if( findReqFromEl !== null ){
                        if( fieldEl.required ){
                            findReqFromEl.required = true;
                        }
                        if( self.options.fieldOptions.focusOnRelated ){
                            findReqFromEl.focus();
                        }
                    }

                } else if( findReqMoreEl !== null ){

                    if( findReqFromEl !== null ){
                        findReqFromEl.required = false;
                        findReqFromEl.value = '';
                    }

                }
            }

            // HANDLE data-required-from FIELDS
            if( isReqFrom ){
                if( isValidValue ){

                    let reqMoreEl = self.formEl.querySelector( fieldEl.getAttribute('data-required-from') );
                    reqMoreEl.checked = true;

                    if( reqMoreEl.required ){
                        fieldEl.required = true;
                    }
                }
            }
            
            if(
                (isFieldForChangeEvent && eventName === 'change') ||
                (!isFieldForChangeEvent && eventName !== 'change')
            ){
                
                self.validateField( fieldEl );

            }
        }
        
    }

};
