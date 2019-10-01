
import { executeCallback, mergeObjects } from './helper';
import { isValidForm } from './isValidForm';

export function validateForm( fieldOptionsObj = {} ){

    const self = this,
          fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptionsObj);

    return new Promise(function(resolve){

        const prom = isValidForm.call( self, fieldOptionsObj );
        resolve(prom);

    }).then(obj => {

        executeCallback.call( self, fieldOptions.onValidation, obj.fields, {fieldOptions: fieldOptionsObj} );
        return obj;

    });
    
}
