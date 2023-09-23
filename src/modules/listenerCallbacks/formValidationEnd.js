
import { addClass, removeClass } from '../helpers'

export const formValidationEnd = function( event ){

    const $form = event.target
    const { fieldOptions, formOptions } = $form.formjs.options
    
    if( !fieldOptions.skipUIfeedback ){
        const formClasses = formOptions.cssClasses.valid
        
        if( event.detail.result ){
            addClass($form, formClasses)
        } else {
            removeClass($form, formClasses)
        }
    }

}
