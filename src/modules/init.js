
import { _fieldsStringSelector, _isFieldForChangeEvent } from './helper.js';

export const init = function(){

    const self = this,
          formEl = self.formEl,
          formFields = formEl.querySelectorAll( _fieldsStringSelector );

    let currentFieldName = '',
        currentFieldType = '';

    Array.from( formFields ).forEach(function( fieldEl ){
        const   name = fieldEl.name,
                type = fieldEl.type;
        
        // AVOID REPEATING VALIDATION IF THE FIELD HAS THE SAME NAME OF THE PREVIOUS ONE
        if( (name === currentFieldName && type === currentFieldType) ){ return true; }

        const isCheckboxOrRadio = (fieldEl.type === 'checkbox' || fieldEl.type === 'radio'),
              isFieldForChangeEvent = _isFieldForChangeEvent(fieldEl),
              fieldChecked = formEl.querySelector('[name="' + fieldEl.name + '"]:checked'),
              isReqFrom = fieldEl.matches('[data-required-from]'),
              reqMoreEl = (isReqFrom ? formEl.querySelector(fieldEl.getAttribute('data-required-from')) : null);

        if( !isReqFrom ){
            currentFieldName = name;
            currentFieldType = type;
        }
        
        // VALIDATE FIELD ( BY TRIGGERING THE EVENT LISTENER ) IF IT ALREADY HAS A VALUE
        if(
            (!isCheckboxOrRadio && fieldEl.value) || 
            (isCheckboxOrRadio && fieldChecked !== null) ||
            (isReqFrom && reqMoreEl.checked)
        ){

            let eventToTrigger = 'change';

            if( isCheckboxOrRadio ){
                fieldEl = fieldChecked;
            } else if( !isFieldForChangeEvent ) {
                eventToTrigger = self.options.fieldOptions.validateOnEvents.split(' ').filter(function(evName){
                    return evName !== 'change';
                })[0] || 'input';
            }

            let newEvent = new Event(eventToTrigger, {'bubbles': (eventToTrigger !== 'blur'), 'cancelable': true});
            fieldEl.dispatchEvent(newEvent);

        }
    });

    self.isInitialized = true;

    return self;

}
