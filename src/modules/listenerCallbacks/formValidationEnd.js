
export const formValidationEnd = function( event ){
    const formEl = event.target;
    const options = formEl.formjs.options;
    
    if( !options.fieldOptions.skipUIfeedback ){
        const clMethodName = event.detail.result ? 'add' : 'remove';
        formEl.classList[clMethodName]( options.formOptions.cssClasses.valid );
    }
}
