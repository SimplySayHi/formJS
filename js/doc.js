
var optionsPlugin = {
        fieldOptions: {
            checkDirtyField: true,
            onPastePrevented: function( fieldEl ){
                console.log( 'Paste event prevented on field ', fieldEl );
            },
            onValidation: function( fieldsArray ){
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
            beforeSend: function( data ){
                console.log('this', this);
                console.log( 'beforeSend data ', data );

                var feedbackEl = this.formEl.querySelector('[data-formjs-global-feedback]');
                feedbackEl.classList.add( 'd-none' );

                return data;
            },
            onSubmitSuccess: function( ajaxData ){
                console.log('this', this);
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
            onSubmitError: function( ajaxData ){
                console.log('this', this);
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
            onSubmitComplete: function( ajaxData ){
                console.log('this', this);
                console.log( 'onSubmitComplete ajaxData ', ajaxData );
            }
        }
    };

var formInstance = new Form( document.querySelector('form'), optionsPlugin ).init();
console.log('formInstance', formInstance);
