/**
 * formJS
 * -------------
 * Version      : 1.2.0
 * Website      : https://valeriodipunzio.com/plugins/formJS/
 * Repo         : https://github.com/valedp88/formJS
 * Author       : Valerio Di Punzio (@valedp88)
 *
 */

var FORM = (function(){
    
        // ------------------------------------------------------------
        // POLYFILLS
        // ------------------------------------------------------------
    var installPolyfills = function(){
            // MATCHES
            if (!Element.prototype.matches){
                Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
            }
        
            // CLOSEST
            // https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
            if (!Element.prototype.closest){
                Element.prototype.closest = function(s){
                    var el = this;
                    if (!document.documentElement.contains(el)) return null;
                    do {
                        if (el.matches(s)) return el;
                        el = el.parentElement || el.parentNode;
                    } while (el !== null && el.nodeType === 1); 
                    return null;
                };
            }
        }();
        
        
        
        // ------------------------------------------------------------
        // HELPER FUNCTIONS AND VARIABLES
        // ------------------------------------------------------------
    var filter = Array.prototype.filter,
        
        slice = Array.prototype.slice,
        
        _addClass = function( element, cssClasses ){
            cssClasses.split(' ').forEach(function(className){
                element.classList.add( className );
            });
        },
        
        _arrayFrom = function( nodes ){
            return slice.call( nodes );
        },
        
        _isDOMNode = function( node ){
            return Element.prototype.isPrototypeOf( node );
        },
        
        _isNodeList = function( nodeList ){
            return NodeList.prototype.isPrototypeOf( nodeList );
        },
        
        _isPlainObject = function( object ){
            return Object.prototype.toString.call( object ) === '[object Object]';
        },
        
        _matches = function( selector ){
            if( typeof selector === 'string' ){
                
                return function(element){
                    return element.matches( selector );
                };
                
            } else {
                
                return arguments[0].matches( arguments[1] );
                
            }
        },
        
        _mergeObjects = function( out ){
            var out = out || {};

            for(var i=1; i<arguments.length; i++){
                var obj = arguments[i];

                if(!obj){ continue; }

                for(var key in obj){
                    if( !out.hasOwnProperty(key) || Object.prototype.toString.call(obj[key]) === "[object Array]" ){
                        out[key] = obj[key];
                    } else {
                        if( Object.prototype.toString.call(obj[key]) === "[object Object]" ){
                            out[key] = _mergeObjects(out[key], obj[key]);
                        }
                    }
                }
            }

            return out;  
        },
        
        _removeClass = function( element, cssClasses ){
            cssClasses.split(' ').forEach(function(className){
                element.classList.remove( className );
            });
        },
        
        _serialize = function( obj ){
            var objToString = (
                    (obj && typeof obj === 'object' && obj.constructor === Object) ? 
                    Object.keys(obj).reduce(function(a,k){a.push(k+'='+encodeURIComponent(obj[k]));return a},[]).join('&') : 
                    obj
            );
            return objToString;
        };
        
        
        
        // ------------------------------------------------------------
        // PLUGIN OPTIONS ( DEFAULT )
        // ------------------------------------------------------------
    var defaultFieldOptions = {
            checkDirtyField:        false,
            cssClasses: {
                dirty:              'dirty-field',
                error:              'has-error',
                errorMultiChoice:   'has-error-switch',
                valid:              'is-valid'
            },
            focusOnRelated:         true,
            maxFileSize:            10,
            onPastePrevented:       null,
            onValidation:           null,
            preventPasteFields:     '[type="password"], [data-equal-to]',
            skipUIfeedback:         false,
            strictHtmlValidation:   false,
            validateOnEvents:       'input change'
        },
        
        defaultFormOptions = {
            beforeSend:             null,
            manageFileUpload:       true,
            onSubmitComplete:       null,
            onSubmitError:          null,
            onSubmitSuccess:        null
        },
        
        
        
        // ------------------------------------------------------------
        // VALIDATION RULES ( DEFAULT )
        // ------------------------------------------------------------
        validationRules = {
            
            cap: function( string ){
                // VALID ITALIAN CAP WITH 5 DIGITS
                return /^[0-9]{5}$/.test( string );
            },
            
            date: function( string ){
                // DATE AS ITALIAN SYNTAX WITH/WITHOUT TIME
                // dd mm yyyy | dd/mm/yyyy | dd.mm.yyyy | dd-mm-yyyy | dd/mm/yyyy-hh:mm:ss ( WITH SPACE / . - AS SEPARATOR FOR THE DATE )
                return /^(0?[1-9]|[12][0-9]|3[01])([ \/\-.])(0?[1-9]|1[012])\2([0-9][0-9][0-9][0-9])(([ -])([0-1]?[0-9]|2[0-3]):[0-5]?[0-9]:[0-5]?[0-9])?$/.test( string );
            },
            
            email: function( string ){
                // EMAIL MUST BE AT LEAST ( FOR EXAMPLE ):
                // a@a.aa
                //return /(\w+)\@(\w+)\.[a-zA-Z]/.test( string );
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test( string );
            },
            
            fiscalCode: function( string ){
                // http://blog.marketto.it/2016/01/regex-validazione-codice-fiscale-con-omocodia/
                return /^(?:[B-DF-HJ-NP-TV-Z](?:[AEIOU]{2}|[AEIOU]X)|[AEIOU]{2}X|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[1256LMRS][\dLMNP-V])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[\dLMNP-V][1-9MNP-V]|[1-9MNP-V][0L]))[A-Z]$/i.test( string );
            },
            
            hexColor: function( string ){
                // HEX COLOR WITH/WITHOUT #
                // CAN BE 3 OR 6 CHARACTERS ( fff | FFF | ffffff | FFFFFF )
                return /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test( string );
            },
            
            landlineNumber: function( string ){
                // LANDLINE PREFIX:
                // +39 | 0039 | not-set ( ALSO WITH INTERNATIONAL PREFIXES WITH 2 DIGITS )
                // LANDLINE NUMBER MUST START WITH 0 ( AS FOR ITALIAN ONES ):
                // 1234567890 | 12 34567890 | 123456789 | 1234 56789 ( ALSO WITH . - / AS SEPARATOR )
                return /^((00|\+)\d{2}[\-\. ]??)??(((0[\d]{1,4}))([\/\-\. ]){0,1}([\d, ]{5,10}))$/.test( string ); 
            },
            
            mobileNumber: function( string ){
                // +39 | 0039 | 39 | not-set ( ALSO WITH ALL INTERNATIONAL PREFIXES WITH 2 DIGITS )
                // MOBILE NUMBER MUST START WITH 3
                // 3234567890 | 323 4567890 | 323 45 67 890 ( ALSO WITH . OR - AS SEPARATOR )
                return /^((00|\+)??\d{2}[\-\. ]??)??3\d{2}[\-\. ]??(\d{6,7}|\d{2}[\-\. ]??\d{2}[\-\. ]??\d{3})$/.test( string );
            },
            
            number: function( string ){
                // ALL NUMBERS ( INTEGERS AND FLOATING )
                // VALID NUMBERS: 123 | 123.456 | .123                
                return /[+-]?([0-9]*[.])?[0-9]+/.test( string );
            },
            
            numberFloat: function( string ){
                // ONLY FLOATING NUMBERS
                // VALID NUMBERS: 123.456 | .123                
                return /[+-]?([0-9]*[.])[0-9]+/.test( string );
            },
            
            numberInteger: function( string ){
                // ONLY INTEGER NUMBERS                
                return /^\d+$/.test( string );
            },
            
            password: function( string ){
                // PASSWORD ( NO SPECIAL CHARACTERS ) WITH AT LEAST:
                // ONE DIGIT + ONE LOWERCASE + ONE UPPERCASE + MIN LENGTH OF 8 CHARACTERS
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test( string );
            },
            
            url: function( string ){
                // MUST NOT CONTAIN PARAMETERS:
                // www.mysite.com/index.html         --> VALID URL
                // www.mysite.com/index.html?v=hello --> INVALID URL
                return /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test( string );
            },
            
            username: function( string ){
                // USERNAME WITH LETTERS/NUMBERS/UNDERSCORE AND . - @ WITH MIN LENGTH 3 AND MAX LENGTH 24
                //return /^[\w\.\-\@]{3,24}$/.test( string );
                
                // USERNAME MUST START WITH A LETTER/NUMBER/UNDERSCORE AND CAN ALSO CONTAIN . - @ WITH MIN LENGTH 3 AND MAX LENGTH
                return /^(?=\w)(?=[\-\.\@]?)[\w\-\.\@]{3,24}$/.test( string );
            },
            
            vatNumber: function( string ){
                // VAT NUMBER CAN CONTAIN OR NOT THE 'IT' STRING AND THEN 11 NUMBERS
                return /^(IT){0,1}[0-9]{11}$/i.test( string );
            }
            
        },
        
        
        
        // ------------------------------------------------------------
        // INTERNAL VARIABLES AND METHODS
        // ------------------------------------------------------------
        _fieldsStringSelector = 'input:not([type="reset"]):not([type="submit"]):not([type=button]):not([type=hidden]), select, textarea',
        
        _validationRulesStrictHtml = {
            
            exactLength: function( value, validationValue ){
                return value.length === (validationValue*1);
            },
            
            max: function( value, validationValue ){
                var value = value * 1,
                    maxVal = validationValue * 1;
                
                return value <= maxVal;
            },
            
            maxlength: function( value, validationValue ){
                return value.length <= (validationValue*1);
            },
            
            min: function( value, validationValue ){
                var value = value * 1,
                    minVal = validationValue * 1;
                
                return value >= minVal;
            }
            
        },
        
        _checkDirtyField = function( fields, cssClass ){
            var fields = (typeof fields.length !== 'undefined' ? _arrayFrom( fields ) : [fields]),
                cssClasses = cssClass || defaultFieldOptions.cssClasses.dirty;
            
            fields.forEach(function(field){
                if( _matches(field, ':not([type="checkbox"]):not([type="radio"])') ){
                    if( field.value ){
                        
                        _addClass( field, cssClasses );
                        
                    } else {
                        
                        _removeClass( field, cssClasses );
                        
                    }
                }
            });
        },
        
        _isFieldChecked = function( fieldEl, fieldOptions ){
            var containerEl = (fieldEl.closest('form') || fieldEl.closest('[data-formjs-question]')),
                sameInputName = '[name="' + fieldEl.name + '"]';
                        
            if( fieldEl.type === 'radio' ){
        
                var fieldChecked = containerEl.querySelector( sameInputName + ':checked' ),
                    requireMoreEl = containerEl.querySelectorAll( sameInputName + '[data-require-more]' ),
                    validReqFrom = true;
                
                if( requireMoreEl.length > 0 ){
                    _arrayFrom( requireMoreEl ).forEach(function( reqMoreEl ){
                        var reqFromEl = containerEl.querySelector('[data-required-from="#'+ reqMoreEl.id +'"]');
                        
                        if( reqFromEl !== null ){
                            reqFromEl.required = false;

                            if( reqMoreEl.checked ){
                                reqFromEl.required = true;

                                if( fieldOptions.focusOnRelated ){
                                    reqFromEl.focus();
                                } else {
                                    if( reqMoreEl.required && reqFromEl.value.trim().length === 0 ){
                                        validReqFrom = false;
                                    }
                                }
                            } else {
                                reqFromEl.value = '';
                            }
                        }
                    });
                }

                return (fieldEl.required ? fieldChecked !== null && fieldChecked.value.trim().length > 0 && validReqFrom : true);

            } else if( fieldEl.type === 'checkbox' ) {
                
                if( fieldEl.closest('[data-max-check]') !== null ){
                    
                    var maxCheck = fieldEl.closest('[data-max-check]').getAttribute('data-max-check'),
                        checkboxCHKDEl = containerEl.querySelectorAll('[name="' + fieldEl.name + '"]:checked'),
                        checkedLength = checkboxCHKDEl.length,
                        obj = {
                            isChecked: (checkedLength > 0 && checkedLength <= maxCheck),
                            exceedMaxCheck: checkedLength > maxCheck
                        };
                    return obj;
                    
                } else {

                    return fieldEl.checked;
                    
                }
                
            }
        },
        
        _isValid = function( field, addedValidations ){
            var fieldType = ( _matches(field, '[data-subtype]') ? 
                              field.getAttribute('data-subtype').replace(/-([a-z])/ig, function(all, letter){ return letter.toUpperCase(); }) : 
                              field.type
                            ),
                extraValidations = addedValidations || {},
                extraValidationsResult = true,
                fieldValue = field.value.trim();
            
            for(var val in extraValidations){
                var extraVal = _validationRulesStrictHtml[val]( fieldValue, extraValidations[val] );
                if( !extraVal ){ extraValidationsResult = false; }
            }
            
            return (
                typeof validationRules[fieldType] === 'function' ? 
                validationRules[fieldType]( fieldValue ) : 
                fieldValue.length > 0
            ) && extraValidationsResult;
        },
        
        _xhrCall = function( formEl, formDataJSON, options ){
            
            var btnEl = formEl.querySelector('[type="submit"]'),
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
                
                _arrayFrom( formEl.querySelectorAll('[type="file"]') ).forEach(function( field ){
                    _arrayFrom(field.files).forEach(function( file, idx ){
                        var name = field.name+'['+ idx +']';
                        formDataMultipart.append( name, file, file.name );
                    });
                });
                
                xhrOptions.data = formDataMultipart;
            }
            
            if( _matches(formEl, '[data-ajax-settings]') ){
                try {
                    var ajaxSettings = JSON.parse(formEl.getAttribute('data-ajax-settings'));
                    xhrOptions = _mergeObjects( ajaxSettings, xhrOptions );
                } catch(error) {
                    console.error('data-ajax-settings specified for ' + formEl.getAttribute('name') + ' form is not a valid JSON object!');
                    return false;
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
                        var ajaxData = {
                            dataOrXHR:      ( xhr.readyState === 4 ? responseData   : xhr           ),
                            status:         ( xhr.readyState === 4 ? 'success'      : 'error'       ),
                            XHRorResponse:  ( xhr.readyState === 4 ? xhr            : responseData  )
                        };
                        options.formOptions.onSubmitComplete( ajaxData, formEl );
                    }
                },
                loadFn = function(e) {
                    var xhr = e.target,
                        responseData = parseResponse(xhr);
                    
                    if( typeof options.formOptions.onSubmitSuccess === 'function' ){
                        var ajaxData = { data: responseData, status: 'success', response: xhr };
                        options.formOptions.onSubmitSuccess( ajaxData, formEl );
                    }
                },
                errorFn = function(e) {                    
                    var xhr = e.target;
                    
                    if( typeof options.formOptions.onSubmitError === 'function' ){
                        var ajaxData = { errorThrown: xhr.statusText, status: 'error', response: xhr };
                        options.formOptions.onSubmitError( ajaxData, formEl );
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
            
        },
        
        
        
        // ------------------------------------------------------------
        // PUBLIC METHODS
        // ------------------------------------------------------------
        addValidationRules = function( newRules ){
            validationRules = _mergeObjects( newRules, validationRules );
        },
        
        getFormJSON = function( formEl ){
            var formData = {},
                formFieldsEl = formEl.querySelectorAll('input, select, textarea'),
                excludeSelectors = ':not([type="reset"]):not([type="submit"]):not([type="button"]):not([type="file"]):not([data-exclude-json])';
            
            filter.call( formFieldsEl, _matches(excludeSelectors) ).forEach(function( fieldEl ){
                var isCheckbox = _matches( fieldEl, '[type="checkbox"]' ),
                    isRadio = _matches( fieldEl, '[type="radio"]' ),
                    name = fieldEl.name,
                    value = ( isCheckbox ? [] : fieldEl.value );
                
                if( isCheckbox || isRadio ){
                    var checkedFieldsEl = formEl.querySelectorAll('[name="'+ name +'"]:checked');
                    
                    if( isRadio ){
                        
                        value = (checkedFieldsEl.length === 0 ? null : checkedFieldsEl[0].value);
                        
                    } else {
                        
                        _arrayFrom( checkedFieldsEl ).forEach(function( fieldEl ){
                            value.push( fieldEl.value );
                        });
                        
                    }
                }

                formData[ name ] = value;
            });
            
            return formData;
        },
        
        init = function(){
            // 1ST ARGUMENT: ELEMENT/NODELIST OF FORM
            // 2ND ARGUMENT: PLUGIN OPTIONS
            
            var argLength = arguments.length,
                formEl = ( argLength === 2 || (_isDOMNode(arguments[0]) || _isNodeList(arguments[0])) ? arguments[0] : null ),
                options = ( argLength === 2 ? arguments[1] : (_isPlainObject(arguments[0]) ? arguments[0] : {}) );
            
            var formElems = filter.call( (_isDOMNode(formEl) ? [formEl] : formEl || document.querySelectorAll('form')), _matches('[novalidate]') );
            
            if( !formElems.length ){ return false; }
            
            var formOptions = _mergeObjects( options.formOptions || {}, defaultFormOptions ),
                fieldOptions = _mergeObjects( options.fieldOptions || {}, defaultFieldOptions );
            
            _arrayFrom( formElems ).forEach(function( thisForm, index ){
                var isAjaxForm = thisForm.matches('[data-ajax-submit]'),
                    formFields = thisForm.querySelectorAll( _fieldsStringSelector );
                
                _arrayFrom( formFields ).forEach(function( fieldEl ){
                    var isCheckboxOrRadio = (fieldEl.type === 'checkbox' || fieldEl.type === 'radio');
                    
                    if( !isCheckboxOrRadio ){
                        if( fieldOptions.checkDirtyField ){
                            _checkDirtyField( fieldEl, fieldOptions.cssClasses.dirty );
                        }

                        if( _matches(fieldEl, '[data-char-count]') ){
                            var printCharLength = function( field ){
                                    var usedChars = field.value.length;
                                    field.closest('[data-formjs-question]').querySelector('[data-char-length]').textContent = usedChars;
                                };

                            if( _matches(fieldEl, '[maxlength]') ){
                                var maxlength = fieldEl.getAttribute('maxlength');
                                fieldEl.closest('[data-formjs-question]').querySelector('[data-char-maxlength]').textContent = maxlength;
                            }

                            printCharLength( fieldEl );

                            fieldEl.addEventListener('input', function(){
                                printCharLength( this );
                            }, false);
                        }

                        if( _matches(fieldEl, '[type="file"]') && fieldOptions.maxFileSize > 0 ){
                            if( thisForm.querySelector('[data-max-file-size]') ){
                                thisForm.querySelector('[data-max-file-size]').textContent = fieldOptions.maxFileSize;
                            }
                        }
                    }
                    
                    if(
                        (!isCheckboxOrRadio && fieldEl.value) || 
                        (isCheckboxOrRadio && fieldEl.closest('[data-formjs-question]').querySelectorAll(':checked').length > 0)
                    ){
                        if( isCheckboxOrRadio ){
                            fieldEl = fieldEl.closest('[data-formjs-question]').querySelector(':checked');
                        }
                        isValidField( fieldEl, fieldOptions );
                    }
                });
                
                fieldOptions.validateOnEvents.split(' ').forEach(function( eventName ){
                    var useCapturing = (eventName === 'blur' ? true : false);
                    
                    thisForm.addEventListener(eventName, function( event ){
                        var fieldEl = event.target;

                        if( _matches( fieldEl, _fieldsStringSelector ) ){
                            var isFieldForChangeEvent = _matches( fieldEl, 'select, [type="radio"], [type="checkbox"]' );
                            
                            if(
                                (isFieldForChangeEvent && eventName === 'change') ||
                                (!isFieldForChangeEvent && eventName === 'input') ||
                                (eventName !== 'change' && eventName !== 'input')
                            ){
                                
                                var validationResult = isValidField( fieldEl, fieldOptions );
                                if( typeof fieldOptions.onValidation === 'function' ){
                                    
                                    var callbackData = [ { field: fieldEl, result: validationResult} ];
                                    
                                    fieldOptions.onValidation( callbackData );
                                    
                                }
                                
                            }
                        }
                    }, useCapturing);
                });
                
                if( fieldOptions.strictHtmlValidation ){
                    // VALIDATION WITH ATTRIBUTES LIKE HTML ONES ( ALSO FOR BUG FIXING, EG: maxlength IN ANDROID )
                    thisForm.addEventListener('keypress', function(event){
                        var fieldEl = event.target;
                        
                        if( _matches( fieldEl, '[maxlength]' ) ){
                            var value = fieldEl.value.trim(),
                                maxLength = fieldEl.maxLength * 1,
                                keyPressed = event.which || event.keyCode,
                                allowedKeys = [8, 37, 38, 39, 46];

                            if( value.length >= maxLength && allowedKeys.indexOf(keyPressed) === -1 ){
                                return false;
                            }
                        }
                    }, false);
                }
                
                if( fieldOptions.preventPasteFields && thisForm.querySelectorAll( fieldOptions.preventPasteFields ).length ){
                    thisForm.addEventListener('paste', function(event){
                        var fieldEl = event.target;
                        if( _matches( fieldEl, fieldOptions.preventPasteFields ) ){
                            event.preventDefault();
                            if( typeof fieldOptions.onPastePrevented === 'function' ){
                                fieldOptions.onPastePrevented( fieldEl );
                            }
                        }
                    }, false);
                }
                
                thisForm.addEventListener('submit', function(event){
                    var optionsFormSubmit = {
                            formOptions: formOptions,
                            fieldOptions: fieldOptions
                        };
                    
                    if( isAjaxForm ){
                        
                        event.preventDefault();
                        submitAjaxForm( this, optionsFormSubmit );
                        
                    } else {
                        
                        if( !isValidForm(this, optionsFormSubmit).result ){
                            event.preventDefault();
                        }
                        
                    }
                }, false);
                
            });            
        },
        
        isValidField = function( fieldEl, fieldOptions ){
            if( fieldEl === null ){ return false; }
            
            var options =           _mergeObjects( fieldOptions || {}, defaultFieldOptions ),
                
                fieldType =         fieldEl.type,
                fieldValue =        fieldEl.value.trim(),
                isValidValue =      fieldValue.length > 0,
                
                exceedMaxChoice =   false,
                isMultiChoice =     fieldEl.closest('[data-max-check]') !== null,
                isRequired =        fieldEl.required,
                isRequiredFrom =    _matches( fieldEl, '[data-required-from]' ),
                isValidateIfFilled =_matches( fieldEl, '[data-validate-if-filled]' ),
                isValid =           isValidValue,
                
                containerEl =       fieldEl.closest('[data-formjs-question]'),
                fieldElEqualTo =    (fieldEl.closest('form') ? fieldEl.closest('form').querySelectorAll('[data-equal-to="'+ fieldEl.name +'"]') : []);
            
            if( options.checkDirtyField ){
                _checkDirtyField( fieldEl, options.cssClasses.dirty );
            }
            
            if(
                (!isRequired && !isValidateIfFilled && !isRequiredFrom && (fieldType !== 'checkbox' && fieldType !== 'radio')) || 
                (isValidateIfFilled && !isValidValue)
            ){
              
                isValid = true;
               
            } else {
                
                if( fieldType === 'checkbox' ){
                    
                    var checkField = _isFieldChecked( fieldEl, options );
                    isValid = ( isMultiChoice ? checkField.isChecked : checkField );
                    exceedMaxChoice = ( isMultiChoice ? checkField.exceedMaxCheck : false );
                    
                } else if( fieldType === 'file' && options.maxFileSize > 0 ){
                    
                    _arrayFrom(fieldEl.files).forEach(function( file, idx ){
                        if( (file.size/1024/1024) > options.maxFileSize ){
                            isValid = false;
                        }
                    });
                    
                } else if( fieldType === 'radio' ){
                    
                    isValid = _isFieldChecked( fieldEl, options );
                    
                } else {
                    
                    var extraValidations = {},
                        doExtraValidations = true;
                    
                    if( _matches(fieldEl, '[data-equal-to]') ){
                        
                        var checkFromEl = document.querySelector( '[name="' + fieldEl.getAttribute('data-equal-to') + '"]' );
                        isValid = fieldValue === checkFromEl.value.trim();
                        doExtraValidations = false;
                        
                    } else {
                    
                        if( isRequiredFrom ){
                            
                            var reqMoreEl = document.querySelector( fieldEl.getAttribute('data-required-from') ),
                                checkedEl = document.querySelector( '[name="'+ reqMoreEl.name +'"]:checked' );
                            
                            if( isValidValue ){
                                reqMoreEl.checked = true;
                                fieldEl.required = true;
                            }
                            
                            if( !reqMoreEl.checked ){
                                doExtraValidations = false;
                            }
                            
                            isValid = (reqMoreEl.required && reqMoreEl.checked ? isValidValue : (reqMoreEl.required ? checkedEl !== null : true));
                            
                        }

                        // ADD FURTHER SPECIFIC VALIDATIONS
                        if( _matches(fieldEl, '[data-exact-length]') ){
                            extraValidations.exactLength = fieldEl.getAttribute('data-exact-length');
                        }

                        if( _matches(fieldEl, '[max]') ){
                            extraValidations.max = fieldEl.max;
                        }

                        if( _matches(fieldEl, '[maxlength]') ){
                            extraValidations.maxlength = fieldEl.maxLength;
                        }
                        
                        if( _matches(fieldEl, '[min]') ){
                            extraValidations.min = fieldEl.min;
                        }
                        
                    }
                    
                    isValid = (doExtraValidations ? _isValid( fieldEl, extraValidations ) : isValid);
                    
                }
                
                if( fieldElEqualTo.length > 0 ){
                    isValidField( fieldElEqualTo, options );
                }
                
            }
            
            // VALIDATION VISUAL FEEDBACK
            if( containerEl !== null ){
                if( options.skipUIfeedback ){
                    
                    var cssClasses = options.cssClasses.valid + ' ' + options.cssClasses.error + ' ' + options.cssClasses.errorMultiChoice;
                    _removeClass( containerEl, cssClasses );
                    
                } else {
                    if( isValid ){

                        _removeClass( containerEl, options.cssClasses.error );
                        _addClass( containerEl, options.cssClasses.valid );
                        if( isMultiChoice && !exceedMaxChoice ){
                            _removeClass( containerEl, options.cssClasses.errorMultiChoice );
                        }

                    } else {

                        _addClass( containerEl, options.cssClasses.error );
                        _removeClass( containerEl, options.cssClasses.valid );
                        if( isMultiChoice && exceedMaxChoice ){
                            _addClass( containerEl, options.cssClasses.errorMultiChoice );
                        }

                    }
                }
            }
            
            return isValid;
        },
        
        isValidForm = function( formEl, options ){
            if( formEl === null || !_matches(formEl, '[novalidate]') ){ return false; }
            
            var options = options || {},
                fieldOptions = _mergeObjects( options.fieldOptions || {}, defaultFieldOptions ),
                obj = {
                    fields: [],
                    result: true
                },
                fieldName = '',
                fieldType = '';
            
            if( typeof fieldOptions.focusOnRelated === 'undefined' ){
                fieldOptions.focusOnRelated = false;
            }
            
            _arrayFrom( formEl.querySelectorAll( _fieldsStringSelector ) ).forEach(function( fieldEl ){
                var name = fieldEl.name,
                    type = fieldEl.type,
                    fieldData = {
                        field: fieldEl,
                        result: true
                    };
                
                if( (name === fieldName && type === fieldType) ){ return true; }
                    
                if( !_matches(fieldEl, '[data-required-from]') ){
                    fieldName = name;
                    fieldType = type;
                }
                
                var fieldResult = isValidField( fieldEl, fieldOptions );
                fieldData.result = fieldResult;

                if( !fieldResult ){
                    obj.result = false;
                }
                
                obj.fields.push( fieldData );
            });
            
            return obj;
        },
        
        submitAjaxForm = function( formEl, options ){
            var options = ( typeof options === 'undefined' ? {} : options );
            
            options.fieldOptions = _mergeObjects( (options.fieldOptions || {}), defaultFieldOptions );
            options.formOptions = _mergeObjects( (options.formOptions || {}), defaultFormOptions );
            
            var formValidation = isValidForm(formEl, options),
                btnEl = formEl.querySelector('[type="submit"]');
            
            if( typeof options.fieldOptions.onValidation === 'function' ){
                options.fieldOptions.onValidation( formValidation.fields );
            }
            
            if( !formValidation.result || _matches(btnEl, ':disabled') ){ return false; }
            
            btnEl.disabled = true;
            
            var formDataJSON = getFormJSON( formEl );
            
            if( typeof options.formOptions.beforeSend === 'function' ){
                var beforeSendData = {
                        formData: formDataJSON,
                        stopExecution: false
                    },
                    beforeSendFn = options.formOptions.beforeSend( beforeSendData, formEl );
                
                if( _isPlainObject(beforeSendFn) ){
                    formDataJSON = beforeSendFn.formData || formDataJSON;
                    if( beforeSendFn.stopExecution ){
                        return false;
                    }
                }
            }
            
            _xhrCall( formEl, formDataJSON, options );
        };
    
    
    
    return {
        addValidationRules: addValidationRules,
        getFormJSON:        getFormJSON,
        init:               init,
        isValidField:       isValidField,
        isValidForm:        isValidForm,
        submitAjaxForm:     submitAjaxForm
    };
    
})();