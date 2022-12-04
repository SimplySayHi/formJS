
import { beforeValidation } from './optionsUtils/beforeValidation';
import { getFormData } from './optionsUtils/getFormData';

export const options = {

    fieldOptions: {
        beforeValidation:       [beforeValidation],
        cssClasses: {
            dirty:              'is-dirty',
            error:              'has-error',
            errorEmpty:         'has-error-empty',
            errorRule:          'has-error-rule',
            modified:           'is-modified',
            pending:            'is-pending',
            touched:            'is-touched',
            valid:              'is-valid'
        },
        focusOnRelated:         true,
        maxFileSize:            10,
        onValidationCheckAll:   false,
        preventPasteFields:     '[type="password"], [data-equal-to]',
        questionContainer:      '[data-formjs-question]',
        skipUIfeedback:         false,
        strictHtmlValidation:   true,
        trimValue:              false,
        validateOnEvents:       'input change'
    },

    formOptions: {
        ajaxOptions:            {
            cache:              'no-store',
            credentials:        'same-origin',
            headers: {
                                'Content-Type': 'application/json',
                                'Accept':       'application/json'
            },
            method:             'POST',
            mode:               'same-origin',
            redirect:           'follow',
            timeout:            0,
            url:                location.href
        },
        ajaxSubmit:             true,
        beforeSend:             [],
        cssClasses: {
            ajaxComplete:       'ajax-complete',
            ajaxError:          'ajax-error',
            ajaxPending:        'ajax-pending',
            ajaxSuccess:        'ajax-success',
            error:              'form-error',
            pending:            'form-pending',
            submit:             'is-submitting',
            valid:              'is-valid'
        },
        getFormData:            getFormData,
        groups:                 [],
        handleFileUpload:       true,
        handleSubmit:           true,
        nestedMultipartDataToJSON: true,
        onInitCheckFilled:      true
    }
    
}
