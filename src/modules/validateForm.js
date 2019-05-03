
import { executeCallback, mergeObjects } from './helper.js';

export function validateForm( optionsObj = {} ){

    const self = this,
          obj = self.isValidForm( optionsObj );
    let options = mergeObjects({}, self.options, optionsObj);

    executeCallback.call( self, options.fieldOptions.onValidation, obj.fields );

    return obj;
    
}
