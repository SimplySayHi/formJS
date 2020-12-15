
var optionsPlugin = {
        formOptions: {
            beforeSend: function( data ){
                console.log( 'beforeSend data ', data );

                var $feedback = this.$form.querySelector('[data-formjs-global-feedback]');
                $feedback.classList.add('d-none');

                return Promise.resolve(data);
            }
        }
    };

var $form = document.querySelector('form');

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
                $feedback.innerHTML = 'Great! Your request has been sent :D';
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

var formInstance = new Form( $form, optionsPlugin );
