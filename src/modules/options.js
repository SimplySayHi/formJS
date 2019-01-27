
import { _addClass, _removeClass }  from './helper.js';
import { _checkDirtyField }         from './checkDirtyField.js';

const _defaultCallbacksInOptions = {
        fieldOptions: {
            onValidation: function ( fieldsArray ) {

                let self = this,
                    options = self.options.fieldOptions;

                fieldsArray.forEach(function( obj ){
                    let fieldEl = obj.field,
                        hasTypedValue = fieldEl.value.trim().length > 0,
                        containerEl = fieldEl.closest('[data-formjs-question]'),
                        isReqFrom = fieldEl.matches('[data-required-from]'),
                        reqMoreEl = self.formEl.querySelector( fieldEl.getAttribute('data-required-from') );

                    if( options.checkDirtyField ){
                        _checkDirtyField.call( self, fieldEl );
                    }
                    
                    if( containerEl !== null && !options.skipUIfeedback ){
                        if( obj.result ){

                            if( !isReqFrom || (isReqFrom && reqMoreEl.checked) ){
                                // IF FIELD IS VALID
                                let errorClasses = options.cssClasses.error + ' ' + options.cssClasses.errorEmpty + ' ' + options.cssClasses.errorRule;
                                _removeClass( containerEl, errorClasses );
                                _addClass( containerEl, options.cssClasses.valid );
                            }

                        } else {

                            // IF FIELD IS NOT VALID
                            let extraErrorClass = options.cssClasses.errorRule;

                            // HANDLE CASE OF FIELD data-checks
                            let isChecks = fieldEl.matches('[data-checks]'),
                                checkedElLength = (isChecks ? containerEl.querySelectorAll('[name="' + fieldEl.name + '"]:checked').length : 0);

                            if( (!isChecks && !hasTypedValue) || (isChecks && checkedElLength === 0) ){
                                extraErrorClass = options.cssClasses.errorEmpty;
                            }

                            let errorClasses = options.cssClasses.error + ' ' + extraErrorClass,
                                errorClassToRemove = options.cssClasses.errorEmpty + ' ' + options.cssClasses.errorRule;
                            _removeClass( containerEl, options.cssClasses.valid + ' ' + errorClassToRemove );
                            _addClass( containerEl, errorClasses );

                        }
                    }
                });
                
            }
        }
    };

export const options = {
        fieldOptions: {
            checkDirtyField:        false,
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
    },

    _setCallbackFunctionsInOptions = function(){

        const self = this,
              callbacks = {
                fieldOptions: ['onPastePrevented', 'onValidation'],
                formOptions: ['beforeSend', 'onSubmitComplete', 'onSubmitError', 'onSubmitSuccess']
            };

        for(let opt in callbacks){
            let fjsOpt = callbacks[opt];

            fjsOpt.forEach(function(fnName){
                let fnInOptions = self.options[opt][fnName],
                    fnList = [];

                if( typeof fnInOptions === 'function' ){
                    fnList.push(fnInOptions);
                } else if( Array.isArray(fnInOptions) ) {
                    fnList.concat(fnInOptions);
                } else {
                    return;
                }

                if( typeof _defaultCallbacksInOptions[opt] !== 'undefined' && typeof _defaultCallbacksInOptions[opt][fnName] === 'function' ){
                    fnList.unshift(_defaultCallbacksInOptions[opt][fnName]);
                }

                self.options[opt][fnName] = fnList;
            });
        }

    }
