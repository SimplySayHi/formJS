/* formJS v4.0.1 | Valerio Di Punzio (@SimplySayHi) | https://valeriodipunzio.com/plugins/formJS/ | https://github.com/SimplySayHi/formJS | MIT license */
var Form = function() {
    "use strict";
    function _typeof(obj) {
        return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        })(obj);
    }
    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    var addClass = function(element, cssClasses) {
        cssClasses.split(" ").forEach((function(className) {
            element.classList.add(className);
        }));
    }, checkFormEl = function(formEl) {
        var isString = _typeof(formEl), isFormSelector = "string" === isString && isDOMNode(document.querySelector(formEl)) && "form" === document.querySelector(formEl).tagName.toLowerCase();
        return {
            result: isDOMNode(formEl) || isFormSelector,
            element: "string" === isString ? document.querySelector(formEl) : formEl
        };
    }, customEvents_field = {
        validation: "fjs.field:validation"
    }, customEvents_form = {
        submit: "fjs.form:submit",
        validation: "fjs.form:validation"
    }, dispatchCustomEvent = function(elem, eventName) {
        var data = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, eventOptions = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
        eventOptions = mergeObjects({}, {
            bubbles: !0
        }, eventOptions);
        var eventObj = new Event(eventName, eventOptions);
        eventObj.data = data, elem.dispatchEvent(eventObj);
    }, fieldsStringSelector = 'input:not([type="reset"]):not([type="submit"]):not([type="button"]):not([type="hidden"]), select, textarea', getSplitChar = function(string) {
        var splitChar = ".";
        return -1 === string.indexOf(splitChar) && (string.indexOf("-") >= 0 ? splitChar = "-" : string.indexOf("/") >= 0 && (splitChar = "/")), 
        splitChar;
    }, getUniqueFields = function(nodeList) {
        var currentFieldName = "", currentFieldType = "";
        return Array.from(nodeList).filter((function(fieldEl) {
            var name = fieldEl.name, type = fieldEl.type;
            return (name !== currentFieldName || type !== currentFieldType) && (fieldEl.matches("[data-required-from]") || (currentFieldName = name, 
            currentFieldType = type), !0);
        }));
    }, isDOMNode = function(node) {
        return Element.prototype.isPrototypeOf(node);
    }, isFieldForChangeEvent = function(fieldEl) {
        return fieldEl.matches('select, [type="radio"], [type="checkbox"], [type="file"]');
    }, isNodeList = function(nodeList) {
        return NodeList.prototype.isPrototypeOf(nodeList);
    }, mergeObjects = function mergeObjects() {
        for (var out = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i = 1; i < arguments.length; i++) {
            var obj = arguments[i];
            if (obj) for (var key in obj) {
                var isArray = "[object Array]" === Object.prototype.toString.call(obj[key]), isObject = "[object Object]" === Object.prototype.toString.call(obj[key]);
                obj.hasOwnProperty(key) && (isArray ? (void 0 === out[key] && (out[key] = []), out[key] = out[key].concat(obj[key].slice(0))) : isObject ? out[key] = mergeObjects(out[key], obj[key]) : Array.isArray(out[key]) ? out[key].push(obj[key]) : out[key] = obj[key]);
            }
        }
        return out;
    }, removeClass = function(element, cssClasses) {
        cssClasses.split(" ").forEach((function(className) {
            element.classList.remove(className);
        }));
    }, runFunctionsSequence = function() {
        var _ref = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, _ref$functionsList = _ref.functionsList, functionsList = void 0 === _ref$functionsList ? [] : _ref$functionsList, _ref$data = _ref.data, data = void 0 === _ref$data ? {} : _ref$data, _ref$stopConditionFn = _ref.stopConditionFn, stopConditionFn = void 0 === _ref$stopConditionFn ? function() {
            return !1;
        } : _ref$stopConditionFn;
        return functionsList.reduce((function(acc, promiseFn) {
            return acc.then((function(res) {
                var dataNew = mergeObjects({}, res[res.length - 1]);
                return stopConditionFn(dataNew) ? Promise.resolve(res) : new Promise((function(resolve) {
                    resolve(promiseFn(dataNew));
                })).then((function() {
                    var result = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : dataNew;
                    return res.push(result), res;
                }));
            }));
        }), Promise.resolve([ data ])).then((function(dataList) {
            return dataList.length > 1 ? dataList.slice(1) : dataList;
        }));
    }, serializeObject = function(obj) {
        return obj && "object" === _typeof(obj) && obj.constructor === Object ? Object.keys(obj).reduce((function(a, k) {
            return a.push(k + "=" + encodeURIComponent(obj[k])), a;
        }), []).join("&") : obj;
    }, toCamelCase = function(string) {
        return string.replace(/-([a-z])/gi, (function(all, letter) {
            return letter.toUpperCase();
        }));
    }, validateFieldObjDefault = {
        result: !1,
        fieldEl: null
    }, validateFormObjDefault = {
        result: !0,
        fields: []
    }, defaultCallbacksInOptions = {
        fieldOptions: {
            beforeValidation: function(fieldObj) {
                var fields, cssClasses, fieldOptions = this.options.fieldOptions;
                fields = fieldObj.fieldEl, cssClasses = fieldOptions.cssClasses.dirty, (fields = isNodeList(fields) ? Array.from(fields) : [ fields ]).forEach((function(fieldEl) {
                    if ("checkbox" !== fieldEl.type && "radio" !== fieldEl.type) {
                        var containerEl = fieldEl.closest("[data-formjs-question]") || fieldEl;
                        fieldEl.value ? addClass(containerEl, cssClasses) : removeClass(containerEl, cssClasses);
                    }
                })), fieldOptions.skipUIfeedback || addClass(fieldObj.fieldEl.closest("[data-formjs-question]"), fieldOptions.cssClasses.pending);
            }
        },
        formOptions: {
            getFormData: function(filteredFields) {
                var formData = {}, formEl = this.formEl;
                return filteredFields.forEach((function(fieldEl) {
                    var isCheckbox = "checkbox" === fieldEl.type, isRadio = "radio" === fieldEl.type, isSelect = fieldEl.matches("select"), name = fieldEl.name, value = fieldEl.value;
                    if (isCheckbox) {
                        value = fieldEl.checked;
                        var checkboxes = Array.from(formEl.querySelectorAll('[name="' + name + '"]'));
                        if (checkboxes.length > 1) value = [], checkboxes.filter((function(field) {
                            return field.checked;
                        })).forEach((function(fieldEl) {
                            value.push(fieldEl.value);
                        }));
                    } else if (isRadio) {
                        var checkedRadio = formEl.querySelector('[name="' + name + '"]:checked');
                        value = null === checkedRadio ? null : checkedRadio.value;
                    } else if (isSelect) {
                        var selectedOpts = Array.from(fieldEl.options).filter((function(option) {
                            return option.selected;
                        }));
                        selectedOpts.length > 1 && (value = [], selectedOpts.forEach((function(fieldEl) {
                            value.push(fieldEl.value);
                        })));
                    }
                    formData[name] = value;
                })), formData;
            }
        }
    }, options = {
        fieldOptions: {
            beforeValidation: [ defaultCallbacksInOptions.fieldOptions.beforeValidation ],
            cssClasses: {
                dirty: "is-dirty",
                error: "has-error",
                errorEmpty: "has-error-empty",
                errorRule: "has-error-rule",
                pending: "is-pending",
                valid: "is-valid"
            },
            focusOnRelated: !0,
            handleFileUpload: !0,
            handleValidation: !0,
            maxFileSize: 10,
            onValidationCheckAll: !0,
            preventPasteFields: '[type="password"], [data-equal-to]',
            skipUIfeedback: !1,
            strictHtmlValidation: !0,
            validateOnEvents: "input change"
        },
        formOptions: {
            ajaxOptions: {
                cache: "no-store",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                method: "POST",
                mode: "same-origin",
                redirect: "follow",
                timeout: 0,
                url: location.href
            },
            ajaxSubmit: !0,
            beforeSend: [],
            cssClasses: {
                ajaxComplete: "ajax-complete",
                ajaxError: "ajax-error",
                ajaxPending: "ajax-pending",
                ajaxSuccess: "ajax-success",
                submit: "is-submitting",
                valid: "is-valid"
            },
            getFormData: defaultCallbacksInOptions.formOptions.getFormData,
            handleSubmit: !0
        }
    }, validationRulesAttributes = {
        checkbox: function(data) {
            var dataChecksEl = data.fieldEl.closest("form").querySelector('[name="' + data.fieldEl.name + '"][data-checks]'), obj = {
                result: data.fieldEl.checked
            };
            return null !== dataChecksEl && (obj = this.checks({
                attrValue: dataChecksEl.getAttribute("data-checks"),
                fieldEl: dataChecksEl
            })), obj;
        },
        checks: function(data) {
            try {
                var attrValue = JSON.parse(data.attrValue), fieldEl = data.fieldEl, checkedElLength = fieldEl.closest("form").querySelectorAll('[name="' + fieldEl.name + '"]:checked').length, isMinOk = checkedElLength >= attrValue[0], isMaxOk = checkedElLength <= attrValue[1], obj = {
                    result: isMinOk && isMaxOk
                };
                return obj.result || (obj.errors = {
                    checks: !0
                }, isMinOk || (obj.errors.minChecks = !0), isMaxOk || (obj.errors.maxChecks = !0)), 
                obj;
            } catch (e) {
                throw new Error('"data-checks" attribute is not a valid array!');
            }
        },
        equalTo: function(data) {
            var fieldEl = data.fieldEl, checkFromEl = fieldEl.closest("form").querySelector('[name="' + fieldEl.getAttribute("data-equal-to") + '"]'), obj = {
                result: fieldEl.value === checkFromEl.value
            };
            return obj.result || (obj.errors = {
                equalTo: !0
            }), obj;
        },
        exactLength: function(data) {
            var valueLength = data.fieldEl.value.length, exactLength = 1 * data.attrValue, obj = {
                result: valueLength === exactLength
            };
            return obj.result || (obj.errors = {
                exactLength: !0
            }, valueLength < exactLength ? obj.errors.minlength = !0 : obj.errors.maxlength = !0), 
            obj;
        },
        file: function(data) {
            var fieldEl = data.fieldEl, maxFileSize = 1 * (fieldEl.getAttribute("data-max-file-size") || data.fieldOptions.maxFileSize), MIMEtype = fieldEl.accept ? new RegExp(fieldEl.accept.replace("*", "[^\\/,]+")) : null, filesList = Array.from(fieldEl.files), obj = {
                result: !0
            };
            return filesList.forEach((function(file) {
                var exceedMaxFileSize = maxFileSize > 0 && file.size / 1024 / 1024 > maxFileSize, isAcceptedFileType = null === MIMEtype || MIMEtype.test(file.type);
                !exceedMaxFileSize && isAcceptedFileType || (obj.result = !1, void 0 === obj.errors && (obj.errors = {}), 
                obj.errors.file = !0, exceedMaxFileSize && (obj.errors.maxFileSize = !0), isAcceptedFileType || (obj.errors.acceptedFileType = !0));
            })), obj;
        },
        length: function(data) {
            try {
                var valueL = data.fieldEl.value.length, attrValue = JSON.parse(data.attrValue), isMinlengthOk = valueL >= attrValue[0], isMaxlengthOk = valueL <= attrValue[1], obj = {
                    result: isMinlengthOk && isMaxlengthOk
                };
                return obj.result || (obj.errors = {
                    stringLength: !0
                }, isMinlengthOk || (obj.errors.minlength = !0), isMaxlengthOk || (obj.errors.maxlength = !0)), 
                obj;
            } catch (e) {
                throw new Error('"data-length" attribute is not a valid array!');
            }
        },
        max: function(data) {
            var fieldEl = data.fieldEl, isDate = fieldEl.matches('[type="date"]') || fieldEl.matches('[data-subtype="date"]') || fieldEl.matches('[data-subtype="dateDDMMYYYY"]'), value = data.fieldEl.value, maxVal = data.attrValue;
            if (isDate) {
                var splitChar = getSplitChar(value);
                value = (value = 2 === value.indexOf(splitChar) ? value.split(splitChar).reverse() : value.split(splitChar)).join(""), 
                maxVal = maxVal.split("-").join("");
            }
            var obj = {
                result: (value *= 1) <= (maxVal *= 1)
            };
            return obj.result || (obj.errors = {
                max: !0
            }), obj;
        },
        maxlength: function(data) {
            var obj = {
                result: data.fieldEl.value.length <= 1 * data.attrValue
            };
            return obj.result || (obj.errors = {
                maxlength: !0
            }), obj;
        },
        min: function(data) {
            var fieldEl = data.fieldEl, isDate = fieldEl.matches('[type="date"]') || fieldEl.matches('[data-subtype="date"]') || fieldEl.matches('[data-subtype="dateDDMMYYYY"]'), value = data.fieldEl.value, minVal = data.attrValue;
            if (isDate) {
                var splitChar = getSplitChar(value);
                value = (value = 2 === value.indexOf(splitChar) ? value.split(splitChar).reverse() : value.split(splitChar)).join(""), 
                minVal = minVal.split("-").join("");
            }
            var obj = {
                result: (value *= 1) >= (minVal *= 1)
            };
            return obj.result || (obj.errors = {
                min: !0
            }), obj;
        },
        minlength: function(data) {
            var obj = {
                result: data.fieldEl.value.length >= 1 * data.attrValue
            };
            return obj.result || (obj.errors = {
                minlength: !0
            }), obj;
        },
        pattern: function(data) {
            var fieldEl = data.fieldEl, fieldPattern = fieldEl.pattern, obj = {
                result: new RegExp(fieldPattern).test(fieldEl.value)
            };
            return obj.result || (obj.errors = {
                pattern: !0
            }), obj;
        },
        radio: function(data) {
            var fieldEl = data.fieldEl, fieldChecked = fieldEl.closest("form").querySelector('[name="' + fieldEl.name + '"]:checked');
            return {
                result: null !== fieldChecked && fieldChecked.value.trim().length > 0
            };
        },
        requiredFrom: function(data) {
            var fieldEl = data.fieldEl, formEl = fieldEl.closest("form"), isValidValue = fieldEl.value.trim().length > 0, reqMoreEl = formEl.querySelector(fieldEl.getAttribute("data-required-from")), obj = {
                result: null !== formEl.querySelector('[name="' + reqMoreEl.name + '"]:checked')
            };
            return reqMoreEl.checked && reqMoreEl.required && (obj.result = isValidValue), obj.result || (obj.errors = {
                requiredFrom: !0
            }), obj;
        }
    };
    function submit(event) {
        var formEl = event.target, instance = formEl.formjs, options = instance.options, formCssClasses = options.formOptions.cssClasses, isAjaxForm = options.formOptions.ajaxSubmit, btnEl = formEl.querySelector('[type="submit"]'), eventPreventDefault = function() {
            var enableBtn = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
            btnEl && enableBtn && (btnEl.disabled = !1), event && event.preventDefault();
        };
        if (isAjaxForm && eventPreventDefault(!1), btnEl) {
            if (btnEl.disabled) return eventPreventDefault(!1), !1;
            btnEl.disabled = !0;
        }
        removeClass(formEl, formCssClasses.ajaxComplete + " " + formCssClasses.ajaxError + " " + formCssClasses.ajaxSuccess), 
        addClass(formEl, formCssClasses.submit), (options.fieldOptions.handleValidation ? instance.validateForm() : Promise.resolve(validateFormObjDefault)).then((function(formValidation) {
            var beforeSendData = {
                stopExecution: !1,
                formData: {}
            };
            if (!formValidation.result) return eventPreventDefault(), removeClass(formEl, formCssClasses.submit), 
            beforeSendData.stopExecution = !0, [ beforeSendData ];
            var formDataObj = isAjaxForm ? instance.getFormData() : null, callbacksBeforeSend = options.formOptions.beforeSend;
            return formDataObj && (beforeSendData.formData = formDataObj), runFunctionsSequence({
                functionsList: callbacksBeforeSend,
                data: beforeSendData,
                stopConditionFn: function(data) {
                    return data.stopExecution;
                }
            });
        })).then((function(dataList) {
            if (dataList.filter((function(data) {
                return data.stopExecution;
            })).length > 0) return eventPreventDefault(), !1;
            if (isAjaxForm) {
                var formData = dataList.pop().formData;
                addClass(formEl, formCssClasses.ajaxPending), dispatchCustomEvent(formEl, customEvents_form.submit, function(formEl, formDataObj, options) {
                    var timeoutTimer, btnEl = formEl.querySelector('[type="submit"]'), ajaxOptions = mergeObjects({}, options.formOptions.ajaxOptions), isMultipart = "multipart/form-data" === ajaxOptions.headers["Content-Type"];
                    if (ajaxOptions.body = formDataObj, isMultipart && options.fieldOptions.handleFileUpload) {
                        var formDataMultipart = new FormData;
                        for (var key in ajaxOptions.body) formDataMultipart.append(key, ajaxOptions.body[key]);
                        Array.from(formEl.querySelectorAll('[type="file"]')).forEach((function(field) {
                            Array.from(field.files).forEach((function(file, idx) {
                                var name = field.name + "[" + idx + "]";
                                formDataMultipart.append(name, file, file.name);
                            }));
                        })), ajaxOptions.body = formDataMultipart;
                    }
                    if ("GET" === ajaxOptions.method ? (ajaxOptions.url += (/\?/.test(ajaxOptions.url) ? "&" : "?") + serializeObject(ajaxOptions.body), 
                    delete ajaxOptions.body) : ajaxOptions.headers["Content-Type"].indexOf("application/x-www-form-urlencoded") > -1 ? ajaxOptions.body = serializeObject(ajaxOptions.body) : isMultipart || (ajaxOptions.body = JSON.stringify(ajaxOptions.body)), 
                    ajaxOptions.headers = new Headers(ajaxOptions.headers), ajaxOptions.timeout > 0) {
                        var controller = new AbortController, signal = controller.signal;
                        ajaxOptions.signal = signal, timeoutTimer = window.setTimeout((function() {
                            controller.abort();
                        }), ajaxOptions.timeout);
                    }
                    return fetch(ajaxOptions.url, ajaxOptions).then((function(response) {
                        if (!response.ok) return Promise.reject(response);
                        var fetchMethod = function(response, options) {
                            var accept = options.headers.get("Accept"), contentType = response.headers.get("Content-Type"), headerOpt = accept || contentType || "";
                            return headerOpt.indexOf("application/json") > -1 || "" === headerOpt ? "json" : headerOpt.indexOf("text/") > -1 ? "text" : "blob";
                        }(response, ajaxOptions);
                        return response[fetchMethod]();
                    })).then((function(data) {
                        return addClass(formEl, options.formOptions.cssClasses.ajaxSuccess), data;
                    })).catch((function(error) {
                        return addClass(formEl, options.formOptions.cssClasses.ajaxError), Promise.reject(error);
                    })).finally((function() {
                        timeoutTimer && window.clearTimeout(timeoutTimer), removeClass(formEl, options.formOptions.cssClasses.submit + " " + options.formOptions.cssClasses.ajaxPending), 
                        addClass(formEl, options.formOptions.cssClasses.ajaxComplete), btnEl.disabled = !1;
                    }));
                }(formEl, formData, options));
            }
        }));
    }
    var listenerCallbacks_dataTypeNumber = function(event) {
        var fieldEl = event.target;
        if (fieldEl.matches('[data-type="number"]')) {
            var fieldValue = fieldEl.value;
            if (/[^\d.,+\-]/.test(fieldValue)) {
                event.stopImmediatePropagation();
                var valueReplaced = fieldValue.replace(/[^\d.,+\-]/g, "");
                fieldEl.value = valueReplaced;
            }
        }
    }, listenerCallbacks_keypressMaxlength = function(event) {
        var fieldEl = event.target;
        if (fieldEl.matches("[maxlength]")) {
            var maxLength = 1 * fieldEl.maxLength, keyPressed = event.which || event.keyCode;
            if (fieldEl.value.length >= maxLength && -1 === [ 8, 37, 38, 39, 46 ].indexOf(keyPressed)) return !1;
        }
    }, listenerCallbacks_pastePrevent = function(event) {
        var fieldEl = event.target, fieldOptions = fieldEl.closest("form").formjs.options.fieldOptions;
        fieldEl.matches(fieldOptions.preventPasteFields) && event.preventDefault();
    }, listenerCallbacks_submit = function(event) {
        submit(event);
    }, listenerCallbacks_validation = function(event) {
        var eventName = event.type, fieldEl = event.target, self = fieldEl.closest("form").formjs;
        if (fieldEl.matches(fieldsStringSelector)) {
            var isFieldForChangeEventBoolean = isFieldForChangeEvent(fieldEl), isRadio = "radio" === fieldEl.type, isReqFrom = fieldEl.matches("[data-required-from]"), isReqMore = fieldEl.matches("[data-require-more]"), isValidValue = fieldEl.value.trim().length > 0;
            if (isRadio && "change" === eventName) {
                var findReqMoreEl = isReqMore ? fieldEl : self.formEl.querySelector('[name="' + fieldEl.name + '"][data-require-more]'), findReqFromEl = null !== findReqMoreEl ? self.formEl.querySelector('[data-required-from="#' + findReqMoreEl.id + '"]') : null;
                isReqMore ? null !== findReqFromEl && (findReqFromEl.required = fieldEl.required, 
                self.options.fieldOptions.focusOnRelated && findReqFromEl.focus()) : null !== findReqMoreEl && null !== findReqFromEl && (findReqFromEl.required = findReqMoreEl.required && findReqMoreEl.checked, 
                findReqFromEl.value = "");
            }
            if (isReqFrom && isValidValue) {
                var reqMoreEl = self.formEl.querySelector(fieldEl.getAttribute("data-required-from"));
                reqMoreEl.checked = !0, fieldEl.required = reqMoreEl.required;
            }
            if (isFieldForChangeEventBoolean && "change" === eventName || !isFieldForChangeEventBoolean && "change" !== eventName) return self.validateField(fieldEl).then((function(obj) {
                var type = obj.fieldEl.type, realtedFieldEqualTo = obj.fieldEl.closest("form").querySelector('[data-equal-to="' + obj.fieldEl.name + '"]');
                return (obj.fieldEl.required || obj.fieldEl.matches("[data-validate-if-filled]")) && "checkbox" !== type && "radio" !== type && realtedFieldEqualTo && "" !== realtedFieldEqualTo.value.trim() ? self.validateField(realtedFieldEqualTo) : obj;
            }));
        }
    }, listenerCallbacks_validationEnd = function(event) {
        var fieldsArray = event.data.fieldEl ? [ event.data ] : event.data.fields, options = fieldsArray[0].fieldEl.closest("form").formjs.options.fieldOptions;
        fieldsArray.forEach((function(obj) {
            var fieldEl = obj.fieldEl;
            if (fieldEl.matches(fieldsStringSelector)) {
                var containerEl = fieldEl.closest("[data-formjs-question]"), isReqFrom = fieldEl.matches("[data-required-from]"), reqMoreEl = document.querySelector(fieldEl.getAttribute("data-required-from"));
                if (null !== containerEl && removeClass(containerEl, options.cssClasses.pending), 
                null !== containerEl && !options.skipUIfeedback) if (obj.result) {
                    if (!isReqFrom || isReqFrom && reqMoreEl.checked) {
                        var errorClasses = options.cssClasses.error + " " + options.cssClasses.errorEmpty + " " + options.cssClasses.errorRule;
                        removeClass(containerEl, errorClasses), addClass(containerEl, options.cssClasses.valid);
                    }
                } else {
                    var extraErrorClass = options.cssClasses.errorRule, isChecks = fieldEl.matches("[data-checks]"), checkedElLength = isChecks ? containerEl.querySelectorAll('[name="' + fieldEl.name + '"]:checked').length : 0;
                    (!isChecks && obj.errors && obj.errors.empty || isChecks && 0 === checkedElLength) && (extraErrorClass = options.cssClasses.errorEmpty);
                    var _errorClasses = options.cssClasses.error + " " + extraErrorClass, errorClassToRemove = options.cssClasses.errorEmpty + " " + options.cssClasses.errorRule;
                    removeClass(containerEl, options.cssClasses.valid + " " + errorClassToRemove), addClass(containerEl, _errorClasses);
                }
            }
        }));
    };
    function formStartup(formEl, options) {
        formEl.noValidate = !0;
        var fieldOptions = options.fieldOptions, formOptions = options.formOptions;
        fieldOptions.handleValidation && (fieldOptions.strictHtmlValidation && (formEl.addEventListener("keypress", listenerCallbacks_keypressMaxlength, !1), 
        formEl.addEventListener("input", listenerCallbacks_dataTypeNumber, !1)), fieldOptions.preventPasteFields && formEl.querySelectorAll(fieldOptions.preventPasteFields).length && formEl.addEventListener("paste", listenerCallbacks_pastePrevent, !1), 
        fieldOptions.validateOnEvents.split(" ").forEach((function(eventName) {
            var useCapturing = "blur" === eventName;
            formEl.addEventListener(eventName, listenerCallbacks_validation, useCapturing);
        })), formEl.addEventListener(customEvents_field.validation, listenerCallbacks_validationEnd, !1)), 
        formOptions.handleSubmit && (formEl.addEventListener("submit", listenerCallbacks_submit), 
        formOptions.ajaxSubmit && (formEl.getAttribute("enctype") && (formOptions.ajaxOptions.headers["Content-Type"] = formEl.getAttribute("enctype")), 
        formEl.getAttribute("method") && (formOptions.ajaxOptions.method = formEl.getAttribute("method").toUpperCase()), 
        formEl.getAttribute("action") && (formOptions.ajaxOptions.url = formEl.getAttribute("action"))));
    }
    var init = function(formEl) {
        var instance = formEl.formjs, formFields = function(formEl) {
            return getUniqueFields(formEl.querySelectorAll(fieldsStringSelector)).map((function(fieldEl) {
                var name = fieldEl.name, type = fieldEl.type, isCheckboxOrRadio = "checkbox" === type || "radio" === type, fieldChecked = formEl.querySelector('[name="' + name + '"]:checked'), isReqFrom = fieldEl.matches("[data-required-from]"), reqMoreEl = isReqFrom ? formEl.querySelector(fieldEl.getAttribute("data-required-from")) : null;
                return isCheckboxOrRadio ? fieldChecked || null : isReqFrom && reqMoreEl.checked || !isReqFrom && fieldEl.value ? fieldEl : null;
            })).filter((function(fieldEl) {
                return null !== fieldEl;
            }));
        }(formEl);
        return Promise.all(formFields.map((function(fieldEl) {
            var isFieldForChangeEventBoolean = isFieldForChangeEvent(fieldEl);
            return listenerCallbacks_validation({
                target: fieldEl,
                type: isFieldForChangeEventBoolean ? "change" : ""
            });
        }))).then((function(fields) {
            return instance.isInitialized = !0, {
                instance: instance,
                fields: fields
            };
        }));
    };
    function isValidField(fieldEl, fieldOptions, validationRules, validationErrors) {
        var obj = mergeObjects({}, validateFieldObjDefault, {
            fieldEl: fieldEl
        });
        if (!isDOMNode(fieldEl)) return Promise.resolve(obj);
        var isValidValue = fieldEl.value.trim().length > 0, isRequired = fieldEl.required, isReqFrom = fieldEl.matches("[data-required-from]"), isValidateIfFilled = fieldEl.matches("[data-validate-if-filled]"), rfsObject = {
            functionsList: fieldOptions.beforeValidation,
            data: {
                fieldEl: fieldEl
            }
        };
        return runFunctionsSequence(rfsObject).then((function(data) {
            var dataObj = data.pop();
            return new Promise((function(resolve) {
                !isRequired && !isValidateIfFilled && !isReqFrom || isValidateIfFilled && !isValidValue || isReqFrom && !isRequired ? (dataObj.result = !0, 
                resolve(dataObj)) : resolve(function(fieldEl, fieldOptions, validationRules, validationErrors) {
                    var fieldType = fieldEl.matches("[data-subtype]") ? toCamelCase(fieldEl.getAttribute("data-subtype")) : fieldEl.type, fieldValue = fieldEl.value, isValidValue = fieldValue.trim().length > 0, fieldAttributes = Array.from(fieldEl.attributes).sort((function(a, b) {
                        return a.name < b.name;
                    })), attrValidations = [], attrValidationsResult = isValidValue, obj = {
                        result: isValidValue,
                        fieldEl: fieldEl
                    };
                    return obj.result ? (fieldAttributes.forEach((function(attr) {
                        var attrName = toCamelCase(attr.name.replace("data-", "")), attrValue = attr.value, isAttrValueWithFn = "type" === attrName && "function" == typeof validationRulesAttributes[attrValue], isAttrNameWithFn = "function" == typeof validationRulesAttributes[attrName];
                        if (isAttrValueWithFn || isAttrNameWithFn) {
                            var extraValObj = {
                                attrName: isAttrValueWithFn ? attrValue : attrName,
                                attrValue: attrValue,
                                fieldEl: fieldEl,
                                fieldOptions: fieldOptions
                            };
                            isAttrValueWithFn || "requiredFrom" === attrName ? attrValidations.unshift(extraValObj) : attrValidations.push(extraValObj);
                        }
                    })), new Promise((function(resolve) {
                        attrValidations.forEach((function(item) {
                            var extraVal = validationRulesAttributes[item.attrName](item);
                            extraVal.result || (obj = mergeObjects({}, obj, extraVal), attrValidationsResult = !1);
                        })), "function" == typeof validationRules[fieldType] ? resolve(validationRules[fieldType](fieldValue, fieldEl)) : resolve(obj);
                    })).then((function(data) {
                        if ((obj = mergeObjects({}, obj, data, {
                            fieldEl: fieldEl
                        })).result = obj.result && attrValidationsResult, !obj.result) {
                            var fieldErrors = "function" == typeof validationErrors[fieldType] ? validationErrors[fieldType](fieldValue, fieldEl) : {};
                            void 0 === obj.errors && (obj.errors = {}), obj.errors.rule = !0, obj.errors = mergeObjects({}, obj.errors, fieldErrors);
                        }
                        return obj;
                    }))) : (obj.errors = {
                        empty: !0
                    }, Promise.resolve(obj));
                }(fieldEl, fieldOptions, validationRules, validationErrors));
            }));
        }));
    }
    function isValidForm(formEl, fieldOptions, validationRules, validationErrors) {
        fieldOptions = mergeObjects({}, fieldOptions, {
            focusOnRelated: !1
        });
        var obj = mergeObjects({}, validateFormObjDefault), fieldsList = getUniqueFields(formEl.querySelectorAll(fieldsStringSelector));
        return Promise.all(fieldsList.map((function(fieldEl) {
            return isValidField(fieldEl, fieldOptions, validationRules, validationErrors);
        }))).then((function(list) {
            var areAllFieldsValid = 0 === list.filter((function(fieldObj) {
                return !fieldObj.result;
            })).length;
            return obj.result = areAllFieldsValid, obj.fields = list, obj;
        }));
    }
    function validateField(fieldEl, options, validationRules, validationErrors) {
        var formEl = fieldEl.closest("form"), skipUIfeedback = options.fieldOptions.skipUIfeedback;
        return new Promise((function(resolve) {
            resolve(isValidField(fieldEl, options.fieldOptions, validationRules, validationErrors));
        })).then((function(obj) {
            return new Promise((function(resolve) {
                obj.fieldEl && (dispatchCustomEvent(obj.fieldEl, customEvents_field.validation, obj, {
                    bubbles: !1
                }), dispatchCustomEvent(formEl, customEvents_field.validation, obj), options.fieldOptions.onValidationCheckAll && obj.result ? (options.fieldOptions.skipUIfeedback = !0, 
                resolve(isValidForm(formEl, options.fieldOptions, validationRules, validationErrors).then((function(dataForm) {
                    var clMethodName = dataForm.result ? "add" : "remove";
                    return formEl.classList[clMethodName](options.formOptions.cssClasses.valid), dispatchCustomEvent(formEl, customEvents_form.validation, dataForm), 
                    options.fieldOptions.skipUIfeedback = skipUIfeedback, obj;
                })))) : obj.result || removeClass(formEl, options.formOptions.cssClasses.valid)), 
                resolve(obj);
            }));
        }));
    }
    function validateForm(formEl, options, validationRules, validationErrors) {
        return new Promise((function(resolve) {
            resolve(isValidForm(formEl, options.fieldOptions, validationRules, validationErrors));
        })).then((function(data) {
            var clMethodName = data.result ? "add" : "remove";
            return formEl.classList[clMethodName](options.formOptions.cssClasses.valid), listenerCallbacks_validationEnd({
                data: data
            }), dispatchCustomEvent(formEl, customEvents_form.validation, data), data;
        }));
    }
    var Form = function() {
        function Form(formEl, optionsObj) {
            !function(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }(this, Form), function(self, formEl, optionsObj) {
                var argsL = arguments.length, checkFormElem = checkFormEl(formEl);
                if (0 === argsL || argsL > 0 && !formEl) throw new Error('First argument "formEl" is missing or falsy!');
                if (isNodeList(formEl)) throw new Error('First argument "formEl" must be a single DOM node or a form CSS selector, not a NodeList!');
                if (!checkFormElem.result) throw new Error('First argument "formEl" is not a DOM node nor a form CSS selector!');
                self.formEl = checkFormElem.element, self.formEl.formjs = self, self.options = mergeObjects({}, self.constructor.prototype.options, optionsObj);
                var cbList = [ "beforeValidation", "beforeSend", "getFormData" ];
                cbList.forEach((function(cbName) {
                    var optionType = self.options.formOptions[cbName] ? "formOptions" : "fieldOptions", cbOpt = self.options[optionType][cbName];
                    cbOpt && (self.options[optionType][cbName] = Array.isArray(cbOpt) ? cbOpt.map((function(cbFn) {
                        return cbFn.bind(self);
                    })) : cbOpt.bind(self));
                })), formStartup(self.formEl, self.options);
            }(this, formEl, optionsObj);
        }
        var Constructor, protoProps, staticProps;
        return Constructor = Form, staticProps = [ {
            key: "addValidationErrors",
            value: function(errorsObj) {
                this.prototype.validationErrors = mergeObjects({}, this.prototype.validationErrors, errorsObj);
            }
        }, {
            key: "addValidationRules",
            value: function(rulesObj) {
                this.prototype.validationRules = mergeObjects({}, this.prototype.validationRules, rulesObj);
            }
        }, {
            key: "setOptions",
            value: function(optionsObj) {
                this.prototype.options = mergeObjects({}, this.prototype.options, optionsObj);
            }
        } ], (protoProps = [ {
            key: "destroy",
            value: function() {
                !function(formEl, options) {
                    options.fieldOptions.strictHtmlValidation && (formEl.removeEventListener("keypress", listenerCallbacks_keypressMaxlength, !1), 
                    formEl.removeEventListener("input", listenerCallbacks_dataTypeNumber, !1)), options.fieldOptions.preventPasteFields && formEl.removeEventListener("paste", listenerCallbacks_pastePrevent, !1), 
                    options.formOptions.handleSubmit && formEl.removeEventListener("submit", listenerCallbacks_submit), 
                    options.fieldOptions.validateOnEvents.split(" ").forEach((function(eventName) {
                        var useCapturing = "blur" === eventName;
                        formEl.removeEventListener(eventName, listenerCallbacks_validation, useCapturing);
                    })), formEl.removeEventListener(customEvents_field.validation, listenerCallbacks_validationEnd, !1), 
                    delete formEl.formjs;
                }(this.formEl, this.options);
            }
        }, {
            key: "getFormData",
            value: function() {
                var formFieldsEl = this.formEl.querySelectorAll("input, select, textarea"), filteredFields = Array.from(formFieldsEl).filter((function(elem) {
                    return elem.matches(':not([type="reset"]):not([type="submit"]):not([type="button"]):not([type="file"]):not([data-exclude-data])');
                }));
                return this.options.formOptions.getFormData(filteredFields);
            }
        }, {
            key: "init",
            value: function() {
                return init(this.formEl);
            }
        }, {
            key: "validateField",
            value: function(fieldEl) {
                var fieldOptions = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                fieldEl = "string" == typeof fieldEl ? this.formEl.querySelector(fieldEl) : fieldEl;
                var options = mergeObjects({}, this.options, {
                    fieldOptions: fieldOptions
                });
                return validateField(fieldEl, options, this.validationRules, this.validationErrors);
            }
        }, {
            key: "validateForm",
            value: function() {
                var fieldOptions = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, options = mergeObjects({}, this.options, {
                    fieldOptions: fieldOptions
                });
                return validateForm(this.formEl, options, this.validationRules, this.validationErrors);
            }
        } ]) && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
        Form;
    }();
    return Form.prototype.isInitialized = !1, Form.prototype.options = options, Form.prototype.validationErrors = {
        email: function(string) {
            var obj = {};
            if (-1 === string.indexOf("@")) obj.missingAtChar = !0; else {
                var splitAt_at = string.split("@");
                if (0 === splitAt_at[0].length && (obj.missingUserName = !0), 0 === splitAt_at[1].length) obj.missingDomain = !0, 
                obj.missingExtensionDot = !0, obj.missingExtension = !0; else if (-1 === splitAt_at[1].indexOf(".")) obj.missingExtensionDot = !0, 
                obj.missingExtension = !0; else {
                    var extLength = splitAt_at[1].split(".")[1].length;
                    0 === extLength ? obj.missingExtension = !0 : extLength < 2 && (obj.minlengthExtension = !0);
                }
            }
            return obj;
        }
    }, Form.prototype.validationRules = {
        date: function(string) {
            var date = /^((((19|[2-9]\d)\d{2})[ \/\-.](0[13578]|1[02])[ \/\-.](0[1-9]|[12]\d|3[01]))|(((19|[2-9]\d)\d{2})[ \/\-.](0[13456789]|1[012])[ \/\-.](0[1-9]|[12]\d|30))|(((19|[2-9]\d)\d{2})[ \/\-.]02[ \/\-.](0[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))[ \/\-.]02[ \/\-.]29))$/g.test(string);
            return {
                result: date
            };
        },
        email: function(string) {
            return {
                result: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(string)
            };
        },
        number: function(string) {
            return {
                result: /[+-]?([0-9]*[.])?[0-9]+/.test(string)
            };
        }
    }, Form.prototype.version = "4.0.1", Form;
}();
