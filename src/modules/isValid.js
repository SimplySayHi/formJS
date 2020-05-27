
import { getValidateFieldDefault, mergeObjects, toCamelCase } from './helpers';
import { validationRulesAttributes } from './validationRulesAttributes';

export function isValid( fieldEl, fieldOptions, validationRules, validationErrors ){

    const fieldType = fieldEl.matches('[data-subtype]') ? toCamelCase(fieldEl.getAttribute('data-subtype')) : fieldEl.type,
          fieldValue = fieldEl.value,
          isValidValue = fieldValue.trim().length > 0;

    let obj = getValidateFieldDefault({result: isValidValue, fieldEl});

    if( !obj.result ){
        obj.errors = { empty: true };
        return Promise.resolve(obj);
    }

    let attrValidationsResult;

    return new Promise(resolve => {

        // RUN SPECIFIC VALIDATIONS FOR validationRulesAttributes
        attrValidationsResult = Array.from(fieldEl.attributes).reduce((valResult, attr) => {
            // FOR data-* ATTRIBUTES -> REMOVE "data-" AND TRANSFORM TO CAMELCASE
            const attrName = toCamelCase( attr.name.replace('data-', '') ),
                  attrValue = attr.value,
                  isAttrValueWithFn = attrName === 'type' && typeof validationRulesAttributes[attrValue] === 'function',
                  isAttrNameWithFn = typeof validationRulesAttributes[attrName] === 'function';

            if( isAttrValueWithFn || isAttrNameWithFn ){
                const method = isAttrValueWithFn ? attrValue : attrName;
                const extraVal = validationRulesAttributes[method]( fieldEl, fieldOptions );
                if( !extraVal.result ){
                    obj = mergeObjects({}, obj, extraVal);
                    return false;
                }
            }
            return valResult;
        }, isValidValue);

        // RUN VALIDATION FOR validationRules
        if( typeof validationRules[fieldType] === 'function' ){
            resolve( validationRules[fieldType](fieldValue, fieldEl) );
        } else {
            resolve( obj );
        }

    }).then(data => {

        obj = mergeObjects( {}, obj, data );
        obj.result = obj.result && attrValidationsResult;

        if( !obj.result ){
            const fieldErrors = (typeof validationErrors[fieldType] === 'function' ? validationErrors[fieldType](fieldValue, fieldEl) : {});
            obj.errors = mergeObjects({}, obj.errors || {}, fieldErrors);
            obj.errors.rule = true;
        }
        
        return obj;

    });

}
