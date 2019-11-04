
var options = {
        fieldOptions: {
            beforeValidation: [
                function beforeValidation_Test1( fieldObj ){
                    console.log('--- beforeValidation_Test 1 fieldObj', fieldObj);
                },
                function beforeValidation_Test2( fieldObj ){
                    console.log('--- beforeValidation_Test 2 fieldObj', fieldObj);
                    /* return new Promise(function(resolve){
                        setTimeout(function(){
                            resolve( fieldObj );
                        }, 3000);
                    }); */
                },
                function beforeValidation_Test3( fieldObj ){
                    console.log('--- beforeValidation_Test 3 fieldObj', fieldObj);
                    fieldObj.aaa = 'ciao';
                    return fieldObj;
                }
            ],
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

                if( fieldsArray.length > 1 ){
                    console.log('--- onValidationTest fields list', fieldsArray);
                    const formValidity = fieldsArray.filter(function(field){ return !field.result; }).length === 0 ? 'VALID' : 'NOT VALID';
                    console.log('--- FORM IS ' + formValidity , this.formEl);
                }
            }
        },
        formOptions: {
            ajaxOptions: {
                url: (isLocalEnv ? 'json/data.json' : 'json/json.php')
            },
            beforeSend: [
                function beforeSendTest ( data, tempOptions ){
                    console.log('beforeSend data', data);
                    console.log('beforeSend tempOptions', tempOptions);

                    var feedbackEl = this.formEl.querySelector('[data-formjs-global-feedback]');
                    if( feedbackEl ){
                        feedbackEl.classList.add( 'd-none' );
                    }

                    return Promise.resolve(data);
                },
                function beforeSendTest_2 (data){
                    console.log('beforeSend additional');
                    data.formData.prova = 'ciao';
                    //data.stopExecution = true;
                    return Promise.resolve(data);
                },
                function beforeSendTest_3 (data){
                    console.log('beforeSend additional 2');
                    return Promise.all( [1, 2, 3].map(function( fieldEl ){
                        return new Promise(resolve => {
                            setTimeout(function(){
                                fieldEl = fieldEl + 1;
                                resolve({fieldEl: fieldEl});
                            }, 3000);
                        });
                    }) ).then(list => {

                        console.log('beforeSendTest_3 list', list);
                        return data;

                    });
                }
            ],
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

    if( isLocalEnv ){ formEl.method = 'GET'; }

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
