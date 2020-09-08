
var optionsPlugin = {
        formOptions: {
            beforeSend: function( data ){
                console.log( 'beforeSend data ', data );

                var feedbackEl = this.formEl.querySelector('[data-formjs-global-feedback]');
                feedbackEl.classList.add('d-none');

                return Promise.resolve(data);
            }
        }
    };

var formEl = document.querySelector('form');
var formInstance = new Form( formEl, optionsPlugin );

formEl.addEventListener('fjs.field:validation', function(event){
    console.log(event.type, event.detail);
    console.log( 'field "' + event.detail.fieldEl.name + '" is valid? ', event.detail.result );
    if( event.detail.errors ){
        console.log('field errors:', event.detail.errors);
    }
});

formEl.addEventListener('fjs.form:validation', function(event){
    console.log(event.type, event.detail);
    event.detail.fields.forEach(function(obj){
        console.log( 'field "' + obj.fieldEl.name + '" is valid? ', obj.result );
        if( obj.errors ){
            console.log('field errors:', obj.errors);
        }
    });
});

formEl.addEventListener('fjs.form:submit', function(e){
    console.log(e.type, e.detail);
    e.detail
        .then(function(data){
            console.log(e.type, 'then', data);
            var formEl = e.target;
            if( formEl.formjs.options.formOptions.ajaxSubmit ){
                var feedbackEl = formEl.querySelector('[data-formjs-global-feedback]');
                feedbackEl.classList.remove( 'alert-danger' );
                feedbackEl.classList.add( 'alert-success' );
                feedbackEl.classList.remove( 'd-none' );
                feedbackEl.innerHTML = 'Great! Your request has been sent :D';
            }
        })
        .catch(function(error){
            console.log(e.type, 'catch', error);
            var formEl = e.target;
            if( formEl.formjs.options.formOptions.ajaxSubmit ){
                var feedbackEl = formEl.querySelector('[data-formjs-global-feedback]');
                feedbackEl.classList.remove( 'alert-success' );
                feedbackEl.classList.add( 'alert-danger' );
                feedbackEl.classList.remove( 'd-none' );
                feedbackEl.innerHTML = 'Oh no, something went wrong! :( Retry';
            }
        })
        .finally(function(){
            console.log(e.type, 'finally');
        });
}, false);

formInstance.validateFilledFields().then(function( fields ){
    initCharLengthFields( formEl );
    initMaxFileSizeFields( formEl );
    console.log('validated fields', fields);
});

