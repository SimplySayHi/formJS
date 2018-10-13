export function getFormJSON(){
    var formData = {},
        formEl = this.formEl,
        formFieldsEl = formEl.querySelectorAll('input, select, textarea'),
        excludeSelectors = ':not([type="reset"]):not([type="submit"]):not([type="button"]):not([type="file"]):not([data-exclude-json])',
        filteredFields = Array.from(formFieldsEl).filter(elem => elem.matches(excludeSelectors) );
    
    filteredFields.forEach(function( fieldEl ){
        var isCheckbox = fieldEl.type === 'checkbox',
            isRadio = fieldEl.type === 'radio',
            name = fieldEl.name,
            value = ( isCheckbox ? [] : fieldEl.value );
        
        if( isCheckbox || isRadio ){
            var checkedFieldsEl = formEl.querySelectorAll('[name="'+ name +'"]:checked');
            
            if( isRadio ){
                
                value = (checkedFieldsEl.length === 0 ? null : checkedFieldsEl[0].value);
                
            } else {
                
                Array.from( checkedFieldsEl ).forEach(fieldEl => {
                    value.push( fieldEl.value );
                });
                
            }
        }

        formData[ name ] = value;
    });
    
    return formData;
}