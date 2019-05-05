
import { executeCallback, isPlainObject, mergeObjects } from './helper.js';
import { isValidForm }  from './isValidForm.js';
import { ajaxCall }     from './ajaxCall.js';
//import { ajaxCall }     from './ajaxCallXhr.js';

export function submit( options = {}, event = null ){

    const self = this,
          formEl = self.formEl,
          eventPreventDefault = ( enableBtn = true ) => {
              if( btnEl && enableBtn ){ btnEl.disabled = false; }
              if( event ){ event.preventDefault(); }
          };
    
    options.fieldOptions = mergeObjects( {}, self.options.fieldOptions, options.fieldOptions );
    options.formOptions = mergeObjects( {}, self.options.formOptions, options.formOptions );
    
    const handleValidation = options.fieldOptions.handleValidation,
          formValidation = (handleValidation ? isValidForm.call( self, options ) : { result: true });

    const btnEl = formEl.querySelector('[type="submit"]'),
          isAjaxForm = options.formOptions.ajaxSubmit;
    
    if( handleValidation ){
        executeCallback.call( self, options.fieldOptions.onValidation, formValidation.fields, options );
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
                let beforeSendFn = cbFn.call( self, beforeSendData, options );
                
                if( isPlainObject(beforeSendFn) ){
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
        ajaxCall.call(self, formDataObj, options);

    } else if( !event ){

        // TRIGGER SUBMIT EVENT
        let submitEvent = new Event('submit', {'bubbles': true, 'cancelable': true});
        formEl.dispatchEvent(submitEvent);

    }
    
}
