
import { getFilledFields, isFieldForChangeEvent } from './helpers';

export const init = function(){

    const self = this,
          formEl = self.formEl,
          formFields = getFilledFields( formEl ),
          fieldsLength = formFields.length;

    // VALIDATE ALL FILLED FIELDS
    return Promise.all( formFields.map(function( fieldEl, index ){

        const isFieldForChangeEventBoolean = isFieldForChangeEvent(fieldEl);
        const fakeEventObj = { target: fieldEl, type: (isFieldForChangeEventBoolean ? 'change': '') };
        const callFormValidation = fieldsLength === index + 1;
        return self.listenerCallbacks.validation.call( self, fakeEventObj, callFormValidation );

    }) ).then(fields => {

        self.isInitialized = true;
        return {instance: self, fields};

    });

}
