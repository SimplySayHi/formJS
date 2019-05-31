
export function getFormData(){

    let self = this,
        formEl = self.formEl,
        formFieldsEl = formEl.querySelectorAll('input, select, textarea'),
        excludeSelectors = ':not([type="reset"]):not([type="submit"]):not([type="button"]):not([type="file"]):not([data-exclude-data])',
        filteredFields = Array.from(formFieldsEl).filter(elem => elem.matches(excludeSelectors) );
    
    return self.options.formOptions.getFormData.call( self, filteredFields );
    
}
