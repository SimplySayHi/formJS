
import { getFilledFields, isFieldForChangeEvent } from './helpers';

export const init = function( instance, formEl, listenerCallbacks ){

    const formFields = getFilledFields( formEl );

    // VALIDATE ALL FILLED FIELDS
    return Promise.all( formFields.map(fieldEl => {

        const isFieldForChangeEventBoolean = isFieldForChangeEvent(fieldEl);
        const fakeEventObj = { target: fieldEl, type: (isFieldForChangeEventBoolean ? 'change': '') };
        return listenerCallbacks.validation.call( instance, fakeEventObj );

    }) ).then(fields => {

        instance.isInitialized = true;
        return { instance, fields };

    });

}
