
import { addClass, mergeObjects, removeClass, serializeObject } from './helpers';

const getFetchMethod = (response, options) => {
    const accept = options.headers.get('Accept'),
          contentType = response.headers.get('Content-Type'),
          headerOpt = accept || contentType || '';

    if( headerOpt.indexOf('application/json') > -1 || headerOpt === '' ){
        return 'json';
    } else if( headerOpt.indexOf('text/') > -1 ){
        return 'text';
    } else {
        return 'blob';
    }
};

export function ajaxCall( $form, formDataObj, options ){

    let timeoutTimer;
    const ajaxOptions = mergeObjects( {}, options.formOptions.ajaxOptions ),
          isMultipart = ajaxOptions.headers['Content-Type'] === 'multipart/form-data';

    ajaxOptions.body = formDataObj;
    
    // POST A FormData OBJECT ( multipart )
    if( isMultipart && options.formOptions.handleFileUpload ){
        let formDataMultipart = new FormData();
        
        for(let key in ajaxOptions.body){
            formDataMultipart.append( key, ajaxOptions.body[key] );
        }
        
        Array.from( $form.querySelectorAll('[type="file"]') ).forEach($field => {
            Array.from($field.files).forEach((file, idx) => {
                const name = $field.name+'['+ idx +']';
                formDataMultipart.append( name, file, file.name );
            });
        });
        
        ajaxOptions.body = formDataMultipart;
    }

    if( ajaxOptions.method === 'GET' ){

        // FETCH WITH "GET" METHOD CAN'T HAVE "body". SO IT IS APPENDED TO THE URL
        ajaxOptions.url += ( /\?/.test(ajaxOptions.url) ? '&' : '?' ) + serializeObject( ajaxOptions.body );
        delete ajaxOptions.body;

    } else {

        if( ajaxOptions.headers['Content-Type'].indexOf('application/x-www-form-urlencoded') > -1 ){
            // POST A NORMAL FORM
            ajaxOptions.body = serializeObject( ajaxOptions.body );
        } else if( !isMultipart ){
            // POST A JSON STRING
            ajaxOptions.body = JSON.stringify(ajaxOptions.body);
        }

    }

    ajaxOptions.headers = new Headers( ajaxOptions.headers );

    if ( ajaxOptions.timeout > 0 ) {
        const controller = new AbortController(),
              signal = controller.signal;

        ajaxOptions.signal = signal;
        timeoutTimer = window.setTimeout(() => {
            controller.abort();
        }, ajaxOptions.timeout);
    }

    return fetch(ajaxOptions.url, ajaxOptions)
        .then(response => {
            if( !response.ok ){
                return Promise.reject(response);
            }
            const fetchMethod = getFetchMethod(response, ajaxOptions);
            return response[fetchMethod]();
        })
        .then(data => {
            addClass( $form, options.formOptions.cssClasses.ajaxSuccess );
            return data;
        })
        .catch(error => {
            addClass( $form, options.formOptions.cssClasses.ajaxError );
            return Promise.reject(error);
        })
        .finally(() => {
            if( timeoutTimer ){
                window.clearTimeout( timeoutTimer );
            }
            removeClass( $form, options.formOptions.cssClasses.submit + ' ' + options.formOptions.cssClasses.ajaxPending );
            addClass( $form, options.formOptions.cssClasses.ajaxComplete );
            $form.querySelector('[type="submit"]').disabled = false;
        });

}
