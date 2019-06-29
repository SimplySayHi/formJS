
import { mergeObjects, toCamelCase } from './helper.js';
import { validationRulesAttributes } from './validationRules.js';

export function isValid( fieldEl, fieldOptions = {} ){

    const self = this,
          fieldType = ( fieldEl.matches('[data-subtype]') ? toCamelCase( fieldEl.getAttribute('data-subtype') ) : fieldEl.type ),
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

    // COLLECT SPECIFIC VALIDATIONS FOR validationRulesAttributes
    fieldAttributes.forEach(function(attr){
        // FOR data-* ATTRIBUTES -> REMOVE "data-" AND TRANSFORM TO CAMELCASE
        let attrName = toCamelCase( attr.name.replace('data-', '') ),
            attrValue = attr.value,
            isTypeValueWithFn = attrName === 'type' && typeof validationRulesAttributes[attrValue] === 'function',
            isAttrNameWithFn = typeof validationRulesAttributes[attrName] === 'function';

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

    // RUN SPECIFIC VALIDATIONS FOR validationRulesAttributes
    attrValidations.forEach(function(item){
        let extraVal = validationRulesAttributes[item.attrName]( item );
        if( !extraVal.result ){
            obj = mergeObjects({}, obj, extraVal);
            attrValidationsResult = false;
        }
    });

    // RUN VALIDATIONS FOR validationRules
    if( typeof self.validationRules[fieldType] === 'function' ){
        obj = mergeObjects( {}, obj, self.validationRules[fieldType].call(self, fieldValue, fieldEl) );
        obj.result = obj.result && attrValidationsResult;
        if( !obj.result ){
            let errorFn = self.validationErrors[fieldType];
            let fieldErrors = (typeof errorFn === 'function' ? errorFn.call(self, fieldValue) : {});
            if( typeof obj.errors === 'undefined' ){
                obj.errors = {};
            }
            obj.errors.rule = true;
            obj.errors = mergeObjects({}, obj.errors, fieldErrors);
        }
    }

    return obj;

}
