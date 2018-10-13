import { _toCamelCase } from './helper.js';

import { _validationRulesStrictHtml } from './validationRules.js';

export function _isValid( field, addedValidations = {} ){
    const self = this,
          fieldType = ( field.matches('[data-subtype]') ? _toCamelCase( field.getAttribute('data-subtype') ) : field.type ),
          fieldValue = field.value;
         
    let  extraValidationsResult = true;
    
    for(let val in addedValidations){
        let extraVal = _validationRulesStrictHtml[val]( fieldValue, addedValidations[val] );
        if( !extraVal ){ extraValidationsResult = false; }
    }
    
    return (
        typeof self.validationRules[fieldType] === 'function' ? 
        self.validationRules[fieldType]( fieldValue ) : 
        fieldValue.trim().length > 0
    ) && extraValidationsResult;
}