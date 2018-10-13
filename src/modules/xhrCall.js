import { _mergeObjects, _serialize } from './helper.js';

export function _xhrCall( formDataJSON, options ){
    var self = this,
        formEl = self.formEl,
        btnEl = formEl.querySelector('[type="submit"]'),
        timeoutTimer,
        xhrOptions = {
            async:          true,
            cache:          false,
            contentType:    formEl.getAttribute('enctype') || 'application/x-www-form-urlencoded; charset=UTF-8',
            crossDomain:    false,
            data:           formDataJSON,
            headers:        {},
            method:         (formEl.getAttribute('method') ? formEl.getAttribute('method').toUpperCase() : 'POST'),
            timeout:        0,
            url:            formEl.getAttribute('action') || location.href
        };
    
    if( xhrOptions.contentType === 'multipart/form-data' && options.formOptions.manageFileUpload ){
        var formDataMultipart = new FormData();
        
        for(var key in xhrOptions.data){
            formDataMultipart.append( key, xhrOptions.data[key] );
        }
        
        Array.from( formEl.querySelectorAll('[type="file"]') ).forEach(function( field ){
            Array.from(field.files).forEach(function( file, idx ){
                var name = field.name+'['+ idx +']';
                formDataMultipart.append( name, file, file.name );
            });
        });
        
        xhrOptions.data = formDataMultipart;
    }
    
    if( formEl.matches('[data-ajax-settings]') ){
        try {
            var ajaxSettings = JSON.parse(formEl.getAttribute('data-ajax-settings'));
            xhrOptions = _mergeObjects( {}, ajaxSettings, xhrOptions );
        } catch(error) {
            let formName = (formEl.getAttribute('name') && ('form "' + formEl.getAttribute('name') + '"')) || 'the form';
            throw new Error('data-ajax-settings specified for ' + formName + ' is not a valid JSON object!');
        }
    }
    
    var XHR = new XMLHttpRequest(),
        parseResponse = function( xhr ){
            var data = xhr.responseText,
                getJSON = function(){
                    try{
                        var obj = JSON.parse(data);
                        return obj;
                    } catch(e){
                        return false;
                    }
                },
                getXML_HTML = function(){
                    try{
                        var isXML = xhr.responseXML !== null;
                        var obj = (isXML ? new DOMParser().parseFromString(data, 'text/xml') : data);
                        return obj;
                    } catch(e){
                        return false;
                    }
                };
            
            return (getJSON() || getXML_HTML() || data);
        },
        loadendFn = function(e) {
            var xhr = e.target,
                responseData = parseResponse(xhr);
            
            if( timeoutTimer ){
                window.clearTimeout( timeoutTimer );
            }

            btnEl.disabled = false;
            
            if( typeof options.formOptions.onSubmitComplete === 'function' ){
                var readyStateOK = xhr.readyState === 4,
                    statusOK = xhr.status === 200,
                    ajaxData = {
                        dataOrXHR:      ( readyStateOK && statusOK ? responseData   : xhr           ),
                        status:         ( readyStateOK && statusOK ? 'success'      : 'error'       ),
                        XHRorResponse:  ( readyStateOK && statusOK ? xhr            : responseData  )
                    };
                options.formOptions.onSubmitComplete.call( self, ajaxData );
            }
        },
        loadFn = function(e) {
            var xhr = e.target;

            if( xhr.status === 200 ){
                var responseData = parseResponse(xhr);
                
                if( typeof options.formOptions.onSubmitSuccess === 'function' ){
                    var ajaxData = { data: responseData, status: 'success', response: xhr };
                    options.formOptions.onSubmitSuccess.call( self, ajaxData );
                }
            } else {
                errorFn(e);
            }
        },
        errorFn = function(e) {
            var xhr = e.target;
            
            if( typeof options.formOptions.onSubmitError === 'function' ){
                var ajaxData = { errorThrown: xhr.statusText, status: 'error', response: xhr };
                options.formOptions.onSubmitError.call( self, ajaxData );
            }
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
        for ( var i in xhrOptions.xhrFields ) {
            XHR[ i ] = xhrOptions.xhrFields[ i ];
        }
    }

    if ( xhrOptions.mimeType && XHR.overrideMimeType ) {
        XHR.overrideMimeType( xhrOptions.mimeType );
    }
    
    if( xhrOptions.data && xhrOptions.contentType !== 'multipart/form-data' ){
        XHR.setRequestHeader('Content-Type', xhrOptions.contentType);
    }

    if ( !xhrOptions.crossDomain && !xhrOptions.headers[ "X-Requested-With" ] ) {
        xhrOptions.headers[ "X-Requested-With" ] = "XMLHttpRequest";
    }
    
    for( var h in xhrOptions.headers ){
        XHR.setRequestHeader( h, xhrOptions.headers[h] );
    }
    
    XHR.send( (xhrOptions.method === 'GET' ? null : xhrOptions.data) );

    if ( xhrOptions.async && xhrOptions.timeout > 0 ) {
        timeoutTimer = window.setTimeout(function() {
            XHR.abort();
        }, xhrOptions.timeout);
    }
    
}