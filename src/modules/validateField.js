
import { executeCallback, isDOMNode, mergeObjects, validateFieldObjDefault } from './helper.js';

export function validateField( fieldElem, fieldOptionsObj = {} ){

    const self = this,
          fieldEl = (typeof fieldElem === 'string' ? self.formEl.querySelector(fieldElem) : fieldElem);
    let obj = mergeObjects({}, validateFieldObjDefault);

    if( isDOMNode(fieldEl) ){

        obj = self.isValidField( fieldEl, fieldOptionsObj );
        let fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptionsObj);
        executeCallback.call( self, fieldOptions.onValidation, [obj] );
        
    }

    return obj;
    
}
