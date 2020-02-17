
import { getFilledFields, isFieldForChangeEvent } from './helpers';

export const init = function(){

    const instance = this,
          formFields = getFilledFields( instance.formEl );

    // VALIDATE ALL FILLED FIELDS
    return Promise.all( formFields.map(fieldEl => {

        const isFieldForChangeEventBoolean = isFieldForChangeEvent(fieldEl);
        const fakeEventObj = { target: fieldEl, type: (isFieldForChangeEventBoolean ? 'change': '') };
        return instance.listenerCallbacks.validation.call( instance, fakeEventObj );

    }) ).then(fields => {

        instance.isInitialized = true;
        return { instance, fields };

    });

}
