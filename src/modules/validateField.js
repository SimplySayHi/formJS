
import { executeCallback, mergeObjects } from './helpers';
import { isValidField } from './isValidField';
import { isValidForm } from './isValidForm';

export function validateField( fieldElem, fieldOptionsObj = {callFormValidation: true} ){

    const self = this,
          callFormValidation = !!fieldOptionsObj.callFormValidation,
          fieldEl = (typeof fieldElem === 'string' ? self.formEl.querySelector(fieldElem) : fieldElem),
          fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptionsObj);

    delete fieldOptions.callFormValidation;
    
    return new Promise(function(resolve){

        const prom = isValidField.call( self, fieldEl, fieldOptionsObj );
        resolve( prom );

    }).then(obj => {

        if( obj.fieldEl ){
            
            const runCallbacks = function( data ){
                executeCallback.call( self, {fn: fieldOptions.onValidation, data, options: {fieldOptions: fieldOptionsObj}} );
            };

            runCallbacks( [obj] );

            if( callFormValidation && obj.result ){
                isValidForm.call( self ).then(dataForm => {
                    runCallbacks( dataForm.fields );
                });
            }
        }
        return obj;
        
    });
    
}
