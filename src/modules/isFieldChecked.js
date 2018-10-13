export function _isFieldChecked( fieldEl, fieldOptions ){
    var containerEl = (fieldEl.closest('form') || fieldEl.closest('[data-formjs-question]')),
        sameInputName = '[name="' + fieldEl.name + '"]';
                
    if( fieldEl.type === 'radio' ){

        var fieldChecked = containerEl.querySelector( sameInputName + ':checked' ),
            requireMoreEl = containerEl.querySelectorAll( sameInputName + '[data-require-more]' ),
            validReqFrom = true;
        
        if( requireMoreEl.length > 0 ){
            Array.from( requireMoreEl ).forEach(function( reqMoreEl ){
                var reqFromEl = containerEl.querySelector('[data-required-from="#'+ reqMoreEl.id +'"]');
                
                if( reqFromEl !== null ){
                    reqFromEl.required = false;

                    if( reqMoreEl.checked ){
                        reqFromEl.required = true;

                        if( fieldOptions.focusOnRelated ){
                            reqFromEl.focus();
                        } else {
                            if( reqMoreEl.required && reqFromEl.value.trim().length === 0 ){
                                validReqFrom = false;
                            }
                        }
                    } else {
                        reqFromEl.value = '';
                    }
                }
            });
        }

        return (fieldEl.required ? fieldChecked !== null && fieldChecked.value.trim().length > 0 && validReqFrom : true);

    } else if( fieldEl.type === 'checkbox' ) {
        
        if( fieldEl.closest('[data-max-check]') !== null ){
            
            var maxCheck = fieldEl.closest('[data-max-check]').getAttribute('data-max-check'),
                checkboxCHKDEl = containerEl.querySelectorAll('[name="' + fieldEl.name + '"]:checked'),
                checkedLength = checkboxCHKDEl.length,
                obj = {
                    isChecked: (checkedLength > 0 && checkedLength <= maxCheck),
                    exceedMaxCheck: checkedLength > maxCheck
                };
            return obj;
            
        } else {

            return fieldEl.checked;
            
        }
        
    }
}