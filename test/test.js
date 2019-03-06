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

var options = {
        fieldOptions: {
            checkDirtyField: true,
            onPastePrevented: function( fieldEl ){
                console.log('onPastePrevented this', this);
                console.log('onPastePrevented field', fieldEl);
            },
            onValidation: function( fieldsArray ){
                console.log('onValidation this ', this);
                console.log('onValidation fieldsArray', fieldsArray);
                
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
            beforeSend: function( data ){
                console.log('beforeSend this', this);
                console.log('beforeSend data', data);

                var feedbackEl = this.formEl.querySelector('[data-formjs-global-feedback]');
                if( feedbackEl ){
                    feedbackEl.classList.add( 'd-none' );
                }

                return data;
            },
            onSubmitSuccess: function( ajaxData ){
                console.log('onSubmitSuccess this', this);
                console.log('onSubmitSuccess ajaxData JSON string', ajaxData);

                if( typeof ajaxData === 'string' ){
                    console.log('onSubmitSuccess ajaxData JSON object', JSON.parse(ajaxData));
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
            onSubmitError: function( ajaxData ){
                console.log('onSubmitError this', this);
                console.log('onSubmitError ajaxData', ajaxData);

                var formEl = this.formEl;

                if( this.options.formOptions.ajaxSubmit ){
                    var feedbackEl = formEl.querySelector('[data-formjs-global-feedback]');
                    feedbackEl.classList.remove( 'alert-success' );
                    feedbackEl.classList.add( 'alert-danger' );
                    feedbackEl.classList.remove( 'd-none' );
                    feedbackEl.innerHTML = 'Oh no, something went wrong! :( Retry';
                }
            },
            onSubmitComplete: function(){
                console.log('onSubmitComplete this', this);
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