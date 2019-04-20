(function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.l = true;
        return module.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.d = function(exports, name, getter) {
        if (!__webpack_require__.o(exports, name)) {
            Object.defineProperty(exports, name, {
                enumerable: true,
                get: getter
            });
        }
    };
    __webpack_require__.r = function(exports) {
        if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
            Object.defineProperty(exports, Symbol.toStringTag, {
                value: "Module"
            });
        }
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
    };
    __webpack_require__.t = function(value, mode) {
        if (mode & 1) value = __webpack_require__(value);
        if (mode & 8) return value;
        if (mode & 4 && typeof value === "object" && value && value.__esModule) return value;
        var ns = Object.create(null);
        __webpack_require__.r(ns);
        Object.defineProperty(ns, "default", {
            enumerable: true,
            value: value
        });
        if (mode & 2 && typeof value != "string") for (var key in value) __webpack_require__.d(ns, key, function(key) {
            return value[key];
        }.bind(null, key));
        return ns;
    };
    __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function getDefault() {
            return module["default"];
        } : function getModuleExports() {
            return module;
        };
        __webpack_require__.d(getter, "a", getter);
        return getter;
    };
    __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };
    __webpack_require__.p = "";
    return __webpack_require__(__webpack_require__.s = "./src/index.js");
})({
    "./src/index.js": function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        /**! formJS v3.0.0 | Valerio Di Punzio (@SimplySayHi) | http://simplysayhi.github.io/formJS | https://github.com/SimplySayHi/formJS | MIT license */        var _helper = __webpack_require__("./src/modules/helper.js");
        var _optionsUtils = __webpack_require__("./src/modules/optionsUtils.js");
        var _options = __webpack_require__("./src/modules/options.js");
        var _validationRules = __webpack_require__("./src/modules/validationRules.js");
        var _validationErrors = __webpack_require__("./src/modules/validationErrors.js");
        var _constructor2 = __webpack_require__("./src/modules/constructor.js");
        var _destroy2 = __webpack_require__("./src/modules/destroy.js");
        var _getFormData2 = __webpack_require__("./src/modules/getFormData.js");
        var _init2 = __webpack_require__("./src/modules/init.js");
        var _isValidField2 = __webpack_require__("./src/modules/isValidField.js");
        var _isValidForm2 = __webpack_require__("./src/modules/isValidForm.js");
        var _submit2 = __webpack_require__("./src/modules/submit.js");
        var _validateField2 = __webpack_require__("./src/modules/validateField.js");
        var _validateForm2 = __webpack_require__("./src/modules/validateForm.js");
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var version = "3.0.0";
        var Form = function() {
            function Form(formEl, optionsObj) {
                _classCallCheck(this, Form);
                _constructor2._constructor.call(this, formEl, optionsObj);
            }
            _createClass(Form, [ {
                key: "destroy",
                value: function destroy() {
                    _destroy2.destroy.call(this);
                }
            }, {
                key: "getFormData",
                value: function getFormData(customFn) {
                    return _getFormData2.getFormData.call(this, customFn);
                }
            }, {
                key: "init",
                value: function init() {
                    return _init2.init.call(this);
                }
            }, {
                key: "isValidField",
                value: function isValidField(fieldEl, fieldOptions) {
                    return _isValidField2.isValidField.call(this, fieldEl, fieldOptions);
                }
            }, {
                key: "isValidForm",
                value: function isValidForm(optionsObj) {
                    return _isValidForm2.isValidForm.call(this, optionsObj);
                }
            }, {
                key: "submit",
                value: function submit(optionsObj, event) {
                    _submit2.submit.call(this, optionsObj, event);
                }
            }, {
                key: "validateField",
                value: function validateField(fieldElem, fieldOptions) {
                    return _validateField2.validateField.call(this, fieldElem, fieldOptions);
                }
            }, {
                key: "validateForm",
                value: function validateForm(optionsObj) {
                    return _validateForm2.validateForm.call(this, optionsObj);
                }
            } ], [ {
                key: "addValidationErrors",
                value: function addValidationErrors(errorsObj) {
                    this.prototype.validationErrors = (0, _helper._mergeObjects)({}, this.prototype.validationErrors, errorsObj);
                }
            }, {
                key: "addValidationRules",
                value: function addValidationRules(rulesObj) {
                    this.prototype.validationRules = (0, _helper._mergeObjects)({}, this.prototype.validationRules, rulesObj);
                }
            }, {
                key: "setOptions",
                value: function setOptions(optionsObj) {
                    this.prototype.options = (0, _helper._mergeObjects)({}, this.prototype.options, optionsObj);
                }
            } ]);
            return Form;
        }();
        Form.prototype.isInitialized = false;
        Form.prototype.listenerCallbacks = {};
        Form.prototype.options = _options.options;
        Form.prototype.validationErrors = _validationErrors.validationErrors;
        Form.prototype.validationRules = _validationRules.validationRules;
        Form.prototype.version = version;
        _optionsUtils._setCallbackFunctionsInOptions.call(Form.prototype);
        if (!window.Form) {
            window.Form = Form;
        }
        if (!window.FormJS) {
            window.FormJS = Form;
        }
    },
    "./src/modules/ajaxCall.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports._ajaxCall = _ajaxCall;
        var _helper = __webpack_require__("./src/modules/helper.js");
        function _ajaxCall(formDataObj) {
            var self = this, formEl = self.formEl, fieldOptions = self.options.fieldOptions, formOptions = self.options.formOptions, btnEl = formEl.querySelector('[type="submit"]'), timeoutTimer = void 0, ajaxOptions = (0, 
            _helper._mergeObjects)({}, formOptions.ajaxOptions), isMultipart = ajaxOptions.headers["Content-Type"] === "multipart/form-data";
            ajaxOptions.body = formDataObj;
            if (isMultipart && fieldOptions.handleFileUpload) {
                var formDataMultipart = new FormData();
                for (var key in ajaxOptions.body) {
                    formDataMultipart.append(key, ajaxOptions.body[key]);
                }
                Array.from(formEl.querySelectorAll('[type="file"]')).forEach(function(field) {
                    Array.from(field.files).forEach(function(file, idx) {
                        var name = field.name + "[" + idx + "]";
                        formDataMultipart.append(name, file, file.name);
                    });
                });
                ajaxOptions.body = formDataMultipart;
            }
            if (ajaxOptions.method === "GET") {
                ajaxOptions.url += (/\?/.test(ajaxOptions.url) ? "&" : "?") + (0, _helper._serialize)(ajaxOptions.body);
                delete ajaxOptions.body;
            } else {
                if (ajaxOptions.headers["Content-Type"].indexOf("application/x-www-form-urlencoded") > -1) {
                    ajaxOptions.body = (0, _helper._serialize)(ajaxOptions.body);
                } else if (!isMultipart) {
                    ajaxOptions.body = JSON.stringify(ajaxOptions.body);
                }
            }
            ajaxOptions.headers = new Headers(ajaxOptions.headers);
            if (ajaxOptions.timeout > 0) {
                var controller = new AbortController();
                var signal = controller.signal;
                ajaxOptions.signal = signal;
                timeoutTimer = window.setTimeout(function() {
                    controller.abort();
                }, ajaxOptions.timeout);
            }
            fetch(ajaxOptions.url, ajaxOptions).then(function(response) {
                var getFetchMethod = function getFetchMethod(response) {
                    var contentType = response.headers.get("Content-Type"), methodName = "blob";
                    if (contentType.indexOf("application/json") > -1) {
                        methodName = "json";
                    } else if (contentType.indexOf("text/") > -1) {
                        methodName = "text";
                    }
                    return methodName;
                };
                var fetchMethod = getFetchMethod(response);
                return response[fetchMethod]();
            }).then(function(data) {
                _helper._executeCallback.call(self, formOptions.onSubmitSuccess, data);
            }).catch(function(error) {
                _helper._executeCallback.call(self, formOptions.onSubmitError, error);
            }).finally(function() {
                if (timeoutTimer) {
                    window.clearTimeout(timeoutTimer);
                }
                btnEl.disabled = false;
                _helper._executeCallback.call(self, formOptions.onSubmitComplete);
            });
        }
    },
    "./src/modules/checkDirtyField.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports._checkDirtyField = _checkDirtyField;
        var _helper = __webpack_require__("./src/modules/helper.js");
        function _checkDirtyField(fields) {
            var cssClasses = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.options.fieldOptions.cssClasses.dirty;
            var fields = (0, _helper._isNodeList)(fields) ? Array.from(fields) : [ fields ];
            fields.forEach(function(fieldEl) {
                if (fieldEl.type !== "checkbox" && fieldEl.type !== "radio") {
                    var containerEl = fieldEl.closest("[data-formjs-question]") || fieldEl;
                    if (fieldEl.value) {
                        (0, _helper._addClass)(containerEl, cssClasses);
                    } else {
                        (0, _helper._removeClass)(containerEl, cssClasses);
                    }
                }
            });
        }
    },
    "./src/modules/constructor.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports._constructor = _constructor;
        var _helper = __webpack_require__("./src/modules/helper.js");
        var _listenerCallbacks = __webpack_require__("./src/modules/listenerCallbacks.js");
        var _formStartup2 = __webpack_require__("./src/modules/formStartup.js");
        function _constructor(formEl) {
            var optionsObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var self = this, argsL = arguments.length, checkFormEl = (0, _helper._checkFormEl)(formEl);
            if (argsL === 0 || argsL > 0 && !formEl) {
                throw new Error('First argument "formEl" is missing or falsy!');
            }
            if ((0, _helper._isNodeList)(formEl)) {
                throw new Error('First argument "formEl" must be a single DOM node or a form CSS selector, not a NodeList!');
            }
            if (!checkFormEl.result) {
                throw new Error('First argument "formEl" is not a DOM node nor a form CSS selector!');
            }
            if (!Object.isFrozen(Form.prototype.listenerCallbacks)) {
                Form.prototype.listenerCallbacks = {
                    charCount: _listenerCallbacks._callbackFns.charCount,
                    dataTypeNumber: _listenerCallbacks._callbackFns.dataTypeNumber,
                    keypressMaxlength: _listenerCallbacks._callbackFns.keypressMaxlength,
                    pastePrevent: _listenerCallbacks._callbackFns.pastePrevent.bind(self),
                    submit: _listenerCallbacks._callbackFns.submit.bind(self),
                    validation: _listenerCallbacks._callbackFns.validation.bind(self)
                };
                Object.freeze(Form.prototype.listenerCallbacks);
            }
            self.formEl = checkFormEl.element;
            self.options = (0, _helper._mergeObjects)({}, Form.prototype.options, optionsObj);
            _formStartup2._formStartup.call(self);
            self.formEl.formjs = self;
        }
    },
    "./src/modules/destroy.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.destroy = destroy;
        function destroy() {
            var self = this, formEl = self.formEl, validationListenerNames = self.options.fieldOptions.validateOnEvents;
            if (formEl.querySelectorAll("[data-char-count]").length > 0) {
                formEl.removeEventListener("input", self.listenerCallbacks.charCount, false);
            }
            if (self.options.fieldOptions.strictHtmlValidation) {
                formEl.removeEventListener("keypress", self.listenerCallbacks.keypressMaxlength, false);
                formEl.removeEventListener("input", self.listenerCallbacks.dataTypeNumber, false);
            }
            if (self.options.fieldOptions.preventPasteFields) {
                formEl.removeEventListener("paste", self.listenerCallbacks.pastePrevent, false);
            }
            if (self.options.formOptions.handleSubmit) {
                formEl.removeEventListener("submit", self.listenerCallbacks.submit);
            }
            validationListenerNames.split(" ").forEach(function(eventName) {
                var useCapturing = eventName === "blur" ? true : false;
                formEl.removeEventListener(eventName, self.listenerCallbacks.validation, useCapturing);
            });
            delete self.formEl.formjs;
        }
    },
    "./src/modules/formStartup.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports._formStartup = _formStartup;
        function _formStartup() {
            var self = this, formEl = self.formEl;
            if (!formEl.matches("[novalidate]")) {
                return null;
            }
            var fieldOptions = self.options.fieldOptions, formOptions = self.options.formOptions;
            var charLengthElems = formEl.querySelectorAll("[data-char-length]");
            if (charLengthElems.length > 0) {
                Array.from(charLengthElems).forEach(function(element) {
                    try {
                        var containerEl = element.closest("[data-formjs-question]"), fieldEl = containerEl.querySelector("[data-char-count]");
                        if (fieldEl !== null && fieldEl.matches("[maxlength]")) {
                            var maxlength = fieldEl.getAttribute("maxlength");
                            containerEl.querySelector("[data-char-maxlength]").textContent = maxlength;
                        }
                        self.listenerCallbacks.charCount.call(null, fieldEl);
                    } catch (error) {}
                });
            }
            if (fieldOptions.maxFileSize > 0) {
                var maxFileSizeElems = formEl.querySelectorAll("[data-max-file-size]");
                if (maxFileSizeElems.length > 0) {
                    Array.from(maxFileSizeElems).forEach(function(element) {
                        try {
                            var fieldEl = element.closest("[data-formjs-question]").querySelector('[type="file"]');
                            if (fieldEl !== null) {
                                element.textContent = fieldOptions.maxFileSize;
                            }
                        } catch (error) {}
                    });
                }
            }
            if (fieldOptions.handleValidation) {
                if (fieldOptions.strictHtmlValidation) {
                    formEl.addEventListener("keypress", self.listenerCallbacks.keypressMaxlength, false);
                    formEl.addEventListener("input", self.listenerCallbacks.dataTypeNumber, false);
                }
                if (fieldOptions.preventPasteFields && formEl.querySelectorAll(fieldOptions.preventPasteFields).length) {
                    formEl.addEventListener("paste", self.listenerCallbacks.pastePrevent, false);
                }
                if (formEl.querySelectorAll("[data-char-count]").length > 0) {
                    formEl.addEventListener("input", self.listenerCallbacks.charCount, false);
                }
                fieldOptions.validateOnEvents.split(" ").forEach(function(eventName) {
                    var useCapturing = eventName === "blur" ? true : false;
                    formEl.addEventListener(eventName, self.listenerCallbacks.validation, useCapturing);
                });
            }
            if (formOptions.handleSubmit) {
                formEl.addEventListener("submit", self.listenerCallbacks.submit);
                if (formOptions.ajaxSubmit) {
                    if (formEl.getAttribute("enctype")) {
                        formOptions.ajaxOptions.contentType = formEl.getAttribute("enctype");
                        formOptions.ajaxOptions.headers["Content-Type"] = formEl.getAttribute("enctype");
                    }
                    if (formEl.getAttribute("method")) {
                        formOptions.ajaxOptions.method = formEl.getAttribute("method").toUpperCase();
                    }
                    if (formEl.getAttribute("action")) {
                        formOptions.ajaxOptions.url = formEl.getAttribute("action");
                    }
                }
            }
        }
    },
    "./src/modules/getFormData.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.getFormData = getFormData;
        function getFormData() {
            var customFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options.formOptions.getFormData;
            var formData = {}, self = this, formEl = self.formEl, formFieldsEl = formEl.querySelectorAll("input, select, textarea"), excludeSelectors = ':not([type="reset"]):not([type="submit"]):not([type="button"]):not([type="file"]):not([data-exclude-data])', filteredFields = Array.from(formFieldsEl).filter(function(elem) {
                return elem.matches(excludeSelectors);
            });
            if (typeof customFn === "function") {
                formData = customFn.call(self, filteredFields);
            } else {
                filteredFields.forEach(function(fieldEl) {
                    var isCheckbox = fieldEl.type === "checkbox", isRadio = fieldEl.type === "radio", isSelect = fieldEl.matches("select"), name = fieldEl.name, value = fieldEl.value;
                    if (isCheckbox) {
                        value = fieldEl.checked;
                        var checkboxes = Array.from(formEl.querySelectorAll('[name="' + name + '"]'));
                        if (checkboxes.length > 1) {
                            value = [];
                            var checkedElems = checkboxes.filter(function(field) {
                                return field.checked;
                            });
                            checkedElems.forEach(function(fieldEl) {
                                value.push(fieldEl.value);
                            });
                        }
                    } else if (isRadio) {
                        var checkedRadio = formEl.querySelector('[name="' + name + '"]:checked');
                        value = checkedRadio === null ? null : checkedRadio.value;
                    } else if (isSelect) {
                        var selectedOpts = Array.from(fieldEl.options).filter(function(option) {
                            return option.selected;
                        });
                        if (selectedOpts.length > 1) {
                            value = [];
                            selectedOpts.forEach(function(fieldEl) {
                                value.push(fieldEl.value);
                            });
                        }
                    }
                    formData[name] = value;
                });
            }
            return formData;
        }
    },
    "./src/modules/helper.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        var _fieldsStringSelector = exports._fieldsStringSelector = 'input:not([type="reset"]):not([type="submit"]):not([type=button]):not([type=hidden]), select, textarea', _addClass = exports._addClass = function _addClass(element, cssClasses) {
            cssClasses.split(" ").forEach(function(className) {
                element.classList.add(className);
            });
        }, _checkFormEl = exports._checkFormEl = function _checkFormEl(formEl) {
            var isString = typeof formEl === "undefined" ? "undefined" : _typeof(formEl), isValidNodeSelector = isString === "string" && _isDOMNode(document.querySelector(formEl)), isFormSelector = isValidNodeSelector && document.querySelector(formEl).tagName.toLowerCase() === "form", obj = {
                result: _isDOMNode(formEl) || isFormSelector,
                element: isString === "string" ? document.querySelector(formEl) : formEl
            };
            return obj;
        }, _executeCallback = exports._executeCallback = function _executeCallback(callbackOption, callbackData) {
            var self = this, callbackFnList = [];
            if (typeof callbackOption === "function") {
                callbackFnList.push(callbackOption);
            } else if (Array.isArray(callbackOption)) {
                callbackFnList = callbackOption;
            }
            callbackFnList.forEach(function(cbFn) {
                cbFn.call(self, callbackData);
            });
        }, _getSplitChar = exports._getSplitChar = function _getSplitChar(string) {
            var splitChar = ".";
            if (string.indexOf(splitChar) === -1) {
                if (string.indexOf("-") >= 0) {
                    splitChar = "-";
                } else if (string.indexOf("/") >= 0) {
                    splitChar = "/";
                }
            }
            return splitChar;
        }, _isDOMNode = exports._isDOMNode = function _isDOMNode(node) {
            return Element.prototype.isPrototypeOf(node);
        }, _isFieldForChangeEvent = exports._isFieldForChangeEvent = function _isFieldForChangeEvent(fieldEl) {
            return fieldEl.matches('select, [type="radio"], [type="checkbox"], [type="file"]');
        }, _isNodeList = exports._isNodeList = function _isNodeList(nodeList) {
            return NodeList.prototype.isPrototypeOf(nodeList);
        }, _isPlainObject = exports._isPlainObject = function _isPlainObject(object) {
            return Object.prototype.toString.call(object) === "[object Object]";
        }, _mergeObjects = exports._mergeObjects = function _mergeObjects() {
            var out = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            for (var i = 1; i < arguments.length; i++) {
                var obj = arguments[i];
                if (!obj) {
                    continue;
                }
                for (var key in obj) {
                    var isArray = Object.prototype.toString.call(obj[key]) === "[object Array]";
                    var isObject = Object.prototype.toString.call(obj[key]) === "[object Object]";
                    if (obj.hasOwnProperty(key)) {
                        if (isArray) {
                            if (typeof out[key] === "undefined" || out[key] === null) {
                                out[key] = [];
                            }
                            out[key] = out[key].concat(obj[key].slice(0));
                        } else if (isObject) {
                            out[key] = _mergeObjects(out[key], obj[key]);
                        } else {
                            if (Array.isArray(out[key])) {
                                out[key].push(obj[key]);
                            } else {
                                out[key] = obj[key];
                            }
                        }
                    }
                }
            }
            return out;
        }, _removeClass = exports._removeClass = function _removeClass(element, cssClasses) {
            cssClasses.split(" ").forEach(function(className) {
                element.classList.remove(className);
            });
        }, _serialize = exports._serialize = function _serialize(obj) {
            var objToString = obj && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && obj.constructor === Object ? Object.keys(obj).reduce(function(a, k) {
                a.push(k + "=" + encodeURIComponent(obj[k]));
                return a;
            }, []).join("&") : obj;
            return objToString;
        }, _toCamelCase = exports._toCamelCase = function _toCamelCase(string) {
            return string.replace(/-([a-z])/gi, function(all, letter) {
                return letter.toUpperCase();
            });
        }, _validateFieldObjDefault = exports._validateFieldObjDefault = {
            result: false,
            fieldEl: null
        }, _validateFormObjDefault = exports._validateFormObjDefault = {
            result: true,
            fields: []
        };
    },
    "./src/modules/init.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.init = undefined;
        var _helper = __webpack_require__("./src/modules/helper.js");
        var init = exports.init = function init() {
            var self = this, formEl = self.formEl, formFields = formEl.querySelectorAll(_helper._fieldsStringSelector);
            var currentFieldName = "", currentFieldType = "";
            Array.from(formFields).forEach(function(fieldEl) {
                var name = fieldEl.name, type = fieldEl.type;
                if (name === currentFieldName && type === currentFieldType) {
                    return true;
                }
                var isCheckboxOrRadio = fieldEl.type === "checkbox" || fieldEl.type === "radio", isFieldForChangeEvent = (0, 
                _helper._isFieldForChangeEvent)(fieldEl), fieldChecked = formEl.querySelector('[name="' + fieldEl.name + '"]:checked'), isReqFrom = fieldEl.matches("[data-required-from]"), reqMoreEl = isReqFrom ? formEl.querySelector(fieldEl.getAttribute("data-required-from")) : null;
                if (!isReqFrom) {
                    currentFieldName = name;
                    currentFieldType = type;
                }
                if (!isCheckboxOrRadio && fieldEl.value || isCheckboxOrRadio && fieldChecked !== null || isReqFrom && reqMoreEl.checked) {
                    var eventToTrigger = "change";
                    if (isCheckboxOrRadio) {
                        fieldEl = fieldChecked;
                    } else if (!isFieldForChangeEvent) {
                        eventToTrigger = self.options.fieldOptions.validateOnEvents.split(" ").filter(function(evName) {
                            return evName !== "change";
                        })[0] || "input";
                    }
                    var newEvent = new Event(eventToTrigger, {
                        bubbles: eventToTrigger !== "blur",
                        cancelable: true
                    });
                    fieldEl.dispatchEvent(newEvent);
                }
            });
            self.isInitialized = true;
            return self;
        };
    },
    "./src/modules/isValid.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports._isValid = _isValid;
        var _helper = __webpack_require__("./src/modules/helper.js");
        var _validationRules = __webpack_require__("./src/modules/validationRules.js");
        function _isValid(fieldEl) {
            var fieldOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var self = this, fieldType = fieldEl.matches("[data-subtype]") ? (0, _helper._toCamelCase)(fieldEl.getAttribute("data-subtype")) : fieldEl.type, fieldValue = fieldEl.value, isValidValue = fieldValue.trim().length > 0, fieldAttributes = Array.from(fieldEl.attributes).sort(function(a, b) {
                return a.name < b.name;
            });
            var attrValidations = [], attrValidationsResult = isValidValue, obj = {
                result: isValidValue
            };
            if (!isValidValue) {
                obj.errors = {
                    empty: true
                };
                obj.result = false;
                return obj;
            }
            fieldAttributes.forEach(function(attr) {
                var attrName = (0, _helper._toCamelCase)(attr.name.replace("data-", "")), attrValue = attr.value, isTypeValueWithFn = attrName === "type" && typeof _validationRules._validationRulesAttributes[attrValue] === "function", isAttrNameWithFn = typeof _validationRules._validationRulesAttributes[attrName] === "function";
                if (isTypeValueWithFn || isAttrNameWithFn) {
                    var extraValObj = {
                        attrName: isTypeValueWithFn ? attrValue : attrName,
                        attrValue: attrValue,
                        fieldEl: fieldEl,
                        fieldOptions: fieldOptions
                    };
                    if (isTypeValueWithFn || attrName === "requiredFrom") {
                        attrValidations.unshift(extraValObj);
                    } else {
                        attrValidations.push(extraValObj);
                    }
                }
            });
            attrValidations.forEach(function(item) {
                var extraVal = _validationRules._validationRulesAttributes[item.attrName](item, fieldEl);
                if (!extraVal.result) {
                    obj = (0, _helper._mergeObjects)({}, obj, extraVal);
                    attrValidationsResult = false;
                }
            });
            if (typeof self.validationRules[fieldType] === "function") {
                obj = (0, _helper._mergeObjects)({}, obj, self.validationRules[fieldType].call(self, fieldValue, fieldEl));
                obj.result = obj.result && attrValidationsResult;
                if (!obj.result) {
                    if (typeof obj.errors === "undefined") {
                        obj.errors = {};
                    }
                    obj.errors.rule = true;
                }
            }
            return obj;
        }
    },
    "./src/modules/isValidField.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.isValidField = isValidField;
        var _helper = __webpack_require__("./src/modules/helper.js");
        var _isValid2 = __webpack_require__("./src/modules/isValid.js");
        function isValidField(fieldElem) {
            var fieldOptionsObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var self = this, fieldEl = typeof fieldElem === "string" ? self.formEl.querySelector(fieldElem) : fieldElem;
            var obj = (0, _helper._mergeObjects)({}, _helper._validateFieldObjDefault);
            if (!(0, _helper._isDOMNode)(fieldEl)) {
                return obj;
            }
            var options = (0, _helper._mergeObjects)({}, self.options.fieldOptions, fieldOptionsObj), isValidValue = fieldEl.value.trim().length > 0, isRequired = fieldEl.required, isReqFrom = fieldEl.matches("[data-required-from]"), isValidateIfFilled = fieldEl.matches("[data-validate-if-filled]");
            if (!isRequired && !isValidateIfFilled && !isReqFrom || isValidateIfFilled && !isValidValue || isReqFrom && !isRequired) {
                obj.result = true;
            } else {
                obj = _isValid2._isValid.call(self, fieldEl, options);
            }
            obj.fieldEl = fieldEl;
            return obj;
        }
    },
    "./src/modules/isValidForm.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.isValidForm = isValidForm;
        var _helper = __webpack_require__("./src/modules/helper.js");
        function isValidForm() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var self = this, formEl = self.formEl;
            var obj = (0, _helper._mergeObjects)({}, _helper._validateFormObjDefault);
            if (!(0, _helper._isDOMNode)(formEl) || !formEl.matches("[novalidate]")) {
                obj.result = false;
                return obj;
            }
            var fieldOptions = (0, _helper._mergeObjects)({}, self.options.fieldOptions, options.fieldOptions), currentFieldName = "", currentFieldType = "";
            if (typeof fieldOptions.focusOnRelated === "undefined") {
                fieldOptions.focusOnRelated = false;
            }
            Array.from(formEl.querySelectorAll(_helper._fieldsStringSelector)).forEach(function(fieldEl) {
                var name = fieldEl.name, type = fieldEl.type, fieldData = {};
                if (name === currentFieldName && type === currentFieldType) {
                    return true;
                }
                if (!fieldEl.matches("[data-required-from]")) {
                    currentFieldName = name;
                    currentFieldType = type;
                }
                fieldData = self.isValidField(fieldEl, fieldOptions);
                if (!fieldData.result) {
                    obj.result = false;
                }
                obj.fields.push(fieldData);
            });
            return obj;
        }
    },
    "./src/modules/listenerCallbacks.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports._callbackFns = undefined;
        var _helper = __webpack_require__("./src/modules/helper.js");
        var _callbackFns = exports._callbackFns = {
            charCount: function charCount(eventOrField) {
                var fieldEl = eventOrField.target || eventOrField;
                if (fieldEl.matches("[data-char-count]")) {
                    try {
                        var charLengthEl = fieldEl.closest("[data-formjs-question]").querySelector("[data-char-length]");
                        if (charLengthEl !== null) {
                            var usedChars = fieldEl.value.length;
                            charLengthEl.textContent = usedChars;
                        }
                    } catch (error) {}
                }
            },
            dataTypeNumber: function dataTypeNumber(event) {
                var fieldEl = event.target;
                if (fieldEl.matches('[data-type="number"]')) {
                    var fieldValue = fieldEl.value, hasInvalidChars = /[^\d.,+\-]/.test(fieldValue);
                    if (hasInvalidChars) {
                        event.stopImmediatePropagation();
                        var valueReplaced = fieldValue.replace(/[^\d.,+\-]/g, "");
                        fieldEl.value = valueReplaced;
                    }
                }
            },
            keypressMaxlength: function keypressMaxlength(event) {
                var fieldEl = event.target;
                if (fieldEl.matches("[maxlength]")) {
                    var maxLength = fieldEl.maxLength * 1, keyPressed = event.which || event.keyCode, allowedKeys = [ 8, 37, 38, 39, 46 ];
                    if (fieldEl.value.length >= maxLength && allowedKeys.indexOf(keyPressed) === -1) {
                        return false;
                    }
                }
            },
            pastePrevent: function pastePrevent(event) {
                var self = this, fieldEl = event.target;
                var fieldOptions = self.options.fieldOptions;
                if (fieldEl.matches(fieldOptions.preventPasteFields)) {
                    event.preventDefault();
                    _helper._executeCallback.call(self, fieldOptions.onPastePrevented, fieldEl);
                }
            },
            submit: function submit(event) {
                this.submit({}, event);
            },
            validation: function validation(event) {
                var self = this, eventName = event.type, fieldEl = event.target;
                if (fieldEl.matches(_helper._fieldsStringSelector)) {
                    var isFieldForChangeEvent = (0, _helper._isFieldForChangeEvent)(fieldEl), isRadio = fieldEl.type === "radio", isReqFrom = fieldEl.matches("[data-required-from]"), isReqMore = fieldEl.matches("[data-require-more]"), isValidValue = fieldEl.value.trim().length > 0;
                    if (isRadio && eventName === "change") {
                        var findReqMoreEl = isReqMore ? fieldEl : self.formEl.querySelector('[name="' + fieldEl.name + '"][data-require-more]'), findReqFromEl = findReqMoreEl !== null ? self.formEl.querySelector('[data-required-from="#' + findReqMoreEl.id + '"]') : null;
                        if (isReqMore) {
                            if (findReqFromEl !== null) {
                                if (fieldEl.required) {
                                    findReqFromEl.required = true;
                                }
                                if (self.options.fieldOptions.focusOnRelated) {
                                    findReqFromEl.focus();
                                }
                            }
                        } else if (findReqMoreEl !== null) {
                            if (findReqFromEl !== null) {
                                findReqFromEl.required = false;
                                findReqFromEl.value = "";
                            }
                        }
                    }
                    if (isReqFrom) {
                        if (isValidValue) {
                            var reqMoreEl = self.formEl.querySelector(fieldEl.getAttribute("data-required-from"));
                            reqMoreEl.checked = true;
                            if (reqMoreEl.required) {
                                fieldEl.required = true;
                            }
                        }
                    }
                    if (isFieldForChangeEvent && eventName === "change" || !isFieldForChangeEvent && eventName !== "change") {
                        self.validateField(fieldEl);
                    }
                }
            }
        };
    },
    "./src/modules/options.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.options = undefined;
        var _optionsAjax = __webpack_require__("./src/modules/optionsAjax.js");
        var options = exports.options = {
            fieldOptions: {
                checkDirtyField: false,
                cssClasses: {
                    dirty: "is-dirty",
                    error: "has-error",
                    errorEmpty: "has-error-empty",
                    errorRule: "has-error-rule",
                    valid: "is-valid"
                },
                focusOnRelated: true,
                handleFileUpload: true,
                handleValidation: true,
                maxFileSize: 10,
                onPastePrevented: null,
                onValidation: null,
                preventPasteFields: '[type="password"], [data-equal-to]',
                skipUIfeedback: false,
                strictHtmlValidation: true,
                validateOnEvents: "input change"
            },
            formOptions: {
                ajaxOptions: _optionsAjax.ajaxOptions,
                ajaxSubmit: true,
                beforeSend: null,
                getFormData: null,
                handleSubmit: true,
                onSubmitComplete: null,
                onSubmitError: null,
                onSubmitSuccess: null
            }
        };
    },
    "./src/modules/optionsAjax.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var ajaxOptions = exports.ajaxOptions = {
            cache: "no-store",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            mode: "same-origin",
            redirect: "follow",
            timeout: 0,
            url: location.href
        };
    },
    "./src/modules/optionsUtils.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports._setCallbackFunctionsInOptions = undefined;
        var _helper = __webpack_require__("./src/modules/helper.js");
        var _checkDirtyField2 = __webpack_require__("./src/modules/checkDirtyField.js");
        var _defaultCallbacksInOptions = {
            fieldOptions: {
                onValidation: function onValidationDefault(fieldsArray) {
                    var self = this, options = self.options.fieldOptions;
                    fieldsArray.forEach(function(obj) {
                        var fieldEl = obj.fieldEl, containerEl = fieldEl.closest("[data-formjs-question]"), isReqFrom = fieldEl.matches("[data-required-from]"), reqMoreEl = self.formEl.querySelector(fieldEl.getAttribute("data-required-from"));
                        if (options.checkDirtyField) {
                            _checkDirtyField2._checkDirtyField.call(self, fieldEl);
                        }
                        if (containerEl !== null && !options.skipUIfeedback) {
                            if (obj.result) {
                                if (!isReqFrom || isReqFrom && reqMoreEl.checked) {
                                    var errorClasses = options.cssClasses.error + " " + options.cssClasses.errorEmpty + " " + options.cssClasses.errorRule;
                                    (0, _helper._removeClass)(containerEl, errorClasses);
                                    (0, _helper._addClass)(containerEl, options.cssClasses.valid);
                                }
                            } else {
                                var extraErrorClass = options.cssClasses.errorRule;
                                var isChecks = fieldEl.matches("[data-checks]"), checkedElLength = isChecks ? containerEl.querySelectorAll('[name="' + fieldEl.name + '"]:checked').length : 0;
                                if (!isChecks && obj.errors && obj.errors.empty || isChecks && checkedElLength === 0) {
                                    extraErrorClass = options.cssClasses.errorEmpty;
                                }
                                var _errorClasses = options.cssClasses.error + " " + extraErrorClass, errorClassToRemove = options.cssClasses.errorEmpty + " " + options.cssClasses.errorRule;
                                (0, _helper._removeClass)(containerEl, options.cssClasses.valid + " " + errorClassToRemove);
                                (0, _helper._addClass)(containerEl, _errorClasses);
                            }
                        }
                    });
                }
            }
        };
        var _setCallbackFunctionsInOptions = exports._setCallbackFunctionsInOptions = function _setCallbackFunctionsInOptions() {
            var self = this, callbacks = {
                fieldOptions: [ "onPastePrevented", "onValidation" ],
                formOptions: [ "beforeSend", "onSubmitComplete", "onSubmitError", "onSubmitSuccess" ]
            };
            var _loop = function _loop(opt) {
                var fjsOpt = callbacks[opt];
                fjsOpt.forEach(function(fnName) {
                    var fnInOptions = self.options[opt][fnName], fnList = [];
                    if (Array.isArray(fnInOptions)) {
                        fnList.concat(fnInOptions);
                    } else if (fnInOptions) {
                        fnList.push(fnInOptions);
                    }
                    if (typeof _defaultCallbacksInOptions[opt] !== "undefined" && typeof _defaultCallbacksInOptions[opt][fnName] === "function") {
                        fnList.unshift(_defaultCallbacksInOptions[opt][fnName]);
                    }
                    self.options[opt][fnName] = fnList;
                });
            };
            for (var opt in callbacks) {
                _loop(opt);
            }
        };
    },
    "./src/modules/submit.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.submit = submit;
        var _helper = __webpack_require__("./src/modules/helper.js");
        var _ajaxCall2 = __webpack_require__("./src/modules/ajaxCall.js");
        function submit() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var self = this, formEl = self.formEl, eventPreventDefault = function eventPreventDefault() {
                var enableBtn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
                if (btnEl && enableBtn) {
                    btnEl.disabled = false;
                }
                if (event) {
                    event.preventDefault();
                }
            };
            options.fieldOptions = (0, _helper._mergeObjects)({}, self.options.fieldOptions, options.fieldOptions);
            options.formOptions = (0, _helper._mergeObjects)({}, self.options.formOptions, options.formOptions);
            var handleValidation = options.fieldOptions.handleValidation, formValidation = handleValidation ? self.isValidForm(options) : {
                result: true
            };
            var btnEl = formEl.querySelector('[type="submit"]'), isAjaxForm = options.formOptions.ajaxSubmit;
            if (handleValidation) {
                _helper._executeCallback.call(self, options.fieldOptions.onValidation, formValidation.fields);
            }
            var formDataObj = isAjaxForm ? self.getFormData() : null, callbacksBeforeSend = [], beforeSendOpt = options.formOptions.beforeSend;
            if (typeof beforeSendOpt === "function" || Array.isArray(beforeSendOpt)) {
                var beforeSendData = {
                    stopExecution: false
                }, stopCallbackLoop = false;
                if (formDataObj) {
                    beforeSendData.formData = formDataObj;
                }
                if (typeof beforeSendOpt === "function") {
                    callbacksBeforeSend.push(beforeSendOpt);
                } else if (Array.isArray(beforeSendOpt)) {
                    callbacksBeforeSend = beforeSendOpt;
                }
                callbacksBeforeSend.forEach(function(cbFn) {
                    if (!stopCallbackLoop) {
                        var beforeSendFn = cbFn.call(self, beforeSendData);
                        if ((0, _helper._isPlainObject)(beforeSendFn)) {
                            formDataObj = beforeSendFn.formData || formDataObj;
                            if (beforeSendFn.stopExecution) {
                                stopCallbackLoop = true;
                            }
                        }
                    }
                });
                if (stopCallbackLoop) {
                    eventPreventDefault();
                    return false;
                }
            }
            if (!formValidation.result || btnEl && btnEl.disabled) {
                eventPreventDefault();
                return false;
            }
            if (btnEl) {
                btnEl.disabled = true;
            }
            if (isAjaxForm) {
                eventPreventDefault(false);
                _ajaxCall2._ajaxCall.call(self, formDataObj);
            } else if (!event) {
                var submitEvent = new Event("submit", {
                    bubbles: true,
                    cancelable: true
                });
                formEl.dispatchEvent(submitEvent);
            }
        }
    },
    "./src/modules/validateField.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.validateField = validateField;
        var _helper = __webpack_require__("./src/modules/helper.js");
        function validateField(fieldElem) {
            var fieldOptionsObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var self = this, fieldEl = typeof fieldElem === "string" ? self.formEl.querySelector(fieldElem) : fieldElem;
            var obj = (0, _helper._mergeObjects)({}, _helper._validateFieldObjDefault);
            if ((0, _helper._isDOMNode)(fieldEl)) {
                obj = self.isValidField(fieldEl, fieldOptionsObj);
                var fieldOptions = (0, _helper._mergeObjects)({}, self.options.fieldOptions, fieldOptionsObj);
                _helper._executeCallback.call(self, fieldOptions.onValidation, [ obj ]);
            }
            return obj;
        }
    },
    "./src/modules/validateForm.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.validateForm = validateForm;
        var _helper = __webpack_require__("./src/modules/helper.js");
        function validateForm() {
            var optionsObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var self = this, obj = self.isValidForm(optionsObj);
            var options = (0, _helper._mergeObjects)({}, self.options, optionsObj);
            _helper._executeCallback.call(self, options.fieldOptions.onValidation, obj.fields);
            return obj;
        }
    },
    "./src/modules/validationErrors.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var validationErrors = exports.validationErrors = {
            cap: function cap(string) {
                var obj = {};
                var strLength = string.length;
                if (strLength > 5) {
                    obj.maxlength = true;
                }
                if (strLength > 0 && strLength < 5) {
                    obj.minlength = true;
                }
                if (/[^0-9]/.test(string)) {
                    obj.invalidChars = true;
                }
                return obj;
            },
            email: function email(string) {
                var obj = {};
                if (string.indexOf("@") === -1) {
                    obj.missingAtChar = true;
                } else {
                    var splitAt_at = string.split("@");
                    if (splitAt_at[0].length === 0) {
                        obj.missingUserName = true;
                    }
                    if (splitAt_at[1].length === 0) {
                        obj.missingDomain = true;
                        obj.missingExtensionDot = true;
                        obj.missingExtension = true;
                    } else if (splitAt_at[1].indexOf(".") === -1) {
                        obj.missingExtensionDot = true;
                        obj.missingExtension = true;
                    } else {
                        var splitAt_dot = splitAt_at[1].split("."), extLength = splitAt_dot[1].length;
                        if (extLength === 0) {
                            obj.missingExtension = true;
                        } else if (extLength < 2) {
                            obj.minlengthExtension = true;
                        }
                    }
                }
                return obj;
            },
            password: function password(string) {
                var obj = {};
                if (string.length < 8) {
                    obj.minlength = true;
                }
                if (!/\d/.test(string)) {
                    obj.missingNumber = true;
                }
                if (!/[a-z]/.test(string)) {
                    obj.missingLowercase = true;
                }
                if (!/[A-Z]/.test(string)) {
                    obj.missingUppercase = true;
                }
                if (/[^0-9a-zA-Z]/.test(string)) {
                    obj.invalidChars = true;
                }
                return obj;
            },
            username: function username(string) {
                var obj = {};
                var strLength = string.length;
                if (strLength < 3) {
                    obj.minlength = true;
                }
                if (strLength > 24) {
                    obj.maxlength = true;
                }
                if (/[^\w\-\.\@]/.test(string)) {
                    obj.invalidChars = true;
                }
                if (!/^[\w]/.test(string)) {
                    obj.invalidStartChar = true;
                }
                return obj;
            },
            vatNumber: function vatNumber(string) {
                var obj = {};
                var strLength = string.length, indexOfIT = string.indexOf("IT"), checkLength = indexOfIT === 0 ? 13 : 11;
                if (indexOfIT < 1) {
                    if (strLength < checkLength) {
                        obj.minlength = true;
                    } else {
                        obj.maxlength = true;
                    }
                }
                return obj;
            }
        };
    },
    "./src/modules/validationRules.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports._validationRulesAttributes = exports.validationRules = undefined;
        var _helper = __webpack_require__("./src/modules/helper.js");
        var validationRules = exports.validationRules = {
            cap: function cap(string) {
                var regex = new RegExp(/^[0-9]{5}$/), obj = {
                    result: regex.test(string)
                };
                if (!obj.result && typeof this.validationErrors.cap === "function") {
                    obj.errors = this.validationErrors.cap(string);
                }
                return obj;
            },
            color: function color(string) {
                var obj = {
                    result: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(string)
                };
                if (!obj.result && typeof this.validationErrors.color === "function") {
                    obj.errors = this.validationErrors.color(string);
                }
                return obj;
            },
            date: function date(string) {
                var date = /^(((19|[2-9]\d)\d{2})[ \/\-.](0[13578]|1[02])[ \/\-.](0[1-9]|[12]\d|3[01]))|(((19|[2-9]\d)\d{2})[ \/\-.](0[13456789]|1[012])[ \/\-.](0[1-9]|[12]\d|30))|(((19|[2-9]\d)\d{2})[ \/\-.]02[ \/\-.](0[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))[ \/\-.]02[ \/\-.]29)$/g.test(string), obj = {
                    result: date
                };
                if (!obj.result && typeof this.validationErrors.date === "function") {
                    obj.errors = this.validationErrors.date(string);
                }
                return obj;
            },
            dateDDMMYYYY: function dateDDMMYYYY(string) {
                var date = /^(((0[1-9]|[12]\d|3[01])[ \/\-.](0[13578]|1[02])[ \/\-.]((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)[ \/\-.](0[13456789]|1[012])[ \/\-.]((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])[ \/\-.]02[ \/\-.]((19|[2-9]\d)\d{2}))|(29[ \/\-.]02[ \/\-.]((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g.test(string), obj = {
                    result: date
                };
                if (!obj.result && typeof this.validationErrors.dateDDMMYYYY === "function") {
                    obj.errors = this.validationErrors.dateDDMMYYYY(string);
                }
                return obj;
            },
            email: function email(string) {
                var obj = {
                    result: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(string)
                };
                if (!obj.result && typeof this.validationErrors.email === "function") {
                    obj.errors = this.validationErrors.email(string);
                }
                return obj;
            },
            fiscalCode: function fiscalCode(string) {
                var obj = {
                    result: /^(?:[B-DF-HJ-NP-TV-Z](?:[AEIOU]{2}|[AEIOU]X)|[AEIOU]{2}X|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[1256LMRS][\dLMNP-V])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[\dLMNP-V][1-9MNP-V]|[1-9MNP-V][0L]))[A-Z]$/i.test(string)
                };
                if (!obj.result && typeof this.validationErrors.fiscalCode === "function") {
                    obj.errors = this.validationErrors.fiscalCode(string);
                }
                return obj;
            },
            landlineNumber: function landlineNumber(string) {
                var obj = {
                    result: /^((00|\+)\d{2}[\-\. ]??)??(((0[\d]{1,4}))([\/\-\. ]){0,1}([\d, ]{5,10}))$/.test(string)
                };
                if (!obj.result && typeof this.validationErrors.landlineNumber === "function") {
                    obj.errors = this.validationErrors.landlineNumber(string);
                }
                return obj;
            },
            mobileNumber: function mobileNumber(string) {
                var obj = {
                    result: /^((00|\+)??\d{2}[\-\. ]??)??3\d{2}[\-\. ]??(\d{6,7}|\d{2}[\-\. ]??\d{2}[\-\. ]??\d{3})$/.test(string)
                };
                if (!obj.result && typeof this.validationErrors.mobileNumber === "function") {
                    obj.errors = this.validationErrors.mobileNumber(string);
                }
                return obj;
            },
            number: function number(string) {
                var obj = {
                    result: /[+-]?([0-9]*[.])?[0-9]+/.test(string)
                };
                if (!obj.result && typeof this.validationErrors.number === "function") {
                    obj.errors = this.validationErrors.number(string);
                }
                return obj;
            },
            numberFloat: function numberFloat(string) {
                var obj = {
                    result: /[+-]?([0-9]*[.])[0-9]+/.test(string)
                };
                if (!obj.result && typeof this.validationErrors.numberFloat === "function") {
                    obj.errors = this.validationErrors.numberFloat(string);
                }
                return obj;
            },
            numberInteger: function numberInteger(string) {
                var obj = {
                    result: /^\d+$/.test(string)
                };
                if (!obj.result && typeof this.validationErrors.numberInteger === "function") {
                    obj.errors = this.validationErrors.numberInteger(string);
                }
                return obj;
            },
            password: function password(string) {
                var obj = {
                    result: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(string)
                };
                if (!obj.result && typeof this.validationErrors.password === "function") {
                    obj.errors = this.validationErrors.password(string);
                }
                return obj;
            },
            tel: function tel(string) {
                var obj = {
                    result: this.validationRules.landlineNumber(string).result || this.validationRules.mobileNumber(string).result
                };
                if (!obj.result && typeof this.validationErrors.tel === "function") {
                    obj.errors = this.validationErrors.tel(string);
                }
                return obj;
            },
            url: function url(string) {
                var obj = {
                    result: /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(string)
                };
                if (!obj.result && typeof this.validationErrors.url === "function") {
                    obj.errors = this.validationErrors.url(string);
                }
                return obj;
            },
            username: function username(string) {
                var obj = {
                    result: /^(?=\w)(?=[\-\.\@]?)[\w\-\.\@]{3,24}$/.test(string)
                };
                if (!obj.result && typeof this.validationErrors.username === "function") {
                    obj.errors = this.validationErrors.username(string);
                }
                return obj;
            },
            vatNumber: function vatNumber(string) {
                var obj = {
                    result: /^(IT){0,1}[0-9]{11}$/i.test(string)
                };
                if (!obj.result && typeof this.validationErrors.vatNumber === "function") {
                    obj.errors = this.validationErrors.vatNumber(string);
                }
                return obj;
            }
        };
        var _validationRulesAttributes = exports._validationRulesAttributes = {
            checkbox: function checkbox(data) {
                var formEl = data.fieldEl.closest("form"), dataChecksEl = formEl.querySelector('[name="' + data.fieldEl.name + '"][data-checks]'), obj = {
                    result: data.fieldEl.checked
                };
                if (dataChecksEl !== null) {
                    obj = this.checks({
                        attrValue: dataChecksEl.getAttribute("data-checks"),
                        fieldEl: dataChecksEl
                    });
                }
                return obj;
            },
            checks: function checks(data) {
                try {
                    var attrValue = JSON.parse(data.attrValue), fieldEl = data.fieldEl, formEl = fieldEl.closest("form"), checkedElLength = formEl.querySelectorAll('[name="' + fieldEl.name + '"]:checked').length, isMinOk = checkedElLength >= attrValue[0], isMaxOk = checkedElLength <= attrValue[1], obj = {
                        result: isMinOk && isMaxOk
                    };
                    if (!obj.result) {
                        obj.errors = {
                            checks: true
                        };
                        if (!isMinOk) {
                            obj.errors.minChecks = true;
                        }
                        if (!isMaxOk) {
                            obj.errors.maxChecks = true;
                        }
                    }
                    return obj;
                } catch (e) {
                    throw new Error('"data-checks" attribute is not a valid array!');
                }
            },
            equalTo: function equalTo(data) {
                var fieldEl = data.fieldEl, formEl = fieldEl.closest("form"), checkFromEl = formEl.querySelector('[name="' + fieldEl.getAttribute("data-equal-to") + '"]'), obj = {
                    result: fieldEl.value === checkFromEl.value
                };
                if (!obj.result) {
                    obj.errors = {
                        equalTo: true
                    };
                }
                return obj;
            },
            exactLength: function exactLength(data) {
                var valueLength = data.fieldEl.value.length, exactLength = data.attrValue * 1, obj = {
                    result: valueLength === exactLength
                };
                if (!obj.result) {
                    obj.errors = {
                        exactLength: true
                    };
                    if (valueLength < exactLength) {
                        obj.errors.minlength = true;
                    } else {
                        obj.errors.maxlength = true;
                    }
                }
                return obj;
            },
            file: function file(data) {
                var fieldEl = data.fieldEl, MIMEtype = fieldEl.accept ? new RegExp(fieldEl.accept.replace("*", "[^\\/,]+")) : null, filesList = Array.from(fieldEl.files), obj = {
                    result: true
                };
                filesList.forEach(function(file) {
                    var exceedMaxFileSize = data.fieldOptions.maxFileSize > 0 && file.size / 1024 / 1024 > data.fieldOptions.maxFileSize, isAcceptedFileType = MIMEtype !== null ? MIMEtype.test(file.type) : true;
                    if (exceedMaxFileSize || !isAcceptedFileType) {
                        obj.result = false;
                        if (typeof obj.errors === "undefined") {
                            obj.errors = {};
                        }
                        obj.errors.file = true;
                        if (exceedMaxFileSize) {
                            obj.errors.maxFileSize = true;
                        }
                        if (!isAcceptedFileType) {
                            obj.errors.acceptedFileType = true;
                        }
                    }
                });
                return obj;
            },
            length: function length(data) {
                try {
                    var valueL = data.fieldEl.value.length, attrValue = JSON.parse(data.attrValue), isMinlengthOk = valueL >= attrValue[0], isMaxlengthOk = valueL <= attrValue[1], obj = {
                        result: isMinlengthOk && isMaxlengthOk
                    };
                    if (!obj.result) {
                        obj.errors = {
                            stringLength: true
                        };
                        if (!isMinlengthOk) {
                            obj.errors.minlength = true;
                        }
                        if (!isMaxlengthOk) {
                            obj.errors.maxlength = true;
                        }
                    }
                    return obj;
                } catch (e) {
                    throw new Error('"data-length" attribute is not a valid array!');
                }
            },
            max: function max(data) {
                var fieldEl = data.fieldEl, isDate = fieldEl.matches('[type="date"]') || fieldEl.matches('[data-subtype="date"]') || fieldEl.matches('[data-subtype="dateDDMMYYYY"]'), value = data.fieldEl.value, maxVal = data.attrValue;
                if (isDate) {
                    var splitChar = (0, _helper._getSplitChar)(value);
                    if (value.indexOf(splitChar) === 2) {
                        value = value.split(splitChar).reverse();
                    } else {
                        value = value.split(splitChar);
                    }
                    value = value.join("");
                    maxVal = maxVal.split("-").join("");
                }
                value = value * 1;
                maxVal = maxVal * 1;
                var obj = {
                    result: value <= maxVal
                };
                if (!obj.result) {
                    obj.errors = {
                        max: true
                    };
                }
                return obj;
            },
            maxlength: function maxlength(data) {
                var obj = {
                    result: data.fieldEl.value.length <= data.attrValue * 1
                };
                if (!obj.result) {
                    obj.errors = {
                        maxlength: true
                    };
                }
                return obj;
            },
            min: function min(data) {
                var fieldEl = data.fieldEl, isDate = fieldEl.matches('[type="date"]') || fieldEl.matches('[data-subtype="date"]') || fieldEl.matches('[data-subtype="dateDDMMYYYY"]'), value = data.fieldEl.value, minVal = data.attrValue;
                if (isDate) {
                    var splitChar = (0, _helper._getSplitChar)(value);
                    if (value.indexOf(splitChar) === 2) {
                        value = value.split(splitChar).reverse();
                    } else {
                        value = value.split(splitChar);
                    }
                    value = value.join("");
                    minVal = minVal.split("-").join("");
                }
                value = value * 1;
                minVal = minVal * 1;
                var obj = {
                    result: value >= minVal
                };
                if (!obj.result) {
                    obj.errors = {
                        min: true
                    };
                }
                return obj;
            },
            minlength: function minlength(data) {
                var obj = {
                    result: data.fieldEl.value.length >= data.attrValue * 1
                };
                if (!obj.result) {
                    obj.errors = {
                        minlength: true
                    };
                }
                return obj;
            },
            pattern: function pattern(data) {
                var fieldEl = data.fieldEl, fieldPattern = fieldEl.pattern, fieldRegex = new RegExp(fieldPattern), obj = {
                    result: fieldRegex.test(fieldEl.value)
                };
                if (!obj.result) {
                    obj.errors = {
                        pattern: true
                    };
                }
                return obj;
            },
            radio: function radio(data) {
                var fieldEl = data.fieldEl, fieldChecked = fieldEl.closest("form").querySelector('[name="' + fieldEl.name + '"]:checked'), isValid = fieldChecked !== null && fieldChecked.value.trim().length > 0, obj = {
                    result: isValid
                };
                return obj;
            },
            requiredFrom: function requiredFrom(data) {
                var fieldEl = data.fieldEl, formEl = fieldEl.closest("form"), isValidValue = fieldEl.value.trim().length > 0, reqMoreEl = formEl.querySelector(fieldEl.getAttribute("data-required-from")), checkedEl = formEl.querySelector('[name="' + reqMoreEl.name + '"]:checked'), obj = {
                    result: checkedEl !== null
                };
                if (reqMoreEl.checked && reqMoreEl.required) {
                    obj.result = isValidValue;
                }
                if (!obj.result) {
                    obj.errors = {
                        requiredFrom: true
                    };
                }
                return obj;
            }
        };
    }
});