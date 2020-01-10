
import { executeCallback, mergeObjects } from './helpers';
import { isValidField } from './isValidField';
import { isValidForm } from './isValidForm';

export function validateField( fieldElem, fieldOptionsObj ){

    const self = this,
          fieldEl = (typeof fieldElem === 'string' ? self.formEl.querySelector(fieldElem) : fieldElem),
          fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptionsObj);
    
    return new Promise(function(resolve){

        const prom = isValidField.call( self, fieldEl, fieldOptions );
        resolve( prom );

    }).then(obj => {

        return new Promise(resolve => {
            if( obj.fieldEl ){
            
                const runCallback = function( data, fieldOptionsNew = {} ){
                    let options = mergeObjects({}, {fieldOptions}, {fieldOptions:fieldOptionsNew});
                    executeCallback.call( self, {fn: fieldOptions.onValidation, data, options} );
                };

                runCallback( [obj] );

                if( fieldOptions.onValidationCheckAll && obj.result ){
                    resolve( isValidForm.call( self ).then(dataForm => {
                        runCallback( dataForm.fields, {skipUIfeedback: true} );
                        return obj;
                    }) );
                }
            }
            resolve( obj );
        });
        
    });
    
}
