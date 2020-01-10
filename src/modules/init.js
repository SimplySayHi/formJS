
import { getFilledFields, isFieldForChangeEvent } from './helpers';

export const init = function(){

    const self = this,
          formEl = self.formEl,
          formFields = getFilledFields( formEl );

    // VALIDATE ALL FILLED FIELDS
    formFields.forEach(fieldEl => {
        const isFieldForChangeEventBoolean = isFieldForChangeEvent(fieldEl);
        const fakeEventObj = { target: fieldEl, type: (isFieldForChangeEventBoolean ? 'change': '') };
        self.listenerCallbacks.validation.call( self, fakeEventObj );
    });

    self.isInitialized = true;
    return self;

}
