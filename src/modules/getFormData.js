
export function getFormData( customFn = this.options.formOptions.getFormData ){

    let formData = {},
        self = this,
        formEl = self.formEl,
        formFieldsEl = formEl.querySelectorAll('input, select, textarea'),
        excludeSelectors = ':not([type="reset"]):not([type="submit"]):not([type="button"]):not([type="file"]):not([data-exclude-data])',
        filteredFields = Array.from(formFieldsEl).filter(elem => elem.matches(excludeSelectors) );
    
    if( typeof customFn === 'function' ){

        formData = customFn.call( self, filteredFields );

    } else {

        filteredFields.forEach(function( fieldEl ){
            let isCheckbox = fieldEl.type === 'checkbox',
                isRadio = fieldEl.type === 'radio',
                isSelect = fieldEl.matches('select'),
                name = fieldEl.name,
                value = fieldEl.value;
                         
            if( isCheckbox ) {
                
                value = fieldEl.checked;
                let checkboxes = Array.from( formEl.querySelectorAll('[name="'+ name +'"]') );
                if( checkboxes.length > 1 ){

                    value = [];
                    let checkedElems = checkboxes.filter(field => field.checked);
                    checkedElems.forEach(fieldEl => {
                        value.push( fieldEl.value );
                    });

                }
                    
            } else if( isRadio ){
                
                let checkedRadio = formEl.querySelector('[name="'+ name +'"]:checked');
                value = (checkedRadio === null ? null : checkedRadio.value);
                
            } else if( isSelect ){

                let selectedOpts = Array.from( fieldEl.options ).filter(option => option.selected);
                if( selectedOpts.length > 1 ){

                    value = [];
                    selectedOpts.forEach(fieldEl => {
                        value.push( fieldEl.value );
                    });

                }
            }

            formData[ name ] = value;
        });

    }
    
    return formData;
    
}
