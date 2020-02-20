
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

function removeClass ( element, cssClasses ){
    if( cssClasses ){
        cssClasses.trim().split(' ').forEach(function(className){
            element.classList.remove( className );
        });
    }
}

function onValidationDemoErrorsCss ( fieldsArray, options ){
    fieldsArray.forEach(function( obj ){
        var isValid = obj.result,
            fieldEl = obj.fieldEl,
            containerEl = fieldEl.closest('[data-formjs-question]');

        if( containerEl !== null && !options.fieldOptions.skipUIfeedback ){
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

function onValidationDemoErrorsJs ( fieldsArray, options ){
    fieldsArray.forEach(function( obj ){
        var isValid = obj.result,
            fieldEl = obj.fieldEl,
            containerEl = fieldEl.closest('[data-formjs-question]');

        if( containerEl !== null && !options.fieldOptions.skipUIfeedback ){
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

// WORKS ONLY FOR NEW INSTANCES
function setNewDefaultOptions () {
    var addToDefOpts = {
            fieldOptions: {
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
                }
            }
        },
        form_2: {},
        form_3: { formOptions: { ajaxSubmit: false } },
        form_4: {
            fieldOptions: {
                cssClasses: { dirty: 'is-dirty custom-dirty-field' }
            },
            formOptions: {
                ajaxSubmit: false
            }
        },
        form_5: {},
        form_6: {}
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

    window[fNum] = new Form( formEl, options );

    switch( num ){
        case 5:
            formEl.addEventListener('fjs.field:validation', function(event){
                console.log(event.type, event.data);
                console.log( 'field "' + event.data.fieldEl.name + '" is valid? ', event.data.result );
                if( event.data.errors ){
                    console.log('field errors:', event.data.errors);
                }
                onValidationDemoErrorsCss( [event.data], this.formjs.options );
            });
            formEl.addEventListener('fjs.form:validation', function(event){
                console.log(event.type, event.data);
                event.data.fields.forEach(function(obj){
                    console.log( 'field "' + obj.fieldEl.name + '" is valid? ', obj.result );
                    if( obj.errors ){
                        console.log('field errors:', obj.errors);
                    }
                });
                onValidationDemoErrorsCss( event.data.fields, this.formjs.options );
            });
            break;
        case 6:
            formEl.addEventListener('fjs.field:validation', function(event){
                console.log(event.type, event.data);
                console.log( 'field "' + event.data.fieldEl.name + '" is valid? ', event.data.result );
                if( event.data.errors ){
                    console.log('field errors:', event.data.errors);
                }
                onValidationDemoErrorsJs( [event.data], this.formjs.options );
            });
            formEl.addEventListener('fjs.form:validation', function(event){
                console.log(event.type, event.data);
                event.data.fields.forEach(function(obj){
                    console.log( 'field "' + obj.fieldEl.name + '" is valid? ', obj.result );
                    if( obj.errors ){
                        console.log('field errors:', obj.errors);
                    }
                });
                onValidationDemoErrorsJs( event.data.fields, this.formjs.options );
            });
            break;
        default:
            formEl.addEventListener('fjs.field:validation', function(event){
                console.log(event.type, event.data);
                console.log( 'field "' + event.data.fieldEl.name + '" is valid? ', event.data.result );
                if( event.data.errors ){
                    console.log('field errors:', event.data.errors);
                }
            });
            formEl.addEventListener('fjs.form:validation', function(event){
                console.log(event.type, event.data);
                event.data.fields.forEach(function(obj){
                    console.log( 'field "' + obj.fieldEl.name + '" is valid? ', obj.result );
                    if( obj.errors ){
                        console.log('field errors:', obj.errors);
                    }
                });
            });
            break;
    }

    formEl.addEventListener('fjs.form:submit', function(e){
        console.log(e.type, e.data);
        e.data
            .catch(function(error){
                console.log(e.type, 'catch', error);
            })
            .then(function(data){
                console.log(e.type, 'then', data);
            })
            .finally(function(){
                console.log(e.type, 'finally');
            });
    }, false);

    window[fNum].init().then(function( obj ){
        console.log('formJsInstance '+ fNum +' obj.instance', obj.instance);
        console.log('formJsInstance '+ fNum +' obj.fields', obj.fields);
    });

});

// WORKS FOR BOTH OLD AND NEW INSTANCES
Form.addValidationRules({
    zip: function( string ){ return /^[5-9]{3}$/.test( string ); }
});

// POPULATE PASSWORD FIELDS
var pswFields = document.querySelectorAll('form [type="password"]');
Array.from(pswFields).forEach(function(field){
    var formInst = field.closest('form').formjs,
        eventName = (formInst ? formInst.options.fieldOptions.validateOnEvents.split(' ')[0] : 'input');

    field.value = 'asdAsd123';

    console.log('pasw trigger:', eventName);
    // MANUAL EVENT TRIGGERING
    // https://developer.mozilla.org/en-US/docs/Web/API/Event/Event
    var inputEvent = new Event(eventName, {'bubbles': true});
    field.dispatchEvent(inputEvent);
});
