
import { customEvents, dispatchCustomEvent, removeClass } from './helpers';
import { isValidField } from './isValidField';
import { isValidForm } from './isValidForm';

export function validateField( fieldEl, options, validationRules, validationErrors ){

    const formEl = fieldEl.closest('form');
    const skipUIfeedback = options.fieldOptions.skipUIfeedback;
    
    return new Promise(function(resolve){

        const prom = isValidField( fieldEl, options.fieldOptions, validationRules, validationErrors );
        resolve( prom );

    }).then(obj => {

        return new Promise(resolve => {
            if( obj.fieldEl ){

                dispatchCustomEvent( obj.fieldEl, customEvents.field.validation, obj, { bubbles: false } );
                dispatchCustomEvent( formEl, customEvents.field.validation, obj );

                if( options.fieldOptions.onValidationCheckAll && obj.result ){
                    // FORCE skipUIfeedback TO true
                    options.fieldOptions.skipUIfeedback = true;
                    resolve(
                        isValidForm( formEl, options.fieldOptions, validationRules, validationErrors )
                            .then(dataForm => {
                                const clMethodName = dataForm.result ? 'add' : 'remove';

                                formEl.classList[clMethodName]( options.formOptions.cssClasses.valid );
                                dispatchCustomEvent( formEl, customEvents.form.validation, dataForm );
                                // RESTORE skipUIfeedback TO THE ORIGINAL VALUE
                                options.fieldOptions.skipUIfeedback = skipUIfeedback;

                                return obj;
                            })
                    );
                } else if( !obj.result ){
                    removeClass( formEl, options.formOptions.cssClasses.valid );
                }
            }
            resolve( obj );
        });
        
    });
    
}
