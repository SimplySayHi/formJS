import { _executeCallback, _isPlainObject, _mergeObjects } from './helper.js';

import { _xhrCall } from './xhrCall.js';

export function submit( options = {}, event = null ){
    const self = this,
          formEl = self.formEl,
          btnEl = formEl.querySelector('[type="submit"]'),
          eventPreventDefault = ( enableBtn = true ) => {
              if( btnEl && enableBtn ){ btnEl.disabled = false; }
              if( event ){ event.preventDefault(); }
          };

    if( btnEl ){
        if( btnEl.disabled ){
            eventPreventDefault(false);
            return false;
        }
        btnEl.disabled = true;
    }
    
    options.fieldOptions = _mergeObjects( {}, self.options.fieldOptions, options.fieldOptions || {} );
    options.formOptions = _mergeObjects( {}, self.options.formOptions, options.formOptions || {} );
    
    const isAjaxForm = options.formOptions.ajaxSubmit,
          handleValidation = options.fieldOptions.handleValidation,
          formValidation = (handleValidation ? self.isValidForm( options ) : { result: true });

    if( handleValidation ){
        _executeCallback.call( self, options.fieldOptions.onValidation, formValidation.fields );
    }

    if( !formValidation.result ){
        eventPreventDefault();
        return false;
    }
    
    let formDataJSON = (isAjaxForm ? self.getFormJSON() : null),
        callbacksBeforeSend = [],
        beforeSendOpt = options.formOptions.beforeSend;

    if( typeof beforeSendOpt === 'function' || Array.isArray(beforeSendOpt) ){
        let beforeSendData = {
                stopExecution: false
            },
            stopCallbackLoop = false;

        if( formDataJSON ){
            beforeSendData.formData = formDataJSON;
        }

        if( typeof beforeSendOpt === 'function' ){
            callbacksBeforeSend.push( beforeSendOpt );
        } else if( Array.isArray(beforeSendOpt) ) {
            callbacksBeforeSend = beforeSendOpt;
        }

        callbacksBeforeSend.forEach(function(cbFn){
            if( !stopCallbackLoop ){
                let beforeSendFn = cbFn.call( self, beforeSendData );
                
                if( _isPlainObject(beforeSendFn) ){
                    formDataJSON = beforeSendFn.formData || formDataJSON;
                    if( beforeSendFn.stopExecution ){
                        stopCallbackLoop = true;
                    }
                }
            }
        });

        if( stopCallbackLoop ){
            eventPreventDefault();
            return false;
        }
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