
import { executeCallback, mergeObjects } from './helpers';
import { isValidForm } from './isValidForm';

export function validateForm( fieldOptionsObj = {} ){

    const self = this,
          fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptionsObj);

    return new Promise(function(resolve){

        const prom = isValidForm.call( self, fieldOptions );
        resolve(prom);

    }).then(obj => {

        const clMethodName = obj.result ? 'add' : 'remove';

        self.formEl.classList[clMethodName]( self.options.formOptions.cssClasses.valid );
        executeCallback.call( self, {fn: fieldOptions.onValidation, data: obj.fields, options: {fieldOptions}} );

        return obj;

    });
    
}
