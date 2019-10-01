
import { executeCallback, mergeObjects } from './helper';
import { isValidField } from './isValidField';

export function validateField( fieldElem, fieldOptionsObj = {} ){

    const self = this,
          fieldEl = (typeof fieldElem === 'string' ? self.formEl.querySelector(fieldElem) : fieldElem),
          fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptionsObj);

    return new Promise(function(resolve){

        const prom = isValidField.call( self, fieldEl, fieldOptionsObj );
        resolve( prom );

    }).then(obj => {

        if( obj.fieldEl ){
            executeCallback.call( self, fieldOptions.onValidation, [obj], {fieldOptions: fieldOptionsObj} );
        }
        return obj;
        
    });
    
}
