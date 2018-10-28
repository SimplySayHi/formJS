import { _toCamelCase } from './helper.js';

import { _validationRulesAttributes } from './validationRules.js';

export function _isValid( fieldEl, fieldOptions = {} ){
    const self = this,
          fieldType = ( fieldEl.matches('[data-subtype]') ? _toCamelCase( fieldEl.getAttribute('data-subtype') ) : fieldEl.type ),
          fieldValue = fieldEl.value,
          // ALPHABETICAL REVERSE ORDER
          fieldAttributes = Array.from(fieldEl.attributes).sort(function(a,b){ return a.name < b.name });
         
    let attrValidations = [],
        attrValidationsResult = true;

    // SPECIFIC VALIDATIONS FOR _validationRulesAttributes
    fieldAttributes.forEach(function(attr){
        // FOR data-* ATTRIBUTES -> REMOVE "data-" AND TRANSFORM TO CAMELCASE
        let attrName = _toCamelCase( attr.name.replace('data-', '') ),
            attrValue = attr.value,
            isTypeValueWithFn = attrName === 'type' && typeof _validationRulesAttributes[attrValue] === 'function',
            isAttrNameWithFn = typeof _validationRulesAttributes[attrName] === 'function';

        if( isTypeValueWithFn || isAttrNameWithFn ){

            let extraValObj = {
                    attrName: (isTypeValueWithFn ? attrValue : attrName),
                    attrValue: attrValue,
                    fieldEl,
                    fieldOptions
                };

            if( isTypeValueWithFn || attrName === 'requiredFrom' ){
                // THESE VALIDATIONS MUST RUN BEFORE ALL OTHERS
                attrValidations.unshift( extraValObj );
            } else {
                attrValidations.push( extraValObj );
            }

        }
    });

    attrValidations.forEach(function(item){
        let extraVal = _validationRulesAttributes[item.attrName]( item );
        if( !extraVal ){ attrValidationsResult = false; }
    });

    attrValidationsResult = attrValidations.length > 0 ? attrValidationsResult : fieldValue.trim().length > 0; 
    
    return (
        typeof self.validationRules[fieldType] === 'function' ? 
        self.validationRules[fieldType]( fieldValue ) && attrValidationsResult : 
        attrValidationsResult
    );
}