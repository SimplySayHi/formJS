
import { getValidateFieldDefault, mergeObjects, toCamelCase } from './helpers';

export function isValid( fieldEl, validationRules, validationErrors ){

    const fieldValue = fieldEl.value;

    const obj = getValidateFieldDefault({result: fieldValue.trim().length > 0, fieldEl});

    if( !obj.result ){
        obj.errors = { empty: true };
        return Promise.resolve(obj);
    }

    // COLLECT VALIDATION METHOD NAMES ( USED TO RUN VALIDATIONS AND GET ERRORS )
    const validationMethods = Array.from(fieldEl.attributes).reduce((accList, attr) => {
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
                    resolveVal( validationRules[methodName](fieldValue, fieldEl) );
                }).then(valObj => {
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
                const errors = (validationErrors[methodName] && validationErrors[methodName](fieldValue, fieldEl)) || {};
                return mergeObjects(accObj, errors);
            }, data.errors);
            data.errors.rule = true;
        }
        return data;

    });

}
