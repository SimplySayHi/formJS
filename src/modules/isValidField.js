import { _addClass, _mergeObjects, _removeClass, _toCamelCase } from './helper.js';

import { _validationRulesStrictHtml } from './validationRules.js';
import { _isValid }             from './isValid.js';
import { _isFieldChecked }      from './isFieldChecked.js';
import { _checkDirtyField }     from './checkDirtyField.js';
import { _isValidFileField }    from './isValidFileField.js';

export function isValidField( fieldElem, fieldOptionsObj = {} ){
    if( !fieldElem ){ return false; }

    const self = this,
          fieldEl = (typeof fieldElem === 'string' ? self.formEl.querySelector(fieldElem) : fieldElem);

    let options =           _mergeObjects( {}, fieldOptionsObj, self.options.fieldOptions ),
        
        fieldType =         fieldEl.type,
        isValidValue =      fieldEl.value.trim().length > 0,
        
        exceedMaxChoice =   false,
        isMultiChoice =     fieldEl.closest('[data-max-check]') !== null,
        isRequired =        fieldEl.required,
        isRequiredFrom =    fieldEl.matches( '[data-required-from]' ),
        isValidateIfFilled =fieldEl.matches( '[data-validate-if-filled]' ),
        isValid =           isValidValue,
        
        containerEl =       fieldEl.closest('[data-formjs-question]');
    
    if( options.checkDirtyField ){
        _checkDirtyField( fieldEl, options.cssClasses.dirty );
    }
    
    if(
        (!isRequired && !isValidateIfFilled && !isRequiredFrom && (fieldType !== 'checkbox' && fieldType !== 'radio')) || 
        (isValidateIfFilled && !isValidValue)
    ){
      
        isValid = true;
       
    } else {
        
        if( fieldEl.pattern !== '' ){

            const fieldPattern = fieldEl.pattern,
                  fieldRegex = new RegExp( fieldPattern );
            isValid = fieldRegex.test( fieldEl.value );

        } else if( fieldType === 'checkbox' ){
            
            let checkField = _isFieldChecked( fieldEl, options );
            isValid = ( isMultiChoice ? checkField.isChecked : checkField );
            exceedMaxChoice = ( isMultiChoice ? checkField.exceedMaxCheck : false );
            
        } else if( fieldType === 'file' && options.maxFileSize > 0 ){
            
            isValid = _isValidFileField( fieldEl, options );
            
        } else if( fieldType === 'radio' ){
            
            isValid = _isFieldChecked( fieldEl, options );
            
        } else {
            
            let extraValidations = {},
                doExtraValidations = true;
            
            if( fieldEl.matches('[data-equal-to]') ){
                
                let checkFromEl = document.querySelector( '[name="' + fieldEl.getAttribute('data-equal-to') + '"]' );
                isValid = fieldEl.value === checkFromEl.value;
                doExtraValidations = false;
                
            } else {
            
                if( isRequiredFrom ){
                    
                    let reqMoreEl = document.querySelector( fieldEl.getAttribute('data-required-from') ),
                        checkedEl = document.querySelector( '[name="'+ reqMoreEl.name +'"]:checked' );
                    
                    if( isValidValue ){
                        reqMoreEl.checked = true;
                        fieldEl.required = true;
                    }
                    
                    if( !reqMoreEl.checked ){
                        doExtraValidations = false;
                    }
                    
                    isValid = (reqMoreEl.required && reqMoreEl.checked ? isValidValue : (reqMoreEl.required ? checkedEl !== null : true));
                    
                }

                // ADD FURTHER SPECIFIC VALIDATIONS
                Array.from(fieldEl.attributes).forEach(function(attr){
                    // FOR data-* ATTRIBUTES -> CUT OUT "data-" AND TRANSFORM TO CAMELCASE
                    let attrName = _toCamelCase( attr.name.replace('data-', '') ),
                        attrValue = attr.value;

                    if( typeof _validationRulesStrictHtml[attrName] === 'function' ){
                        extraValidations[attrName] = attrValue;
                    }
                });

            }
            
            isValid = (doExtraValidations ? _isValid.call( self, fieldEl, extraValidations ) : isValid);
            
        }
        
    }
    
    // VALIDATION VISUAL FEEDBACK
    if( containerEl !== null ){
        if( options.skipUIfeedback ){
            
            let cssClasses = options.cssClasses.valid + ' ' + options.cssClasses.error + ' ' + options.cssClasses.errorMultiChoice;
            _removeClass( containerEl, cssClasses );
            
        } else {
            if( isValid ){

                _removeClass( containerEl, options.cssClasses.error );
                _addClass( containerEl, options.cssClasses.valid );
                if( isMultiChoice && !exceedMaxChoice ){
                    _removeClass( containerEl, options.cssClasses.errorMultiChoice );
                }

            } else {

                _addClass( containerEl, options.cssClasses.error );
                _removeClass( containerEl, options.cssClasses.valid );
                if( isMultiChoice && exceedMaxChoice ){
                    _addClass( containerEl, options.cssClasses.errorMultiChoice );
                }

            }
        }
    }
    
    return isValid;
}