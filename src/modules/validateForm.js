
import { customEvents, dispatchCustomEvent, mergeObjects } from './helpers';
import { isValidForm } from './isValidForm';

export function validateForm( fieldOptionsObj = {} ){

    const self = this,
          fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptionsObj);

    return new Promise(function(resolve){

        const prom = isValidForm.call( self, fieldOptions );
        resolve(prom);

    }).then(data => {

        const clMethodName = data.result ? 'add' : 'remove';
        self.formEl.classList[clMethodName]( self.options.formOptions.cssClasses.valid );
        self.listenerCallbacks.validated.call( self, {data} );
        dispatchCustomEvent( self.formEl, customEvents.form.validated, data );

        return data;

    });
    
}
