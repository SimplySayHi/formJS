
import { addClass, customEvents, dispatchCustomEvent, removeClass, runFunctionsSequence } from '../helpers';
import { ajaxCall } from '../ajaxCall';

export function submit( event ){

    const $form = event.target,
          instance = $form.formjs,
          options = instance.options,
          formCssClasses = options.formOptions.cssClasses,
          isAjaxForm = options.formOptions.ajaxSubmit,
          $btn = $form.querySelector('[type="submit"]'),
          eventPreventDefault = ( enableBtn = true ) => {
              if( $btn && enableBtn ){ $btn.disabled = false; }
              if( event ){ event.preventDefault(); }
          };

    if( isAjaxForm ){
        eventPreventDefault(false);
    }

    if( $btn ){
        if( $btn.disabled ){
            eventPreventDefault(false);
            return false;
        }
        $btn.disabled = true;
    }

    removeClass( $form, (formCssClasses.ajaxComplete + ' ' + formCssClasses.ajaxError + ' ' + formCssClasses.ajaxSuccess) );

    instance.validateForm()
        .then(data => {
            
            const hasGroup = typeof data.group !== 'undefined';

            if( hasGroup && !data.canSubmit ){
                return [{ stopExecution: true }]
            }

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

            if( dataList.some(({stopExecution}) => stopExecution) ){
                eventPreventDefault();
                return false;
            }

            addClass( $form, formCssClasses.submit );
            
            if( isAjaxForm ){
                const formData = dataList.pop().formData;
                addClass( $form, formCssClasses.ajaxPending );
                dispatchCustomEvent( $form, customEvents.form.submit, { detail: ajaxCall( $form, formData, options ) } );
            }

        })
        .catch(() => {
            eventPreventDefault();
            removeClass( $form, formCssClasses.submit );
        });
    
}
