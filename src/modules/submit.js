
import { removeClass, runFunctionsSequence, validateFormObjDefault } from './helpers';
import { ajaxCall } from './ajaxCall';
//import { ajaxCall } from './ajaxCallXhr';

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

        let beforeSendData = { stopExecution: false, formData: {} };

        if( !formValidation.result ){
            eventPreventDefault();
            beforeSendData.stopExecution = true;
            return [beforeSendData];
        }
        
        let formDataObj = (isAjaxForm ? self.getFormData() : null),
            callbacksBeforeSend = options.formOptions.beforeSend;

        if( formDataObj ){
            beforeSendData.formData = formDataObj;
        }

        const rfsObject = {
            functionsList: callbacksBeforeSend,
            data: beforeSendData,
            stopConditionFn: function(data){ return data.stopExecution; }
        };
        return runFunctionsSequence.call(self, rfsObject);

    }).then(dataList => {

        if( dataList.filter(data => data.stopExecution).length > 0 ){
            eventPreventDefault();
            return false;
        }
        
        if( isAjaxForm ){

            const formData = dataList[dataList.length - 1].formData;
            const cssClasses = self.options.formOptions.cssClasses;
            removeClass( formEl, (cssClasses.ajaxComplete + ' ' + cssClasses.ajaxError + ' ' + cssClasses.ajaxSuccess) );
            formEl.classList.add( cssClasses.ajaxPending );

            ajaxCall.call(self, formData);
            
        }

    });
    
}
