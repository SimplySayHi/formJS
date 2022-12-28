
import { addClass } from './addClass';
import { removeClass } from './removeClass';

const isValueModified = ( { form, tagName, type, name, value, multiple, options }, initValues ) => {
    // WORKAROUND FOR SURVEYJS: initValues IS {} AFTER SURVEY INIT
    if( !(name in initValues) ){ return true }

    const isRadio = type === 'radio';
    const isCheckbox = type === 'checkbox';
    const isSelect = tagName === 'SELECT';
    const isMultiAnswer = (isCheckbox && form.querySelectorAll(`[name="${name}"]`).length > 1) || (isSelect && multiple);

    if( isMultiAnswer ){
        const multiValues = isCheckbox ? 
                            [...form.querySelectorAll(`[name="${name}"]:checked`)].map($el => $el.value) : 
                            [...options].filter(opt => opt.selected);
        
        const checkValues = initValues[name].length !== multiValues.length || 
                            multiValues.filter(val => initValues[name].includes(val)).length !== initValues[name].length;

        return checkValues;
    } else if( isRadio ){
        const $checkedRadio = form.querySelector(`[name="${name}"]:checked`);

        value = null;

        if( $checkedRadio ){
            value = $checkedRadio.value;
        }
    }

    return value !== initValues[name];
}

export const checkModifiedField = ( $field, initialValues, fieldOptions ) => {

    const $container = $field.closest( fieldOptions.questionContainer ) || $field;
    const isModified = isValueModified( $field, initialValues );
    
    if( isModified ){
        addClass( $container, fieldOptions.cssClasses.modified );
    } else {
        removeClass( $container, fieldOptions.cssClasses.modified );
    }
    
}
