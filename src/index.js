
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

    constructor( form, options ){
        const argsL = arguments.length
        const { $el, result } = checkFormEl(form)

        if( argsL === 0 || (argsL > 0 && !form) ){
            throw new Error('First argument "form" is missing or falsy!')
        }
        if( isNodeList(form) ){
            throw new Error('First argument "form" must be a single DOM node or a form CSS selector, not a NodeList!')
        }
        if( !result ){
            throw new Error('First argument "form" is not a DOM node nor a form CSS selector!')
        }

        const self = this

        self.$form = $el
        self.$form.formjs = self
        self.options = mergeObjects({}, Form.prototype.options, options)
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
        const { $form, options } = this
        destroy($form, options)
        dispatchCustomEvent( $form, customEvents.form.destroy )
    }
    
    getFormData( trimValues = this.options.fieldOptions.trimValue ){
        return this.options.formOptions.getFormData( this.$dataFields, trimValues )
    }

    // TODO:
    // UPDATE DOC => field MUST BE A DOM-NODE OR THE FIELD name/id
    // UPDATE DOC => onValidationCheckAll ALWAYS RUNS FORM/GROUP VALIDATION, NOT ONLY WHEN FIELD IS VALID
    async validateField( field, fieldOptions ){
        const { $fields, $form, currentGroup, options, validationErrors, validationRules } = this
        let $field = field

        if( typeof field === 'string' ){
            const element = $form.elements.namedItem(field)
            if( isDOMNode(element) ){
                $field = element
            } else {
                $field = element[0]
            }
        }

        const fieldOptionsTemp = mergeObjects({}, options.fieldOptions, fieldOptions)
        const fieldValidity = await checkFieldValidity($field, fieldOptionsTemp, validationRules, validationErrors)

        dispatchCustomEvent( fieldValidity.$field, customEvents.field.validation, { detail: fieldValidity } )

        if( fieldOptionsTemp.onValidationCheckAll ){
            const selector = currentGroup || fieldsStringSelector
            const $otherFields = $fields.filter($el => $el.matches(selector))
            const fieldOptionsTempCheckAll = mergeObjects({}, fieldOptionsTemp, { skipUIfeedback: true })

            checkFieldsValidity( $otherFields, fieldOptionsTempCheckAll, validationRules, validationErrors, fieldValidity )
                .then(dataForm => {
                    const { groups } = options.formOptions
                    const validationEventName = currentGroup ? customEvents.group.validation : customEvents.form.validation
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
        const { $fields, $form, options, validationErrors, validationRules } = this
        const fieldOptionsTemp = mergeObjects({}, options.fieldOptions, fieldOptions)
        const $fieldsGroup = $fields.filter($el => $el.matches(group))
        const groupValidity = await checkFieldsValidity($fieldsGroup, fieldOptionsTemp, validationRules, validationErrors)

        groupValidity.fields.forEach(obj => {
            obj.isCheckingGroup = true
            dispatchCustomEvent( obj.$field, customEvents.field.validation, { detail: obj } )
        })

        const groups = options.formOptions.groups
        if( groups.length > 0 ){
            groupValidity.group = {
                prev: groups[groups.indexOf(group) - 1],
                current: group,
                next: groups[groups.indexOf(group) + 1]
            }
            groupValidity.canSubmit = groupValidity.result && !groupValidity.group.next
        }

        dispatchCustomEvent( $form, customEvents.group.validation, { detail: groupValidity } )
        
        return finalizeFieldsGroupPromise(groupValidity)
    }

    async validateFilledFields( fieldOptions ){
        const { $form, options, validationErrors, validationRules } = this
        const $filledFields = getFilledFields( $form )
        const fieldOptionsTemp = mergeObjects({}, options.fieldOptions, fieldOptions)
        const filledFieldsValidity = await checkFieldsValidity($filledFields, fieldOptionsTemp, validationRules, validationErrors)

        filledFieldsValidity.fields.forEach(obj => {
            dispatchCustomEvent( obj.$field, customEvents.field.validation, { detail: obj } )
        })
        
        return finalizeFormPromise(filledFieldsValidity)
    }

    async validateForm( fieldOptions ){
        const { $form, $visibleFields, currentGroup, options, validationErrors, validationRules } = this
        const fieldOptionsTemp = mergeObjects({}, options.fieldOptions, fieldOptions)

        if( currentGroup ){
            return await this.validateFieldsGroup( currentGroup, fieldOptionsTemp )
        }

        const formValidity = await checkFieldsValidity($visibleFields, fieldOptionsTemp, validationRules, validationErrors)

        formValidity.fields.forEach(obj => {
            obj.isCheckingForm = true
            dispatchCustomEvent( obj.$field, customEvents.field.validation, { detail: obj } )
        })

        dispatchCustomEvent( $form, customEvents.form.validation, { detail: formValidity } )

        return finalizeFormPromise(formValidity)
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
