
export const formValidationEnd = function( event ){
    const $form = event.target
    const options = $form.formjs.options
    
    if( !options.fieldOptions.skipUIfeedback ){
        const clMethodName = event.detail.result ? 'add' : 'remove'
        $form.classList[clMethodName]( options.formOptions.cssClasses.valid )
    }
}
