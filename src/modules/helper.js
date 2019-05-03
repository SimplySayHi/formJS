
export const

fieldsStringSelector = 'input:not([type="reset"]):not([type="submit"]):not([type=button]):not([type=hidden]), select, textarea',

addClass = function( element, cssClasses ){
    cssClasses.split(' ').forEach(function(className){
        element.classList.add( className );
    });
},

checkFormEl = function( formEl ){
    let isString = typeof formEl,
        isValidNodeSelector = isString === 'string' && isDOMNode(document.querySelector(formEl)),
        isFormSelector = isValidNodeSelector && document.querySelector(formEl).tagName.toLowerCase() === 'form',
        obj = {
            result: isDOMNode(formEl) || isFormSelector,
            element: (isString === 'string' ? document.querySelector(formEl) : formEl)
        };

    return obj;
},

executeCallback = function( callbackOption, callbackData ){
    let self = this,
        callbackFnList = [];

    if( typeof callbackOption === 'function' ){
        callbackFnList.push( callbackOption );
    } else if( Array.isArray(callbackOption) ) {
        callbackFnList = callbackOption;
    }

    callbackFnList.forEach(function(cbFn){
        cbFn.call(self, callbackData );
    });
},

getSplitChar = function( string ){
    let splitChar = '.';

    if( string.indexOf(splitChar) === -1 ){
        if( string.indexOf('-') >= 0 ){
            splitChar = '-';
        } else if( string.indexOf('/') >= 0 ){
            splitChar = '/';
        }
    }

    return splitChar;
},

isDOMNode = function( node ){
    return Element.prototype.isPrototypeOf( node );
},

isFieldForChangeEvent = function ( fieldEl ) {
    return fieldEl.matches('select, [type="radio"], [type="checkbox"], [type="file"]');
},

isNodeList = function( nodeList ){
    return NodeList.prototype.isPrototypeOf( nodeList );
},

isPlainObject = function( object ){
    return Object.prototype.toString.call( object ) === '[object Object]';
},

mergeObjects = function( out = {} ){
    for(let i=1; i<arguments.length; i++){
        let obj = arguments[i];

        if(!obj){ continue; }

        for(let key in obj){
            let isArray = Object.prototype.toString.call(obj[key]) === "[object Array]";
            let isObject = Object.prototype.toString.call(obj[key]) === "[object Object]";

            // COPY ONLY ENUMERABLE PROPERTIES
            if( obj.hasOwnProperty(key) ){
                if( isArray ){

                    if( typeof out[key] === 'undefined' || out[key] === null ){
                        out[key] = [];
                    }
                    out[key] = out[key].concat( obj[key].slice(0) );

                } else if( isObject ){

                    out[key] = mergeObjects(out[key], obj[key]);

                } else {

                    // STRING | NUMBER | BOOLEAN | FUNCTION
                    if( Array.isArray(out[key]) ){
                        out[key].push(obj[key]);
                    } else {
                        out[key] = obj[key];
                    }

                }
            }
        }
    }

    return out;
},

removeClass = function( element, cssClasses ){
    cssClasses.split(' ').forEach(function(className){
        element.classList.remove( className );
    });
},

serializeObject = function( obj ){
    var objToString = (
            (obj && typeof obj === 'object' && obj.constructor === Object) ? 
            Object.keys(obj)
                .reduce(function(a,k){
                    a.push(k+'='+encodeURIComponent(obj[k]));
                    return a
                },[]).join('&') : 
            obj
    );
    return objToString;
},

toCamelCase = function( string ){
    return string.replace(/-([a-z])/ig, function(all, letter){ return letter.toUpperCase(); });
},

validateFieldObjDefault = { result: false, fieldEl: null },

validateFormObjDefault = { result: true, fields: [] }
