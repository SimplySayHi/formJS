
import { addClass, customEvents, dispatchCustomEvent, removeClass, runFunctionsSequence } from '../helpers';
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

    instance.validateForm()
        .then(fields => {

            const beforeSendData = {
                stopExecution: false,
                formData: isAjaxForm ? instance.getFormData() : null
            };

            const rfsObject = {
                  functionsList: options.formOptions.beforeSend,
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
                dispatchCustomEvent( formEl, customEvents.form.submit, { detail: ajaxCall( formEl, formData, options ) } );
            }

        })
        .catch(fields => {
            eventPreventDefault();
            removeClass( formEl, formCssClasses.submit );
        });
    
}
