
import { _executeCallback, _mergeObjects, _serialize } from './helper.js';

// AJAX CALL USING fetch API
export function _ajaxCall( formDataObj ){

    let self = this,
        formEl = self.formEl,
        fieldOptions = self.options.fieldOptions,
        formOptions = self.options.formOptions,
        btnEl = formEl.querySelector('[type="submit"]'),
        timeoutTimer,
        ajaxOptions = _mergeObjects( {}, formOptions.ajaxOptions ),
        isMultipart = ajaxOptions.headers['Content-Type'] === 'multipart/form-data';

    ajaxOptions.body = formDataObj;
    
    // POST A FormData OBJECT ( multipart )
    if( isMultipart && fieldOptions.handleFileUpload ){
        let formDataMultipart = new FormData();
        
        for(let key in ajaxOptions.body){
            formDataMultipart.append( key, ajaxOptions.body[key] );
        }
        
        Array.from( formEl.querySelectorAll('[type="file"]') ).forEach(function( field ){
            Array.from(field.files).forEach(function( file, idx ){
                let name = field.name+'['+ idx +']';
                formDataMultipart.append( name, file, file.name );
            });
        });
        
        ajaxOptions.body = formDataMultipart;
    }

    if( ajaxOptions.method === 'GET' ){

        // FETCH WITH "GET" METHOD CAN'T HAVE "body". SO IT IS APPENDED TO THE URL
        ajaxOptions.url += ( /\?/.test(ajaxOptions.url) ? '&' : '?' ) + _serialize( ajaxOptions.body );
        delete ajaxOptions.body;

    } else {

        if( ajaxOptions.headers['Content-Type'].indexOf('application/x-www-form-urlencoded') > -1 ){
            // POST A NORMAL FORM
            ajaxOptions.body = _serialize( ajaxOptions.body );
        } else if( !isMultipart ){
            // POST A JSON STRING
            ajaxOptions.body = JSON.stringify(ajaxOptions.body);
        }

    }

    ajaxOptions.headers = new Headers( ajaxOptions.headers );

    if ( ajaxOptions.timeout > 0 ) {
        const controller = new AbortController();
        const signal = controller.signal;

        ajaxOptions.signal = signal;

        timeoutTimer = window.setTimeout(function() {
            controller.abort();
        }, ajaxOptions.timeout);
    }

    fetch(ajaxOptions.url, ajaxOptions)
        .then(function( response ){

            let getFetchMethod = function( response ){
                let contentType = response.headers.get('Content-Type'),
                    methodName = 'blob';

                if( contentType.indexOf('application/json') > -1 ){
                    methodName = 'json';
                } else if( contentType.indexOf('text/') > -1 ){
                    methodName = 'text';
                }
                
                return methodName;
            };
            let fetchMethod = getFetchMethod( response );
            return response[fetchMethod]();

        })
        .then(function( data ){

            _executeCallback.call( self, formOptions.onSubmitSuccess, data );

        })
        .catch(function( error ){

            _executeCallback.call( self, formOptions.onSubmitError, error );

        })
        .finally(function(){

            if( timeoutTimer ){
                window.clearTimeout( timeoutTimer );
            }
            btnEl.disabled = false;
            _executeCallback.call( self, formOptions.onSubmitComplete );

        });
    
}
