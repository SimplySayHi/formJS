
import { mergeValidateFieldDefault, mergeObjects, toCamelCase } from './helpers';

export function isValid( $field, fieldOptions, validationRules, validationErrors ){

    const fieldValue = $field.value,
          obj = mergeValidateFieldDefault({result: fieldValue.trim().length > 0, $field}),
          isRadioOrCheckbox = /^(radio|checkbox)$/.test($field.type),
          hasSelectedInput = $field.closest('form').querySelectorAll('[name="'+ $field.name +'"]:checked').length > 0;

    if( (!isRadioOrCheckbox && !obj.result) || (isRadioOrCheckbox && !hasSelectedInput) ){
        obj.result = false;
        obj.errors = { empty: true };
        return Promise.resolve(obj);
    }

    // COLLECT VALIDATION METHOD NAMES ( USED TO RUN VALIDATIONS AND GET ERRORS )
    const validationMethods = Array.from($field.attributes).reduce((accList, attr) => {
        const attrName = toCamelCase( attr.name.replace('data-', '') ),
              attrValue = toCamelCase( attr.value ),
              isAttrValueWithFn = (attrName === 'type' || attrName === 'subtype') && validationRules[attrValue],
              isAttrNameWithFn = validationRules[attrName];

        if( isAttrValueWithFn || isAttrNameWithFn ){
            accList.push( isAttrValueWithFn ? attrValue : attrName );
        }
        return accList;
    }, []);

    return new Promise(resolve => {

        // RUN VALIDATIONS
        const validationsResult = validationMethods.reduce((accPromise, methodName) => {
            return accPromise.then(accObj => {
                return new Promise(resolveVal => {
                    // RUN VALIDATION INSIDE A PROMISE IS USEFUL FOR ASYNC VALIDATIONS
                    resolveVal( validationRules[methodName](fieldValue, $field, fieldOptions) );
                }).then(valObj => {
                    // ADD CUSTOM ERROR-KEY FOR EACH VALIDATION RULE
                    if( !valObj.result ){
                        const errorObj = {};
                        if( typeof valObj.errors === 'undefined' || typeof valObj.errors[methodName] === 'undefined' ){
                            errorObj[methodName] = true;
                        }
                        valObj.errors = mergeObjects({}, valObj.errors, errorObj);
                    }
                    valObj = valObj.result ? {} : valObj;
                    return mergeObjects(accObj, valObj);
                });
            });
        }, Promise.resolve(obj));
        resolve(validationsResult);

    }).then(data => {

        // GET ERRORS
        if( !data.result ){
            data.errors = validationMethods.reduce((accObj, methodName) => {
                const errors = (validationErrors[methodName] && validationErrors[methodName](fieldValue, $field)) || {};
                return mergeObjects(accObj, errors);
            }, data.errors);
        }
        return data;

    });

}
