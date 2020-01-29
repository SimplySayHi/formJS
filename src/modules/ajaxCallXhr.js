
import { executeCallback, mergeObjects, serializeObject } from './helpers';

// AJAX CALL USING XMLHttpRequest API
export function ajaxCall( formDataObj ){

    let self = this,
        formEl = self.formEl,
        fieldOptions = self.options.fieldOptions,
        formOptions = self.options.formOptions,
        btnEl = formEl.querySelector('[type="submit"]'),
        timeoutTimer,
        xhrOptions = mergeObjects( {}, formOptions.ajaxOptions ),
        isMultipart = xhrOptions.contentType === 'multipart/form-data';

    xhrOptions.data = formDataObj;
    
    if( isMultipart && fieldOptions.handleFileUpload ){
        let formDataMultipart = new FormData();
        
        for(let key in xhrOptions.data){
            formDataMultipart.append( key, xhrOptions.data[key] );
        }
        
        Array.from( formEl.querySelectorAll('[type="file"]') ).forEach(function( field ){
            Array.from(field.files).forEach(function( file, idx ){
                let name = field.name+'['+ idx +']';
                formDataMultipart.append( name, file, file.name );
            });
        });
        
        xhrOptions.data = formDataMultipart;
    }

    let XHR = new XMLHttpRequest(),
        parseResponse = function( xhr ){
            let data = xhr.responseText,
                getJSON = function(){
                    try{
                        let obj = JSON.parse(data);
                        return obj;
                    } catch(e){
                        return false;
                    }
                },
                getXML_HTML = function(){
                    try{
                        let isXML = xhr.responseXML !== null,
                            obj = (isXML ? new DOMParser().parseFromString(data, 'text/xml') : data);
                        return obj;
                    } catch(e){
                        return false;
                    }
                };
            
            return (getJSON() || getXML_HTML() || data);
        },
        successFn = function(e) {
            let xhr = e.target;

            if( xhr.status === 200 ){
                let responseData = parseResponse(xhr);
                formEl.classList.add( self.options.formOptions.cssClasses.ajaxSuccess );
                executeCallback.call( self, {fn: formOptions.onSubmitSuccess, data: responseData} );
            } else {
                errorFn(e);
            }
        },
        errorFn = function(e) {
            let xhr = e.target;
            formEl.classList.add( self.options.formOptions.cssClasses.ajaxError );
            executeCallback.call( self, {fn: formOptions.onSubmitError, data: xhr} );
        },
        completeFn = function(e) {
            if( timeoutTimer ){
                window.clearTimeout( timeoutTimer );
            }

            formEl.classList.remove( self.options.formOptions.cssClasses.ajaxPending );
            formEl.classList.add( self.options.formOptions.cssClasses.ajaxComplete );
            btnEl.disabled = false;
            executeCallback.call( self, {fn: formOptions.onSubmitComplete} );
        };
    
    XHR.addEventListener('load',    successFn, false);
    XHR.addEventListener('error',   errorFn,    false);
    XHR.addEventListener('loadend', completeFn,  false);
    
    if( xhrOptions.method === 'GET' ){
        xhrOptions.url += ( /\?/.test(xhrOptions.url) ? '&' : '?' ) + serializeObject( xhrOptions.data );
        if( xhrOptions.cache === false ){
            xhrOptions.url +=  (/\&/.test(xhrOptions.url) ? '&' : '') + '_=' + (new Date().getTime());
        }
    }
    
    XHR.open(xhrOptions.method, xhrOptions.url, xhrOptions.async);

    if ( xhrOptions.xhrFields ) {
        for ( let i in xhrOptions.xhrFields ) {
            XHR[ i ] = xhrOptions.xhrFields[ i ];
        }
    }

    if ( xhrOptions.mimeType && XHR.overrideMimeType ) {
        XHR.overrideMimeType( xhrOptions.mimeType );
    }
    
    if( xhrOptions.data && xhrOptions.contentType !== 'multipart/form-data' ){
        XHR.setRequestHeader('Content-Type', xhrOptions.contentType);
    }
    
    for( let h in xhrOptions.headers ){
        XHR.setRequestHeader( h, xhrOptions.headers[h] );
    }

    if( !isMultipart ){
        xhrOptions.data = JSON.stringify(xhrOptions.data);
    }
    
    XHR.send( (xhrOptions.method === 'GET' ? null : xhrOptions.data) );

    if ( xhrOptions.async && xhrOptions.timeout > 0 ) {
        timeoutTimer = window.setTimeout(function() {
            XHR.abort();
        }, xhrOptions.timeout);
    }
    
}
