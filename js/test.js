
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

                    var $feedback = this.$form.querySelector('[data-formjs-global-feedback]');
                    if( $feedback ){
                        $feedback.classList.add( 'd-none' );
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
                    return Promise.all( [1, 2, 3].map(function( $field ){
                        return new Promise(resolve => {
                            setTimeout(function(){
                                $field = $field + 1;
                                resolve({$field: $field});
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

Array.from(formsList).forEach(function($form, idx){
    var fNum = 'f'+(idx+1);

    if( isLocalEnv ){ $form.method = 'GET'; }

    $form.addEventListener('fjs.field:validation', function(event){
        console.log(event.type, event.detail);
        console.log( 'field "' + event.detail.$field.name + '" is valid? ', event.detail.result );
        if( event.detail.errors ){
            console.log('field errors:', event.detail.errors);
        }
    });

    $form.addEventListener('fjs.form:validation', function(event){
        console.log(event.type, event.detail);
        event.detail.fields.forEach(function(obj){
            console.log( 'field "' + obj.$field.name + '" is valid? ', obj.result );
            if( obj.errors ){
                console.log('field errors:', obj.errors);
            }
        });
    });

    $form.addEventListener('fjs.form:init', function(event){
        console.log(event.type, event.detail);
        event.detail.then(fields => {
            console.log(fields);
        })
    });

    $form.addEventListener('fjs.form:submit', function(e){
        console.log(e.type, e.detail);
        e.detail
            .then(function(data){
                console.log(e.type, 'then', data);
                var $form = e.target;
                if( $form.formjs.options.formOptions.ajaxSubmit ){
                    var $feedback = $form.querySelector('[data-formjs-global-feedback]');
                    $feedback.classList.remove( 'alert-danger' );
                    $feedback.classList.add( 'alert-success' );
                    $feedback.classList.remove( 'd-none' );
                    $feedback.innerHTML = 'Great! Your infos have been sent :D';
                }
            })
            .catch(function(error){
                console.log(e.type, 'catch', error);
                var $form = e.target;
                if( $form.formjs.options.formOptions.ajaxSubmit ){
                    var $feedback = $form.querySelector('[data-formjs-global-feedback]');
                    $feedback.classList.remove( 'alert-success' );
                    $feedback.classList.add( 'alert-danger' );
                    $feedback.classList.remove( 'd-none' );
                    $feedback.innerHTML = 'Oh no, something went wrong! :( Retry';
                }
            })
            .finally(function(){
                console.log(e.type, 'finally');
            });
    });

    window[fNum] = new Form( $form, options );
});
