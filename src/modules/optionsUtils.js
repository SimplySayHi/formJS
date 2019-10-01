
import { addClass, mergeObjects, removeClass } from './helper';

export const defaultCallbacksInOptions = {
    fieldOptions: {

        onValidation: function onValidationDefault ( fieldsArray, tempOptions = {} ) {

            let self = this,
                options = mergeObjects( {}, self.options.fieldOptions, tempOptions.fieldOptions );

            fieldsArray.forEach(function( obj ){
                let fieldEl = obj.fieldEl,
                    containerEl = fieldEl.closest('[data-formjs-question]'),
                    isReqFrom = fieldEl.matches('[data-required-from]'),
                    reqMoreEl = self.formEl.querySelector( fieldEl.getAttribute('data-required-from') );
                
                if( containerEl !== null && !options.skipUIfeedback ){
                    if( obj.result ){

                        if( !isReqFrom || (isReqFrom && reqMoreEl.checked) ){
                            // IF FIELD IS VALID
                            let errorClasses = options.cssClasses.error + ' ' + options.cssClasses.errorEmpty + ' ' + options.cssClasses.errorRule;
                            removeClass( containerEl, errorClasses );
                            addClass( containerEl, options.cssClasses.valid );
                        }

                    } else {

                        // IF FIELD IS NOT VALID
                        let extraErrorClass = options.cssClasses.errorRule;

                        // HANDLE CASE OF FIELD data-checks
                        let isChecks = fieldEl.matches('[data-checks]'),
                            checkedElLength = (isChecks ? containerEl.querySelectorAll('[name="' + fieldEl.name + '"]:checked').length : 0);

                        if( (!isChecks && (obj.errors && obj.errors.empty)) || (isChecks && checkedElLength === 0) ){
                            extraErrorClass = options.cssClasses.errorEmpty;
                        }

                        let errorClasses = options.cssClasses.error + ' ' + extraErrorClass,
                            errorClassToRemove = options.cssClasses.errorEmpty + ' ' + options.cssClasses.errorRule;
                        removeClass( containerEl, options.cssClasses.valid + ' ' + errorClassToRemove );
                        addClass( containerEl, errorClasses );

                    }
                }
            });
            
        }

    },
    formOptions: {

        getFormData: function getFormDataDefault ( filteredFields ) {

            let formData = {},
                self = this,
                formEl = self.formEl;

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

            return formData;

        }

    }
}
