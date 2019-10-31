
import { isDOMNode, mergeObjects, runFunctionsSequence, validateFieldObjDefault } from './helpers';
import { isValid } from './isValid';

export function isValidField( fieldElem, fieldOptionsObj = {} ){

    const self = this,
          fieldEl = (typeof fieldElem === 'string' ? self.formEl.querySelector(fieldElem) : fieldElem);

    let obj = mergeObjects({}, validateFieldObjDefault, {fieldEl});

    if( !isDOMNode(fieldEl) ){ return Promise.resolve(obj); }

    let options =           mergeObjects( {}, self.options.fieldOptions, fieldOptionsObj ),
        isValidValue =      fieldEl.value.trim().length > 0,
        isRequired =        fieldEl.required,
        isReqFrom =         fieldEl.matches('[data-required-from]'),
        isValidateIfFilled =fieldEl.matches('[data-validate-if-filled]');

    const rfsObject = {
        functionsList: self.options.fieldOptions.beforeValidation.map( func => func.bind( this ) ),
        data: {fieldEl}
    };

    return runFunctionsSequence.call(self, rfsObject)
        .then(data => {

            let dataObj = data.pop();
            return new Promise(function(resolve){
                if(
                    (!isRequired && !isValidateIfFilled && !isReqFrom) ||   // IT IS A NORMAL FORM FIELD
                    (isValidateIfFilled && !isValidValue) ||                // IT IS data-validate-if-filled AND EMPTY
                    (isReqFrom && !isRequired )                             // IT IS data-required-from AND NOT required
                ){

                    dataObj.result = true;
                    resolve( dataObj );
                
                } else {

                    resolve( isValid.call(self, fieldEl, options) );
                    
                }

            });

        });

}
