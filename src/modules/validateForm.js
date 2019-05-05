
import { executeCallback, mergeObjects } from './helper.js';
import { isValidForm } from './isValidForm.js';

export function validateForm( fieldOptionsObj = {} ){

    const self = this,
          fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptionsObj),
          obj = isValidForm.call( self, fieldOptions );

    executeCallback.call( self, fieldOptions.onValidation, obj.fields, {fieldOptions} );

    return obj;
    
}
