
import { _executeCallback, _isDOMNode, _mergeObjects, _validateFieldObjDefault } from './helper.js';

export function validateField( fieldElem, fieldOptionsObj = {} ){

    const self = this,
          fieldEl = (typeof fieldElem === 'string' ? self.formEl.querySelector(fieldElem) : fieldElem);
    let obj = _mergeObjects({}, _validateFieldObjDefault);

    if( _isDOMNode(fieldEl) ){

        obj = self.isValidField( fieldEl, fieldOptionsObj );
        let fieldOptions = _mergeObjects({}, self.options.fieldOptions, fieldOptionsObj);
        _executeCallback.call( self, fieldOptions.onValidation, [obj] );
        
    }

    return obj;
    
}
