
import { version }              from './modules/version';
import { checkFormEl, finalizeFieldPromise, finalizeFormPromise, isNodeList, mergeObjects } from './modules/helpers';
import { options }              from './modules-lite/options';
import { validationRules }      from './modules/validationRules';
import { checkFieldValidity }   from './modules/checkFieldValidity';
import { checkFormValidity }    from './modules/checkFormValidity';

class Form {

    constructor( form, optionsObj ){
        const argsL = arguments.length,
              checkFormElem = checkFormEl(form);

        if( argsL === 0 || (argsL > 0 && !form) ){
            throw new Error('First argument "form" is missing or falsy!');
        }
        if( isNodeList(form) ){
            throw new Error('First argument "form" must be a single DOM node or a form CSS selector, not a NodeList!');
        }
        if( !checkFormElem.result ){
            throw new Error('First argument "form" is not a DOM node nor a form CSS selector!');
        }

        const self = this;

        self.$form = checkFormElem.$el;
        self.$form.formjs = self;
        self.options = mergeObjects({}, Form.prototype.options, optionsObj);

        // BINDING CONTEXT FOR FUTURE EXECUTION
        self.options.fieldOptions.beforeValidation = self.options.fieldOptions.beforeValidation.map(cbFn => cbFn.bind(self));

        self.$form.noValidate = true;
    }

    destroy(){
        delete this.$form.formjs;
    }

    validateField( field, fieldOptions ){
        const self = this;
        const $field = typeof field === 'string' ? self.$form.querySelector(field) : field;
        fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptions);
        return checkFieldValidity($field, fieldOptions, self.validationRules, self.validationErrors)
            .then(finalizeFieldPromise);
    }

    validateForm( fieldOptions ){
        const self = this;
        fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptions);
        return checkFormValidity(self.$form, fieldOptions, self.validationRules, self.validationErrors)
            .then(finalizeFormPromise);
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
