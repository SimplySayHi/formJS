
import { _isDOMNode, _mergeObjects } from './helper.js';
import { _isValid } from './isValid.js';

export function isValidField( fieldElem, fieldOptionsObj = {} ){

    const self = this,
          fieldEl = (typeof fieldElem === 'string' ? self.formEl.querySelector(fieldElem) : fieldElem);

    if( !_isDOMNode(fieldEl) ){ return false; }

    let options =           _mergeObjects( {}, fieldOptionsObj, self.options.fieldOptions ),
        
        isValidValue =      fieldEl.value.trim().length > 0,
        
        isRequired =        fieldEl.required,
        isReqFrom =         fieldEl.matches('[data-required-from]'),
        reqMoreEl =         self.formEl.querySelector( fieldEl.getAttribute('data-required-from') ),
        isValidateIfFilled =fieldEl.matches('[data-validate-if-filled]'),
        isValid =           isValidValue;
    
    if(
        (!isRequired && !isValidateIfFilled && !isReqFrom) || 
        (isValidateIfFilled && !isValidValue) ||
        (isReqFrom && !isRequired && !reqMoreEl.checked)
    ){

        isValid = true;
       
    } else {
        
        isValid =  _isValid.call( self, fieldEl, options );
        
    }
    
    return isValid;

}
