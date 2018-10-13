export const options = {
    fieldOptions: {
        checkDirtyField:        false,
        cssClasses: {
            dirty:              'dirty-field',
            error:              'has-error',
            errorMultiChoice:   'has-error-switch',
            valid:              'is-valid'
        },
        focusOnRelated:         true,
        maxFileSize:            10,
        onPastePrevented:       null,
        onValidation:           null,
        preventPasteFields:     '[type="password"], [data-equal-to]',
        skipUIfeedback:         false,
        strictHtmlValidation:   true,
        validateOnEvents:       'input change'
    },
    formOptions: {
        beforeSend:             null,
        manageFileUpload:       true,
        onSubmitComplete:       null,
        onSubmitError:          null,
        onSubmitSuccess:        null
    }
}