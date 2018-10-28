import { _addClass, _mergeObjects, _removeClass } from './helper.js';

import { _isValid }             from './isValid.js';
import { _checkDirtyField }     from './checkDirtyField.js';

export function isValidField( fieldElem, fieldOptionsObj = {} ){
    if( !fieldElem ){ return false; }

    const self = this,
          fieldEl = (typeof fieldElem === 'string' ? self.formEl.querySelector(fieldElem) : fieldElem);

    let options =           _mergeObjects( {}, fieldOptionsObj, self.options.fieldOptions ),
        
        //fieldType =         fieldEl.type,
        isValidValue =      fieldEl.value.trim().length > 0,
        
        isRequired =        fieldEl.required,
        isRequiredFrom =    fieldEl.matches( '[data-required-from]' ),
        reqMoreEl =         self.formEl.querySelector( fieldEl.getAttribute('data-required-from') ),
        isValidateIfFilled =fieldEl.matches( '[data-validate-if-filled]' ),
        isValid =           isValidValue,
        
        containerEl =       fieldEl.closest('[data-formjs-question]');
    
    if(
        (!isRequired && !isValidateIfFilled && !isRequiredFrom ) || 
        (isValidateIfFilled && !isValidValue)
    ){
      
        isValid = true;
       
    } else {
        
        isValid =  _isValid.call( self, fieldEl, options );
        
    }

    if( options.checkDirtyField ){
        _checkDirtyField( fieldEl, options.cssClasses.dirty );
    }
    
    // VALIDATION VISUAL FEEDBACK
    if( containerEl !== null ){
        if( options.skipUIfeedback ){
            
            let cssClasses = options.cssClasses.valid + ' ' + options.cssClasses.error;
            _removeClass( containerEl, cssClasses );
            
        } else {
            if( isValid ){

                if( !isRequiredFrom || (isRequiredFrom && reqMoreEl.checked) ){
                    _removeClass( containerEl, options.cssClasses.error );
                    _addClass( containerEl, options.cssClasses.valid );
                }

            } else {

                _addClass( containerEl, options.cssClasses.error );
                _removeClass( containerEl, options.cssClasses.valid );

            }
        }
    }
    
    return isValid;
}