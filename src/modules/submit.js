
import { _executeCallback, _isPlainObject, _mergeObjects } from './helper.js';
import { _ajaxCall } from './ajaxCall.js';
//import { _ajaxCall } from './ajaxCallXhr.js';

export function submit( options = {}, event = null ){

    const self = this,
          formEl = self.formEl,
          eventPreventDefault = ( enableBtn = true ) => {
              if( btnEl && enableBtn ){ btnEl.disabled = false; }
              if( event ){ event.preventDefault(); }
          };
    
    options.fieldOptions = _mergeObjects( {}, (options.fieldOptions || {}), self.options.fieldOptions );
    options.formOptions = _mergeObjects( {}, (options.formOptions || {}), self.options.formOptions );
    
    const handleValidation = options.fieldOptions.handleValidation,
          formValidation = (handleValidation ? self.isValidForm( options ) : { result: true });

    const btnEl = formEl.querySelector('[type="submit"]'),
          isAjaxForm = options.formOptions.ajaxSubmit;
    
    if( handleValidation ){
        _executeCallback.call( self, options.fieldOptions.onValidation, formValidation.fields );
    }
    
    let formDataObj = (isAjaxForm ? self.getFormData() : null),
        callbacksBeforeSend = [],
        beforeSendOpt = options.formOptions.beforeSend;

    if( typeof beforeSendOpt === 'function' || Array.isArray(beforeSendOpt) ){
        let beforeSendData = {
                stopExecution: false
            },
            stopCallbackLoop = false;

        if( formDataObj ){
            beforeSendData.formData = formDataObj;
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
                    formDataObj = beforeSendFn.formData || formDataObj;
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
        _ajaxCall.call(self, formDataObj);

    } else if( !event ){

        // TRIGGER SUBMIT EVENT
        let submitEvent = new Event('submit', {'bubbles': true, 'cancelable': true});
        formEl.dispatchEvent(submitEvent);

    }
    
}
