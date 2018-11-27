import { _isPlainObject, _mergeObjects } from './helper.js';

import { _xhrCall } from './xhrCall.js';

export function submit( options = {}, event = null ){
    const self = this,
          formEl = self.formEl,
          eventPreventDefault = ( enableBtn = true ) => {
              if( btnEl && enableBtn ){ btnEl.disabled = false; }
              if( event ){ event.preventDefault(); }
          };
    
    options.fieldOptions = _mergeObjects( {}, (options.fieldOptions || {}), this.options.fieldOptions );
    options.formOptions = _mergeObjects( {}, (options.formOptions || {}), this.options.formOptions );
    
    const handleValidation = options.fieldOptions.handleValidation,
          formValidation = (handleValidation ? self.isValidForm( options ) : { result: true });

    const btnEl = formEl.querySelector('[type="submit"]'),
          isAjaxForm = options.formOptions.ajaxSubmit;
    
    if( handleValidation ){
        let callbacksValidation = [],
            onValidationOpt = options.fieldOptions.onValidation;

        if( typeof onValidationOpt === 'function' ){
            callbacksValidation.push( onValidationOpt );
        } else if( Array.isArray(onValidationOpt) ) {
            callbacksValidation = onValidationOpt;
        }

        callbacksValidation.forEach(function(cbFn){
            cbFn( formValidation.fields );
        });
    }
    
    let formDataJSON = (isAjaxForm ? self.getFormJSON() : null),
        callbacksBeforeSend = [],
        beforeSendOpt = options.formOptions.beforeSend;

    if( typeof beforeSendOpt === 'function' || Array.isArray(beforeSendOpt) ){
        let beforeSendData = {
                stopExecution: false
            };

        if( formDataJSON ){
            beforeSendData.formData = formDataJSON;
        }

        if( typeof beforeSendOpt === 'function' ){
            callbacksBeforeSend.push( beforeSendOpt );
        } else if( Array.isArray(beforeSendOpt) ) {
            callbacksBeforeSend = beforeSendOpt;
        }

        callbacksBeforeSend.forEach(function(cbFn){
            let beforeSendFn = cbFn.call( self, beforeSendData );
            
            if( _isPlainObject(beforeSendFn) ){
                formDataJSON = beforeSendFn.formData || formDataJSON;
                if( beforeSendFn.stopExecution ){
                    eventPreventDefault();
                    return false;
                }
            }
        });
    }

    if( !formValidation.result || (btnEl && btnEl.disabled) ){
        eventPreventDefault();
        return false;
    }

    if( btnEl ){
        btnEl.disabled = true;
    }
    
    if( isAjaxForm ){

        // AJAX FORM SUBMIT
        eventPreventDefault(false);
        _xhrCall.call( self, formDataJSON );

    } else if( !event ){

        // TRIGGER SUBMIT EVENT
        let submitEvent = new Event('submit', {'bubbles': true, 'cancelable': true});
        formEl.dispatchEvent(submitEvent);

    }
}