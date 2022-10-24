
import { addClass, getJSONobjectFromFieldAttribute, removeClass, mergeObjects } from '../helpers';

export const validationEnd = function( event ){

    const { $field, result, errors } = event.detail,
          dataFieldOptions = getJSONobjectFromFieldAttribute( $field, 'data-field-options' ),
          { cssClasses, questionContainer, skipUIfeedback } = mergeObjects({}, $field.form.formjs.options.fieldOptions, dataFieldOptions),
          $container = $field.closest( questionContainer ),
          isReqFrom = $field.matches('[data-required-from]'),
          $reqMore = document.querySelector( $field.getAttribute('data-required-from') );

    if( $container && !skipUIfeedback ){
        const formClasses = Object.values($field.form.formjs.options.formOptions.cssClasses)
                                .reduce((accString, cssClass) => {
                                    return `${accString} ${cssClass}`
                                }, '').trim();
        removeClass( $field.form, formClasses );
        removeClass( $container, cssClasses.pending );

        if( result ){

            if( !isReqFrom || (isReqFrom && $reqMore.checked) ){
                // IF FIELD IS VALID
                const errorClasses = cssClasses.error + ' ' + cssClasses.errorEmpty + ' ' + cssClasses.errorRule;
                removeClass( $container, errorClasses );
                addClass( $container, cssClasses.valid );
            }

        } else {

            // IF FIELD IS NOT VALID
            let extraErrorClass = cssClasses.errorRule;

            // HANDLE CASE OF FIELD data-checks
            const isChecks = $field.matches('[data-checks]'),
                  checkedElLength = (isChecks ? $container.querySelectorAll('[name="' + $field.name + '"]:checked').length : 0);

            if( (!isChecks && (errors && errors.empty)) || (isChecks && checkedElLength === 0) ){
                extraErrorClass = cssClasses.errorEmpty;
            }

            let errorClasses = cssClasses.error + ' ' + extraErrorClass,
                errorClassToRemove = cssClasses.errorEmpty + ' ' + cssClasses.errorRule;
            removeClass( $container, cssClasses.valid + ' ' + errorClassToRemove );
            addClass( $container, errorClasses );

        }
    }

}
