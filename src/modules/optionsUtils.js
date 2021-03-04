
import { addClass, checkDirtyField, isFieldForChangeEvent } from './helpers';

export const beforeValidation = function beforeValidationDefault ( { $field, fieldOptions } ) {

    if( fieldOptions.trimValue && !isFieldForChangeEvent($field) ){
        $field.value = $field.value.trim();
    }

    checkDirtyField( $field, fieldOptions );

    if( !fieldOptions.skipUIfeedback ){
        addClass( $field.closest( fieldOptions.questionContainer ), fieldOptions.cssClasses.pending );
    }

}

export const getFormData = function getFormDataDefault ( $filteredFields, trimValues ) {

    const formData = {},
          $form = this.$form;

    $filteredFields.forEach($field => {
        const isCheckbox = $field.type === 'checkbox',
              isRadio = $field.type === 'radio',
              isSelect = $field.matches('select'),
              name = $field.name;
        let value = trimValues ? $field.value.trim() : $field.value;
                        
        if( isCheckbox ) {
            
            value = $field.checked;
            let $checkboxes = Array.from( $form.querySelectorAll('[name="'+ name +'"]') );
            if( $checkboxes.length > 1 ){

                value = [];
                let $checked = $checkboxes.filter(field => field.checked);
                $checked.forEach($field => {
                    value.push( $field.value );
                });

            }
                
        } else if( isRadio ){
            
            const $checkedRadio = $form.querySelector('[name="'+ name +'"]:checked');
            value = ($checkedRadio === null ? null : $checkedRadio.value);
            
        } else if( isSelect ){

            const $selectedOpts = Array.from( $field.options ).filter(option => option.selected);
            if( $selectedOpts.length > 1 ){

                value = [];
                $selectedOpts.forEach($field => {
                    value.push( $field.value );
                });

            }
        }

        formData[ name ] = value;
    });

    return formData;

}
