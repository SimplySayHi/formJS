
import { _executeCallback, _mergeObjects } from './helper.js';

export function validateForm( optionsObj = {} ){

    const self = this,
          obj = self.isValidForm( optionsObj );
    let options = _mergeObjects({}, self.options, optionsObj);

    _executeCallback.call( self, options.fieldOptions.onValidation, obj.fields );

    return obj;
    
}
