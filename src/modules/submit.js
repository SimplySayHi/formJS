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
    
    const formValidation = self.isValidForm( options ),
          btnEl = formEl.querySelector('[type="submit"]'),
          isAjaxForm = options.formOptions.ajaxSubmit;
    
    if( typeof options.fieldOptions.onValidation === 'function' ){
        options.fieldOptions.onValidation( formValidation.fields );
    }
    
    let formDataJSON = (isAjaxForm ? self.getFormJSON() : null);
    
    if( typeof options.formOptions.beforeSend === 'function' ){
        let beforeSendData = {
                stopExecution: false
            };

        if( formDataJSON ){
            beforeSendData.formData = formDataJSON;
        }

        let beforeSendFn = options.formOptions.beforeSend.call( self, beforeSendData );
        
        if( _isPlainObject(beforeSendFn) ){
            formDataJSON = beforeSendFn.formData || formDataJSON;
            if( beforeSendFn.stopExecution ){
                eventPreventDefault();
                return false;
            }
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
        _xhrCall.call( self, formDataJSON, options );

    } else if( !event ){

        // TRIGGER SUBMIT EVENT
        let submitEvent = new Event('submit', {'bubbles': true, 'cancelable': true});
        formEl.dispatchEvent(submitEvent);

    }
}