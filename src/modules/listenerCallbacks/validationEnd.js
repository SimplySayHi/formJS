
import { addClass, fieldsStringSelector, removeClass } from '../helpers';

export const validationEnd = function( event ){

    const fieldsArray = event.detail.fieldEl ? [event.detail] : event.detail.fields,
          options = fieldsArray[0].fieldEl.closest('form').formjs.options.fieldOptions;

    fieldsArray.forEach(obj => {
        const fieldEl = obj.fieldEl;
        if( fieldEl.matches( fieldsStringSelector ) ){
            const containerEl = fieldEl.closest( options.questionContainer ),
                isReqFrom = fieldEl.matches('[data-required-from]'),
                reqMoreEl = document.querySelector( fieldEl.getAttribute('data-required-from') );

            if( containerEl !== null ){
                removeClass( containerEl, options.cssClasses.pending );
            }

            if( containerEl !== null && !options.skipUIfeedback ){

                if( obj.result ){

                    if( !isReqFrom || (isReqFrom && reqMoreEl.checked) ){
                        // IF FIELD IS VALID
                        const errorClasses = options.cssClasses.error + ' ' + options.cssClasses.errorEmpty + ' ' + options.cssClasses.errorRule;
                        removeClass( containerEl, errorClasses );
                        addClass( containerEl, options.cssClasses.valid );
                    }

                } else {

                    // IF FIELD IS NOT VALID
                    let extraErrorClass = options.cssClasses.errorRule;

                    // HANDLE CASE OF FIELD data-checks
                    const isChecks = fieldEl.matches('[data-checks]'),
                          checkedElLength = (isChecks ? containerEl.querySelectorAll('[name="' + fieldEl.name + '"]:checked').length : 0);

                    if( (!isChecks && (obj.errors && obj.errors.empty)) || (isChecks && checkedElLength === 0) ){
                        extraErrorClass = options.cssClasses.errorEmpty;
                    }

                    const errorClasses = options.cssClasses.error + ' ' + extraErrorClass,
                          errorClassToRemove = options.cssClasses.errorEmpty + ' ' + options.cssClasses.errorRule;
                    removeClass( containerEl, options.cssClasses.valid + ' ' + errorClassToRemove );
                    addClass( containerEl, errorClasses );

                }
            }
        }
    });

}
