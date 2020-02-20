
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
            ]
        },
        formOptions: {
            ajaxOptions: {
                url: (isLocalEnv ? 'json/data.json' : 'json/json.php')
            },
            beforeSend: [
                function beforeSendTest ( data ){
                    console.log('beforeSend data', data);

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
            ]
        }
    };

var formsList = document.querySelectorAll('form');

Array.from(formsList).forEach(function(formEl, idx){
    var fNum = 'f'+(idx+1);

    if( isLocalEnv ){ formEl.method = 'GET'; }

    window[fNum] = new Form( formEl, options );

    formEl.addEventListener('fjs.field:validated', function(event){
        console.log(event.type, event.data);
        console.log( 'field "' + event.data.fieldEl.name + '" is valid? ', event.data.result );
        if( event.data.errors ){
            console.log('field errors:', event.data.errors);
        }
    });

    formEl.addEventListener('fjs.form:validated', function(event){
        console.log(event.type, event.data);
        event.data.fields.forEach(function(obj){
            console.log( 'field "' + obj.fieldEl.name + '" is valid? ', obj.result );
            if( obj.errors ){
                console.log('field errors:', obj.errors);
            }
        });
    });

    formEl.addEventListener('fjs.form:ajax-error', function(event){
        console.log(event.type);

        var instance = formEl.formjs;

        if( instance.options.formOptions.ajaxSubmit ){
            var feedbackEl = formEl.querySelector('[data-formjs-global-feedback]');
            feedbackEl.classList.remove( 'alert-success' );
            feedbackEl.classList.add( 'alert-danger' );
            feedbackEl.classList.remove( 'd-none' );
            feedbackEl.innerHTML = 'Oh no, something went wrong! :( Retry';
        }
    });

    formEl.addEventListener('fjs.form:ajax-success', function(event){
        console.log(event.type, event.data);

        var instance = formEl.formjs;

        if( instance.options.formOptions.ajaxSubmit ){
            var feedbackEl = formEl.querySelector('[data-formjs-global-feedback]');
            feedbackEl.classList.remove( 'alert-danger' );
            feedbackEl.classList.add( 'alert-success' );
            feedbackEl.classList.remove( 'd-none' );
            feedbackEl.innerHTML = 'Great! Your infos have been sent :D';
        }
    });

    formEl.addEventListener('fjs.form:ajax-complete', function(event){
        console.log(event.type);
    });

    window[fNum].init().then(function( obj ){
        console.log('formJsInstance '+ fNum +' obj.instance', obj.instance);
        console.log('formJsInstance '+ fNum +' obj.fields', obj.fields);
    });
});
