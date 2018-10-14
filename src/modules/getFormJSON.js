export function getFormJSON(){
    let formData = {},
        formEl = this.formEl,
        formFieldsEl = formEl.querySelectorAll('input, select, textarea'),
        excludeSelectors = ':not([type="reset"]):not([type="submit"]):not([type="button"]):not([type="file"]):not([data-exclude-json])',
        filteredFields = Array.from(formFieldsEl).filter(elem => elem.matches(excludeSelectors) );
    
    filteredFields.forEach(function( fieldEl ){
        let isCheckbox = fieldEl.type === 'checkbox',
            isRadio = fieldEl.type === 'radio',
            isSelect = fieldEl.matches('select'),
            name = fieldEl.name,
            value = ( isCheckbox || isSelect ? [] : fieldEl.value );
        
        if( isCheckbox || isRadio ){
            let checkedFieldsEl = Array.from( formEl.querySelectorAll('[name="'+ name +'"]:checked') );
            
            if( isRadio ){
                
                value = (checkedFieldsEl.length === 0 ? null : checkedFieldsEl[0].value);
                
            } else {
                
                checkedFieldsEl.forEach(fieldEl => {
                    value.push( fieldEl.value );
                });
                
            }
        } else if( isSelect ){

            let optionsList = Array.from( fieldEl.options ).filter(option => option.selected);
            optionsList.forEach(fieldEl => {
                value.push( fieldEl.value );
            });
        }

        formData[ name ] = value;
    });
    
    return formData;
}