
import { version }              from '../package.json'
import { 
    checkFormEl,
    dispatchCustomEvent,
    finalizeFieldPromise,
    finalizeFormPromise,
    getFormFields,
    isNodeList,
    mergeObjects }              from './modules/helpers'
import { customEvents }         from './modules-lite/helpers/customEvents'
import { options }              from './modules-lite/options'
import { validationRules }      from './modules/validationRules'
import { checkFieldValidity }   from './modules/checkFieldValidity'
import { checkFieldsValidity }  from './modules/checkFieldsValidity'

class Form {

    constructor( form, optionsObj ){
        const argsL = arguments.length
        const checkFormElem = checkFormEl(form)

        if( argsL === 0 || (argsL > 0 && !form) ){
            throw new Error('First argument "form" is missing or falsy!')
        }
        if( isNodeList(form) ){
            throw new Error('First argument "form" must be a single DOM node or a form CSS selector, not a NodeList!')
        }
        if( !checkFormElem.result ){
            throw new Error('First argument "form" is not a DOM node nor a form CSS selector!')
        }

        const self = this

        self.$form = checkFormElem.$el
        self.$form.formjs = self
        self.options = mergeObjects({}, Form.prototype.options, optionsObj)

        // BINDING CONTEXT FOR FUTURE EXECUTION
        self.options.fieldOptions.beforeValidation = self.options.fieldOptions.beforeValidation.map(cbFn => cbFn.bind(self))

        self.$form.noValidate = true

        dispatchCustomEvent( self.$form, customEvents.form.init )
    }

    destroy(){
        delete this.$form.formjs
        dispatchCustomEvent( this.$form, customEvents.form.destroy )
    }

    async validateField( field, fieldOptions ){
        const self = this
        let $field = field

        if( typeof field === 'string' ){
            const element = self.$form.elements.namedItem(field)
            if( isDOMNode(element) ){
                $field = element
            } else {
                $field = element[0]
            }
        }
        
        fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptions)
        
        const fieldValidity = await checkFieldValidity($field, fieldOptions, self.validationRules, self.validationErrors)

        dispatchCustomEvent( fieldValidity.$field, customEvents.field.validation, { detail: fieldValidity } )

        return finalizeFieldPromise(fieldValidity)
    }

    async validateForm( fieldOptions ){
        const self = this
        const $form = self.$form
        const $fields = getFormFields( $form, { hidden: false } )

        fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptions)

        const formVaidity = await checkFieldsValidity($fields, fieldOptions, self.validationRules, self.validationErrors)

        formVaidity.fields.forEach(obj => {
            obj.isCheckingForm = true
            dispatchCustomEvent( obj.$field, customEvents.field.validation, { detail: obj } )
        })

        dispatchCustomEvent( $form, customEvents.form.validation, { detail: formVaidity } )

        return finalizeFormPromise(formVaidity)
    }
    
    static addValidationErrors( errorsObj ){
        Form.prototype.validationErrors = mergeObjects({}, Form.prototype.validationErrors, errorsObj)
    }

    static addValidationRules( rulesObj ){
        Form.prototype.validationRules = mergeObjects({}, Form.prototype.validationRules, rulesObj)
    }
    
    static setOptions( optionsObj ){
        Form.prototype.options = mergeObjects({}, Form.prototype.options, optionsObj)
    }

}

Form.prototype.options = options
Form.prototype.validationErrors = {}
Form.prototype.validationRules = validationRules
Form.prototype.version = version

export default Form
