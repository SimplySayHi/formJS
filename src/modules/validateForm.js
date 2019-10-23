
import { executeCallback, mergeObjects } from './helpers';
import { isValidForm } from './isValidForm';

export function validateForm( fieldOptionsObj = {} ){

    const self = this,
          fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptionsObj);

    return new Promise(function(resolve){

        const prom = isValidForm.call( self, fieldOptionsObj );
        resolve(prom);

    }).then(obj => {

        executeCallback.call( self, {fn: fieldOptions.onValidation, data: obj.fields, options: {fieldOptions: fieldOptionsObj}} );
        return obj;

    });
    
}
