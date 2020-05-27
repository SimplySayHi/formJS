
import { getValidateFieldDefault, isDOMNode, runFunctionsSequence } from './helpers';
import { isValid } from './isValid';

export function checkFieldValidity( fieldEl, fieldOptions, validationRules, validationErrors ){

    if( !isDOMNode(fieldEl) ){
        const obj = getValidateFieldDefault({fieldEl});
        return Promise.resolve(obj);
    }

    const formEl = fieldEl.closest('form'),
          isValidValue = fieldEl.value.trim().length > 0;

     // HANDLE FIELDS radio/data-require-more
     if( fieldEl.type === 'radio' ){
        const checkedEl = fieldEl.checked ? fieldEl : formEl.querySelector('[name="'+ fieldEl.name +'"]:checked'),
              reqMoreIsChecked = checkedEl.matches('[data-require-more]'),
              findReqMoreEl = reqMoreIsChecked ? checkedEl : formEl.querySelector('[data-require-more][name="'+ fieldEl.name +'"]'),
              findReqFromEl = findReqMoreEl ? formEl.querySelector('[data-required-from="#'+ findReqMoreEl.id +'"]') : null;
        
        if( checkedEl && findReqFromEl ){
            findReqFromEl.required = findReqMoreEl.required && findReqMoreEl.checked;
            if( !reqMoreIsChecked ){
                findReqFromEl.value = '';
            } else if( fieldOptions.focusOnRelated ) {
                findReqFromEl.focus();
            }
        }
    }

    // HANDLE FIELDS data-required-from
    if( fieldEl.matches('[data-required-from]') && isValidValue ){
        const reqMoreEl = formEl.querySelector( fieldEl.getAttribute('data-required-from') );
        reqMoreEl.checked = true;
        fieldEl.required = reqMoreEl.required;
    }

    const needsValidation = fieldEl.required || (fieldEl.matches('[data-validate-if-filled]') && isValidValue);

    return runFunctionsSequence({
            functionsList: fieldOptions.beforeValidation,
            data: {fieldEl}
        })
        .then(data => {
            let dataObj = data.pop();
            return new Promise(resolve => {
                if( !needsValidation ){
                    dataObj.result = true;
                }
                resolve( needsValidation ? isValid(fieldEl, fieldOptions, validationRules, validationErrors) : dataObj );
            });
        });

}
