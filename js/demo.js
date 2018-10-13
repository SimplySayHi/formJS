document.addEventListener('click', function(e){
    var key = e.which || e.keyCode;

    if( key === 1 ){
        var elem = e.target,
            elemSelector = '.panel-collapsible .card-header',
            panelHeadingEL = (
                elem.matches(elemSelector) ? 
                elem : elem.closest(elemSelector)
            );
        
        if( panelHeadingEL ){
            e.preventDefault();
            
            var panelEl = elem.closest('.panel').querySelector('.card-body'),
                panelDisplay = panelEl.style.display;
            
            panelHeadingEL.classList.toggle('active');
            panelEl.style.display = (panelDisplay === '' || panelDisplay === 'none' ? 'block' : 'none');
        }
    }
}, false);

var optionsPlugin = {
        fieldOptions: {
            checkDirtyField: true,
            cssClasses: {
                dirty: 'dirty-field custom-dirty-field'
            },
            onPastePrevented: function( fieldEl ){
                console.log( 'Paste event prevented on field ', fieldEl );
            },
            onValidation: function( fieldsArray ){
                console.log('onValidation fieldsArray ', fieldsArray);
                for(var f=0; f<fieldsArray.length; f++){
                    var field = fieldsArray[f];
                    console.log( 'field "' + field.field.name + '" is valid? ', field.result );
                }
            },
            strictHtmlValidation: true
        },
        formOptions: {
            beforeSend: function( data ){
                console.log('this', this);
                console.log( 'beforeSend data ', data );

                var feedbackEl = this.formEl.querySelector('[data-formjs-global-feedback]');
                if( feedbackEl ){
                    feedbackEl.classList.add( 'd-none' );
                }

                return data;
            },
            onSubmitSuccess: function( ajaxData ){
                console.log('this', this);
                console.log( 'onSubmitSuccess ajaxData ', ajaxData );

                let formEl = this.formEl;

                if( formEl.matches('[data-ajax-submit]') ){
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

                if( formEl.matches('[data-ajax-submit]') ){
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

const formsList = document.querySelectorAll('form');

var f1 = new Form( formsList[0], optionsPlugin );
window.f1 = f1;
console.log( 'Form Instance f1', f1.options.fieldOptions );

// WORKS FOR BOTH OLD AND NEW INSTANCES
Form.addValidationRules({
    zip: function( string ){ return /^[5-9]{3}$/.test( string ); }
});

// WORKS ONLY FOR NEW INSTANCES
var addToDefOpts = {
        fieldOptions: {
            maxFileSize: 99,
            validateOnEvents: 'blur',
            cssClasses: { error: 'has-error custom-error-class' }
        }
    };
Form.setOptions( addToDefOpts );

const pswField = document.querySelectorAll('form [name="password"]');
Array.from(pswField).forEach(function(field){
    field.value = 'asdAsd123';
    // MANUAL EVENT TRIGGERING
    // https://developer.mozilla.org/en-US/docs/Web/API/Event/Event
    var inputEvent = new Event('input', {'bubbles': true});
    field.dispatchEvent(inputEvent);
});

// --------------------

//console.log( 'f.getFormJSON()', f.getFormJSON() );

//console.log( 'f.isValidField()', f.isValidField(document.querySelector('form [name="email"]')) );

//console.log( 'f.isValidForm() ', f.isValidForm() );

// --------------------

//var f2 = new Form( formsList[1], {fieldOptions: {maxFileSize: 200, validateOnEvents: 'input change blur' }} );
var f2 = new Form( formsList[1], optionsPlugin );
window.f2 = f2;
console.log( 'Form Instance f2', f2.options.fieldOptions );

var f3 = new Form( formsList[2] );
window.f3 = f3;
console.log( 'Form Instance f3', f3.options.fieldOptions );

var f4 = new Form( formsList[3], optionsPlugin );
window.f4 = f4;
console.log( 'Form Instance f4', f4.options.fieldOptions );

var f5 = new Form( formsList[4], {fieldOptions: {checkDirtyField: true}, formOptions: optionsPlugin.formOptions} );
window.f5 = f5;
console.log( 'Form Instance f5', f5.options.fieldOptions );

f5.formEl.addEventListener('submit', function(event){
    f5.submit({}, event);
});
