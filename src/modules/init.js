
import { getFilledFields, isFieldForChangeEvent } from './helpers';
import { listenerCallbacks } from './listenerCallbacks';

export const init = function( formEl ){

    const instance = formEl.formjs;
    const formFields = getFilledFields( formEl );

    // VALIDATE ALL FILLED FIELDS
    return Promise.all( formFields.map(fieldEl => {

        const isFieldForChangeEventBoolean = isFieldForChangeEvent(fieldEl);
        const fakeEventObj = { target: fieldEl, type: (isFieldForChangeEventBoolean ? 'change': '') };
        return listenerCallbacks.validation( fakeEventObj );

    }) ).then(fields => {
        instance.isInitialized = true;
        return { instance, fields };
    });;

}
