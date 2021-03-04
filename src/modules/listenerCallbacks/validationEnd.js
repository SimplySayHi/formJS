
import { addClass, getJSONobjectFromFieldAttribute, removeClass, mergeObjects } from '../helpers';

export const validationEnd = function( event ){

    const eventDetail = event.detail,
          $field = eventDetail.$field,
          dataFieldOptions = getJSONobjectFromFieldAttribute( $field, 'data-field-options' ),
          fieldOptions = mergeObjects({}, $field.closest('form').formjs.options.fieldOptions, dataFieldOptions),
          $container = $field.closest( fieldOptions.questionContainer ),
          isReqFrom = $field.matches('[data-required-from]'),
          $reqMore = document.querySelector( $field.getAttribute('data-required-from') );

    if( $container && !fieldOptions.skipUIfeedback ){

        if( eventDetail.result ){

            if( !isReqFrom || (isReqFrom && $reqMore.checked) ){
                // IF FIELD IS VALID
                const errorClasses = fieldOptions.cssClasses.error + ' ' + fieldOptions.cssClasses.errorEmpty + ' ' + fieldOptions.cssClasses.errorRule;
                removeClass( $container, errorClasses );
                addClass( $container, fieldOptions.cssClasses.valid );
            }

        } else {

            // IF FIELD IS NOT VALID
            let extraErrorClass = fieldOptions.cssClasses.errorRule;

            // HANDLE CASE OF FIELD data-checks
            const isChecks = $field.matches('[data-checks]'),
                  checkedElLength = (isChecks ? $container.querySelectorAll('[name="' + $field.name + '"]:checked').length : 0);

            if( (!isChecks && (eventDetail.errors && eventDetail.errors.empty)) || (isChecks && checkedElLength === 0) ){
                extraErrorClass = fieldOptions.cssClasses.errorEmpty;
            }

            let errorClasses = fieldOptions.cssClasses.error + ' ' + extraErrorClass,
                errorClassToRemove = fieldOptions.cssClasses.errorEmpty + ' ' + fieldOptions.cssClasses.errorRule;
            removeClass( $container, fieldOptions.cssClasses.valid + ' ' + errorClassToRemove );
            addClass( $container, errorClasses );

        }
    }

}
