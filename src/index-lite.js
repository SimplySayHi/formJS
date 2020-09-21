
import { version }              from './modules/version';
import { checkFormEl, isNodeList, mergeObjects } from './modules/helpers';
import { options }              from './modules-lite/options';
import { validationRules }      from './modules/validationRules';
import { checkFieldValidity }   from './modules/checkFieldValidity';
import { checkFormValidity }    from './modules/checkFormValidity';

class Form {

    constructor( formEl, optionsObj ){
        const argsL = arguments.length,
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

        const self = this;

        self.formEl = checkFormElem.element;
        self.formEl.formjs = self;
        self.options = mergeObjects({}, Form.prototype.options, optionsObj);

        // BINDING CONTEXT FOR FUTURE EXECUTION
        self.options.fieldOptions.beforeValidation = self.options.fieldOptions.beforeValidation.map(cbFn => cbFn.bind(self));

        self.formEl.noValidate = true;
    }

    destroy(){
        delete this.formEl.formjs;
    }

    validateField( fieldEl, fieldOptions ){
        const self = this;
        fieldEl = (typeof fieldEl === 'string' ? self.formEl.querySelector(fieldEl) : fieldEl);
        fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptions);
        return checkFieldValidity(fieldEl, fieldOptions, self.validationRules, self.validationErrors);
    }

    validateForm( fieldOptions ){
        const self = this;
        fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptions);
        return checkFormValidity(self.formEl, fieldOptions, self.validationRules, self.validationErrors);
    }
    
    static addValidationErrors( errorsObj ){
        Form.prototype.validationErrors = mergeObjects({}, Form.prototype.validationErrors, errorsObj);
    }

    static addValidationRules( rulesObj ){
        Form.prototype.validationRules = mergeObjects({}, Form.prototype.validationRules, rulesObj);
    }
    
    static setOptions( optionsObj ){
        Form.prototype.options = mergeObjects({}, Form.prototype.options, optionsObj);
    }

}

Form.prototype.options = options;
Form.prototype.validationErrors = {};
Form.prototype.validationRules = validationRules;
Form.prototype.version = version;

export default Form;
