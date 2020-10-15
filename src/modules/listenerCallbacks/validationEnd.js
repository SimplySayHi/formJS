
import { addClass, removeClass } from '../helpers';

export const validationEnd = function( event ){

    const eventDetail = event.detail,
          $field = eventDetail.$field,
          options = $field.closest('form').formjs.options.fieldOptions,
          $container = $field.closest( options.questionContainer ),
          isReqFrom = $field.matches('[data-required-from]'),
          $reqMore = document.querySelector( $field.getAttribute('data-required-from') );

    if( $container !== null ){
        removeClass( $container, options.cssClasses.pending );
    }

    if( $container !== null && !options.skipUIfeedback ){

        if( eventDetail.result ){

            if( !isReqFrom || (isReqFrom && $reqMore.checked) ){
                // IF FIELD IS VALID
                const errorClasses = options.cssClasses.error + ' ' + options.cssClasses.errorEmpty + ' ' + options.cssClasses.errorRule;
                removeClass( $container, errorClasses );
                addClass( $container, options.cssClasses.valid );
            }

        } else {

            // IF FIELD IS NOT VALID
            let extraErrorClass = options.cssClasses.errorRule;

            // HANDLE CASE OF FIELD data-checks
            const isChecks = $field.matches('[data-checks]'),
                  checkedElLength = (isChecks ? $container.querySelectorAll('[name="' + $field.name + '"]:checked').length : 0);

            if( (!isChecks && (eventDetail.errors && eventDetail.errors.empty)) || (isChecks && checkedElLength === 0) ){
                extraErrorClass = options.cssClasses.errorEmpty;
            }

            let errorClasses = options.cssClasses.error + ' ' + extraErrorClass,
                errorClassToRemove = options.cssClasses.errorEmpty + ' ' + options.cssClasses.errorRule;
            removeClass( $container, options.cssClasses.valid + ' ' + errorClassToRemove );
            addClass( $container, errorClasses );

        }
    }

}
