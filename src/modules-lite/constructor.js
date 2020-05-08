
import { checkFormEl, isNodeList, mergeObjects }   from '../modules/helpers';

export function constructorFn( self, formEl, optionsObj ){

    let argsL = arguments.length,
        checkFormElem = checkFormEl(formEl);

    if( argsL === 0 || (argsL > 0 && !formEl) ){
        throw new Error('First argument "formEl" is missing or falsy!');
    }
    if( isNodeList(formEl) ){
        throw new Error('First argument "formEl" must be a single DOM node or a form CSS selector, not a NodeList!');
    }
    if( !checkFormElem.result ){
        throw new Error('First argument "formEl" is not a DOM node nor a form CSS selector!');
    }

    self.formEl = checkFormElem.element;
    self.formEl.formjs = self;
    self.options = mergeObjects({}, self.constructor.prototype.options, optionsObj);

    // BINDING CONTEXT FOR FUTURE EXECUTION
    self.options.fieldOptions.beforeValidation = self.options.fieldOptions.beforeValidation.map(cbFn => cbFn.bind(self));

    self.formEl.noValidate = true;
    
}
