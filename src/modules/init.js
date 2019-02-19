
import { _fieldsStringSelector } from './helper.js';

export const init = function(){

    const self = this,
          formEl = self.formEl,
          formFields = formEl.querySelectorAll( _fieldsStringSelector );

    Array.from( formFields ).forEach(function( fieldEl ){
        const isCheckboxOrRadio = (fieldEl.type === 'checkbox' || fieldEl.type === 'radio'),
              fieldChecked = formEl.querySelector('[name="' + fieldEl.name + '"]:checked'),
              isReqFrom = fieldEl.matches('[data-required-from]'),
              reqMoreEl = (isReqFrom ? formEl.querySelector(fieldEl.getAttribute('data-required-from')) : null);
        
        // VALIDATE FIELDS IF THEY ALREADY HAVE A VALUE
        if(
            (!isCheckboxOrRadio && fieldEl.value) || 
            (isCheckboxOrRadio && fieldChecked !== null) ||
            (isReqFrom && reqMoreEl.checked)
        ){

            if( isCheckboxOrRadio ){
                fieldEl = fieldChecked;
            }

            self.validateField( fieldEl );

        }
    });

    self.isInitialized = true;

    return self;

}
