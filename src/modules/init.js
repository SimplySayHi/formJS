
import { fieldsStringSelector, isFieldForChangeEvent } from './helper.js';

export const init = function(){

    const self = this,
          formEl = self.formEl,
          formFields = formEl.querySelectorAll( fieldsStringSelector );

    let currentFieldName = '',
        currentFieldType = '';

    let currentFieldName = '',
        currentFieldType = '';

    Array.from( formFields ).forEach(function( fieldEl ){
        const   name = fieldEl.name,
                type = fieldEl.type;
        
        // AVOID REPEATING VALIDATION IF THE FIELD HAS THE SAME NAME OF THE PREVIOUS ONE
        if( (name === currentFieldName && type === currentFieldType) ){ return true; }

        const isCheckboxOrRadio = (fieldEl.type === 'checkbox' || fieldEl.type === 'radio'),
              isFieldForChangeEventBoolean = isFieldForChangeEvent(fieldEl),
              fieldChecked = formEl.querySelector('[name="' + fieldEl.name + '"]:checked'),
              isReqFrom = fieldEl.matches('[data-required-from]'),
              reqMoreEl = (isReqFrom ? formEl.querySelector(fieldEl.getAttribute('data-required-from')) : null);

        if( !isReqFrom ){
            currentFieldName = name;
            currentFieldType = type;
        }
        
        // VALIDATE FIELD ( BY TRIGGERING THE validation CALLBACK ) IF IT ALREADY HAS A VALUE
        if(
            (!isCheckboxOrRadio && fieldEl.value) || 
            (isCheckboxOrRadio && fieldChecked !== null) ||
            (isReqFrom && reqMoreEl.checked)
        ){

            let fakeEventObj = { target: fieldEl, type: (isFieldForChangeEventBoolean ? 'change': '') };
            self.listenerCallbacks.validation.call( self, fakeEventObj );

        }
    });

    self.isInitialized = true;

    return self;

}
