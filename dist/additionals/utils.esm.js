
const charCount = function( eventOrField ){
    const $field = eventOrField.target || eventOrField;

    if( $field.matches( '[data-char-count]' ) ){
        try {
            const dataFieldOptions = JSON.parse($field.getAttribute('data-field-options'));
            const questionContainer = (dataFieldOptions && dataFieldOptions.questionContainer) || $field.closest('form').formjs.options.fieldOptions.questionContainer;
            const $charLength = $field.closest(questionContainer).querySelector('[data-char-length]');

            if( $charLength ){
                const usedChars = $field.value.length;
                $charLength.textContent = usedChars;
            }
        } catch (error) {}
    }
}

export const initCharLengthFields = function ( $form ) {
    const fieldOptions = $form.formjs.options.fieldOptions;
    const $fields = $form.querySelectorAll('input:not([type="reset"]):not([type="submit"]):not([type="button"]):not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), select, textarea');
    const $charCount = Array.from($fields).filter($field => $field.matches('[data-char-count]'));

    $charCount.forEach(function( $field ){
        const dataFieldOptions = JSON.parse($field.getAttribute('data-field-options'));
        const questionContainer = (dataFieldOptions && dataFieldOptions.questionContainer) || fieldOptions.questionContainer;
        const $container = $field.closest(questionContainer);
        const $charLength = $container.querySelector('[data-char-length]');

        if( $field.matches('[maxlength]') ){
            const maxlength = $field.maxLength;
            $container.querySelector('[data-char-maxlength]').textContent = maxlength;
        }
        if( $charLength ){
            charCount.call( null, $field );
        }
    })

    if( $charCount.length > 0 ){
        // INIT EVENT LISTENER FOR FIELDS WITH "data-char-count" ATTRIBUTE
        $form.addEventListener('input', charCount, false);
    }
}

export const initMaxFileSizeFields = function ( $form ) {
    const fieldOptions = $form.formjs.options.fieldOptions;
    const $fileInputs = $form.querySelectorAll('[type="file"]');

    Array.from( $fileInputs ).forEach(function( $field ){
        const dataFieldOptions = JSON.parse($field.getAttribute('data-field-options'));
        const questionContainer = (dataFieldOptions && dataFieldOptions.questionContainer) || fieldOptions.questionContainer;
        const $printMaxFileSize = $field.closest(questionContainer).querySelector('[data-print-max-file-size]');

        if( $printMaxFileSize ){
            const maxFileSize = $field.getAttribute('data-max-file-size') || fieldOptions.maxFileSize;
            $printMaxFileSize.textContent = maxFileSize;
        }
    })
}
