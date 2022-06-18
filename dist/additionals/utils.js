
var charCount = function( eventOrField ){

    var $field = eventOrField.target || eventOrField;

    if( $field.matches( '[data-char-count]' ) ){
        try {
            var dataFieldOptions = JSON.parse($field.getAttribute('data-field-options'));
            var questionContainer = (dataFieldOptions && dataFieldOptions.questionContainer) || $field.closest('form').formjs.options.fieldOptions.questionContainer;
            var $charLength = $field.closest(questionContainer).querySelector('[data-char-length]');

            if( $charLength ){
                var usedChars = $field.value.length;
                $charLength.textContent = usedChars;
            }
        } catch (error) {}
    }

};

var initCharLengthFields = function ( $form ) {
    var fieldOptions = $form.formjs.options.fieldOptions;
    var $fields = $form.querySelectorAll('input:not([type="reset"]):not([type="submit"]):not([type="button"]):not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), select, textarea');
    var $charCount = Array.from($fields).filter($field => $field.matches('[data-char-count]'));

    $charCount.forEach(function( $field ){
        var dataFieldOptions = JSON.parse($field.getAttribute('data-field-options'));
        var questionContainer = (dataFieldOptions && dataFieldOptions.questionContainer) || fieldOptions.questionContainer;
        var $container = $field.closest(questionContainer);
        var $charLength = $container.querySelector('[data-char-length]');

        if( $field.matches('[maxlength]') ){
            var maxlength = $field.maxLength;
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
};

var initMaxFileSizeFields = function ( $form ) {
    var fieldOptions = $form.formjs.options.fieldOptions;
    var $fileInputs = $form.querySelectorAll('[type="file"]');

    Array.from( $fileInputs ).forEach(function( $field ){
        var dataFieldOptions = JSON.parse($field.getAttribute('data-field-options'));
        var questionContainer = (dataFieldOptions && dataFieldOptions.questionContainer) || fieldOptions.questionContainer;
        var $printMaxFileSize = $field.closest(questionContainer).querySelector('[data-print-max-file-size]');

        if( $printMaxFileSize ){
            var maxFileSize = $field.getAttribute('data-max-file-size') || fieldOptions.maxFileSize;
            $printMaxFileSize.textContent = maxFileSize;
        }
    })
};
