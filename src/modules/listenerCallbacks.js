
import { addClass, fieldsStringSelector, isFieldForChangeEvent, removeClass } from './helpers';
import { submit } from './submit';

export const listenerCallbacks = {

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

        const fieldEl = event.target;
        let fieldOptions = fieldEl.closest('form').formjs.options.fieldOptions;

        if( fieldEl.matches( fieldOptions.preventPasteFields ) ){     
            event.preventDefault();
        }

    },

    submit: function( event ){
        submit(event);
    },

    validation: function( event ){

        const isChangeEvent = event.type === 'change',
              fieldEl = event.target,
              self = fieldEl.closest('form').formjs;

        if( fieldEl.matches( fieldsStringSelector ) ){
            const isFieldForChangeEventBoolean = isFieldForChangeEvent(fieldEl);
            
            if(
                (isFieldForChangeEventBoolean && isChangeEvent) ||
                (!isFieldForChangeEventBoolean && !isChangeEvent)
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
        
    },

    validationEnd: function( event ){

        const fieldsArray = event.data.fieldEl ? [event.data] : event.data.fields,
              options = fieldsArray[0].fieldEl.closest('form').formjs.options.fieldOptions;

        fieldsArray.forEach(function( obj ){
            let fieldEl = obj.fieldEl;
            if( fieldEl.matches( fieldsStringSelector ) ){
                let containerEl = fieldEl.closest('[data-formjs-question]'),
                    isReqFrom = fieldEl.matches('[data-required-from]'),
                    reqMoreEl = document.querySelector( fieldEl.getAttribute('data-required-from') );

                if( containerEl !== null ){
                    removeClass( containerEl, options.cssClasses.pending );
                }

                if( containerEl !== null && !options.skipUIfeedback ){

                    if( obj.result ){

                        if( !isReqFrom || (isReqFrom && reqMoreEl.checked) ){
                            // IF FIELD IS VALID
                            let errorClasses = options.cssClasses.error + ' ' + options.cssClasses.errorEmpty + ' ' + options.cssClasses.errorRule;
                            removeClass( containerEl, errorClasses );
                            addClass( containerEl, options.cssClasses.valid );
                        }

                    } else {

                        // IF FIELD IS NOT VALID
                        let extraErrorClass = options.cssClasses.errorRule;

                        // HANDLE CASE OF FIELD data-checks
                        let isChecks = fieldEl.matches('[data-checks]'),
                            checkedElLength = (isChecks ? containerEl.querySelectorAll('[name="' + fieldEl.name + '"]:checked').length : 0);

                        if( (!isChecks && (obj.errors && obj.errors.empty)) || (isChecks && checkedElLength === 0) ){
                            extraErrorClass = options.cssClasses.errorEmpty;
                        }

                        let errorClasses = options.cssClasses.error + ' ' + extraErrorClass,
                            errorClassToRemove = options.cssClasses.errorEmpty + ' ' + options.cssClasses.errorRule;
                        removeClass( containerEl, options.cssClasses.valid + ' ' + errorClassToRemove );
                        addClass( containerEl, errorClasses );

                    }
                }
            }
        });

    }

}
