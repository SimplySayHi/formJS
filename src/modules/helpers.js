
export const

addClass = ( element, cssClasses ) => {
    cssClasses.split(' ').forEach(className => {
        element.classList.add( className );
    });
},

checkDirtyField = ( fields, cssClasses ) => {

    var fields = (isNodeList(fields) ? Array.from( fields ) : [fields]);
    
    fields.forEach(fieldEl => {
        if( fieldEl.type !== 'checkbox' && fieldEl.type !== 'radio' ){
            let containerEl = fieldEl.closest('[data-formjs-question]') || fieldEl;

            if( fieldEl.value ){
                
                addClass( containerEl, cssClasses );
                
            } else {
                
                removeClass( containerEl, cssClasses );
                
            }
        }
    });
    
},

checkFormEl = formEl => {
    let isString = typeof formEl,
        isValidNodeSelector = isString === 'string' && isDOMNode(document.querySelector(formEl)),
        isFormSelector = isValidNodeSelector && document.querySelector(formEl).tagName.toLowerCase() === 'form',
        obj = {
            result: isDOMNode(formEl) || isFormSelector,
            element: (isString === 'string' ? document.querySelector(formEl) : formEl)
        };

    return obj;
},

customEvents = {
    field: {
        validation: 'fjs.field:validation'
    },
    form: {
        submit:     'fjs.form:submit',
        validation: 'fjs.form:validation'
    }
},

dispatchCustomEvent = ( elem, eventName, data = {} ) => {
    const eventObj = new Event(eventName, { bubbles: true });
    eventObj.data = data;
    elem.dispatchEvent( eventObj );
},

excludeSelector = ':not([type="reset"]):not([type="submit"]):not([type="button"]):not([type="file"]):not([data-exclude-data])',

fieldsStringSelector = 'input:not([type="reset"]):not([type="submit"]):not([type="button"]):not([type="hidden"]), select, textarea',

getFilledFields = formEl => {
    return getUniqueFields( formEl.querySelectorAll(fieldsStringSelector) )
    .map(fieldEl => {

        const name = fieldEl.name,
              type = fieldEl.type,
              isCheckboxOrRadio = (type === 'checkbox' || type === 'radio'),
              fieldChecked = formEl.querySelector('[name="' + name + '"]:checked'),
              isReqFrom = fieldEl.matches('[data-required-from]'),
              reqMoreEl = (isReqFrom ? formEl.querySelector(fieldEl.getAttribute('data-required-from')) : null);

        return (
            isCheckboxOrRadio ? (fieldChecked || null) :
            (isReqFrom && reqMoreEl.checked) || (!isReqFrom && fieldEl.value) ? fieldEl : null
        );

    })
    .filter(fieldEl => {
        return  fieldEl !== null;
    });
},

getSplitChar = string => {
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

getUniqueFields = nodeList => {

    let currentFieldName = '',
        currentFieldType = '';

    return Array.from( nodeList ).filter(fieldEl => {
        const name = fieldEl.name,
              type = fieldEl.type;

        if( name === currentFieldName && type === currentFieldType ){
            return false;
        }
        
        if( !fieldEl.matches('[data-required-from]') ){
            currentFieldName = name;
            currentFieldType = type;
        }
        return true;
    });
    
},

isDOMNode = node => {
    return Element.prototype.isPrototypeOf( node );
},

isFieldForChangeEvent = fieldEl => {
    return fieldEl.matches('select, [type="radio"], [type="checkbox"], [type="file"]');
},

isNodeList = nodeList => {
    return NodeList.prototype.isPrototypeOf( nodeList );
},

isPlainObject = object => {
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

                    if( typeof out[key] === 'undefined' ){
                        out[key] = [];
                    }
                    out[key] = out[key].concat( obj[key].slice(0) );

                } else if( isObject ){

                    out[key] = mergeObjects(out[key], obj[key]);

                } else {

                    // * STRING | NUMBER | BOOLEAN | FUNCTION
                    if( Array.isArray(out[key]) ){
                        // IF THIS IS ONE OF ABOVE (*) AND THE DESTINATION OBJECT IS AN ARRAY
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

removeClass = ( element, cssClasses ) => {
    cssClasses.split(' ').forEach(className => {
        element.classList.remove( className );
    });
},

runFunctionsSequence = ( { functionsList = [], data = {}, stopConditionFn = function(){return false} } = {} ) => {
    return functionsList.reduce((acc, promiseFn) => {
        return acc.then(res => {
            let dataNew = mergeObjects({}, res[res.length - 1]);
            if( stopConditionFn(dataNew) ){
                return Promise.resolve(res);
            }
            return new Promise(resolve => { resolve(promiseFn(dataNew)) })
                .then((result = dataNew) => {
                    res.push(result);
                    return res;
                });
        });
    }, Promise.resolve([data]))
        .then(dataList => dataList.length > 1 ? dataList.slice(1) : []);
},

serializeObject = obj => {
    var objToString = (
            (obj && typeof obj === 'object' && obj.constructor === Object) ? 
            Object.keys(obj)
                .reduce((a,k) => {
                    a.push(k+'='+encodeURIComponent(obj[k]));
                    return a
                },[]).join('&') : 
            obj
    );
    return objToString;
},

toCamelCase = string => {
    return string.replace(/-([a-z])/ig, (all, letter) => { return letter.toUpperCase(); });
},

validateFieldObjDefault = { result: false, fieldEl: null },

validateFormObjDefault = { result: true, fields: [] }
