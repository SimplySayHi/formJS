
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

formInstance.init().then(function( obj ){
    console.log('formJsInstance obj.instance', obj.instance);
    console.log('formJsInstance obj.fields', obj.fields);
});

