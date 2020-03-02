
var charCount = function( eventOrField ){

    var fieldEl = eventOrField.target || eventOrField;

    if( fieldEl.matches( '[data-char-count]' ) ){
        try {
            var charLengthEl = fieldEl.closest('[data-formjs-question]').querySelector('[data-char-length]');

            if( charLengthEl !== null ){
                var usedChars = fieldEl.value.length;
                charLengthEl.textContent = usedChars;
            }
        } catch (error) {}
    }

};

var initCharLengthFields = function ( formEl ) {
    var charLengthElems = formEl.querySelectorAll('[data-char-length]');
    if( charLengthElems.length > 0 ){
        Array.from( charLengthElems ).forEach(function( element ){
            try {
                var containerEl = element.closest('[data-formjs-question]'),
                    fieldEl = containerEl.querySelector('[data-char-count]');

                if( fieldEl !== null && fieldEl.matches('[maxlength]') ){
                    // PRINT RELATED MAX LENGTH IN HTML
                    var maxlength = fieldEl.getAttribute('maxlength');
                    containerEl.querySelector('[data-char-maxlength]').textContent = maxlength;
                }

                // PRINT CHAR COUNT IN HTML
                charCount.call( null, fieldEl );
            } catch (error) {}
        });
        if( formEl.querySelectorAll('[data-char-count]').length > 0 ){
            // INIT EVENT LISTENER FOR FIELDS WITH "data-char-count" ATTRIBUTE
            formEl.addEventListener('input', charCount, false);
        }
    }
};

var initMaxFileSizeFields = function ( formEl ) {
    var fieldOptions = formEl.formjs.options.fieldOptions;
    var printMaxFileSizeElems = formEl.querySelectorAll('[data-print-max-file-size]');

    if( printMaxFileSizeElems.length > 0 ){
        Array.from( printMaxFileSizeElems ).forEach(function( element ){
            try {
                var fieldEl = element.closest('[data-formjs-question]').querySelector('[type="file"]');

                if( fieldEl !== null ){
                    maxFileSize = fieldEl.getAttribute('data-max-file-size') || fieldOptions.maxFileSize;
                    // PRINT MAX FILE SIZE FOR INPUTS WITH type="file"
                    element.textContent = maxFileSize;
                }
            } catch (error) {}
        });
    }
};

var forms = document.querySelectorAll('form[novalidate]');
Array.from( forms ).forEach(function( formEl ){
    //initCharLengthFields( formEl );
    //initMaxFileSizeFields( formEl );
});
