import { _addClass, _mergeObjects, _removeClass } from './helper.js';

import { _isValid }             from './isValid.js';
import { _checkDirtyField }     from './checkDirtyField.js';

export function isValidField( fieldElem, fieldOptionsObj = {} ){
    if( !fieldElem ){ return false; }

    const self = this,
          fieldEl = (typeof fieldElem === 'string' ? self.formEl.querySelector(fieldElem) : fieldElem);

    let options =           _mergeObjects( {}, self.options.fieldOptions, fieldOptionsObj ),
        
        isValidValue =      fieldEl.value.trim().length > 0,
        
        isRequired =        fieldEl.required,
        isReqFrom =         fieldEl.matches('[data-required-from]'),
        reqMoreEl =         self.formEl.querySelector( fieldEl.getAttribute('data-required-from') ),
        isValidateIfFilled =fieldEl.matches('[data-validate-if-filled]'),
        isValid =           isValidValue,
        
        containerEl =       fieldEl.closest('[data-formjs-question]');
    
    if(
        (!isRequired && !isValidateIfFilled && !isReqFrom) || 
        (isValidateIfFilled && !isValidValue) ||
        (isReqFrom && !isRequired)
    ){

        isValid = true;
       
    } else {
        
        isValid =  _isValid.call( self, fieldEl, options );
        
    }

    if( options.checkDirtyField ){
        _checkDirtyField( fieldEl, options.cssClasses.dirty );
    }
    
    // VALIDATION VISUAL FEEDBACK
    if( containerEl !== null && !options.skipUIfeedback ){
        if( isValid ){

            if( !isReqFrom || (isReqFrom && reqMoreEl.checked) ){
                _removeClass( containerEl, options.cssClasses.error );
                _addClass( containerEl, options.cssClasses.valid );
            }

        } else {

            _removeClass( containerEl, options.cssClasses.valid );
            _addClass( containerEl, options.cssClasses.error );

        }
    }
    
    return isValid;
}