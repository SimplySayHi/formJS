import { _mergeObjects, _serialize } from './helper.js';

export function _xhrCall( formDataJSON ){
    let self = this,
        formEl = self.formEl,
        fieldOptions = self.options.fieldOptions,
        formOptions = self.options.formOptions,
        btnEl = formEl.querySelector('[type="submit"]'),
        timeoutTimer,
        xhrOptions = _mergeObjects( {}, formOptions.ajaxOptions );

    xhrOptions.data = formDataJSON;
    
    if( xhrOptions.contentType === 'multipart/form-data' && fieldOptions.handleFileUpload ){
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
        loadendFn = function(e) {
            let xhr = e.target,
                responseData = parseResponse(xhr),
                callbacks = [],
                functionOpt = formOptions.onSubmitComplete;

            let readyStateOK = xhr.readyState === 4,
                statusOK = xhr.status === 200,
                ajaxData = {
                    dataOrXHR:      ( readyStateOK && statusOK ? responseData   : xhr           ),
                    status:         ( readyStateOK && statusOK ? 'success'      : 'error'       ),
                    XHRorResponse:  ( readyStateOK && statusOK ? xhr            : responseData  )
                };
            
            if( timeoutTimer ){
                window.clearTimeout( timeoutTimer );
            }

            btnEl.disabled = false;
            
            if( typeof functionOpt === 'function' ){

                callbacks.push( functionOpt );

            } else if( Array.isArray(functionOpt) ) {

                callbacks = functionOpt;

            }

            callbacks.forEach(function(cbFn){
                cbFn.call( self, ajaxData );
            });
        },
        loadFn = function(e) {
            let xhr = e.target;

            if( xhr.status === 200 ){
                let callbacks = [],
                    functionOpt = formOptions.onSubmitSuccess,
                    responseData = parseResponse(xhr),
                    ajaxData = { data: responseData, status: 'success', response: xhr };
                
                if( typeof functionOpt === 'function' ){

                    callbacks.push( functionOpt );

                } else if( Array.isArray(functionOpt) ) {
                    
                    callbacks = functionOpt;
                    
                }

                callbacks.forEach(function(cbFn){
                    cbFn.call( self, ajaxData );
                });
            } else {
                errorFn(e);
            }
        },
        errorFn = function(e) {
            let xhr = e.target,
                callbacks = [],
                functionOpt = formOptions.onSubmitError,
                ajaxData = { errorThrown: xhr.statusText, status: 'error', response: xhr };
            
            if( typeof functionOpt === 'function' ){

                callbacks.push( functionOpt );

            } else if( Array.isArray(functionOpt) ) {
                
                callbacks = functionOpt;
                
            }

            callbacks.forEach(function(cbFn){
                cbFn.call( self, ajaxData );
            });
        };
    
    XHR.addEventListener('loadend', loadendFn,  false);
    XHR.addEventListener('load',    loadFn,     false);
    XHR.addEventListener('error',   errorFn,    false);
    
    if( xhrOptions.method === 'GET' ){
        xhrOptions.url += ( /\?/.test(xhrOptions.url) ? '&' : '?' ) + _serialize( xhrOptions.data );
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
    
    XHR.send( (xhrOptions.method === 'GET' ? null : xhrOptions.data) );

    if ( xhrOptions.async && xhrOptions.timeout > 0 ) {
        timeoutTimer = window.setTimeout(function() {
            XHR.abort();
        }, xhrOptions.timeout);
    }
    
}