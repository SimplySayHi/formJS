
import { version }              from '../package.json'
import { 
    checkFormEl, 
    customEvents, 
    dispatchCustomEvent, 
    fieldsStringSelector, 
    finalizeFieldPromise, 
    finalizeFieldsGroupPromise, 
    finalizeFormPromise, 
    getFilledFields, 
    getFormFields, 
    isDOMNode, 
    isNodeList,
    mergeObjects
}                               from './modules/helpers'
import { options }              from './modules/options'
import { validationRules }      from './modules/validationRules'
import { formStartup }          from './modules/formStartup'
import { destroy }              from './modules/destroy'
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
        self.currentGroup = self.options.formOptions.groups[0]

        // BINDING CONTEXT FOR FUTURE EXECUTION
        const cbList = [
            // IN fieldOptions
            'beforeValidation',
            // IN formOptions
            'beforeSend',
            'getFormData'
        ]
        cbList.forEach(cbName => {
            const optionType = self.options.formOptions[cbName] ? 'formOptions' : 'fieldOptions'
            let cbOpt = self.options[optionType][cbName]

            if( cbOpt ){
                self.options[optionType][cbName] = ( Array.isArray(cbOpt) ? cbOpt.map(cbFn => cbFn.bind(self)) : cbOpt.bind(self) )
            }
        })

        formStartup( self.$form, self.options )

        const initOptions = {}
        if( self.options.formOptions.onInitCheckFilled ){
            initOptions.detail = self.validateFilledFields().catch(fields => {})
        }
        dispatchCustomEvent( self.$form, customEvents.form.init, initOptions )
    }

    destroy(){
        destroy(this.$form, this.options)
        dispatchCustomEvent( this.$form, customEvents.form.destroy )
    }
    
    getFormData( trimValues = this.options.fieldOptions.trimValue ){
        const $fields = this.$dataFields
        return this.options.formOptions.getFormData( $fields, trimValues )
    }

    // TODO:
    // UPDATE DOC => field MUST BE A DOM-NODE OR THE FIELD name/id
    // UPDATE DOC => onValidationCheckAll ALWAYS RUNS FORM/GROUP VALIDATION, NOT ONLY WHEN FIELD IS VALID
    async validateField( field, fieldOptions ){
        const self = this
        const $form = self.$form
        let $field = field

        if( typeof field === 'string' ){
            const element = $form.elements.namedItem(field)
            if( isDOMNode(element) ){
                $field = element
            } else {
                $field = element[0]
            }
        }

        fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptions)

        const fieldValidity = await checkFieldValidity($field, fieldOptions, self.validationRules, self.validationErrors)

        dispatchCustomEvent( fieldValidity.$field, customEvents.field.validation, { detail: fieldValidity } )

        if( fieldOptions.onValidationCheckAll ){
            const selector = self.currentGroup || fieldsStringSelector
            const $fields = self.$fields.filter($el => $el.matches(selector))
            const tempFieldOptions = mergeObjects({}, fieldOptions, { skipUIfeedback: true })

            checkFieldsValidity( $fields, tempFieldOptions, self.validationRules, self.validationErrors, fieldValidity )
                .then(dataForm => {
                    const groups = self.options.formOptions.groups
                    const validationEventName = self.currentGroup ? customEvents.group.validation : customEvents.form.validation
                    if( groups.length > 0 ){
                        dataForm.group = {
                            prev: groups[groups.indexOf(selector) - 1],
                            current: selector,
                            next: groups[groups.indexOf(selector) + 1]
                        }
                        dataForm.canSubmit = dataForm.result && !dataForm.group.next
                    }
                    dispatchCustomEvent( $form, validationEventName, { detail: dataForm } )
                })
        }

        return finalizeFieldPromise(fieldValidity)
    }

    async validateFieldsGroup( group = this.currentGroup, fieldOptions ){
        const self = this
        
        fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptions)
        
        const $fields = self.$fields.filter($el => $el.matches(group))
        const groupValidity = await checkFieldsValidity($fields, fieldOptions, self.validationRules, self.validationErrors)

        groupValidity.fields.forEach(obj => {
            obj.isCheckingGroup = true
            dispatchCustomEvent( obj.$field, customEvents.field.validation, { detail: obj } )
        })

        const groups = self.options.formOptions.groups
        if( groups.length > 0 ){
            groupValidity.group = {
                prev: groups[groups.indexOf(group) - 1],
                current: group,
                next: groups[groups.indexOf(group) + 1]
            }
            groupValidity.canSubmit = groupValidity.result && !groupValidity.group.next
        }

        dispatchCustomEvent( self.$form, customEvents.group.validation, { detail: groupValidity } )
        
        return finalizeFieldsGroupPromise(groupValidity)
    }

    async validateFilledFields( fieldOptions ){
        const self = this
        const $filledFields = getFilledFields( self.$form )

        fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptions)

        const filledFieldsValidity = await checkFieldsValidity($filledFields, fieldOptions, self.validationRules, self.validationErrors)

        filledFieldsValidity.fields.forEach(obj => {
            dispatchCustomEvent( obj.$field, customEvents.field.validation, { detail: obj } )
        })
        
        return finalizeFormPromise(filledFieldsValidity)
    }

    async validateForm( fieldOptions ){
        const self = this

        fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptions)

        if( self.currentGroup ){
            return self.validateFieldsGroup( self.currentGroup, fieldOptions )
        }

        const $form = self.$form
        const $fields = this.$visibleFields

        const formVaidity = await checkFieldsValidity($fields, fieldOptions, self.validationRules, self.validationErrors)

        formVaidity.fields.forEach(obj => {
            obj.isCheckingForm = true
            dispatchCustomEvent( obj.$field, customEvents.field.validation, { detail: obj } )
        })

        dispatchCustomEvent( $form, customEvents.form.validation, { detail: formVaidity } )

        return finalizeFormPromise(formVaidity)
    }

    get $fields () {
        return getFormFields( this.$form )
    }

    get $dataFields () {
        return getFormFields( this.$form, { file: false, excludeData: false } )
    }

    get $groupFields () {
        return this.$fields.filter($el => $el.matches(this.currentGroup))
    }

    get $uniqueFields () {
        return getFormFields( this.$form, { unique: true } )
    }

    get $visibleFields () {
        return getFormFields( this.$form, { hidden: false } )
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
