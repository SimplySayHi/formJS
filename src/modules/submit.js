
import { isPlainObject, validateFormObjDefault } from './helper.js';
import { ajaxCall }     from './ajaxCall.js';
//import { ajaxCall }     from './ajaxCallXhr.js';

export function submit( event ){

    const self = this,
          options = self.options,
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
    
    const isAjaxForm = options.formOptions.ajaxSubmit,
          handleValidation = options.fieldOptions.handleValidation,
          formValidation = (handleValidation ? self.validateForm( options.fieldOptions ) : validateFormObjDefault);

    if( !formValidation.result ){
        eventPreventDefault();
        return false;
    }
    
    let formDataObj = (isAjaxForm ? self.getFormData() : null),
        callbacksBeforeSend = [],
        beforeSendOpt = options.formOptions.beforeSend;

    if( typeof beforeSendOpt === 'function' || Array.isArray(beforeSendOpt) ){
        let beforeSendData = { stopExecution: false },
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
    
    if( isAjaxForm ){
        eventPreventDefault(false);
        ajaxCall.call(self, formDataObj);
    }
    
}
