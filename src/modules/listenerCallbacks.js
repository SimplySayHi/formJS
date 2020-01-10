
import { executeCallback, fieldsStringSelector, isFieldForChangeEvent } from './helpers';
import { submit } from './submit';

export const callbackFns = {

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
            executeCallback.call( self, {fn: fieldOptions.onPastePrevented, data: fieldEl} );
        }

    },

    submit: function( event ){
        submit.call( this, event );
    },

    validation: function( event ){

        const self = this,
              eventName = event.type,
              fieldEl = event.target;

        if( fieldEl.matches( fieldsStringSelector ) ){
            const isFieldForChangeEventBoolean = isFieldForChangeEvent(fieldEl),
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
                        findReqFromEl.required = fieldEl.required;
                        if( self.options.fieldOptions.focusOnRelated ){
                            findReqFromEl.focus();
                        }
                    }

                } else if( findReqMoreEl !== null ){

                    if( findReqFromEl !== null ){
                        findReqFromEl.required = findReqMoreEl.required && findReqMoreEl.checked;
                        findReqFromEl.value = '';
                    }

                }
            }

            // HANDLE data-required-from FIELDS
            if( isReqFrom ){
                if( isValidValue ){

                    let reqMoreEl = self.formEl.querySelector( fieldEl.getAttribute('data-required-from') );
                    reqMoreEl.checked = true;
                    fieldEl.required = reqMoreEl.required;
                }
            }
            
            if(
                (isFieldForChangeEventBoolean && eventName === 'change') ||
                (!isFieldForChangeEventBoolean && eventName !== 'change')
            ){
                
                return self.validateField( fieldEl ).then(obj => {
                    const type = obj.fieldEl.type,
                          realtedFieldEqualTo = obj.fieldEl.closest('form').querySelector('[data-equal-to="'+ obj.fieldEl.name +'"]');

                    if(
                        // FIELD IS ( required OR data-validate-if-filled ) AND RELATED FIELD data-equal-to HAS A VALUE
                        (obj.fieldEl.required || obj.fieldEl.matches('[data-validate-if-filled]')) && 
                        !(type === 'checkbox' || type === 'radio') && 
                        realtedFieldEqualTo && realtedFieldEqualTo.value.trim() !== ''
                    ){
                        return self.validateField( realtedFieldEqualTo );
                    } else {
                        return obj;
                    }
                });

            }
        }
        
    }

}
