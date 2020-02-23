
import { customEvents, dispatchCustomEvent } from './helpers';
import { listenerCallbacks } from './listenerCallbacks';
import { isValidForm } from './isValidForm';

export function validateForm( formEl, options, validationRules, validationErrors ){

    return new Promise(function(resolve){

        const prom = isValidForm( formEl, options.fieldOptions, validationRules, validationErrors );
        resolve(prom);

    }).then(data => {

        const clMethodName = data.result ? 'add' : 'remove';
        formEl.classList[clMethodName]( options.formOptions.cssClasses.valid );
        listenerCallbacks.validationEnd( {data} );
        dispatchCustomEvent( formEl, customEvents.form.validation, data );

        return data;

    });
    
}
