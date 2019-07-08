
import { isPlainObject, validateFormObjDefault } from './helper.js';
import { ajaxCall }     from './ajaxCall.js';
//import { ajaxCall }     from './ajaxCallXhr.js';

export function submit( event ){

    const self = this,
          options = self.options,
          isAjaxForm = options.formOptions.ajaxSubmit,
          formEl = self.formEl,
          btnEl = formEl.querySelector('[type="submit"]'),
          eventPreventDefault = ( enableBtn = true ) => {
              if( btnEl && enableBtn ){ btnEl.disabled = false; }
              if( event ){ event.preventDefault(); }
          };

    if( isAjaxForm ){
        eventPreventDefault(false);
    }

    if( btnEl ){
        if( btnEl.disabled ){
            eventPreventDefault(false);
            return false;
        }
        btnEl.disabled = true;
    }
    
    const handleValidation = options.fieldOptions.handleValidation,
          formValidationPromise = (handleValidation ? self.validateForm() : Promise.resolve(validateFormObjDefault));

    formValidationPromise.then(formValidation => {
        console.log(formValidation);
        if( !formValidation.result ){
            eventPreventDefault();
            return false;
        }
        
        let formDataObj = (isAjaxForm ? self.getFormData() : null),
            callbacksBeforeSend = options.formOptions.beforeSend,
            beforeSendData = { stopExecution: false },
            stopCallbackLoop = false;

        if( formDataObj ){
            beforeSendData.formData = formDataObj;
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
        
        if( isAjaxForm ){
            ajaxCall.call(self, formDataObj);
        }
    });
    
}
