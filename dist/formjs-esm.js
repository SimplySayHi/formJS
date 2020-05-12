/* formJS v4.0.2 | Valerio Di Punzio (@SimplySayHi) | https://valeriodipunzio.com/plugins/formJS/ | https://github.com/SimplySayHi/formJS | MIT license */
const addClass = (element, cssClasses) => {
    cssClasses.split(" ").forEach(className => {
        element.classList.add(className);
    });
}, isNodeList = nodeList => NodeList.prototype.isPrototypeOf(nodeList), removeClass = (element, cssClasses) => {
    cssClasses.split(" ").forEach(className => {
        element.classList.remove(className);
    });
}, isDOMNode = node => Element.prototype.isPrototypeOf(node), checkFormEl = formEl => {
    let isString = typeof formEl, isFormSelector = "string" === isString && isDOMNode(document.querySelector(formEl)) && "form" === document.querySelector(formEl).tagName.toLowerCase();
    return {
        result: isDOMNode(formEl) || isFormSelector,
        element: "string" === isString ? document.querySelector(formEl) : formEl
    };
}, customEvents_field = {
    validation: "fjs.field:validation"
}, customEvents_form = {
    submit: "fjs.form:submit",
    validation: "fjs.form:validation"
}, mergeObjects = function(out = {}) {
    for (let i = 1; i < arguments.length; i++) {
        let obj = arguments[i];
        if (obj) for (let key in obj) {
            let isArray = "[object Array]" === Object.prototype.toString.call(obj[key]), isObject = "[object Object]" === Object.prototype.toString.call(obj[key]);
            obj.hasOwnProperty(key) && (isArray ? (void 0 === out[key] && (out[key] = []), out[key] = out[key].concat(obj[key].slice(0))) : isObject ? out[key] = mergeObjects(out[key], obj[key]) : Array.isArray(out[key]) ? out[key].push(obj[key]) : out[key] = obj[key]);
        }
    }
    return out;
}, dispatchCustomEvent = (elem, eventName, data = {}, eventOptions = {}) => {
    eventOptions = mergeObjects({}, {
        bubbles: !0
    }, eventOptions);
    const eventObj = new Event(eventName, eventOptions);
    eventObj.data = data, elem.dispatchEvent(eventObj);
}, fieldsStringSelector = 'input:not([type="reset"]):not([type="submit"]):not([type="button"]):not([type="hidden"]), select, textarea', getSplitChar = string => {
    let splitChar = ".";
    return -1 === string.indexOf(splitChar) && (string.indexOf("-") >= 0 ? splitChar = "-" : string.indexOf("/") >= 0 && (splitChar = "/")), 
    splitChar;
}, getUniqueFields = nodeList => {
    let currentFieldName = "", currentFieldType = "";
    return Array.from(nodeList).filter(fieldEl => {
        const name = fieldEl.name, type = fieldEl.type;
        return (name !== currentFieldName || type !== currentFieldType) && (fieldEl.matches("[data-required-from]") || (currentFieldName = name, 
        currentFieldType = type), !0);
    });
}, getValidateFieldDefault = obj => mergeObjects({}, {
    result: !1,
    fieldEl: null
}, obj), getValidateFormDefault = obj => mergeObjects({}, {
    result: !0,
    fields: []
}, obj), isFieldForChangeEvent = fieldEl => fieldEl.matches('select, [type="radio"], [type="checkbox"], [type="file"]'), runFunctionsSequence = ({functionsList: functionsList = [], data: data = {}, stopConditionFn: stopConditionFn = function() {
    return !1;
}} = {}) => functionsList.reduce((acc, promiseFn) => acc.then(res => {
    let dataNew = mergeObjects({}, res[res.length - 1]);
    return stopConditionFn(dataNew) ? Promise.resolve(res) : new Promise(resolve => {
        resolve(promiseFn(dataNew));
    }).then((result = dataNew) => (res.push(result), res));
}), Promise.resolve([ data ])).then(dataList => dataList.length > 1 ? dataList.slice(1) : dataList), serializeObject = obj => obj && "object" == typeof obj && obj.constructor === Object ? Object.keys(obj).reduce((a, k) => (a.push(k + "=" + encodeURIComponent(obj[k])), 
a), []).join("&") : obj, toCamelCase = string => string.replace(/-([a-z])/gi, (all, letter) => letter.toUpperCase()), defaultCallbacksInOptions = {
    fieldOptions: {
        beforeValidation: function(fieldObj) {
            const fieldOptions = this.options.fieldOptions;
            var fields, cssClasses;
            fields = fieldObj.fieldEl, cssClasses = fieldOptions.cssClasses.dirty, (fields = isNodeList(fields) ? Array.from(fields) : [ fields ]).forEach(fieldEl => {
                if ("checkbox" !== fieldEl.type && "radio" !== fieldEl.type) {
                    let containerEl = fieldEl.closest("[data-formjs-question]") || fieldEl;
                    fieldEl.value ? addClass(containerEl, cssClasses) : removeClass(containerEl, cssClasses);
                }
            }), fieldOptions.skipUIfeedback || addClass(fieldObj.fieldEl.closest("[data-formjs-question]"), fieldOptions.cssClasses.pending);
        }
    },
    formOptions: {
        getFormData: function(filteredFields) {
            const formData = {}, formEl = this.formEl;
            return filteredFields.forEach((function(fieldEl) {
                const isCheckbox = "checkbox" === fieldEl.type, isRadio = "radio" === fieldEl.type, isSelect = fieldEl.matches("select"), name = fieldEl.name;
                let value = fieldEl.value;
                if (isCheckbox) {
                    value = fieldEl.checked;
                    let checkboxes = Array.from(formEl.querySelectorAll('[name="' + name + '"]'));
                    if (checkboxes.length > 1) {
                        value = [], checkboxes.filter(field => field.checked).forEach(fieldEl => {
                            value.push(fieldEl.value);
                        });
                    }
                } else if (isRadio) {
                    let checkedRadio = formEl.querySelector('[name="' + name + '"]:checked');
                    value = null === checkedRadio ? null : checkedRadio.value;
                } else if (isSelect) {
                    let selectedOpts = Array.from(fieldEl.options).filter(option => option.selected);
                    selectedOpts.length > 1 && (value = [], selectedOpts.forEach(fieldEl => {
                        value.push(fieldEl.value);
                    }));
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
}, validationRules = {
    date: function(string) {
        return {
            result: /^((((19|[2-9]\d)\d{2})[ \/\-.](0[13578]|1[02])[ \/\-.](0[1-9]|[12]\d|3[01]))|(((19|[2-9]\d)\d{2})[ \/\-.](0[13456789]|1[012])[ \/\-.](0[1-9]|[12]\d|30))|(((19|[2-9]\d)\d{2})[ \/\-.]02[ \/\-.](0[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))[ \/\-.]02[ \/\-.]29))$/g.test(string)
        };
    },
    email: function(string) {
        return {
            result: /^[a-zA-Z_-]([\w.-]?[a-zA-Z0-9])*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?){2,})+$/.test(string)
        };
    },
    number: function(string) {
        return {
            result: /[+-]?([0-9]*[.])?[0-9]+/.test(string)
        };
    }
};

function submit(event) {
    const formEl = event.target, instance = formEl.formjs, options = instance.options, formCssClasses = options.formOptions.cssClasses, isAjaxForm = options.formOptions.ajaxSubmit, btnEl = formEl.querySelector('[type="submit"]'), eventPreventDefault = (enableBtn = !0) => {
        btnEl && enableBtn && (btnEl.disabled = !1), event && event.preventDefault();
    };
    if (isAjaxForm && eventPreventDefault(!1), btnEl) {
        if (btnEl.disabled) return eventPreventDefault(!1), !1;
        btnEl.disabled = !0;
    }
    removeClass(formEl, formCssClasses.ajaxComplete + " " + formCssClasses.ajaxError + " " + formCssClasses.ajaxSuccess), 
    addClass(formEl, formCssClasses.submit), (options.fieldOptions.handleValidation ? instance.validateForm() : Promise.resolve(getValidateFormDefault())).then(formValidation => {
        let beforeSendData = {
            stopExecution: !1,
            formData: {}
        };
        if (!formValidation.result) return eventPreventDefault(), removeClass(formEl, formCssClasses.submit), 
        beforeSendData.stopExecution = !0, [ beforeSendData ];
        let formDataObj = isAjaxForm ? instance.getFormData() : null, callbacksBeforeSend = options.formOptions.beforeSend;
        return formDataObj && (beforeSendData.formData = formDataObj), runFunctionsSequence({
            functionsList: callbacksBeforeSend,
            data: beforeSendData,
            stopConditionFn: function(data) {
                return data.stopExecution;
            }
        });
    }).then(dataList => {
        if (dataList.filter(data => data.stopExecution).length > 0) return eventPreventDefault(), 
        !1;
        if (isAjaxForm) {
            const formData = dataList.pop().formData;
            addClass(formEl, formCssClasses.ajaxPending), dispatchCustomEvent(formEl, customEvents_form.submit, function(formEl, formDataObj, options) {
                let timeoutTimer, btnEl = formEl.querySelector('[type="submit"]'), ajaxOptions = mergeObjects({}, options.formOptions.ajaxOptions), isMultipart = "multipart/form-data" === ajaxOptions.headers["Content-Type"];
                if (ajaxOptions.body = formDataObj, isMultipart && options.fieldOptions.handleFileUpload) {
                    let formDataMultipart = new FormData;
                    for (let key in ajaxOptions.body) formDataMultipart.append(key, ajaxOptions.body[key]);
                    Array.from(formEl.querySelectorAll('[type="file"]')).forEach((function(field) {
                        Array.from(field.files).forEach((function(file, idx) {
                            let name = field.name + "[" + idx + "]";
                            formDataMultipart.append(name, file, file.name);
                        }));
                    })), ajaxOptions.body = formDataMultipart;
                }
                if ("GET" === ajaxOptions.method ? (ajaxOptions.url += (/\?/.test(ajaxOptions.url) ? "&" : "?") + serializeObject(ajaxOptions.body), 
                delete ajaxOptions.body) : ajaxOptions.headers["Content-Type"].indexOf("application/x-www-form-urlencoded") > -1 ? ajaxOptions.body = serializeObject(ajaxOptions.body) : isMultipart || (ajaxOptions.body = JSON.stringify(ajaxOptions.body)), 
                ajaxOptions.headers = new Headers(ajaxOptions.headers), ajaxOptions.timeout > 0) {
                    const controller = new AbortController, signal = controller.signal;
                    ajaxOptions.signal = signal, timeoutTimer = window.setTimeout((function() {
                        controller.abort();
                    }), ajaxOptions.timeout);
                }
                return fetch(ajaxOptions.url, ajaxOptions).then((function(response) {
                    if (!response.ok) return Promise.reject(response);
                    let fetchMethod = ((response, options) => {
                        const accept = options.headers.get("Accept"), contentType = response.headers.get("Content-Type"), headerOpt = accept || contentType || "";
                        return headerOpt.indexOf("application/json") > -1 || "" === headerOpt ? "json" : headerOpt.indexOf("text/") > -1 ? "text" : "blob";
                    })(response, ajaxOptions);
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
    });
}

const listenerCallbacks_dataTypeNumber = function(event) {
    const fieldEl = event.target;
    if (fieldEl.matches('[data-type="number"]')) {
        let fieldValue = fieldEl.value;
        if (/[^\d.,+\-]/.test(fieldValue)) {
            event.stopImmediatePropagation();
            let valueReplaced = fieldValue.replace(/[^\d.,+\-]/g, "");
            fieldEl.value = valueReplaced;
        }
    }
}, listenerCallbacks_keypressMaxlength = function(event) {
    const fieldEl = event.target;
    if (fieldEl.matches("[maxlength]")) {
        const maxLength = 1 * fieldEl.maxLength, keyPressed = event.which || event.keyCode, allowedKeys = [ 8, 37, 38, 39, 46 ];
        if (fieldEl.value.length >= maxLength && -1 === allowedKeys.indexOf(keyPressed)) return !1;
    }
}, listenerCallbacks_pastePrevent = function(event) {
    const fieldEl = event.target;
    let fieldOptions = fieldEl.closest("form").formjs.options.fieldOptions;
    fieldEl.matches(fieldOptions.preventPasteFields) && event.preventDefault();
}, listenerCallbacks_submit = function(event) {
    submit(event);
}, listenerCallbacks_validation = function(event) {
    const eventName = event.type, fieldEl = event.target, self = fieldEl.closest("form").formjs;
    if (fieldEl.matches(fieldsStringSelector)) {
        const isFieldForChangeEventBoolean = isFieldForChangeEvent(fieldEl), isRadio = "radio" === fieldEl.type, isReqFrom = fieldEl.matches("[data-required-from]"), isReqMore = fieldEl.matches("[data-require-more]"), isValidValue = fieldEl.value.trim().length > 0;
        if (isRadio && "change" === eventName) {
            let findReqMoreEl = isReqMore ? fieldEl : self.formEl.querySelector('[name="' + fieldEl.name + '"][data-require-more]'), findReqFromEl = null !== findReqMoreEl ? self.formEl.querySelector('[data-required-from="#' + findReqMoreEl.id + '"]') : null;
            isReqMore ? null !== findReqFromEl && (findReqFromEl.required = fieldEl.required, 
            self.options.fieldOptions.focusOnRelated && findReqFromEl.focus()) : null !== findReqMoreEl && null !== findReqFromEl && (findReqFromEl.required = findReqMoreEl.required && findReqMoreEl.checked, 
            findReqFromEl.value = "");
        }
        if (isReqFrom && isValidValue) {
            let reqMoreEl = self.formEl.querySelector(fieldEl.getAttribute("data-required-from"));
            reqMoreEl.checked = !0, fieldEl.required = reqMoreEl.required;
        }
        if (isFieldForChangeEventBoolean && "change" === eventName || !isFieldForChangeEventBoolean && "change" !== eventName) return self.validateField(fieldEl).then(obj => {
            const type = obj.fieldEl.type, realtedFieldEqualTo = obj.fieldEl.closest("form").querySelector('[data-equal-to="' + obj.fieldEl.name + '"]');
            return (obj.fieldEl.required || obj.fieldEl.matches("[data-validate-if-filled]")) && "checkbox" !== type && "radio" !== type && realtedFieldEqualTo && "" !== realtedFieldEqualTo.value.trim() ? self.validateField(realtedFieldEqualTo) : obj;
        });
    }
}, listenerCallbacks_validationEnd = function(event) {
    const fieldsArray = event.data.fieldEl ? [ event.data ] : event.data.fields, options = fieldsArray[0].fieldEl.closest("form").formjs.options.fieldOptions;
    fieldsArray.forEach((function(obj) {
        let fieldEl = obj.fieldEl;
        if (fieldEl.matches(fieldsStringSelector)) {
            let containerEl = fieldEl.closest("[data-formjs-question]"), isReqFrom = fieldEl.matches("[data-required-from]"), reqMoreEl = document.querySelector(fieldEl.getAttribute("data-required-from"));
            if (null !== containerEl && removeClass(containerEl, options.cssClasses.pending), 
            null !== containerEl && !options.skipUIfeedback) if (obj.result) {
                if (!isReqFrom || isReqFrom && reqMoreEl.checked) {
                    let errorClasses = options.cssClasses.error + " " + options.cssClasses.errorEmpty + " " + options.cssClasses.errorRule;
                    removeClass(containerEl, errorClasses), addClass(containerEl, options.cssClasses.valid);
                }
            } else {
                let extraErrorClass = options.cssClasses.errorRule, isChecks = fieldEl.matches("[data-checks]"), checkedElLength = isChecks ? containerEl.querySelectorAll('[name="' + fieldEl.name + '"]:checked').length : 0;
                (!isChecks && obj.errors && obj.errors.empty || isChecks && 0 === checkedElLength) && (extraErrorClass = options.cssClasses.errorEmpty);
                let errorClasses = options.cssClasses.error + " " + extraErrorClass, errorClassToRemove = options.cssClasses.errorEmpty + " " + options.cssClasses.errorRule;
                removeClass(containerEl, options.cssClasses.valid + " " + errorClassToRemove), addClass(containerEl, errorClasses);
            }
        }
    }));
};

function formStartup(formEl, options) {
    formEl.noValidate = !0;
    let fieldOptions = options.fieldOptions, formOptions = options.formOptions;
    fieldOptions.handleValidation && (fieldOptions.strictHtmlValidation && (formEl.addEventListener("keypress", listenerCallbacks_keypressMaxlength, !1), 
    formEl.addEventListener("input", listenerCallbacks_dataTypeNumber, !1)), fieldOptions.preventPasteFields && formEl.querySelectorAll(fieldOptions.preventPasteFields).length && formEl.addEventListener("paste", listenerCallbacks_pastePrevent, !1), 
    fieldOptions.validateOnEvents.split(" ").forEach((function(eventName) {
        let useCapturing = "blur" === eventName;
        formEl.addEventListener(eventName, listenerCallbacks_validation, useCapturing);
    })), formEl.addEventListener(customEvents_field.validation, listenerCallbacks_validationEnd, !1)), 
    formOptions.handleSubmit && (formEl.addEventListener("submit", listenerCallbacks_submit), 
    formOptions.ajaxSubmit && (formEl.getAttribute("enctype") && (formOptions.ajaxOptions.headers["Content-Type"] = formEl.getAttribute("enctype")), 
    formEl.getAttribute("method") && (formOptions.ajaxOptions.method = formEl.getAttribute("method").toUpperCase()), 
    formEl.getAttribute("action") && (formOptions.ajaxOptions.url = formEl.getAttribute("action"))));
}

const init = function(formEl) {
    const instance = formEl.formjs, formFields = (formEl => getUniqueFields(formEl.querySelectorAll(fieldsStringSelector)).map(fieldEl => {
        const name = fieldEl.name, type = fieldEl.type, isCheckboxOrRadio = "checkbox" === type || "radio" === type, fieldChecked = formEl.querySelector('[name="' + name + '"]:checked'), isReqFrom = fieldEl.matches("[data-required-from]"), reqMoreEl = isReqFrom ? formEl.querySelector(fieldEl.getAttribute("data-required-from")) : null;
        return isCheckboxOrRadio ? fieldChecked || null : isReqFrom && reqMoreEl.checked || !isReqFrom && fieldEl.value ? fieldEl : null;
    }).filter(fieldEl => null !== fieldEl))(formEl);
    return Promise.all(formFields.map(fieldEl => {
        const isFieldForChangeEventBoolean = isFieldForChangeEvent(fieldEl);
        return listenerCallbacks_validation({
            target: fieldEl,
            type: isFieldForChangeEventBoolean ? "change" : ""
        });
    })).then(fields => (instance.isInitialized = !0, {
        instance: instance,
        fields: fields
    }));
}, validationRulesAttributes = {
    checkbox: function(data) {
        let dataChecksEl = data.fieldEl.closest("form").querySelector('[name="' + data.fieldEl.name + '"][data-checks]'), obj = {
            result: data.fieldEl.checked
        };
        return null !== dataChecksEl && (obj = this.checks({
            attrValue: dataChecksEl.getAttribute("data-checks"),
            fieldEl: dataChecksEl
        })), obj;
    },
    checks: function(data) {
        try {
            let attrValue = JSON.parse(data.attrValue), fieldEl = data.fieldEl, checkedElLength = fieldEl.closest("form").querySelectorAll('[name="' + fieldEl.name + '"]:checked').length, isMinOk = checkedElLength >= attrValue[0], isMaxOk = checkedElLength <= attrValue[1], obj = {
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
        let fieldEl = data.fieldEl, checkFromEl = fieldEl.closest("form").querySelector('[name="' + fieldEl.getAttribute("data-equal-to") + '"]'), obj = {
            result: fieldEl.value === checkFromEl.value
        };
        return obj.result || (obj.errors = {
            equalTo: !0
        }), obj;
    },
    exactLength: function(data) {
        let valueLength = data.fieldEl.value.length, exactLength = 1 * data.attrValue, obj = {
            result: valueLength === exactLength
        };
        return obj.result || (obj.errors = {
            exactLength: !0
        }, valueLength < exactLength ? obj.errors.minlength = !0 : obj.errors.maxlength = !0), 
        obj;
    },
    file: function(data) {
        let fieldEl = data.fieldEl, maxFileSize = 1 * (fieldEl.getAttribute("data-max-file-size") || data.fieldOptions.maxFileSize), MIMEtype = fieldEl.accept ? new RegExp(fieldEl.accept.replace("*", "[^\\/,]+")) : null, filesList = Array.from(fieldEl.files), obj = {
            result: !0
        };
        return filesList.forEach((function(file) {
            let exceedMaxFileSize = maxFileSize > 0 && file.size / 1024 / 1024 > maxFileSize, isAcceptedFileType = null === MIMEtype || MIMEtype.test(file.type);
            !exceedMaxFileSize && isAcceptedFileType || (obj.result = !1, void 0 === obj.errors && (obj.errors = {}), 
            obj.errors.file = !0, exceedMaxFileSize && (obj.errors.maxFileSize = !0), isAcceptedFileType || (obj.errors.acceptedFileType = !0));
        })), obj;
    },
    length: function(data) {
        try {
            let valueL = data.fieldEl.value.length, attrValue = JSON.parse(data.attrValue), isMinlengthOk = valueL >= attrValue[0], isMaxlengthOk = valueL <= attrValue[1], obj = {
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
        let fieldEl = data.fieldEl, isDate = fieldEl.matches('[type="date"]') || fieldEl.matches('[data-subtype="date"]') || fieldEl.matches('[data-subtype="dateDDMMYYYY"]'), value = data.fieldEl.value, maxVal = data.attrValue;
        if (isDate) {
            let splitChar = getSplitChar(value);
            value = 2 === value.indexOf(splitChar) ? value.split(splitChar).reverse() : value.split(splitChar), 
            value = value.join(""), maxVal = maxVal.split("-").join("");
        }
        value *= 1, maxVal *= 1;
        let obj = {
            result: value <= maxVal
        };
        return obj.result || (obj.errors = {
            max: !0
        }), obj;
    },
    maxlength: function(data) {
        const obj = {
            result: data.fieldEl.value.length <= 1 * data.attrValue
        };
        return obj.result || (obj.errors = {
            maxlength: !0
        }), obj;
    },
    min: function(data) {
        let fieldEl = data.fieldEl, isDate = fieldEl.matches('[type="date"]') || fieldEl.matches('[data-subtype="date"]') || fieldEl.matches('[data-subtype="dateDDMMYYYY"]'), value = data.fieldEl.value, minVal = data.attrValue;
        if (isDate) {
            let splitChar = getSplitChar(value);
            value = 2 === value.indexOf(splitChar) ? value.split(splitChar).reverse() : value.split(splitChar), 
            value = value.join(""), minVal = minVal.split("-").join("");
        }
        value *= 1, minVal *= 1;
        let obj = {
            result: value >= minVal
        };
        return obj.result || (obj.errors = {
            min: !0
        }), obj;
    },
    minlength: function(data) {
        const obj = {
            result: data.fieldEl.value.length >= 1 * data.attrValue
        };
        return obj.result || (obj.errors = {
            minlength: !0
        }), obj;
    },
    pattern: function(data) {
        let fieldEl = data.fieldEl, fieldPattern = fieldEl.pattern, obj = {
            result: new RegExp(fieldPattern).test(fieldEl.value)
        };
        return obj.result || (obj.errors = {
            pattern: !0
        }), obj;
    },
    radio: function(data) {
        let fieldEl = data.fieldEl, fieldChecked = fieldEl.closest("form").querySelector('[name="' + fieldEl.name + '"]:checked');
        return {
            result: null !== fieldChecked && fieldChecked.value.trim().length > 0
        };
    },
    requiredFrom: function(data) {
        let fieldEl = data.fieldEl, formEl = fieldEl.closest("form"), isValidValue = fieldEl.value.trim().length > 0, reqMoreEl = formEl.querySelector(fieldEl.getAttribute("data-required-from")), obj = {
            result: null !== formEl.querySelector('[name="' + reqMoreEl.name + '"]:checked')
        };
        return reqMoreEl.checked && reqMoreEl.required && (obj.result = isValidValue), obj.result || (obj.errors = {
            requiredFrom: !0
        }), obj;
    }
};

function checkFieldValidity(fieldEl, fieldOptions, validationRules, validationErrors) {
    if (!isDOMNode(fieldEl)) {
        const obj = getValidateFieldDefault({
            fieldEl: fieldEl
        });
        return Promise.resolve(obj);
    }
    const isValidValue = fieldEl.value.trim().length > 0, isRequired = fieldEl.required, isReqFrom = fieldEl.matches("[data-required-from]"), isValidateIfFilled = fieldEl.matches("[data-validate-if-filled]"), rfsObject = {
        functionsList: fieldOptions.beforeValidation,
        data: {
            fieldEl: fieldEl
        }
    };
    return runFunctionsSequence(rfsObject).then(data => {
        let dataObj = data.pop();
        return new Promise(resolve => {
            !isRequired && !isValidateIfFilled && !isReqFrom || isValidateIfFilled && !isValidValue || isReqFrom && !isRequired ? (dataObj.result = !0, 
            resolve(dataObj)) : resolve(function(fieldEl, fieldOptions, validationRules, validationErrors) {
                const fieldType = fieldEl.matches("[data-subtype]") ? toCamelCase(fieldEl.getAttribute("data-subtype")) : fieldEl.type, fieldValue = fieldEl.value, isValidValue = fieldValue.trim().length > 0, fieldAttributes = Array.from(fieldEl.attributes).sort((a, b) => a.name < b.name), attrValidations = [];
                let attrValidationsResult = isValidValue, obj = getValidateFieldDefault({
                    result: isValidValue,
                    fieldEl: fieldEl
                });
                return obj.result ? (fieldAttributes.forEach(attr => {
                    const attrName = toCamelCase(attr.name.replace("data-", "")), attrValue = attr.value, isAttrValueWithFn = "type" === attrName && "function" == typeof validationRulesAttributes[attrValue], isAttrNameWithFn = "function" == typeof validationRulesAttributes[attrName];
                    if (isAttrValueWithFn || isAttrNameWithFn) {
                        const extraValObj = {
                            attrName: isAttrValueWithFn ? attrValue : attrName,
                            attrValue: attrValue,
                            fieldEl: fieldEl,
                            fieldOptions: fieldOptions
                        };
                        isAttrValueWithFn || "requiredFrom" === attrName ? attrValidations.unshift(extraValObj) : attrValidations.push(extraValObj);
                    }
                }), new Promise(resolve => {
                    attrValidations.forEach(item => {
                        const extraVal = validationRulesAttributes[item.attrName](item);
                        extraVal.result || (obj = mergeObjects({}, obj, extraVal), attrValidationsResult = !1);
                    }), "function" == typeof validationRules[fieldType] ? resolve(validationRules[fieldType](fieldValue, fieldEl)) : resolve(obj);
                }).then(data => {
                    if (obj = mergeObjects({}, obj, data, {
                        fieldEl: fieldEl
                    }), obj.result = obj.result && attrValidationsResult, !obj.result) {
                        const fieldErrors = "function" == typeof validationErrors[fieldType] ? validationErrors[fieldType](fieldValue, fieldEl) : {};
                        void 0 === obj.errors && (obj.errors = {}), obj.errors.rule = !0, obj.errors = mergeObjects({}, obj.errors, fieldErrors);
                    }
                    return obj;
                })) : (obj.errors = {
                    empty: !0
                }, Promise.resolve(obj));
            }(fieldEl, fieldOptions, validationRules, validationErrors));
        });
    });
}

function checkFormValidity(formEl, fieldOptions, validationRules, validationErrors, fieldToSkip = null) {
    fieldOptions = mergeObjects({}, fieldOptions, {
        focusOnRelated: !1
    });
    const obj = getValidateFormDefault(), fieldsList = getUniqueFields(formEl.querySelectorAll(fieldsStringSelector));
    return Promise.all(fieldsList.map(fieldEl => {
        if (fieldToSkip && fieldEl === fieldToSkip) {
            const obj2 = getValidateFieldDefault({
                fieldEl: fieldEl,
                result: !0
            });
            return Promise.resolve(obj2);
        }
        return checkFieldValidity(fieldEl, fieldOptions, validationRules, validationErrors);
    })).then(list => {
        let areAllFieldsValid = 0 === list.filter(fieldObj => !fieldObj.result).length;
        return obj.result = areAllFieldsValid, obj.fields = list, obj;
    });
}

class Form {
    constructor(formEl, optionsObj) {
        !function(self, formEl, optionsObj) {
            let argsL = arguments.length, checkFormElem = checkFormEl(formEl);
            if (0 === argsL || argsL > 0 && !formEl) throw new Error('First argument "formEl" is missing or falsy!');
            if (isNodeList(formEl)) throw new Error('First argument "formEl" must be a single DOM node or a form CSS selector, not a NodeList!');
            if (!checkFormElem.result) throw new Error('First argument "formEl" is not a DOM node nor a form CSS selector!');
            self.formEl = checkFormElem.element, self.formEl.formjs = self, self.options = mergeObjects({}, self.constructor.prototype.options, optionsObj);
            const cbList = [ "beforeValidation", "beforeSend", "getFormData" ];
            cbList.forEach(cbName => {
                let optionType = self.options.formOptions[cbName] ? "formOptions" : "fieldOptions", cbOpt = self.options[optionType][cbName];
                cbOpt && (self.options[optionType][cbName] = Array.isArray(cbOpt) ? cbOpt.map(cbFn => cbFn.bind(self)) : cbOpt.bind(self));
            }), formStartup(self.formEl, self.options);
        }(this, formEl, optionsObj);
    }
    destroy() {
        !function(formEl, options) {
            options.fieldOptions.strictHtmlValidation && (formEl.removeEventListener("keypress", listenerCallbacks_keypressMaxlength, !1), 
            formEl.removeEventListener("input", listenerCallbacks_dataTypeNumber, !1)), options.fieldOptions.preventPasteFields && formEl.removeEventListener("paste", listenerCallbacks_pastePrevent, !1), 
            options.formOptions.handleSubmit && formEl.removeEventListener("submit", listenerCallbacks_submit), 
            options.fieldOptions.validateOnEvents.split(" ").forEach((function(eventName) {
                let useCapturing = "blur" === eventName;
                formEl.removeEventListener(eventName, listenerCallbacks_validation, useCapturing);
            })), formEl.removeEventListener(customEvents_field.validation, listenerCallbacks_validationEnd, !1), 
            delete formEl.formjs;
        }(this.formEl, this.options);
    }
    getFormData() {
        const formFieldsEl = this.formEl.querySelectorAll("input, select, textarea"), filteredFields = Array.from(formFieldsEl).filter(elem => elem.matches(':not([type="reset"]):not([type="submit"]):not([type="button"]):not([type="file"]):not([data-exclude-data])'));
        return this.options.formOptions.getFormData(filteredFields);
    }
    init() {
        return init(this.formEl);
    }
    validateField(fieldEl, fieldOptions) {
        fieldEl = "string" == typeof fieldEl ? this.formEl.querySelector(fieldEl) : fieldEl, 
        fieldOptions = mergeObjects({}, this.options.fieldOptions, fieldOptions);
        const formEl = this.formEl, skipUIfeedback = this.options.fieldOptions.skipUIfeedback;
        return checkFieldValidity(fieldEl, fieldOptions, this.validationRules, this.validationErrors).then(obj => new Promise(resolve => {
            obj.fieldEl && (dispatchCustomEvent(obj.fieldEl, customEvents_field.validation, obj, {
                bubbles: !1
            }), dispatchCustomEvent(formEl, customEvents_field.validation, obj), fieldOptions.onValidationCheckAll && obj.result ? (fieldOptions.skipUIfeedback = !0, 
            resolve(checkFormValidity(formEl, fieldOptions, this.validationRules, this.validationErrors, fieldEl).then(dataForm => {
                const clMethodName = dataForm.result ? "add" : "remove";
                return formEl.classList[clMethodName](this.options.formOptions.cssClasses.valid), 
                dispatchCustomEvent(formEl, customEvents_form.validation, dataForm), fieldOptions.skipUIfeedback = skipUIfeedback, 
                obj;
            }))) : obj.result || removeClass(formEl, this.options.formOptions.cssClasses.valid)), 
            resolve(obj);
        }));
    }
    validateForm(fieldOptions) {
        fieldOptions = mergeObjects({}, this.options.fieldOptions, fieldOptions);
        const formEl = this.formEl;
        return checkFormValidity(formEl, fieldOptions, this.validationRules, this.validationErrors).then(data => {
            const clMethodName = data.result ? "add" : "remove";
            return formEl.classList[clMethodName](this.options.formOptions.cssClasses.valid), 
            listenerCallbacks_validationEnd({
                data: data
            }), dispatchCustomEvent(formEl, customEvents_form.validation, data), data;
        });
    }
    static addValidationErrors(errorsObj) {
        this.prototype.validationErrors = mergeObjects({}, this.prototype.validationErrors, errorsObj);
    }
    static addValidationRules(rulesObj) {
        this.prototype.validationRules = mergeObjects({}, this.prototype.validationRules, rulesObj);
    }
    static setOptions(optionsObj) {
        this.prototype.options = mergeObjects({}, this.prototype.options, optionsObj);
    }
}

Form.prototype.isInitialized = !1, Form.prototype.options = options, Form.prototype.validationErrors = {
    email: function(string) {
        const obj = {};
        if (-1 === string.indexOf("@")) obj.missingAtChar = !0; else {
            let splitAt_at = string.split("@");
            if (0 === splitAt_at[0].length && (obj.missingUserName = !0), 0 === splitAt_at[1].length) obj.missingDomain = !0, 
            obj.missingExtensionDot = !0, obj.missingExtension = !0; else if (-1 === splitAt_at[1].indexOf(".")) obj.missingExtensionDot = !0, 
            obj.missingExtension = !0; else {
                let extLength = splitAt_at[1].split(".")[1].length;
                0 === extLength ? obj.missingExtension = !0 : extLength < 2 && (obj.minlengthExtension = !0);
            }
        }
        return obj;
    }
}, Form.prototype.validationRules = validationRules, Form.prototype.version = "4.0.2";

export default Form;
