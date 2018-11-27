export const options = {
    fieldOptions: {
        checkDirtyField:        false,
        cssClasses: {
            dirty:              'dirty-field',
            error:              'has-error',
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
        ajaxOptions:            {
            async:              true,
            cache:              false,
            contentType:        'application/x-www-form-urlencoded; charset=UTF-8',
            headers: {
                                'X-Requested-With': 'XMLHttpRequest'
            },
            method:             'POST',
            timeout:            0,
            url:                location.href
        },
        ajaxSubmit:             true,
        beforeSend:             null,
        getFormJSON:            null,
        handleSubmit:           true,
        onSubmitComplete:       null,
        onSubmitError:          null,
        onSubmitSuccess:        null
    }
}