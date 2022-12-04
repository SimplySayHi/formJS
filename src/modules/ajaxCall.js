
import { addClass, isPlainObject, mergeObjects, objectToFormData, removeClass, serializeObject } from './helpers';

const getFetchMethod = (response, options) => {
    const accept = options.headers.get('Accept'),
          contentType = response.headers.get('Content-Type'),
          headerOpt = accept || contentType || '';

    if( headerOpt.includes('application/json') || headerOpt === '' ){
        return 'json';
    } else if( headerOpt.includes('text/') ){
        return 'text';
    } else {
        return 'blob';
    }
};

export function ajaxCall( $form, formDataObj, options ){

    let timeoutTimer;
    const ajaxOptions = mergeObjects( {}, options.formOptions.ajaxOptions );
    
    ajaxOptions.body = formDataObj;
    
    const enctypeAttr = $form.getAttribute('enctype');
    const isMultipartForm = enctypeAttr && enctypeAttr.includes('multipart/form-data');
    const isMultipartHeader = ajaxOptions.headers['Content-Type'].includes('multipart/form-data');
    let bodyIsPlainObj = isPlainObject(ajaxOptions.body);
    
    // POST A FormData OBJECT ( multipart )
    if( (isMultipartForm || isMultipartHeader) && bodyIsPlainObj ){
        let formDataMultipart = objectToFormData(ajaxOptions.body, options.formOptions.nestedMultipartDataToJSON);
        
        if( options.formOptions.handleFileUpload ){
            Array.from( $form.querySelectorAll('[type="file"]') ).forEach($field => {
                Array.from($field.files).forEach((file, idx) => {
                    const name = $field.name+'['+ idx +']';
                    formDataMultipart.append( name, file, file.name );
                });
            });
        }
        
        ajaxOptions.body = formDataMultipart;
        bodyIsPlainObj = false;
    }

    if( ajaxOptions.method === 'GET' ){

        // FETCH WITH "GET" METHOD CAN'T HAVE "body". SO IT IS APPENDED TO THE URL
        ajaxOptions.url += ( /\?/.test(ajaxOptions.url) ? '&' : '?' ) + serializeObject( ajaxOptions.body );
        delete ajaxOptions.body;

    } else {

        if( ajaxOptions.headers['Content-Type'].includes('application/x-www-form-urlencoded') ){
            // POST A NORMAL FORM
            ajaxOptions.body = serializeObject( ajaxOptions.body );
        } else if( bodyIsPlainObj ){
            // POST A JSON STRING
            ajaxOptions.body = JSON.stringify(ajaxOptions.body);
        }

    }

    const bodyIsString = typeof ajaxOptions.body === 'string';
    const isMultipartWithAutoContentType = !bodyIsString && (isMultipartForm && !isMultipartHeader)

    if( isMultipartWithAutoContentType ){
        delete ajaxOptions.headers['Content-Type']
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
                throw new Error(response.statusText);
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
            throw new Error(error.message);
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
