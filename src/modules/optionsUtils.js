
import { addClass, checkDirtyField } from './helpers';

export const defaultCallbacksInOptions = {
    fieldOptions: {

        beforeValidation: function beforeValidationDefault ( fieldObj ) {

            const fieldOptions = this.options.fieldOptions;

            checkDirtyField( fieldObj.fieldEl, fieldOptions );
            if( !fieldOptions.skipUIfeedback ){
                addClass( fieldObj.fieldEl.closest( fieldOptions.questionContainer ), fieldOptions.cssClasses.pending );
            }

        }

    },
    formOptions: {

        getFormData: function getFormDataDefault ( filteredFields ) {

            const formData = {},
                  formEl = this.formEl;

            filteredFields.forEach(function( fieldEl ){
                const isCheckbox = fieldEl.type === 'checkbox',
                      isRadio = fieldEl.type === 'radio',
                      isSelect = fieldEl.matches('select'),
                      name = fieldEl.name;
                let value = fieldEl.value;
                                
                if( isCheckbox ) {
                    
                    value = fieldEl.checked;
                    const checkboxes = Array.from( formEl.querySelectorAll('[name="'+ name +'"]') );
                    if( checkboxes.length > 1 ){

                        value = [];
                        const checkedElems = checkboxes.filter(field => field.checked);
                        checkedElems.forEach(fieldEl => {
                            value.push( fieldEl.value );
                        });

                    }
                        
                } else if( isRadio ){
                    
                    const checkedRadio = formEl.querySelector('[name="'+ name +'"]:checked');
                    value = (checkedRadio === null ? null : checkedRadio.value);
                    
                } else if( isSelect ){

                    const selectedOpts = Array.from( fieldEl.options ).filter(option => option.selected);
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
