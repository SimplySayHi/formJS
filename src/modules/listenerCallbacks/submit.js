
import { addClass, customEvents, dispatchCustomEvent, getValidateFormDefault, removeClass, runFunctionsSequence } from '../helpers';
import { ajaxCall } from '../ajaxCall';

export function submit( event ){

    const formEl = event.target,
          instance = formEl.formjs,
          options = instance.options,
          formCssClasses = options.formOptions.cssClasses,
          isAjaxForm = options.formOptions.ajaxSubmit,
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

    removeClass( formEl, (formCssClasses.ajaxComplete + ' ' + formCssClasses.ajaxError + ' ' + formCssClasses.ajaxSuccess) );
    addClass( formEl, formCssClasses.submit );
    
    const handleValidation = options.fieldOptions.handleValidation,
          formValidationPromise = (handleValidation ? instance.validateForm() : Promise.resolve(getValidateFormDefault()));

    formValidationPromise.then(formValidation => {

        const beforeSendData = { stopExecution: false, formData: {} };

        if( !formValidation.result ){
            eventPreventDefault();
            removeClass( formEl, formCssClasses.submit );
            beforeSendData.stopExecution = true;
            return [beforeSendData];
        }
        
        const formDataObj = (isAjaxForm ? instance.getFormData() : null),
              callbacksBeforeSend = options.formOptions.beforeSend;

        if( formDataObj ){
            beforeSendData.formData = formDataObj;
        }

        const rfsObject = {
              functionsList: callbacksBeforeSend,
              data: beforeSendData,
              stopConditionFn: function(data){ return data.stopExecution; }
        };
        return runFunctionsSequence(rfsObject);

    }).then(dataList => {

        if( dataList.filter(data => data.stopExecution).length > 0 ){
            eventPreventDefault();
            return false;
        }
        
        if( isAjaxForm ){

            const formData = dataList.pop().formData;
            addClass( formEl, formCssClasses.ajaxPending );
            dispatchCustomEvent( formEl, customEvents.form.submit, ajaxCall( formEl, formData, options ) );
            
        }

    });
    
}
