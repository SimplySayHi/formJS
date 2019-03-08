
import { _isDOMNode, _mergeObjects } from './helper.js';
import { _isValid } from './isValid.js';

export function isValidField( fieldElem, fieldOptionsObj = {} ){

    const self = this,
          fieldEl = (typeof fieldElem === 'string' ? self.formEl.querySelector(fieldElem) : fieldElem);

    let obj = { result: false, fieldEl: null };

    if( !_isDOMNode(fieldEl) ){ return obj; }

    let options =           _mergeObjects( {}, self.options.fieldOptions, fieldOptionsObj ),
        isValidValue =      fieldEl.value.trim().length > 0,
        isRequired =        fieldEl.required,
        isReqFrom =         fieldEl.matches('[data-required-from]'),
        isValidateIfFilled =fieldEl.matches('[data-validate-if-filled]');
    
    if(
        (!isRequired && !isValidateIfFilled && !isReqFrom) ||   // IT IS A NORMAL FORM FIELD
        (isValidateIfFilled && !isValidValue) ||                // IT IS data-validate-if-filled AND EMPTY
        (isReqFrom && !isRequired )                             // IT IS data-required-from AND NOT required
    ){

        obj.result = true;
       
    } else {
        
        obj =  _isValid.call( self, fieldEl, options );
        
    }

    obj.fieldEl = fieldEl;
    
    return obj;

}
