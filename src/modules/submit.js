
import { mergeObjects, validateFormObjDefault } from './helper';
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

        return callbacksBeforeSend.reduce(function(acc, cbFn){
            return acc.then(function (res) {
                let beforeSendDataNew = mergeObjects({}, res[res.length - 1]);
                if( beforeSendDataNew.stopExecution ){
                    return Promise.resolve(res);
                }
                return cbFn.call(self, beforeSendDataNew, options).then(function (result) {
                    res.push(result);
                    return res;
                });
            });
        }, Promise.resolve([beforeSendData]));

    }).then(dataList => {

        if( dataList.filter(data => data.stopExecution).length > 0 ){
            eventPreventDefault();
            return false;
        }
        
        if( isAjaxForm ){
            const formData = dataList[dataList.length - 1].formData;
            ajaxCall.call(self, formData);
        }

    });
    
}
