
import { ajaxOptions } from './optionsAjax.js';
//import { ajaxOptions } from './optionsAjaxXhr.js';

export const options = {

    fieldOptions: {
        cssClasses: {
            dirty:              'is-dirty',
            error:              'has-error',
            errorEmpty:         'has-error-empty',
            errorRule:          'has-error-rule',
            valid:              'is-valid'
        },
        focusOnRelated:         true,
        handleFileUpload:       true,
        handleValidation:       true,
        maxFileSize:            10,
        onPastePrevented:       null,
        onValidation:           null,
        preventPasteFields:     '[type="password"], [data-equal-to]',
        skipUIfeedback:         false,
        strictHtmlValidation:   true,
        validateOnEvents:       'input change'
    },

    formOptions: {
        ajaxOptions:            ajaxOptions,
        ajaxSubmit:             true,
        beforeSend:             null,
        getFormData:            null,
        handleSubmit:           true,
        onSubmitComplete:       null,
        onSubmitError:          null,
        onSubmitSuccess:        null
    }
    
}
