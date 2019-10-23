
import { fieldsStringSelector, getUniqueFields, isFieldForChangeEvent } from './helpers';

export const init = function(){

    const self = this,
          formEl = self.formEl,
          formFields = getUniqueFields( formEl.querySelectorAll( fieldsStringSelector ) ),
          fieldsLength = formFields.length;

    formFields.forEach(function( fieldEl, index ){
        const name = fieldEl.name,
              type = fieldEl.type;

        const isCheckboxOrRadio = (type === 'checkbox' || type === 'radio'),
              isFieldForChangeEventBoolean = isFieldForChangeEvent(fieldEl),
              fieldChecked = formEl.querySelector('[name="' + name + '"]:checked'),
              isReqFrom = fieldEl.matches('[data-required-from]'),
              reqMoreEl = (isReqFrom ? formEl.querySelector(fieldEl.getAttribute('data-required-from')) : null);

        if( fieldChecked ){
            fieldEl = fieldChecked;
        }
        
        // VALIDATE FIELD ( BY TRIGGERING THE validation CALLBACK ) IF IT ALREADY HAS A VALUE
        if(
            (!isCheckboxOrRadio && fieldEl.value) || 
            (isCheckboxOrRadio && fieldChecked !== null) ||
            (isReqFrom && reqMoreEl.checked)
        ){

            let fakeEventObj = { target: fieldEl, type: (isFieldForChangeEventBoolean ? 'change': '') };
            let callFormValidation = fieldsLength === index + 1;
            self.listenerCallbacks.validation.call( self, fakeEventObj, callFormValidation );

        }
    });

    self.isInitialized = true;

    return self;

}
