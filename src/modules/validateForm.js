
import { _executeCallback } from './helper.js';

export function validateForm(){

    const self = this,
          obj = self.isValidForm();

    _executeCallback.call( self, self.options.fieldOptions.onValidation, obj.fields );

    return obj;
    
}
