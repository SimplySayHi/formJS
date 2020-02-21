
import { customEvents, dispatchCustomEvent } from './helpers';
import { isValidForm } from './isValidForm';

export function validateForm( formEl, options, listenerCallbacks, validationRules, validationErrors ){

    return new Promise(function(resolve){

        const prom = isValidForm( formEl, options.fieldOptions, validationRules, validationErrors );
        resolve(prom);

    }).then(data => {

        const clMethodName = data.result ? 'add' : 'remove';
        formEl.classList[clMethodName]( options.formOptions.cssClasses.valid );
        listenerCallbacks.validationEnd.call( formEl.formjs, {data} );
        dispatchCustomEvent( formEl, customEvents.form.validation, data );

        return data;

    });
    
}
