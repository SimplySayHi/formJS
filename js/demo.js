
function addClass ( element, cssClasses ){
    if( cssClasses ){
        cssClasses.trim().split(' ').forEach(function(className){
            element.classList.add( className );
        });
    }
}

function getErrorRuleClassesFromContainer ( containerEl ) {
    let errorClasses = '';

    errorClasses = Array.from(containerEl.classList).filter(function( cssClass ){
        return cssClass.indexOf('has-error-rule-') === 0;
    }).join(' ');

    return errorClasses;
}

function getErrorRuleClassesFromErrorsObj ( errorsObj ) {
    let errorClasses = '';

    for(let errorName in errorsObj){
        if( errorName !== 'empty' && errorName !== 'rule' ){
            errorClasses += ' has-error-rule-' + errorName;
        }
    }

    return errorClasses.trim();
}

function getFormInstance ( fieldEl ) {
    var instName = fieldEl.closest('form').getAttribute('data-formjs-instance-name');
    if( instName ){
        return window[instName];
    }
    return null;
}

function removeClass ( element, cssClasses ){
    if( cssClasses ){
        cssClasses.trim().split(' ').forEach(function(className){
            element.classList.remove( className );
        });
    }
}

// WORKS ONLY FOR NEW INSTANCES
function setNewDefaultOptions () {
    var addToDefOpts = {
            fieldOptions: {
                onValidation: function onValidationDemoDefaultNew ( fieldsArray ){},
                maxFileSize: 99,
                validateOnEvents: 'blur change',
                cssClasses: { error: 'has-error custom-error-class' }
            }
        };
    Form.setOptions( addToDefOpts );
}

var formsList = document.querySelectorAll('form'),
    optionsObjs = {
        form_1: {
            fieldOptions: {
                cssClasses: { dirty: 'is-dirty custom-dirty-field' },
                onPastePrevented: function onPastePreventedDemo01 ( fieldEl ){
                    console.log( 'Paste event prevented on field ', fieldEl );
                },
                onValidation: function onValidationDemo01 ( fieldsArray ){
                    console.log('onValidation fieldsArray ', fieldsArray);
                    fieldsArray.forEach(function(obj){
                        console.log( 'field "' + obj.fieldEl.name + '" is valid? ', obj.result );
                        if( obj.errors ){
                            console.log('field errors:', obj.errors);
                        }
                    });
                }
            },
            formOptions: {
                beforeSend: function beforeSendDemo01 ( data ){
                    console.log( 'beforeSend data ', data );

                    var feedbackEl = this.formEl.querySelector('[data-formjs-global-feedback]');
                    if( feedbackEl ){
                        feedbackEl.classList.add( 'd-none' );
                    }

                    return Promise.resolve(data);
                },
                onSubmitSuccess: function onSubmitSuccessDemo01 ( ajaxData ){
                    console.log( 'onSubmitSuccess ajaxData ', ajaxData );

                    let formEl = this.formEl;

                    if( this.options.formOptions.ajaxSubmit ){
                        var feedbackEl = formEl.querySelector('[data-formjs-global-feedback]');
                        feedbackEl.classList.remove( 'alert-danger' );
                        feedbackEl.classList.add( 'alert-success' );
                        feedbackEl.classList.remove( 'd-none' );
                        feedbackEl.innerHTML = 'Great! Your infos have been sent :D';
                    }
                },
                onSubmitError: function onSubmitErrorDemo01 ( ajaxData ){
                    console.log( 'onSubmitError ajaxData ', ajaxData );

                    let formEl = this.formEl;

                    if( this.options.formOptions.ajaxSubmit ){
                        var feedbackEl = formEl.querySelector('[data-formjs-global-feedback]');
                        feedbackEl.classList.remove( 'alert-success' );
                        feedbackEl.classList.add( 'alert-danger' );
                        feedbackEl.classList.remove( 'd-none' );
                        feedbackEl.innerHTML = 'Oh no, something went wrong! :( Retry';
                    }
                },
                onSubmitComplete: function onSubmitCompleteDemo01 (){
                    console.log('onSubmitComplete...');
                }
            }
        },
        form_2: {},
        form_3: { formOptions: { ajaxSubmit: false } },
        form_4: {
            fieldOptions: {
                cssClasses: { dirty: 'is-dirty custom-dirty-field' },
                onPastePrevented: function onPastePreventedDemo02 ( fieldEl ){
                    console.log( 'Paste event prevented on field ', fieldEl );
                },
                onValidation: function onValidationDemo02 ( fieldsArray ){
                    console.log('onValidation fieldsArray ', fieldsArray);
                    fieldsArray.forEach(function(obj){
                        console.log( 'field "' + obj.fieldEl.name + '" is valid? ', obj.result );
                        if( obj.errors ){
                            console.log('field errors:', obj.errors);
                        }
                    });
                }
            },
            formOptions: {
                ajaxSubmit: false
            }
        },
        form_5: {
            fieldOptions: {
                onValidation: function onValidationDemoErrorsCss ( fieldsArray ){
                    var self = this;
                    fieldsArray.forEach(function( obj ){
                        var isValid = obj.result,
                            fieldEl = obj.fieldEl,
                            containerEl = fieldEl.closest('[data-formjs-question]');

                        if( containerEl !== null && !self.options.fieldOptions.skipUIfeedback ){
                            if( isValid ){

                                var errorClasses = getErrorRuleClassesFromContainer(containerEl);
                                if( errorClasses ){
                                    removeClass( containerEl, errorClasses );
                                }

                            } else {

                                var errorClasses = getErrorRuleClassesFromErrorsObj(obj.errors),
                                    errorClassToRemove = getErrorRuleClassesFromContainer(containerEl);
                                removeClass( containerEl, errorClassToRemove );
                                addClass( containerEl, errorClasses );

                            }
                        }
                    });
                }
            }
        },
        form_6: {
            fieldOptions: {
                onValidation: function onValidationDemoErrorsJs ( fieldsArray ){
                    var self = this;
                    fieldsArray.forEach(function( obj ){
                        var isValid = obj.result,
                            fieldEl = obj.fieldEl,
                            containerEl = fieldEl.closest('[data-formjs-question]');

                        if( containerEl !== null && !self.options.fieldOptions.skipUIfeedback ){
                            if( isValid ){

                                // REMOVE ERRORS FROM PAGE
                                containerEl.querySelector('.field-error-message').innerHTML = '';

                            } else {

                                // PRINT ERRORS AS FOR obj.errors
                                if( obj.errors ){
                                    var errorsHTML = '';

                                    if( obj.errors.empty ){
                                        errorsHTML += '<p>This field cannot be empty</p>';
                                    } else {
                                        for(var errorName in obj.errors){
                                            if( errorName !== 'rule' ){
                                                var printError = errorName.replace(/([A-Z])/g, function(all, letter){
                                                        return ' ' + letter.toLowerCase();
                                                    });
                                                errorsHTML += '<li>Error: '+ printError +'</li>';
                                            }
                                        }
                                        errorsHTML = 'This field is not valid:<ul>' + errorsHTML + '</ul>';
                                    }

                                    containerEl.querySelector('.field-error-message').innerHTML = errorsHTML;
                                }

                            }
                        }
                    });
                }
            }
        }
    };

Array.from(formsList).forEach(function(formEl, idx){
    var num = idx + 1,
        fNum = 'f' + num,
        options = optionsObjs['form_'+num] || optionsObjs.form_1;

    switch( num ){

        case 2:
            // CHANGE DEFAULT OPTIONS BEFORE INITIALIZE THE 2ND FORM
            setNewDefaultOptions();
            break;

        default: break;

    }

    formEl.setAttribute('data-formjs-instance-name', fNum);
    window[fNum] = new Form( formEl, options );
    window[fNum].init().then(function( obj ){
        console.groupCollapsed('Form Instance '+ fNum);
            console.log( '+++ instance', obj.instance );
            if( obj.fields.length > 0 ){
                console.log('+++ fields', obj.fields);
            }
            console.log( '+++ fieldOptions', obj.instance.options.fieldOptions );
            console.log( '+++ formOptions', obj.instance.options.formOptions );
        console.groupEnd();
    });

});

// WORKS FOR BOTH OLD AND NEW INSTANCES
Form.addValidationRules({
    zip: function( string ){ return /^[5-9]{3}$/.test( string ); }
});

// POPULATE PASSWORD FIELDS
var pswFields = document.querySelectorAll('form [type="password"]');
Array.from(pswFields).forEach(function(field){
    var formInst = getFormInstance(field),
        eventName = (formInst ? formInst.options.fieldOptions.validateOnEvents.split(' ')[0] : 'input');

    field.value = 'asdAsd123';

    console.log('pasw trigger:', eventName);
    // MANUAL EVENT TRIGGERING
    // https://developer.mozilla.org/en-US/docs/Web/API/Event/Event
    var inputEvent = new Event(eventName, {'bubbles': true});
    field.dispatchEvent(inputEvent);
});
