
import {    getJSONobjectFromFieldAttribute,
            isDOMNode,
            mergeObjects,
            mergeValidateFieldDefault,
            runFunctionsSequence
        }           from './helpers';
import { isValid }  from './isValid';

export function checkFieldValidity( $field, fieldOptions, validationRules, validationErrors ){

    if( !isDOMNode($field) ){
        const obj = mergeValidateFieldDefault({$field});
        return Promise.resolve(obj);
    }

    const $form = $field.closest('form'),
          isValidValue = $field.value.trim().length > 0,
          dataFieldOptions = getJSONobjectFromFieldAttribute( $field, 'data-field-options' );

    fieldOptions = mergeObjects( fieldOptions, dataFieldOptions );

    // HANDLE FIELD data-required-from WHEN CHANGING ITS RELATED RADIO
    if( $field.type === 'radio' ){
        const $checked = $field.checked ? $field : $form.querySelector('[name="'+ $field.name +'"]:checked'),
              reqMoreIsChecked = $checked && $checked.matches('[data-require-more]'),
              $findReqMore = reqMoreIsChecked ? $checked : $form.querySelector('[data-require-more][name="'+ $field.name +'"]'),
              $findReqFrom = $findReqMore ? $form.querySelector('[data-required-from="#'+ $findReqMore.id +'"]') : null;
        
        if( $checked && $findReqFrom ){
            $findReqFrom.required = $findReqMore.required && $findReqMore.checked;
            if( !reqMoreIsChecked ){
                $findReqFrom.value = '';
            } else if( fieldOptions.focusOnRelated ) {
                $findReqFrom.focus();
            }
        }
    }

    // HANDLE FIELD data-require-more & data-required-from WHEN *-from IT'S FILLED
    if( $field.matches('[data-required-from]') && isValidValue ){
        const $reqMore = $form.querySelector( $field.getAttribute('data-required-from') );
        $reqMore.checked = true;
        $field.required = $reqMore.required;
    }

    const needsValidation = $field.required || ($field.matches('[data-validate-if-filled]') && isValidValue);

    return runFunctionsSequence({
            functionsList: fieldOptions.beforeValidation,
            data: { $field, fieldOptions }
        })
        .then(data => {
            const dataObj = data.pop();
            return new Promise(resolve => {
                if( !needsValidation ){
                    dataObj.result = true;
                }
                resolve( needsValidation ? isValid($field, fieldOptions, validationRules, validationErrors) : dataObj );
            });
        });

}
