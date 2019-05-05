
import { executeCallback, isDOMNode, mergeObjects, validateFieldObjDefault } from './helper.js';
import { isValidField } from './isValidField.js';

export function validateField( fieldElem, fieldOptionsObj = {} ){

    const self = this,
          fieldEl = (typeof fieldElem === 'string' ? self.formEl.querySelector(fieldElem) : fieldElem);
    let obj = mergeObjects({}, validateFieldObjDefault);

    if( isDOMNode(fieldEl) ){
        let fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptionsObj);
        obj = isValidField.call( self, fieldEl, fieldOptionsObj );
        executeCallback.call( self, fieldOptions.onValidation, [obj], {fieldOptions} );
    }

    return obj;
    
}
