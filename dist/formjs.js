/**! formJS v4.0.0 | Valerio Di Punzio (@SimplySayHi) | https://valeriodipunzio.com/plugins/formJS/ | https://github.com/SimplySayHi/formJS | MIT license */
(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === "object" && typeof module === "object") module.exports = factory(); else if (typeof define === "function" && define.amd) define([], factory); else if (typeof exports === "object") exports["Form"] = factory(); else root["Form"] = factory();
})(this, (function() {
    return function(modules) {
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
    }({
        "./src/index.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            var _modules_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/modules/helpers.js");
            var _modules_options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/modules/options.js");
            var _modules_validationRules__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/modules/validationRules.js");
            var _modules_validationErrors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/modules/validationErrors.js");
            var _modules_constructor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/modules/constructor.js");
            var _modules_destroy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/modules/destroy.js");
            var _modules_init__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/modules/init.js");
            var _modules_validateField__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/modules/validateField.js");
            var _modules_validateForm__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/modules/validateForm.js");
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }
            function _defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            function _createClass(Constructor, protoProps, staticProps) {
                if (protoProps) _defineProperties(Constructor.prototype, protoProps);
                if (staticProps) _defineProperties(Constructor, staticProps);
                return Constructor;
            }
            var version = "4.0.0";
            var Form = function() {
                function Form(formEl, optionsObj) {
                    _classCallCheck(this, Form);
                    Object(_modules_constructor__WEBPACK_IMPORTED_MODULE_4__["constructorFn"])(this, formEl, optionsObj);
                }
                _createClass(Form, [ {
                    key: "destroy",
                    value: function destroy() {
                        Object(_modules_destroy__WEBPACK_IMPORTED_MODULE_5__["destroy"])(this.formEl, this.options, this.listenerCallbacks);
                    }
                }, {
                    key: "getFormData",
                    value: function getFormData() {
                        var formFieldsEl = this.formEl.querySelectorAll("input, select, textarea"), filteredFields = Array.from(formFieldsEl).filter((function(elem) {
                            return elem.matches(_modules_helpers__WEBPACK_IMPORTED_MODULE_0__["excludeSelector"]);
                        }));
                        return this.options.formOptions.getFormData.call(this, filteredFields);
                    }
                }, {
                    key: "init",
                    value: function init() {
                        return Object(_modules_init__WEBPACK_IMPORTED_MODULE_6__["init"])(this, this.formEl, this.listenerCallbacks);
                    }
                }, {
                    key: "validateField",
                    value: function validateField(fieldEl) {
                        var fieldOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                        fieldEl = typeof fieldEl === "string" ? this.formEl.querySelector(fieldEl) : fieldEl;
                        var options = Object(_modules_helpers__WEBPACK_IMPORTED_MODULE_0__["mergeObjects"])({}, this.options, {
                            fieldOptions: fieldOptions
                        });
                        return Object(_modules_validateField__WEBPACK_IMPORTED_MODULE_7__["validateField"])(fieldEl, options, this.validationRules, this.validationErrors);
                    }
                }, {
                    key: "validateForm",
                    value: function validateForm() {
                        var _this = this;
                        var fieldOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                        var options = Object(_modules_helpers__WEBPACK_IMPORTED_MODULE_0__["mergeObjects"])({}, this.options, {
                            fieldOptions: fieldOptions
                        });
                        options.fieldOptions.beforeValidation = options.fieldOptions.beforeValidation.map((function(func) {
                            return func.bind(_this);
                        }));
                        return Object(_modules_validateForm__WEBPACK_IMPORTED_MODULE_8__["validateForm"])(this.formEl, options, this.listenerCallbacks, this.validationRules, this.validationErrors);
                    }
                } ], [ {
                    key: "addValidationErrors",
                    value: function addValidationErrors(errorsObj) {
                        this.prototype.validationErrors = Object(_modules_helpers__WEBPACK_IMPORTED_MODULE_0__["mergeObjects"])({}, this.prototype.validationErrors, errorsObj);
                    }
                }, {
                    key: "addValidationRules",
                    value: function addValidationRules(rulesObj) {
                        this.prototype.validationRules = Object(_modules_helpers__WEBPACK_IMPORTED_MODULE_0__["mergeObjects"])({}, this.prototype.validationRules, rulesObj);
                    }
                }, {
                    key: "setOptions",
                    value: function setOptions(optionsObj) {
                        this.prototype.options = Object(_modules_helpers__WEBPACK_IMPORTED_MODULE_0__["mergeObjects"])({}, this.prototype.options, optionsObj);
                    }
                } ]);
                return Form;
            }();
            Form.prototype.isInitialized = false;
            Form.prototype.options = _modules_options__WEBPACK_IMPORTED_MODULE_1__["options"];
            Form.prototype.validationErrors = _modules_validationErrors__WEBPACK_IMPORTED_MODULE_3__["validationErrors"];
            Form.prototype.validationRules = _modules_validationRules__WEBPACK_IMPORTED_MODULE_2__["validationRules"];
            Form.prototype.version = version;
            __webpack_exports__["default"] = Form;
        },
        "./src/modules/ajaxCall.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            __webpack_require__.d(__webpack_exports__, "ajaxCall", (function() {
                return ajaxCall;
            }));
            var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/modules/helpers.js");
            var getFetchMethod = function getFetchMethod(response, options) {
                var accept = options.headers.get("Accept");
                var contentType = response.headers.get("Content-Type");
                var headerOpt = accept || contentType || "";
                if (headerOpt.indexOf("application/json") > -1 || headerOpt === "") {
                    return "json";
                } else if (headerOpt.indexOf("text/") > -1) {
                    return "text";
                } else {
                    return "blob";
                }
            };
            function ajaxCall(formEl, formDataObj, options) {
                var btnEl = formEl.querySelector('[type="submit"]'), timeoutTimer, ajaxOptions = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["mergeObjects"])({}, options.formOptions.ajaxOptions), isMultipart = ajaxOptions.headers["Content-Type"] === "multipart/form-data";
                ajaxOptions.body = formDataObj;
                if (isMultipart && options.fieldOptions.handleFileUpload) {
                    var formDataMultipart = new FormData;
                    for (var key in ajaxOptions.body) {
                        formDataMultipart.append(key, ajaxOptions.body[key]);
                    }
                    Array.from(formEl.querySelectorAll('[type="file"]')).forEach((function(field) {
                        Array.from(field.files).forEach((function(file, idx) {
                            var name = field.name + "[" + idx + "]";
                            formDataMultipart.append(name, file, file.name);
                        }));
                    }));
                    ajaxOptions.body = formDataMultipart;
                }
                if (ajaxOptions.method === "GET") {
                    ajaxOptions.url += (/\?/.test(ajaxOptions.url) ? "&" : "?") + Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["serializeObject"])(ajaxOptions.body);
                    delete ajaxOptions.body;
                } else {
                    if (ajaxOptions.headers["Content-Type"].indexOf("application/x-www-form-urlencoded") > -1) {
                        ajaxOptions.body = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["serializeObject"])(ajaxOptions.body);
                    } else if (!isMultipart) {
                        ajaxOptions.body = JSON.stringify(ajaxOptions.body);
                    }
                }
                ajaxOptions.headers = new Headers(ajaxOptions.headers);
                if (ajaxOptions.timeout > 0) {
                    var controller = new AbortController;
                    var signal = controller.signal;
                    ajaxOptions.signal = signal;
                    timeoutTimer = window.setTimeout((function() {
                        controller.abort();
                    }), ajaxOptions.timeout);
                }
                return fetch(ajaxOptions.url, ajaxOptions).then((function(response) {
                    if (!response.ok) {
                        return Promise.reject(response);
                    }
                    var fetchMethod = getFetchMethod(response, ajaxOptions);
                    return response[fetchMethod]();
                })).then((function(data) {
                    Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["addClass"])(formEl, options.formOptions.cssClasses.ajaxSuccess);
                    return data;
                }))["catch"]((function(error) {
                    Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["addClass"])(formEl, options.formOptions.cssClasses.ajaxError);
                    return Promise.reject(error);
                }))["finally"]((function() {
                    if (timeoutTimer) {
                        window.clearTimeout(timeoutTimer);
                    }
                    Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["removeClass"])(formEl, options.formOptions.cssClasses.submit + " " + options.formOptions.cssClasses.ajaxPending);
                    Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["addClass"])(formEl, options.formOptions.cssClasses.ajaxComplete);
                    btnEl.disabled = false;
                }));
            }
        },
        "./src/modules/constructor.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            __webpack_require__.d(__webpack_exports__, "constructorFn", (function() {
                return constructorFn;
            }));
            var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/modules/helpers.js");
            var _listenerCallbacks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/modules/listenerCallbacks.js");
            var _formStartup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/modules/formStartup.js");
            function constructorFn(self, formEl, optionsObj) {
                var argsL = arguments.length, checkFormElem = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["checkFormEl"])(formEl);
                if (argsL === 0 || argsL > 0 && !formEl) {
                    throw new Error('First argument "formEl" is missing or falsy!');
                }
                if (Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["isNodeList"])(formEl)) {
                    throw new Error('First argument "formEl" must be a single DOM node or a form CSS selector, not a NodeList!');
                }
                if (!checkFormElem.result) {
                    throw new Error('First argument "formEl" is not a DOM node nor a form CSS selector!');
                }
                self.formEl = checkFormElem.element;
                self.formEl.formjs = self;
                self.options = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["mergeObjects"])({}, self.constructor.prototype.options, optionsObj);
                var cbList = [ "beforeValidation", "beforeSend" ];
                cbList.forEach((function(cbName) {
                    var optionType = Array.isArray(self.options.formOptions[cbName]) ? "formOptions" : "fieldOptions", cbOpt = self.options[optionType][cbName];
                    if (cbOpt && Array.isArray(cbOpt)) {
                        self.options[optionType][cbName] = cbOpt.map((function(cbFn) {
                            return cbFn.bind(self);
                        }));
                    }
                }));
                self.listenerCallbacks = {
                    dataTypeNumber: _listenerCallbacks__WEBPACK_IMPORTED_MODULE_1__["callbackFns"].dataTypeNumber,
                    keypressMaxlength: _listenerCallbacks__WEBPACK_IMPORTED_MODULE_1__["callbackFns"].keypressMaxlength,
                    pastePrevent: _listenerCallbacks__WEBPACK_IMPORTED_MODULE_1__["callbackFns"].pastePrevent,
                    submit: _listenerCallbacks__WEBPACK_IMPORTED_MODULE_1__["callbackFns"].submit,
                    validation: _listenerCallbacks__WEBPACK_IMPORTED_MODULE_1__["callbackFns"].validation.bind(self),
                    validationEnd: _listenerCallbacks__WEBPACK_IMPORTED_MODULE_1__["callbackFns"].validationEnd
                };
                Object.freeze(self.listenerCallbacks);
                Object(_formStartup__WEBPACK_IMPORTED_MODULE_2__["formStartup"])(self.formEl, self.options, self.listenerCallbacks);
            }
        },
        "./src/modules/destroy.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            __webpack_require__.d(__webpack_exports__, "destroy", (function() {
                return destroy;
            }));
            var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/modules/helpers.js");
            function destroy(formEl, options, listenerCallbacks) {
                if (options.fieldOptions.strictHtmlValidation) {
                    formEl.removeEventListener("keypress", listenerCallbacks.keypressMaxlength, false);
                    formEl.removeEventListener("input", listenerCallbacks.dataTypeNumber, false);
                }
                if (options.fieldOptions.preventPasteFields) {
                    formEl.removeEventListener("paste", listenerCallbacks.pastePrevent, false);
                }
                if (options.formOptions.handleSubmit) {
                    formEl.removeEventListener("submit", listenerCallbacks.submit);
                }
                options.fieldOptions.validateOnEvents.split(" ").forEach((function(eventName) {
                    var useCapturing = eventName === "blur" ? true : false;
                    formEl.removeEventListener(eventName, listenerCallbacks.validation, useCapturing);
                }));
                formEl.removeEventListener(_helpers__WEBPACK_IMPORTED_MODULE_0__["customEvents"].field.validation, listenerCallbacks.validationEnd, false);
                delete formEl.formjs;
            }
        },
        "./src/modules/formStartup.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            __webpack_require__.d(__webpack_exports__, "formStartup", (function() {
                return formStartup;
            }));
            var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/modules/helpers.js");
            function formStartup(formEl, options, listenerCallbacks) {
                formEl.noValidate = true;
                var fieldOptions = options.fieldOptions, formOptions = options.formOptions;
                if (fieldOptions.handleValidation) {
                    if (fieldOptions.strictHtmlValidation) {
                        formEl.addEventListener("keypress", listenerCallbacks.keypressMaxlength, false);
                        formEl.addEventListener("input", listenerCallbacks.dataTypeNumber, false);
                    }
                    if (fieldOptions.preventPasteFields && formEl.querySelectorAll(fieldOptions.preventPasteFields).length) {
                        formEl.addEventListener("paste", listenerCallbacks.pastePrevent, false);
                    }
                    fieldOptions.validateOnEvents.split(" ").forEach((function(eventName) {
                        var useCapturing = eventName === "blur" ? true : false;
                        formEl.addEventListener(eventName, listenerCallbacks.validation, useCapturing);
                    }));
                    formEl.addEventListener(_helpers__WEBPACK_IMPORTED_MODULE_0__["customEvents"].field.validation, listenerCallbacks.validationEnd, false);
                }
                if (formOptions.handleSubmit) {
                    formEl.addEventListener("submit", listenerCallbacks.submit);
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
        "./src/modules/helpers.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            __webpack_require__.d(__webpack_exports__, "addClass", (function() {
                return addClass;
            }));
            __webpack_require__.d(__webpack_exports__, "checkDirtyField", (function() {
                return checkDirtyField;
            }));
            __webpack_require__.d(__webpack_exports__, "checkFormEl", (function() {
                return checkFormEl;
            }));
            __webpack_require__.d(__webpack_exports__, "customEvents", (function() {
                return customEvents;
            }));
            __webpack_require__.d(__webpack_exports__, "dispatchCustomEvent", (function() {
                return dispatchCustomEvent;
            }));
            __webpack_require__.d(__webpack_exports__, "excludeSelector", (function() {
                return excludeSelector;
            }));
            __webpack_require__.d(__webpack_exports__, "fieldsStringSelector", (function() {
                return fieldsStringSelector;
            }));
            __webpack_require__.d(__webpack_exports__, "getFilledFields", (function() {
                return getFilledFields;
            }));
            __webpack_require__.d(__webpack_exports__, "getSplitChar", (function() {
                return getSplitChar;
            }));
            __webpack_require__.d(__webpack_exports__, "getUniqueFields", (function() {
                return getUniqueFields;
            }));
            __webpack_require__.d(__webpack_exports__, "isDOMNode", (function() {
                return isDOMNode;
            }));
            __webpack_require__.d(__webpack_exports__, "isFieldForChangeEvent", (function() {
                return isFieldForChangeEvent;
            }));
            __webpack_require__.d(__webpack_exports__, "isNodeList", (function() {
                return isNodeList;
            }));
            __webpack_require__.d(__webpack_exports__, "isPlainObject", (function() {
                return isPlainObject;
            }));
            __webpack_require__.d(__webpack_exports__, "mergeObjects", (function() {
                return mergeObjects;
            }));
            __webpack_require__.d(__webpack_exports__, "removeClass", (function() {
                return removeClass;
            }));
            __webpack_require__.d(__webpack_exports__, "runFunctionsSequence", (function() {
                return runFunctionsSequence;
            }));
            __webpack_require__.d(__webpack_exports__, "serializeObject", (function() {
                return serializeObject;
            }));
            __webpack_require__.d(__webpack_exports__, "toCamelCase", (function() {
                return toCamelCase;
            }));
            __webpack_require__.d(__webpack_exports__, "validateFieldObjDefault", (function() {
                return validateFieldObjDefault;
            }));
            __webpack_require__.d(__webpack_exports__, "validateFormObjDefault", (function() {
                return validateFormObjDefault;
            }));
            function _typeof(obj) {
                if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                    _typeof = function _typeof(obj) {
                        return typeof obj;
                    };
                } else {
                    _typeof = function _typeof(obj) {
                        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                    };
                }
                return _typeof(obj);
            }
            var addClass = function addClass(element, cssClasses) {
                cssClasses.split(" ").forEach((function(className) {
                    element.classList.add(className);
                }));
            }, checkDirtyField = function checkDirtyField(fields, cssClasses) {
                var fields = isNodeList(fields) ? Array.from(fields) : [ fields ];
                fields.forEach((function(fieldEl) {
                    if (fieldEl.type !== "checkbox" && fieldEl.type !== "radio") {
                        var containerEl = fieldEl.closest("[data-formjs-question]") || fieldEl;
                        if (fieldEl.value) {
                            addClass(containerEl, cssClasses);
                        } else {
                            removeClass(containerEl, cssClasses);
                        }
                    }
                }));
            }, checkFormEl = function checkFormEl(formEl) {
                var isString = _typeof(formEl), isValidNodeSelector = isString === "string" && isDOMNode(document.querySelector(formEl)), isFormSelector = isValidNodeSelector && document.querySelector(formEl).tagName.toLowerCase() === "form", obj = {
                    result: isDOMNode(formEl) || isFormSelector,
                    element: isString === "string" ? document.querySelector(formEl) : formEl
                };
                return obj;
            }, customEvents = {
                field: {
                    validation: "fjs.field:validation"
                },
                form: {
                    submit: "fjs.form:submit",
                    validation: "fjs.form:validation"
                }
            }, dispatchCustomEvent = function dispatchCustomEvent(elem, eventName) {
                var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
                var eventOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
                eventOptions = mergeObjects({}, {
                    bubbles: true
                }, eventOptions);
                var eventObj = new Event(eventName, eventOptions);
                eventObj.data = data;
                elem.dispatchEvent(eventObj);
            }, excludeSelector = ':not([type="reset"]):not([type="submit"]):not([type="button"]):not([type="file"]):not([data-exclude-data])', fieldsStringSelector = 'input:not([type="reset"]):not([type="submit"]):not([type="button"]):not([type="hidden"]), select, textarea', getFilledFields = function getFilledFields(formEl) {
                return getUniqueFields(formEl.querySelectorAll(fieldsStringSelector)).map((function(fieldEl) {
                    var name = fieldEl.name, type = fieldEl.type, isCheckboxOrRadio = type === "checkbox" || type === "radio", fieldChecked = formEl.querySelector('[name="' + name + '"]:checked'), isReqFrom = fieldEl.matches("[data-required-from]"), reqMoreEl = isReqFrom ? formEl.querySelector(fieldEl.getAttribute("data-required-from")) : null;
                    return isCheckboxOrRadio ? fieldChecked || null : isReqFrom && reqMoreEl.checked || !isReqFrom && fieldEl.value ? fieldEl : null;
                })).filter((function(fieldEl) {
                    return fieldEl !== null;
                }));
            }, getSplitChar = function getSplitChar(string) {
                var splitChar = ".";
                if (string.indexOf(splitChar) === -1) {
                    if (string.indexOf("-") >= 0) {
                        splitChar = "-";
                    } else if (string.indexOf("/") >= 0) {
                        splitChar = "/";
                    }
                }
                return splitChar;
            }, getUniqueFields = function getUniqueFields(nodeList) {
                var currentFieldName = "", currentFieldType = "";
                return Array.from(nodeList).filter((function(fieldEl) {
                    var name = fieldEl.name, type = fieldEl.type;
                    if (name === currentFieldName && type === currentFieldType) {
                        return false;
                    }
                    if (!fieldEl.matches("[data-required-from]")) {
                        currentFieldName = name;
                        currentFieldType = type;
                    }
                    return true;
                }));
            }, isDOMNode = function isDOMNode(node) {
                return Element.prototype.isPrototypeOf(node);
            }, isFieldForChangeEvent = function isFieldForChangeEvent(fieldEl) {
                return fieldEl.matches('select, [type="radio"], [type="checkbox"], [type="file"]');
            }, isNodeList = function isNodeList(nodeList) {
                return NodeList.prototype.isPrototypeOf(nodeList);
            }, isPlainObject = function isPlainObject(object) {
                return Object.prototype.toString.call(object) === "[object Object]";
            }, mergeObjects = function mergeObjects() {
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
                                if (typeof out[key] === "undefined") {
                                    out[key] = [];
                                }
                                out[key] = out[key].concat(obj[key].slice(0));
                            } else if (isObject) {
                                out[key] = mergeObjects(out[key], obj[key]);
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
            }, removeClass = function removeClass(element, cssClasses) {
                cssClasses.split(" ").forEach((function(className) {
                    element.classList.remove(className);
                }));
            }, runFunctionsSequence = function runFunctionsSequence() {
                var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}, _ref$functionsList = _ref.functionsList, functionsList = _ref$functionsList === void 0 ? [] : _ref$functionsList, _ref$data = _ref.data, data = _ref$data === void 0 ? {} : _ref$data, _ref$stopConditionFn = _ref.stopConditionFn, stopConditionFn = _ref$stopConditionFn === void 0 ? function() {
                    return false;
                } : _ref$stopConditionFn;
                return functionsList.reduce((function(acc, promiseFn) {
                    return acc.then((function(res) {
                        var dataNew = mergeObjects({}, res[res.length - 1]);
                        if (stopConditionFn(dataNew)) {
                            return Promise.resolve(res);
                        }
                        return new Promise((function(resolve) {
                            resolve(promiseFn(dataNew));
                        })).then((function() {
                            var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : dataNew;
                            res.push(result);
                            return res;
                        }));
                    }));
                }), Promise.resolve([ data ])).then((function(dataList) {
                    return dataList.length > 1 ? dataList.slice(1) : dataList;
                }));
            }, serializeObject = function serializeObject(obj) {
                var objToString = obj && _typeof(obj) === "object" && obj.constructor === Object ? Object.keys(obj).reduce((function(a, k) {
                    a.push(k + "=" + encodeURIComponent(obj[k]));
                    return a;
                }), []).join("&") : obj;
                return objToString;
            }, toCamelCase = function toCamelCase(string) {
                return string.replace(/-([a-z])/gi, (function(all, letter) {
                    return letter.toUpperCase();
                }));
            }, validateFieldObjDefault = {
                result: false,
                fieldEl: null
            }, validateFormObjDefault = {
                result: true,
                fields: []
            };
        },
        "./src/modules/init.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            __webpack_require__.d(__webpack_exports__, "init", (function() {
                return init;
            }));
            var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/modules/helpers.js");
            var init = function init(instance, formEl, listenerCallbacks) {
                var formFields = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["getFilledFields"])(formEl);
                return Promise.all(formFields.map((function(fieldEl) {
                    var isFieldForChangeEventBoolean = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["isFieldForChangeEvent"])(fieldEl);
                    var fakeEventObj = {
                        target: fieldEl,
                        type: isFieldForChangeEventBoolean ? "change" : ""
                    };
                    return listenerCallbacks.validation.call(instance, fakeEventObj);
                }))).then((function(fields) {
                    instance.isInitialized = true;
                    return {
                        instance: instance,
                        fields: fields
                    };
                }));
            };
        },
        "./src/modules/isValid.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            __webpack_require__.d(__webpack_exports__, "isValid", (function() {
                return isValid;
            }));
            var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/modules/helpers.js");
            var _validationRules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/modules/validationRules.js");
            function isValid(fieldEl, fieldOptions, validationRules, validationErrors) {
                var fieldType = fieldEl.matches("[data-subtype]") ? Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["toCamelCase"])(fieldEl.getAttribute("data-subtype")) : fieldEl.type, fieldValue = fieldEl.value, isValidValue = fieldValue.trim().length > 0, fieldAttributes = Array.from(fieldEl.attributes).sort((function(a, b) {
                    return a.name < b.name;
                }));
                var attrValidations = [];
                var attrValidationsResult = isValidValue, obj = {
                    result: isValidValue,
                    fieldEl: fieldEl
                };
                if (!obj.result) {
                    obj.errors = {
                        empty: true
                    };
                    return Promise.resolve(obj);
                }
                fieldAttributes.forEach((function(attr) {
                    var attrName = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["toCamelCase"])(attr.name.replace("data-", "")), attrValue = attr.value, isAttrValueWithFn = attrName === "type" && typeof _validationRules__WEBPACK_IMPORTED_MODULE_1__["validationRulesAttributes"][attrValue] === "function", isAttrNameWithFn = typeof _validationRules__WEBPACK_IMPORTED_MODULE_1__["validationRulesAttributes"][attrName] === "function";
                    if (isAttrValueWithFn || isAttrNameWithFn) {
                        var extraValObj = {
                            attrName: isAttrValueWithFn ? attrValue : attrName,
                            attrValue: attrValue,
                            fieldEl: fieldEl,
                            fieldOptions: fieldOptions
                        };
                        if (isAttrValueWithFn || attrName === "requiredFrom") {
                            attrValidations.unshift(extraValObj);
                        } else {
                            attrValidations.push(extraValObj);
                        }
                    }
                }));
                return new Promise((function(resolve) {
                    attrValidations.forEach((function(item) {
                        var extraVal = _validationRules__WEBPACK_IMPORTED_MODULE_1__["validationRulesAttributes"][item.attrName](item);
                        if (!extraVal.result) {
                            obj = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["mergeObjects"])({}, obj, extraVal);
                            attrValidationsResult = false;
                        }
                    }));
                    if (typeof validationRules[fieldType] === "function") {
                        resolve(validationRules[fieldType](fieldValue, fieldEl));
                    } else {
                        resolve(obj);
                    }
                })).then((function(data) {
                    obj = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["mergeObjects"])({}, obj, data, {
                        fieldEl: fieldEl
                    });
                    obj.result = obj.result && attrValidationsResult;
                    if (!obj.result) {
                        var fieldErrors = typeof validationErrors[fieldType] === "function" ? validationErrors[fieldType](fieldValue, fieldEl) : {};
                        if (typeof obj.errors === "undefined") {
                            obj.errors = {};
                        }
                        obj.errors.rule = true;
                        obj.errors = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["mergeObjects"])({}, obj.errors, fieldErrors);
                    }
                    return obj;
                }));
            }
        },
        "./src/modules/isValidField.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            __webpack_require__.d(__webpack_exports__, "isValidField", (function() {
                return isValidField;
            }));
            var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/modules/helpers.js");
            var _isValid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/modules/isValid.js");
            function isValidField(fieldEl, fieldOptions, validationRules, validationErrors) {
                var obj = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["mergeObjects"])({}, _helpers__WEBPACK_IMPORTED_MODULE_0__["validateFieldObjDefault"], {
                    fieldEl: fieldEl
                });
                if (!Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["isDOMNode"])(fieldEl)) {
                    return Promise.resolve(obj);
                }
                var isValidValue = fieldEl.value.trim().length > 0, isRequired = fieldEl.required, isReqFrom = fieldEl.matches("[data-required-from]"), isValidateIfFilled = fieldEl.matches("[data-validate-if-filled]"), rfsObject = {
                    functionsList: fieldOptions.beforeValidation,
                    data: {
                        fieldEl: fieldEl
                    }
                };
                return Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["runFunctionsSequence"])(rfsObject).then((function(data) {
                    var dataObj = data.pop();
                    return new Promise((function(resolve) {
                        if (!isRequired && !isValidateIfFilled && !isReqFrom || isValidateIfFilled && !isValidValue || isReqFrom && !isRequired) {
                            dataObj.result = true;
                            resolve(dataObj);
                        } else {
                            resolve(Object(_isValid__WEBPACK_IMPORTED_MODULE_1__["isValid"])(fieldEl, fieldOptions, validationRules, validationErrors));
                        }
                    }));
                }));
            }
        },
        "./src/modules/isValidForm.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            __webpack_require__.d(__webpack_exports__, "isValidForm", (function() {
                return isValidForm;
            }));
            var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/modules/helpers.js");
            var _isValidField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/modules/isValidField.js");
            function isValidForm(formEl, fieldOptions, validationRules, validationErrors) {
                fieldOptions = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["mergeObjects"])({}, fieldOptions, {
                    focusOnRelated: false
                });
                var obj = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["mergeObjects"])({}, _helpers__WEBPACK_IMPORTED_MODULE_0__["validateFormObjDefault"]), fieldsList = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["getUniqueFields"])(formEl.querySelectorAll(_helpers__WEBPACK_IMPORTED_MODULE_0__["fieldsStringSelector"]));
                return Promise.all(fieldsList.map((function(fieldEl) {
                    return Object(_isValidField__WEBPACK_IMPORTED_MODULE_1__["isValidField"])(fieldEl, fieldOptions, validationRules, validationErrors);
                }))).then((function(list) {
                    var areAllFieldsValid = list.filter((function(fieldObj) {
                        return !fieldObj.result;
                    })).length === 0;
                    obj.result = areAllFieldsValid;
                    obj.fields = list;
                    return obj;
                }));
            }
        },
        "./src/modules/listenerCallbacks.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            __webpack_require__.d(__webpack_exports__, "callbackFns", (function() {
                return callbackFns;
            }));
            var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/modules/helpers.js");
            var _submit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/modules/submit.js");
            var callbackFns = {
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
                    var fieldEl = event.target;
                    var fieldOptions = fieldEl.closest("form").formjs.options.fieldOptions;
                    if (fieldEl.matches(fieldOptions.preventPasteFields)) {
                        event.preventDefault();
                    }
                },
                submit: function submit(event) {
                    Object(_submit__WEBPACK_IMPORTED_MODULE_1__["submit"])(event);
                },
                validation: function validation(event) {
                    var self = this, eventName = event.type, fieldEl = event.target;
                    if (fieldEl.matches(_helpers__WEBPACK_IMPORTED_MODULE_0__["fieldsStringSelector"])) {
                        var isFieldForChangeEventBoolean = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["isFieldForChangeEvent"])(fieldEl), isRadio = fieldEl.type === "radio", isReqFrom = fieldEl.matches("[data-required-from]"), isReqMore = fieldEl.matches("[data-require-more]"), isValidValue = fieldEl.value.trim().length > 0;
                        if (isRadio && eventName === "change") {
                            var findReqMoreEl = isReqMore ? fieldEl : self.formEl.querySelector('[name="' + fieldEl.name + '"][data-require-more]'), findReqFromEl = findReqMoreEl !== null ? self.formEl.querySelector('[data-required-from="#' + findReqMoreEl.id + '"]') : null;
                            if (isReqMore) {
                                if (findReqFromEl !== null) {
                                    findReqFromEl.required = fieldEl.required;
                                    if (self.options.fieldOptions.focusOnRelated) {
                                        findReqFromEl.focus();
                                    }
                                }
                            } else if (findReqMoreEl !== null) {
                                if (findReqFromEl !== null) {
                                    findReqFromEl.required = findReqMoreEl.required && findReqMoreEl.checked;
                                    findReqFromEl.value = "";
                                }
                            }
                        }
                        if (isReqFrom) {
                            if (isValidValue) {
                                var reqMoreEl = self.formEl.querySelector(fieldEl.getAttribute("data-required-from"));
                                reqMoreEl.checked = true;
                                fieldEl.required = reqMoreEl.required;
                            }
                        }
                        if (isFieldForChangeEventBoolean && eventName === "change" || !isFieldForChangeEventBoolean && eventName !== "change") {
                            return self.validateField(fieldEl).then((function(obj) {
                                var type = obj.fieldEl.type, realtedFieldEqualTo = obj.fieldEl.closest("form").querySelector('[data-equal-to="' + obj.fieldEl.name + '"]');
                                if ((obj.fieldEl.required || obj.fieldEl.matches("[data-validate-if-filled]")) && !(type === "checkbox" || type === "radio") && realtedFieldEqualTo && realtedFieldEqualTo.value.trim() !== "") {
                                    return self.validateField(realtedFieldEqualTo);
                                } else {
                                    return obj;
                                }
                            }));
                        }
                    }
                },
                validationEnd: function validationEnd(event) {
                    var fieldsArray = event.data.fieldEl ? [ event.data ] : event.data.fields, options = fieldsArray[0].fieldEl.closest("form").formjs.options.fieldOptions;
                    fieldsArray.forEach((function(obj) {
                        var fieldEl = obj.fieldEl;
                        if (fieldEl.matches(_helpers__WEBPACK_IMPORTED_MODULE_0__["fieldsStringSelector"])) {
                            var containerEl = fieldEl.closest("[data-formjs-question]"), isReqFrom = fieldEl.matches("[data-required-from]"), reqMoreEl = document.querySelector(fieldEl.getAttribute("data-required-from"));
                            if (containerEl !== null) {
                                Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["removeClass"])(containerEl, options.cssClasses.pending);
                            }
                            if (containerEl !== null && !options.skipUIfeedback) {
                                if (obj.result) {
                                    if (!isReqFrom || isReqFrom && reqMoreEl.checked) {
                                        var errorClasses = options.cssClasses.error + " " + options.cssClasses.errorEmpty + " " + options.cssClasses.errorRule;
                                        Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["removeClass"])(containerEl, errorClasses);
                                        Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["addClass"])(containerEl, options.cssClasses.valid);
                                    }
                                } else {
                                    var extraErrorClass = options.cssClasses.errorRule;
                                    var isChecks = fieldEl.matches("[data-checks]"), checkedElLength = isChecks ? containerEl.querySelectorAll('[name="' + fieldEl.name + '"]:checked').length : 0;
                                    if (!isChecks && obj.errors && obj.errors.empty || isChecks && checkedElLength === 0) {
                                        extraErrorClass = options.cssClasses.errorEmpty;
                                    }
                                    var _errorClasses = options.cssClasses.error + " " + extraErrorClass, errorClassToRemove = options.cssClasses.errorEmpty + " " + options.cssClasses.errorRule;
                                    Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["removeClass"])(containerEl, options.cssClasses.valid + " " + errorClassToRemove);
                                    Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["addClass"])(containerEl, _errorClasses);
                                }
                            }
                        }
                    }));
                }
            };
        },
        "./src/modules/options.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            __webpack_require__.d(__webpack_exports__, "options", (function() {
                return options;
            }));
            var _optionsUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/modules/optionsUtils.js");
            var options = {
                fieldOptions: {
                    beforeValidation: [ _optionsUtils__WEBPACK_IMPORTED_MODULE_0__["defaultCallbacksInOptions"].fieldOptions.beforeValidation ],
                    cssClasses: {
                        dirty: "is-dirty",
                        error: "has-error",
                        errorEmpty: "has-error-empty",
                        errorRule: "has-error-rule",
                        pending: "is-pending",
                        valid: "is-valid"
                    },
                    focusOnRelated: true,
                    handleFileUpload: true,
                    handleValidation: true,
                    maxFileSize: 10,
                    onValidationCheckAll: true,
                    preventPasteFields: '[type="password"], [data-equal-to]',
                    skipUIfeedback: false,
                    strictHtmlValidation: true,
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
                    ajaxSubmit: true,
                    beforeSend: [],
                    cssClasses: {
                        ajaxComplete: "ajax-complete",
                        ajaxError: "ajax-error",
                        ajaxPending: "ajax-pending",
                        ajaxSuccess: "ajax-success",
                        submit: "is-submitting",
                        valid: "is-valid"
                    },
                    getFormData: _optionsUtils__WEBPACK_IMPORTED_MODULE_0__["defaultCallbacksInOptions"].formOptions.getFormData,
                    handleSubmit: true
                }
            };
        },
        "./src/modules/optionsUtils.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            __webpack_require__.d(__webpack_exports__, "defaultCallbacksInOptions", (function() {
                return defaultCallbacksInOptions;
            }));
            var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/modules/helpers.js");
            var defaultCallbacksInOptions = {
                fieldOptions: {
                    beforeValidation: function beforeValidationDefault(fieldObj) {
                        var fieldOptions = this.options.fieldOptions;
                        Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["checkDirtyField"])(fieldObj.fieldEl, fieldOptions.cssClasses.dirty);
                        if (!fieldOptions.skipUIfeedback) {
                            Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["addClass"])(fieldObj.fieldEl.closest("[data-formjs-question]"), fieldOptions.cssClasses.pending);
                        }
                    }
                },
                formOptions: {
                    getFormData: function getFormDataDefault(filteredFields) {
                        var formData = {}, formEl = this.formEl;
                        filteredFields.forEach((function(fieldEl) {
                            var isCheckbox = fieldEl.type === "checkbox", isRadio = fieldEl.type === "radio", isSelect = fieldEl.matches("select"), name = fieldEl.name;
                            var value = fieldEl.value;
                            if (isCheckbox) {
                                value = fieldEl.checked;
                                var checkboxes = Array.from(formEl.querySelectorAll('[name="' + name + '"]'));
                                if (checkboxes.length > 1) {
                                    value = [];
                                    var checkedElems = checkboxes.filter((function(field) {
                                        return field.checked;
                                    }));
                                    checkedElems.forEach((function(fieldEl) {
                                        value.push(fieldEl.value);
                                    }));
                                }
                            } else if (isRadio) {
                                var checkedRadio = formEl.querySelector('[name="' + name + '"]:checked');
                                value = checkedRadio === null ? null : checkedRadio.value;
                            } else if (isSelect) {
                                var selectedOpts = Array.from(fieldEl.options).filter((function(option) {
                                    return option.selected;
                                }));
                                if (selectedOpts.length > 1) {
                                    value = [];
                                    selectedOpts.forEach((function(fieldEl) {
                                        value.push(fieldEl.value);
                                    }));
                                }
                            }
                            formData[name] = value;
                        }));
                        return formData;
                    }
                }
            };
        },
        "./src/modules/submit.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            __webpack_require__.d(__webpack_exports__, "submit", (function() {
                return submit;
            }));
            var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/modules/helpers.js");
            var _ajaxCall__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/modules/ajaxCall.js");
            function submit(event) {
                var formEl = event.target, instance = formEl.formjs, options = instance.options, formCssClasses = options.formOptions.cssClasses, isAjaxForm = options.formOptions.ajaxSubmit, btnEl = formEl.querySelector('[type="submit"]'), eventPreventDefault = function eventPreventDefault() {
                    var enableBtn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
                    if (btnEl && enableBtn) {
                        btnEl.disabled = false;
                    }
                    if (event) {
                        event.preventDefault();
                    }
                };
                if (isAjaxForm) {
                    eventPreventDefault(false);
                }
                if (btnEl) {
                    if (btnEl.disabled) {
                        eventPreventDefault(false);
                        return false;
                    }
                    btnEl.disabled = true;
                }
                Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["removeClass"])(formEl, formCssClasses.ajaxComplete + " " + formCssClasses.ajaxError + " " + formCssClasses.ajaxSuccess);
                Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["addClass"])(formEl, formCssClasses.submit);
                var handleValidation = options.fieldOptions.handleValidation, formValidationPromise = handleValidation ? instance.validateForm() : Promise.resolve(_helpers__WEBPACK_IMPORTED_MODULE_0__["validateFormObjDefault"]);
                formValidationPromise.then((function(formValidation) {
                    var beforeSendData = {
                        stopExecution: false,
                        formData: {}
                    };
                    if (!formValidation.result) {
                        eventPreventDefault();
                        Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["removeClass"])(formEl, formCssClasses.submit);
                        beforeSendData.stopExecution = true;
                        return [ beforeSendData ];
                    }
                    var formDataObj = isAjaxForm ? instance.getFormData() : null, callbacksBeforeSend = options.formOptions.beforeSend;
                    if (formDataObj) {
                        beforeSendData.formData = formDataObj;
                    }
                    var rfsObject = {
                        functionsList: callbacksBeforeSend,
                        data: beforeSendData,
                        stopConditionFn: function stopConditionFn(data) {
                            return data.stopExecution;
                        }
                    };
                    return Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["runFunctionsSequence"])(rfsObject);
                })).then((function(dataList) {
                    if (dataList.filter((function(data) {
                        return data.stopExecution;
                    })).length > 0) {
                        eventPreventDefault();
                        return false;
                    }
                    if (isAjaxForm) {
                        var formData = dataList.pop().formData;
                        Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["addClass"])(formEl, formCssClasses.ajaxPending);
                        Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["dispatchCustomEvent"])(formEl, _helpers__WEBPACK_IMPORTED_MODULE_0__["customEvents"].form.submit, Object(_ajaxCall__WEBPACK_IMPORTED_MODULE_1__["ajaxCall"])(formEl, formData, options));
                    }
                }));
            }
        },
        "./src/modules/validateField.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            __webpack_require__.d(__webpack_exports__, "validateField", (function() {
                return validateField;
            }));
            var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/modules/helpers.js");
            var _isValidField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/modules/isValidField.js");
            var _isValidForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/modules/isValidForm.js");
            function validateField(fieldEl, options, validationRules, validationErrors) {
                var formEl = fieldEl.closest("form");
                var skipUIfeedback = options.fieldOptions.skipUIfeedback;
                return new Promise((function(resolve) {
                    var prom = Object(_isValidField__WEBPACK_IMPORTED_MODULE_1__["isValidField"])(fieldEl, options.fieldOptions, validationRules, validationErrors);
                    resolve(prom);
                })).then((function(obj) {
                    return new Promise((function(resolve) {
                        if (obj.fieldEl) {
                            Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["dispatchCustomEvent"])(obj.fieldEl, _helpers__WEBPACK_IMPORTED_MODULE_0__["customEvents"].field.validation, obj, {
                                bubbles: false
                            });
                            Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["dispatchCustomEvent"])(formEl, _helpers__WEBPACK_IMPORTED_MODULE_0__["customEvents"].field.validation, obj);
                            if (options.fieldOptions.onValidationCheckAll && obj.result) {
                                options.fieldOptions.skipUIfeedback = true;
                                resolve(Object(_isValidForm__WEBPACK_IMPORTED_MODULE_2__["isValidForm"])(formEl, options.fieldOptions, validationRules, validationErrors).then((function(dataForm) {
                                    var clMethodName = dataForm.result ? "add" : "remove";
                                    formEl.classList[clMethodName](options.formOptions.cssClasses.valid);
                                    Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["dispatchCustomEvent"])(formEl, _helpers__WEBPACK_IMPORTED_MODULE_0__["customEvents"].form.validation, dataForm);
                                    options.fieldOptions.skipUIfeedback = skipUIfeedback;
                                    return obj;
                                })));
                            } else if (!obj.result) {
                                Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["removeClass"])(formEl, options.formOptions.cssClasses.valid);
                            }
                        }
                        resolve(obj);
                    }));
                }));
            }
        },
        "./src/modules/validateForm.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            __webpack_require__.d(__webpack_exports__, "validateForm", (function() {
                return validateForm;
            }));
            var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/modules/helpers.js");
            var _isValidForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/modules/isValidForm.js");
            function validateForm(formEl, options, listenerCallbacks, validationRules, validationErrors) {
                return new Promise((function(resolve) {
                    var prom = Object(_isValidForm__WEBPACK_IMPORTED_MODULE_1__["isValidForm"])(formEl, options.fieldOptions, validationRules, validationErrors);
                    resolve(prom);
                })).then((function(data) {
                    var clMethodName = data.result ? "add" : "remove";
                    formEl.classList[clMethodName](options.formOptions.cssClasses.valid);
                    listenerCallbacks.validationEnd({
                        data: data
                    });
                    Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["dispatchCustomEvent"])(formEl, _helpers__WEBPACK_IMPORTED_MODULE_0__["customEvents"].form.validation, data);
                    return data;
                }));
            }
        },
        "./src/modules/validationErrors.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            __webpack_require__.d(__webpack_exports__, "validationErrors", (function() {
                return validationErrors;
            }));
            var validationErrors = {
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
                }
            };
        },
        "./src/modules/validationRules.js": function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            __webpack_require__.d(__webpack_exports__, "validationRules", (function() {
                return validationRules;
            }));
            __webpack_require__.d(__webpack_exports__, "validationRulesAttributes", (function() {
                return validationRulesAttributes;
            }));
            var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/modules/helpers.js");
            var validationRules = {
                date: function date(string) {
                    var date = /^(((19|[2-9]\d)\d{2})[ \/\-.](0[13578]|1[02])[ \/\-.](0[1-9]|[12]\d|3[01]))|(((19|[2-9]\d)\d{2})[ \/\-.](0[13456789]|1[012])[ \/\-.](0[1-9]|[12]\d|30))|(((19|[2-9]\d)\d{2})[ \/\-.]02[ \/\-.](0[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))[ \/\-.]02[ \/\-.]29)$/g.test(string), obj = {
                        result: date
                    };
                    return obj;
                },
                email: function email(string) {
                    var obj = {
                        result: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(string)
                    };
                    return obj;
                },
                number: function number(string) {
                    var obj = {
                        result: /[+-]?([0-9]*[.])?[0-9]+/.test(string)
                    };
                    return obj;
                }
            };
            var validationRulesAttributes = {
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
                    var fieldEl = data.fieldEl, maxFileSize = (fieldEl.getAttribute("data-max-file-size") || data.fieldOptions.maxFileSize) * 1, MIMEtype = fieldEl.accept ? new RegExp(fieldEl.accept.replace("*", "[^\\/,]+")) : null, filesList = Array.from(fieldEl.files), obj = {
                        result: true
                    };
                    filesList.forEach((function(file) {
                        var exceedMaxFileSize = maxFileSize > 0 && file.size / 1024 / 1024 > maxFileSize, isAcceptedFileType = MIMEtype !== null ? MIMEtype.test(file.type) : true;
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
                    }));
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
                        var splitChar = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["getSplitChar"])(value);
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
                        var splitChar = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["getSplitChar"])(value);
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
    })["default"];
}));