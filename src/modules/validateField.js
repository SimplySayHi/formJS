
import { _executeCallback, _isDOMNode } from './helper.js';

export function validateField( fieldElem ){

    const self = this,
          fieldEl = (typeof fieldElem === 'string' ? self.formEl.querySelector(fieldElem) : fieldElem);
            
    let obj = { result: false };

    if( _isDOMNode(fieldEl) ){
        obj = self.isValidField( fieldEl );
        _executeCallback.call( self, self.options.fieldOptions.onValidation, [obj] );
    }

    return obj;
    
}
