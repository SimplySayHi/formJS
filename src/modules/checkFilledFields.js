
import { getFilledFields, isFieldForChangeEvent } from './helpers';
import { validation } from './listenerCallbacks';

export const checkFilledFields = $form => {

    const formFields = getFilledFields( $form );
    return Promise.all( formFields.map($field => {

        const isFieldForChangeEventBoolean = isFieldForChangeEvent($field);
        const fakeEventObj = { target: $field, type: (isFieldForChangeEventBoolean ? 'change': '') };
        return validation( fakeEventObj );

    }) )
    .then(fields => fields)
    .catch(fields => fields);

}
