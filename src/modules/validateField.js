
import { executeCallback, mergeObjects, removeClass } from './helpers';
import { isValidField } from './isValidField';
import { isValidForm } from './isValidForm';

export function validateField( fieldElem, fieldOptionsObj ){

    const self = this,
          fieldEl = (typeof fieldElem === 'string' ? self.formEl.querySelector(fieldElem) : fieldElem),
          skipUIfeedback = self.options.fieldOptions.skipUIfeedback,
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
                    // FORCE skipUIfeedback TO true
                    self.options.fieldOptions.skipUIfeedback = true;
                    resolve(
                        isValidForm.call( self ).then(dataForm => {
                            const clMethodName = dataForm.result ? 'add' : 'remove';
                            self.formEl.classList[clMethodName]( self.options.formOptions.cssClasses.valid );

                            runCallback( dataForm.fields, {skipUIfeedback: true} );
                            
                            // RESTORE skipUIfeedback TO THE ORIGINAL VALUE
                            self.options.fieldOptions.skipUIfeedback = skipUIfeedback;

                            return obj;
                        })
                    );
                } else if( !obj.result ){
                    removeClass( self.formEl, self.options.formOptions.cssClasses.valid );
                }
            }
            resolve( obj );
        });
        
    });
    
}
