
import { addClass, getJSONobjectFromFieldAttribute, removeClass, mergeObjects } from '../helpers';

export const validationEnd = function( event ){

    const eventData = event.data,
          fieldEl = eventData.fieldEl,
          dataFieldOptions = getJSONobjectFromFieldAttribute( fieldEl, 'data-field-options' ),
          fieldOptions = mergeObjects({}, fieldEl.closest('form').formjs.options.fieldOptions, dataFieldOptions),
          containerEl = fieldEl.closest( fieldOptions.questionContainer ),
          isReqFrom = fieldEl.matches('[data-required-from]'),
          reqMoreEl = document.querySelector( fieldEl.getAttribute('data-required-from') );

    if( containerEl && !fieldOptions.skipUIfeedback ){

        if( eventData.result ){

            if( !isReqFrom || (isReqFrom && reqMoreEl.checked) ){
                // IF FIELD IS VALID
                const errorClasses = fieldOptions.cssClasses.error + ' ' + fieldOptions.cssClasses.errorEmpty + ' ' + fieldOptions.cssClasses.errorRule;
                removeClass( containerEl, errorClasses );
                addClass( containerEl, fieldOptions.cssClasses.valid );
            }

        } else {

            // IF FIELD IS NOT VALID
            let extraErrorClass = fieldOptions.cssClasses.errorRule;

            // HANDLE CASE OF FIELD data-checks
            const isChecks = fieldEl.matches('[data-checks]'),
                    checkedElLength = (isChecks ? containerEl.querySelectorAll('[name="' + fieldEl.name + '"]:checked').length : 0);

            if( (!isChecks && (eventData.errors && eventData.errors.empty)) || (isChecks && checkedElLength === 0) ){
                extraErrorClass = fieldOptions.cssClasses.errorEmpty;
            }

            let errorClasses = fieldOptions.cssClasses.error + ' ' + extraErrorClass,
                errorClassToRemove = fieldOptions.cssClasses.errorEmpty + ' ' + fieldOptions.cssClasses.errorRule;
            removeClass( containerEl, fieldOptions.cssClasses.valid + ' ' + errorClassToRemove );
            addClass( containerEl, errorClasses );

        }
    }

}
