import { _fieldsStringSelector } from './helper.js';

export const 

_charCountCallback = function(){
    let field = this,
        usedChars = field.value.length;

    field.closest('[data-formjs-question]').querySelector('[data-char-length]').textContent = usedChars;
},

_keypressMaxlengthCallback = function( event ){
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

_pastePreventCallback = function( event ){
    const fieldEl = event.target;
    let fieldOptions = this.options.fieldOptions;

    if( fieldEl.matches( fieldOptions.preventPasteFields ) ){
        let callbacks = [],
            functionOpt = fieldOptions.onPastePrevented;

        event.preventDefault();

        if( typeof functionOpt === 'function' ){
            callbacks.push( functionOpt );
        } else if( Array.isArray(functionOpt) ) {
            callbacks = functionOpt;
        }

        callbacks.forEach(function(cbFn){
            cbFn( fieldEl );
        });
    }
},

_submitCallback = function( event ){
    const self = this;
    self.submit( self.options, event );
},

_validationCallback = function( event ){
    const self = this,
          eventName = event.type,
          fieldEl = event.target;

    let fieldOptions = self.options.fieldOptions;

    if( fieldEl.matches( _fieldsStringSelector ) ){
        const isFieldForChangeEvent = fieldEl.matches( 'select, [type="radio"], [type="checkbox"], [type="file"]' );
        
        if(
            (isFieldForChangeEvent && eventName === 'change') ||
            (!isFieldForChangeEvent && eventName === 'input') ||
            (eventName !== 'change' && eventName !== 'input')
        ){
            
            let callbacks = [],
                onValidationOpt = fieldOptions.onValidation;

            const validationResult = self.isValidField( fieldEl, fieldOptions );
            const callbackData = [ { field: fieldEl, result: validationResult} ];

            if( typeof onValidationOpt === 'function' ){
                callbacks.push( onValidationOpt );
            } else if( Array.isArray(onValidationOpt) ) {
                callbacks = onValidationOpt;
            }

            callbacks.forEach(function(cbFn){
                cbFn( callbackData );
            });
        }
    }
};