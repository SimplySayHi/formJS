
var options = {
        fieldOptions: {
            onPastePrevented: function onPastePreventedTest ( fieldEl, tempOptions ){
                console.log('onPastePrevented field', fieldEl);
                console.log('onPastePrevented tempOptions', tempOptions);
            },
            onValidation: function onValidationTest ( fieldsArray, tempOptions ){
                console.log('onValidation fieldsArray', fieldsArray);
                console.log('onValidation tempOptions', tempOptions);
                
                fieldsArray.forEach(function(obj){
                    console.log( 'field "' + obj.fieldEl.name + '" is valid? ', obj.result );
                    if( obj.errors ){
                        console.log('field errors:', obj.errors);
                    }
                });
            }
        },
        formOptions: {
            ajaxOptions: {
                url: (function(){
                    var protocol = location.protocol,
                        url = (protocol.indexOf('http') > -1 ? 'json/json.php' : 'json/data.json');
                    return url;
                })()
            },
            beforeSend: function beforeSendTest ( data, tempOptions ){
                console.log('beforeSend data', data);
                console.log('beforeSend tempOptions', tempOptions);

                var feedbackEl = this.formEl.querySelector('[data-formjs-global-feedback]');
                if( feedbackEl ){
                    feedbackEl.classList.add( 'd-none' );
                }

                return data;
            },
            onSubmitSuccess: function onSubmitSuccessTest ( ajaxData, tempOptions ){
                console.log('onSubmitSuccess ajaxData', ajaxData);
                console.log('onSubmitSuccess tempOptions', tempOptions);

                if( typeof ajaxData === 'string' ){
                    ajaxData = JSON.parse(ajaxData);
                }

                var formEl = this.formEl;

                if( this.options.formOptions.ajaxSubmit ){
                    var feedbackEl = formEl.querySelector('[data-formjs-global-feedback]');
                    feedbackEl.classList.remove( 'alert-danger' );
                    feedbackEl.classList.add( 'alert-success' );
                    feedbackEl.classList.remove( 'd-none' );
                    feedbackEl.innerHTML = 'Great! Your infos have been sent :D';
                }
            },
            onSubmitError: function onSubmitErrorTest ( ajaxData, tempOptions ){
                console.log('onSubmitError ajaxData', ajaxData);
                console.log('onSubmitError tempOptions', tempOptions);

                var formEl = this.formEl;

                if( this.options.formOptions.ajaxSubmit ){
                    var feedbackEl = formEl.querySelector('[data-formjs-global-feedback]');
                    feedbackEl.classList.remove( 'alert-success' );
                    feedbackEl.classList.add( 'alert-danger' );
                    feedbackEl.classList.remove( 'd-none' );
                    feedbackEl.innerHTML = 'Oh no, something went wrong! :( Retry';
                }
            },
            onSubmitComplete: function onSubmitCompleteTest ( ajaxData, tempOptions ){
                console.log('onSubmitComplete ajaxData', ajaxData);
                console.log('onSubmitComplete tempOptions', tempOptions);
            }
        }
    };

var formsList = document.querySelectorAll('form');

Array.from(formsList).forEach(function(formEl, idx){
    var fNum = 'f'+(idx+1);

    window[fNum] = new Form( formEl, options );
    console.groupCollapsed('Form Instance '+ fNum);
        console.log( 'Form Instance', window[fNum] );
        console.log( 'fieldOptions', window[fNum].options.fieldOptions );
        console.log( 'formOptions', window[fNum].options.formOptions );
    console.groupEnd();
    window[fNum].init();
});

// MANUALLY TRIGGER VALIDATION CALLBACKS ON A SPECIFIED FIELD SPECIFYING THE VALIDITY
/*
var field = document.querySelector('[name="cap-required"]');
f1.options.fieldOptions.onValidation.forEach(function(fnName){
    fnName.call(f1, [{ fieldEl: field, result: false }]);
});
*/
