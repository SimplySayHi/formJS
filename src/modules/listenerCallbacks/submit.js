
import { addClass, customEvents, dispatchCustomEvent, removeClass, runFunctionsSequence } from '../helpers'
import { ajaxCall } from '../ajaxCall'

export function submit( event ){

    const $form = event.target
    const instance = $form.formjs
    const options = instance.options
    const formCssClasses = options.formOptions.cssClasses
    const isAjaxForm = options.formOptions.ajaxSubmit
    const $btn = Array.from($form.elements).find($el => $el.matches('[type="submit"]'))

    const eventPreventDefault = ( enableBtn = true ) => {
        if( $btn && enableBtn ){ $btn.disabled = false }
        if( event ){ event.preventDefault() }
    }

    if( isAjaxForm ){
        eventPreventDefault(false)
    }

    if( $btn ){
        if( $btn.disabled ){
            eventPreventDefault(false)
            return false
        }
        $btn.disabled = true
    }

    removeClass( $form, `${formCssClasses.ajaxComplete} ${formCssClasses.ajaxError} ${formCssClasses.ajaxSuccess}` )
    addClass( $form, formCssClasses.submit )

    instance.validateForm()
        .then(async data => {
            
            const hasGroup = typeof data.group !== 'undefined'

            if( hasGroup && !data.canSubmit ){
                return [{ stopExecution: true }]
            }

            const beforeSendData = {
                stopExecution: false,
                formData: isAjaxForm ? instance.getFormData() : null
            }

            const rfsObject = {
                functionsList: options.formOptions.beforeSend,
                data: beforeSendData,
                stopConditionFn: function(data){ return data.stopExecution }
            }

            return await runFunctionsSequence(rfsObject)

        }).then(dataList => {

            if( dataList.some(({stopExecution}) => stopExecution) ){
                eventPreventDefault()
                return false
            }
            
            if( isAjaxForm ){
                const { formData } = dataList.pop()
                addClass( $form, formCssClasses.ajaxPending )
                dispatchCustomEvent( $form, customEvents.form.submit, { detail: ajaxCall( $form, formData, options ) } )
            }

        })
        .catch(() => {
            eventPreventDefault()
            removeClass( $form, formCssClasses.submit )
        })
    
}
