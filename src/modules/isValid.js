
import { _mergeObjects, _toCamelCase } from './helper.js';
import { _validationRulesAttributes } from './validationRules.js';

export function _isValid( fieldEl, fieldOptions = {} ){

    const self = this,
          fieldType = ( fieldEl.matches('[data-subtype]') ? _toCamelCase( fieldEl.getAttribute('data-subtype') ) : fieldEl.type ),
          fieldValue = fieldEl.value,
          isValidValue = fieldValue.trim().length > 0,
          // ALPHABETICAL REVERSE ORDER
          fieldAttributes = Array.from(fieldEl.attributes).sort(function(a,b){ return a.name < b.name });

    let attrValidations = [],
        attrValidationsResult = isValidValue,
        obj = { result: isValidValue };

    if( !isValidValue ){
        obj.errors = { empty: true };
        obj.result = false;
        return obj;
    }

    // COLLECT SPECIFIC VALIDATIONS FOR _validationRulesAttributes
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

    // RUN SPECIFIC VALIDATIONS FOR _validationRulesAttributes
    attrValidations.forEach(function(item){
        let extraVal = _validationRulesAttributes[item.attrName]( item, fieldEl );
        if( !extraVal.result ){
            obj = _mergeObjects({}, extraVal, obj);
            attrValidationsResult = false;
        }
    });

    // RUN VALIDATIONS FOR validationRules
    if( typeof self.validationRules[fieldType] === 'function' ){
        obj = _mergeObjects( {}, self.validationRules[fieldType](fieldValue, fieldEl), obj );
        obj.result = obj.result && attrValidationsResult;
        if( !obj.result ){
            if( typeof obj.errors === 'undefined' ){
                obj.errors = {};
            }
            obj.errors.rule = true;
        }
    }

    return obj;

}
