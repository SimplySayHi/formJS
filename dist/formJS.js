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
 /**! formJS v2.1.0 | Valerio Di Punzio (@SimplySayHi) | https://valeriodipunzio.com/plugins/formJS/ | https://github.com/SimplySayHi/formJS | MIT license */        var _helper = __webpack_require__("./src/modules/helper.js");
        var _options = __webpack_require__("./src/modules/options.js");
        var _validationRules = __webpack_require__("./src/modules/validationRules.js");
        var _listenerCallbacks2 = __webpack_require__("./src/modules/listenerCallbacks.js");
        var _destroy2 = __webpack_require__("./src/modules/destroy.js");
        var _getFormJSON2 = __webpack_require__("./src/modules/getFormJSON.js");
        var _isValidField2 = __webpack_require__("./src/modules/isValidField.js");
        var _isValidForm2 = __webpack_require__("./src/modules/isValidForm.js");
        var _submit2 = __webpack_require__("./src/modules/submit.js");
        var _init2 = __webpack_require__("./src/modules/init.js");
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var _listenerCallbacks = new WeakMap();
        var Form = function() {
            function Form(formEl) {
                var optionsObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                _classCallCheck(this, Form);
                var argsL = arguments.length, checkFormEl = (0, _helper._checkFormEl)(formEl);
                if (argsL === 0 || argsL > 0 && !formEl) {
                    throw new Error('First argument "formEl" is missing or falsy!');
                }
                if ((0, _helper._isNodeList)(formEl)) {
                    throw new Error('First argument "formEl" must be a single DOM node or a form CSS selector, not a NodeList!');
                }
                if (!checkFormEl.result) {
                    throw new Error('First argument "formEl" is not a DOM node nor a form CSS selector!');
                }
                this.formEl = checkFormEl.element;
                this.options = (0, _helper._mergeObjects)({}, optionsObj, Form.prototype.options);
                _listenerCallbacks.set(this, {
                    charCount: _listenerCallbacks2._charCountCallback,
                    validation: _listenerCallbacks2._validationCallback.bind(this),
                    keypressMaxlength: _listenerCallbacks2._keypressMaxlengthCallback.bind(this),
                    pastePrevent: _listenerCallbacks2._pastePreventCallback.bind(this),
                    submit: _listenerCallbacks2._submitCallback.bind(this)
                });
                _init2._init.call(this);
            }
            _createClass(Form, [ {
                key: "destroy",
                value: function destroy() {
                    _destroy2.destroy.call(this);
                }
            }, {
                key: "getFormJSON",
                value: function getFormJSON() {
                    return _getFormJSON2.getFormJSON.call(this);
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
                key: "listenerCallbacks",
                get: function get() {
                    return _listenerCallbacks.get(this);
                }
            } ], [ {
                key: "addValidationRules",
                value: function addValidationRules(rulesObj) {
                    this.prototype.validationRules = (0, _helper._mergeObjects)({}, rulesObj, this.prototype.validationRules);
                }
            }, {
                key: "setOptions",
                value: function setOptions(optionsObj) {
                    this.prototype.options = (0, _helper._mergeObjects)({}, optionsObj, this.prototype.options);
                }
            } ]);
            return Form;
        }();
        Form.prototype.validationRules = _validationRules.validationRules;
        Form.prototype.options = _options.options;
        if (!window.Form) {
            window.Form = Form;
        }
        if (!window.FormJS) {
            window.FormJS = Form;
        }
    },
    "./src/modules/checkDirtyField.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports._checkDirtyField = _checkDirtyField;
        var _helper = __webpack_require__("./src/modules/helper.js");
        function _checkDirtyField(fields, cssClass) {
            var fields = (0, _helper._isNodeList)(fields) ? Array.from(fields) : [ fields ], cssClasses = cssClass || defaultFieldOptions.cssClasses.dirty;
            fields.forEach(function(field) {
                if (field.type !== "checkbox" && field.type !== "radio") {
                    if (field.value) {
                        (0, _helper._addClass)(field, cssClasses);
                    } else {
                        (0, _helper._removeClass)(field, cssClasses);
                    }
                }
            });
        }
    },
    "./src/modules/destroy.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.destroy = destroy;
        function destroy() {
            var self = this, formEl = self.formEl, validationListenerNames = self.options.fieldOptions.validateOnEvents, charCountElements = formEl.querySelectorAll("[data-char-count]");
            validationListenerNames.split(" ").forEach(function(eventName) {
                var useCapturing = eventName === "blur" ? true : false;
                formEl.removeEventListener(eventName, self.listenerCallbacks.validation, useCapturing);
            });
            if (self.options.fieldOptions.preventPasteFields) {
                formEl.removeEventListener("paste", self.listenerCallbacks.pastePrevent, false);
            }
            if (self.options.fieldOptions.strictHtmlValidation) {
                formEl.removeEventListener("keypress", self.listenerCallbacks.keypressMaxlength, false);
            }
            if (charCountElements.length > 0) {
                Array.from(charCountElements).forEach(function(field) {
                    field.removeEventListener("input", self.listenerCallbacks.charCount, false);
                });
            }
            if (self.options.formOptions.handleSubmit) {
                formEl.removeEventListener("submit", self.listenerCallbacks.submit);
            }
        }
    },
    "./src/modules/getFormJSON.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.getFormJSON = getFormJSON;
        function getFormJSON() {
            var formData = {}, formEl = this.formEl, formFieldsEl = formEl.querySelectorAll("input, select, textarea"), excludeSelectors = ':not([type="reset"]):not([type="submit"]):not([type="button"]):not([type="file"]):not([data-exclude-json])', filteredFields = Array.from(formFieldsEl).filter(function(elem) {
                return elem.matches(excludeSelectors);
            });
            filteredFields.forEach(function(fieldEl) {
                var isCheckbox = fieldEl.type === "checkbox", isRadio = fieldEl.type === "radio", isSelect = fieldEl.matches("select"), name = fieldEl.name, value = isCheckbox || isSelect ? [] : fieldEl.value;
                if (isCheckbox || isRadio) {
                    var checkedFieldsEl = Array.from(formEl.querySelectorAll('[name="' + name + '"]:checked'));
                    if (isRadio) {
                        value = checkedFieldsEl.length === 0 ? null : checkedFieldsEl[0].value;
                    } else {
                        checkedFieldsEl.forEach(function(fieldEl) {
                            value.push(fieldEl.value);
                        });
                    }
                } else if (isSelect) {
                    var optionsList = Array.from(fieldEl.options).filter(function(option) {
                        return option.selected;
                    });
                    optionsList.forEach(function(fieldEl) {
                        value.push(fieldEl.value);
                    });
                }
                formData[name] = value;
            });
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
        }, _isDOMNode = exports._isDOMNode = function _isDOMNode(node) {
            return Element.prototype.isPrototypeOf(node);
        }, _isNodeList = exports._isNodeList = function _isNodeList(nodeList) {
            return NodeList.prototype.isPrototypeOf(nodeList);
        }, _isPlainObject = exports._isPlainObject = function _isPlainObject(object) {
            return Object.prototype.toString.call(object) === "[object Object]";
        }, _checkFormEl = exports._checkFormEl = function _checkFormEl(formEl) {
            var isString = typeof formEl === "undefined" ? "undefined" : _typeof(formEl), isValidNodeSelector = isString === "string" && _isDOMNode(document.querySelector(formEl)), isFormSelector = isValidNodeSelector && document.querySelector(formEl).tagName.toLowerCase() === "form", obj = {
                result: _isDOMNode(formEl) || isFormSelector,
                element: isString === "string" ? document.querySelector(formEl) : formEl
            };
            return obj;
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
                    if (!out.hasOwnProperty(key) && !isObject || isArray) {
                        out[key] = obj[key];
                    } else {
                        if (isObject) {
                            out[key] = _mergeObjects(out[key], obj[key]);
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
        };
    },
    "./src/modules/init.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports._init = _init;
        var _initFieldsFirstLoad2 = __webpack_require__("./src/modules/initFieldsFirstLoad.js");
        function _init() {
            var self = this, formEl = self.formEl;
            if (!formEl || !formEl.matches('[novalidate]:not([data-formjs-init="false"])')) {
                return false;
            }
            var fieldOptions = self.options.fieldOptions;
            _initFieldsFirstLoad2._initFieldsFirstLoad.call(self, formEl, fieldOptions);
            fieldOptions.validateOnEvents.split(" ").forEach(function(eventName) {
                var useCapturing = eventName === "blur" ? true : false;
                formEl.addEventListener(eventName, self.listenerCallbacks.validation, useCapturing);
            });
            if (fieldOptions.strictHtmlValidation) {
                formEl.addEventListener("keypress", self.listenerCallbacks.keypressMaxlength, false);
            }
            if (fieldOptions.preventPasteFields && formEl.querySelectorAll(fieldOptions.preventPasteFields).length) {
                formEl.addEventListener("paste", self.listenerCallbacks.pastePrevent, false);
            }
            if (self.options.formOptions.handleSubmit) {
                formEl.addEventListener("submit", self.listenerCallbacks.submit);
            }
        }
    },
    "./src/modules/initFieldsFirstLoad.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports._initFieldsFirstLoad = undefined;
        var _helper = __webpack_require__("./src/modules/helper.js");
        var _checkDirtyField2 = __webpack_require__("./src/modules/checkDirtyField.js");
        var _initFieldsFirstLoad = exports._initFieldsFirstLoad = function _initFieldsFirstLoad(formEl, fieldOptions) {
            var self = this, formFields = formEl.querySelectorAll(_helper._fieldsStringSelector);
            Array.from(formFields).forEach(function(fieldEl) {
                var isCheckboxOrRadio = fieldEl.type === "checkbox" || fieldEl.type === "radio", fieldChecked = self.formEl.querySelector('[name="' + fieldEl.name + '"]:checked');
                if (!isCheckboxOrRadio) {
                    if (fieldOptions.checkDirtyField) {
                        (0, _checkDirtyField2._checkDirtyField)(fieldEl, fieldOptions.cssClasses.dirty);
                    }
                    if (fieldEl.matches("[data-char-count]")) {
                        if (fieldEl.matches("[maxlength]")) {
                            var maxlength = fieldEl.getAttribute("maxlength");
                            fieldEl.closest("[data-formjs-question]").querySelector("[data-char-maxlength]").textContent = maxlength;
                        }
                        self.listenerCallbacks.charCount.call(fieldEl);
                        fieldEl.addEventListener("input", self.listenerCallbacks.charCount, false);
                    }
                    if (fieldEl.type === "file" && fieldOptions.maxFileSize > 0) {
                        if (formEl.querySelector("[data-max-file-size]") !== null) {
                            formEl.querySelector("[data-max-file-size]").textContent = fieldOptions.maxFileSize;
                        }
                    }
                }
                if (!isCheckboxOrRadio && fieldEl.value || isCheckboxOrRadio && fieldChecked !== null) {
                    if (isCheckboxOrRadio) {
                        fieldEl = fieldChecked;
                    }
                    self.isValidField(fieldEl, fieldOptions);
                }
            });
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
            var self = this, fieldType = fieldEl.matches("[data-subtype]") ? (0, _helper._toCamelCase)(fieldEl.getAttribute("data-subtype")) : fieldEl.type, fieldValue = fieldEl.value, fieldAttributes = Array.from(fieldEl.attributes).sort(function(a, b) {
                return a.name < b.name;
            });
            var attrValidations = [], attrValidationsResult = true;
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
                var extraVal = _validationRules._validationRulesAttributes[item.attrName](item);
                if (!extraVal) {
                    attrValidationsResult = false;
                }
            });
            attrValidationsResult = attrValidations.length > 0 ? attrValidationsResult : fieldValue.trim().length > 0;
            return typeof self.validationRules[fieldType] === "function" ? self.validationRules[fieldType](fieldValue) && attrValidationsResult : attrValidationsResult;
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
        var _checkDirtyField2 = __webpack_require__("./src/modules/checkDirtyField.js");
        function isValidField(fieldElem) {
            var fieldOptionsObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            if (!fieldElem) {
                return false;
            }
            var self = this, fieldEl = typeof fieldElem === "string" ? self.formEl.querySelector(fieldElem) : fieldElem;
            var options = (0, _helper._mergeObjects)({}, fieldOptionsObj, self.options.fieldOptions), isValidValue = fieldEl.value.trim().length > 0, isRequired = fieldEl.required, isRequiredFrom = fieldEl.matches("[data-required-from]"), reqMoreEl = self.formEl.querySelector(fieldEl.getAttribute("data-required-from")), isValidateIfFilled = fieldEl.matches("[data-validate-if-filled]"), isValid = isValidValue, containerEl = fieldEl.closest("[data-formjs-question]");
            if (!isRequired && !isValidateIfFilled && !isRequiredFrom || isValidateIfFilled && !isValidValue) {
                isValid = true;
            } else {
                isValid = _isValid2._isValid.call(self, fieldEl, options);
            }
            if (options.checkDirtyField) {
                (0, _checkDirtyField2._checkDirtyField)(fieldEl, options.cssClasses.dirty);
            }
            if (containerEl !== null) {
                if (options.skipUIfeedback) {
                    var cssClasses = options.cssClasses.valid + " " + options.cssClasses.error;
                    (0, _helper._removeClass)(containerEl, cssClasses);
                } else {
                    if (isValid) {
                        if (!isRequiredFrom || isRequiredFrom && reqMoreEl.checked) {
                            (0, _helper._removeClass)(containerEl, options.cssClasses.error);
                            (0, _helper._addClass)(containerEl, options.cssClasses.valid);
                        }
                    } else {
                        (0, _helper._addClass)(containerEl, options.cssClasses.error);
                        (0, _helper._removeClass)(containerEl, options.cssClasses.valid);
                    }
                }
            }
            return isValid;
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
            if (formEl === null || !formEl.matches("[novalidate]")) {
                return false;
            }
            var fieldOptions = (0, _helper._mergeObjects)({}, options.fieldOptions || {}, self.options.fieldOptions), obj = {
                fields: [],
                result: true
            }, fieldName = "", fieldType = "";
            if (typeof fieldOptions.focusOnRelated === "undefined") {
                fieldOptions.focusOnRelated = false;
            }
            Array.from(formEl.querySelectorAll(_helper._fieldsStringSelector)).forEach(function(fieldEl) {
                var name = fieldEl.name, type = fieldEl.type, fieldData = {
                    field: fieldEl,
                    result: true
                };
                if (name === fieldName && type === fieldType) {
                    return true;
                }
                if (!fieldEl.matches("[data-required-from]")) {
                    fieldName = name;
                    fieldType = type;
                }
                var fieldResult = self.isValidField(fieldEl, fieldOptions);
                fieldData.result = fieldResult;
                if (!fieldResult) {
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
        exports._validationCallback = exports._submitCallback = exports._pastePreventCallback = exports._keypressMaxlengthCallback = exports._charCountCallback = undefined;
        var _helper = __webpack_require__("./src/modules/helper.js");
        var _charCountCallback = exports._charCountCallback = function _charCountCallback() {
            var field = this, usedChars = field.value.length;
            field.closest("[data-formjs-question]").querySelector("[data-char-length]").textContent = usedChars;
        }, _keypressMaxlengthCallback = exports._keypressMaxlengthCallback = function _keypressMaxlengthCallback(event) {
            var fieldEl = event.target;
            if (fieldEl.matches("[maxlength]")) {
                var maxLength = fieldEl.maxLength * 1, keyPressed = event.which || event.keyCode, allowedKeys = [ 8, 37, 38, 39, 46 ];
                if (fieldEl.value.length >= maxLength && allowedKeys.indexOf(keyPressed) === -1) {
                    return false;
                }
            }
        }, _pastePreventCallback = exports._pastePreventCallback = function _pastePreventCallback(event) {
            var fieldEl = event.target;
            var fieldOptions = this.options.fieldOptions;
            if (fieldEl.matches(fieldOptions.preventPasteFields)) {
                event.preventDefault();
                if (typeof fieldOptions.onPastePrevented === "function") {
                    fieldOptions.onPastePrevented(fieldEl);
                }
            }
        }, _submitCallback = exports._submitCallback = function _submitCallback(event) {
            var self = this;
            self.submit(self.options, event);
        }, _validationCallback = exports._validationCallback = function _validationCallback(event) {
            var self = this, eventName = event.type, fieldEl = event.target;
            var fieldOptions = self.options.fieldOptions;
            if (fieldEl.matches(_helper._fieldsStringSelector)) {
                var isFieldForChangeEvent = fieldEl.matches('select, [type="radio"], [type="checkbox"], [type="file"]');
                if (isFieldForChangeEvent && eventName === "change" || !isFieldForChangeEvent && eventName === "input" || eventName !== "change" && eventName !== "input") {
                    var validationResult = self.isValidField(fieldEl, fieldOptions);
                    if (typeof fieldOptions.onValidation === "function") {
                        var callbackData = [ {
                            field: fieldEl,
                            result: validationResult
                        } ];
                        fieldOptions.onValidation(callbackData);
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
        var options = exports.options = {
            fieldOptions: {
                checkDirtyField: false,
                cssClasses: {
                    dirty: "dirty-field",
                    error: "has-error",
                    valid: "is-valid"
                },
                focusOnRelated: true,
                maxFileSize: 10,
                onPastePrevented: null,
                onValidation: null,
                preventPasteFields: '[type="password"], [data-equal-to]',
                skipUIfeedback: false,
                strictHtmlValidation: true,
                validateOnEvents: "input change"
            },
            formOptions: {
                ajaxSubmit: true,
                beforeSend: null,
                handleFileUpload: true,
                handleSubmit: true,
                onSubmitComplete: null,
                onSubmitError: null,
                onSubmitSuccess: null
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
        var _xhrCall2 = __webpack_require__("./src/modules/xhrCall.js");
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
            options.fieldOptions = (0, _helper._mergeObjects)({}, options.fieldOptions || {}, this.options.fieldOptions);
            options.formOptions = (0, _helper._mergeObjects)({}, options.formOptions || {}, this.options.formOptions);
            var formValidation = self.isValidForm(options), btnEl = formEl.querySelector('[type="submit"]'), isAjaxForm = options.formOptions.ajaxSubmit;
            if (typeof options.fieldOptions.onValidation === "function") {
                options.fieldOptions.onValidation(formValidation.fields);
            }
            var formDataJSON = isAjaxForm ? self.getFormJSON() : null;
            if (typeof options.formOptions.beforeSend === "function") {
                var beforeSendData = {
                    stopExecution: false
                };
                if (formDataJSON) {
                    beforeSendData.formData = formDataJSON;
                }
                var beforeSendFn = options.formOptions.beforeSend.call(self, beforeSendData);
                if ((0, _helper._isPlainObject)(beforeSendFn)) {
                    formDataJSON = beforeSendFn.formData || formDataJSON;
                    if (beforeSendFn.stopExecution) {
                        eventPreventDefault();
                        return false;
                    }
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
                _xhrCall2._xhrCall.call(self, formDataJSON, options);
            } else if (!event) {
                var submitEvent = new Event("submit", {
                    bubbles: true,
                    cancelable: true
                });
                formEl.dispatchEvent(submitEvent);
            }
        }
    },
    "./src/modules/validationRules.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var validationRules = exports.validationRules = {
            cap: function cap(string) {
                return /^[0-9]{5}$/.test(string);
            },
            date: function date(string) {
                var dateIT = /^(((0[1-9]|[12]\d|3[01])[ \/\-.](0[13578]|1[02])[ \/\-.]((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)[ \/\-.](0[13456789]|1[012])[ \/\-.]((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])[ \/\-.]02[ \/\-.]((19|[2-9]\d)\d{2}))|(29[ \/\-.]02[ \/\-.]((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g.test(string), dateISO8601ext = /^(((19|[2-9]\d)\d{2})[ \/\-.](0[13578]|1[02])[ \/\-.](0[1-9]|[12]\d|3[01]))|(((19|[2-9]\d)\d{2})[ \/\-.](0[13456789]|1[012])[ \/\-.](0[1-9]|[12]\d|30))|(((19|[2-9]\d)\d{2})[ \/\-.]02[ \/\-.](0[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))[ \/\-.]02[ \/\-.]29)$/g.test(string);
                return dateIT || dateISO8601ext;
            },
            email: function email(string) {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(string);
            },
            fiscalCode: function fiscalCode(string) {
                return /^(?:[B-DF-HJ-NP-TV-Z](?:[AEIOU]{2}|[AEIOU]X)|[AEIOU]{2}X|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[1256LMRS][\dLMNP-V])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[\dLMNP-V][1-9MNP-V]|[1-9MNP-V][0L]))[A-Z]$/i.test(string);
            },
            hexColor: function hexColor(string) {
                return /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(string);
            },
            landlineNumber: function landlineNumber(string) {
                return /^((00|\+)\d{2}[\-\. ]??)??(((0[\d]{1,4}))([\/\-\. ]){0,1}([\d, ]{5,10}))$/.test(string);
            },
            mobileNumber: function mobileNumber(string) {
                return /^((00|\+)??\d{2}[\-\. ]??)??3\d{2}[\-\. ]??(\d{6,7}|\d{2}[\-\. ]??\d{2}[\-\. ]??\d{3})$/.test(string);
            },
            number: function number(string) {
                return /[+-]?([0-9]*[.])?[0-9]+/.test(string);
            },
            numberFloat: function numberFloat(string) {
                return /[+-]?([0-9]*[.])[0-9]+/.test(string);
            },
            numberInteger: function numberInteger(string) {
                return /^\d+$/.test(string);
            },
            password: function password(string) {
                return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(string);
            },
            url: function url(string) {
                return /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(string);
            },
            username: function username(string) {
                return /^(?=\w)(?=[\-\.\@]?)[\w\-\.\@]{3,24}$/.test(string);
            },
            vatNumber: function vatNumber(string) {
                return /^(IT){0,1}[0-9]{11}$/i.test(string);
            }
        };
        var _validationRulesAttributes = exports._validationRulesAttributes = {
            checkbox: function checkbox(data) {
                var isValid = data.fieldEl.checked, formEl = data.fieldEl.closest("form"), dataChecksEl = formEl.querySelector('[name="' + data.fieldEl.name + '"][data-checks]');
                if (dataChecksEl !== null) {
                    isValid = this.checks({
                        attrValue: dataChecksEl.getAttribute("data-checks"),
                        fieldEl: dataChecksEl
                    });
                }
                return isValid;
            },
            checks: function checks(data) {
                try {
                    var attrValue = JSON.parse(data.attrValue), fieldEl = data.fieldEl, formEl = fieldEl.closest("form"), checkedElLength = formEl.querySelectorAll('[name="' + fieldEl.name + '"]:checked').length;
                    return checkedElLength >= attrValue[0] && checkedElLength <= attrValue[1];
                } catch (e) {
                    throw new Error('"data-checks" attribute is not a valid array!');
                }
            },
            equalTo: function equalTo(data) {
                var fieldEl = data.fieldEl, formEl = fieldEl.closest("form"), checkFromEl = formEl.querySelector('[name="' + fieldEl.getAttribute("data-equal-to") + '"]');
                return fieldEl.value === checkFromEl.value;
            },
            exactLength: function exactLength(data) {
                return data.fieldEl.value.length === data.attrValue * 1;
            },
            file: function file(data) {
                var isValid = true, fieldEl = data.fieldEl, MIMEtype = fieldEl.accept ? new RegExp(fieldEl.accept.replace("*", "[^\\/,]+")) : null, filesList = Array.from(fieldEl.files);
                filesList.forEach(function(file) {
                    var exceedMaxFileSize = data.fieldOptions.maxFileSize > 0 && file.size / 1024 / 1024 > data.fieldOptions.maxFileSize, isAcceptedFileType = MIMEtype !== null ? MIMEtype.test(file.type) : true;
                    if (exceedMaxFileSize || !isAcceptedFileType) {
                        isValid = false;
                    }
                });
                return isValid;
            },
            length: function length(data) {
                try {
                    var valueL = data.fieldEl.value.length, attrValue = JSON.parse(data.attrValue);
                    return valueL >= attrValue[0] && valueL <= attrValue[1];
                } catch (e) {
                    throw new Error('"data-length" attribute is not a valid array!');
                }
            },
            max: function max(data) {
                var value = data.fieldEl.value * 1, maxVal = data.attrValue * 1;
                return value <= maxVal;
            },
            maxlength: function maxlength(data) {
                return data.fieldEl.value.length <= data.attrValue * 1;
            },
            min: function min(data) {
                var value = data.fieldEl.value * 1, minVal = data.attrValue * 1;
                return value >= minVal;
            },
            minlength: function minlength(data) {
                return data.fieldEl.value.length >= data.attrValue * 1;
            },
            pattern: function pattern(data) {
                var fieldEl = data.fieldEl, fieldPattern = fieldEl.pattern, fieldRegex = new RegExp(fieldPattern);
                return fieldRegex.test(fieldEl.value);
            },
            radio: function radio(data) {
                var fieldEl = data.fieldEl, formEl = fieldEl.closest("form"), fieldChecked = formEl.querySelector('[name="' + fieldEl.name + '"]:checked'), requireMoreEl = formEl.querySelector('[name="' + fieldEl.name + '"][data-require-more]'), isValid = fieldChecked !== null && fieldChecked.value.trim().length > 0;
                if (requireMoreEl !== null) {
                    isValid = this.requireMore({
                        fieldEl: requireMoreEl,
                        fieldOptions: data.fieldOptions
                    });
                }
                return isValid;
            },
            requiredFrom: function requiredFrom(data) {
                var fieldEl = data.fieldEl, formEl = fieldEl.closest("form"), isValidValue = fieldEl.value.trim().length > 0, reqMoreEl = formEl.querySelector(fieldEl.getAttribute("data-required-from")), checkedEl = formEl.querySelector('[name="' + reqMoreEl.name + '"]:checked');
                if (isValidValue) {
                    reqMoreEl.checked = true;
                    if (reqMoreEl.required) {
                        fieldEl.required = true;
                    }
                }
                if (!reqMoreEl.checked) {
                    return true;
                }
                return reqMoreEl.required && reqMoreEl.checked ? isValidValue : reqMoreEl.required ? checkedEl !== null : true;
            },
            requireMore: function requireMore(data) {
                var requireMoreEl = data.fieldEl, formEl = requireMoreEl.closest("form"), requiredFromEl = formEl.querySelector('[data-required-from="#' + requireMoreEl.id + '"]'), fieldChecked = formEl.querySelector('[name="' + requireMoreEl.name + '"]:checked'), validReqFrom = true;
                if (requiredFromEl !== null) {
                    requiredFromEl.required = false;
                    if (requireMoreEl.checked) {
                        requiredFromEl.required = true;
                        if (data.fieldOptions.focusOnRelated) {
                            requiredFromEl.focus();
                        } else {
                            if (requireMoreEl.required && requiredFromEl.value.trim().length === 0) {
                                validReqFrom = false;
                            }
                        }
                    } else {
                        requiredFromEl.value = "";
                    }
                }
                return fieldChecked && fieldChecked.value.trim().length > 0 && validReqFrom;
            }
        };
    },
    "./src/modules/xhrCall.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports._xhrCall = _xhrCall;
        var _helper = __webpack_require__("./src/modules/helper.js");
        function _xhrCall(formDataJSON, options) {
            var self = this, formEl = self.formEl, btnEl = formEl.querySelector('[type="submit"]'), timeoutTimer, xhrOptions = {
                async: true,
                cache: false,
                contentType: formEl.getAttribute("enctype") || "application/x-www-form-urlencoded; charset=UTF-8",
                crossDomain: false,
                data: formDataJSON,
                headers: {},
                method: formEl.getAttribute("method") ? formEl.getAttribute("method").toUpperCase() : "POST",
                timeout: 0,
                url: formEl.getAttribute("action") || location.href
            };
            if (xhrOptions.contentType === "multipart/form-data" && options.formOptions.handleFileUpload) {
                var formDataMultipart = new FormData();
                for (var key in xhrOptions.data) {
                    formDataMultipart.append(key, xhrOptions.data[key]);
                }
                Array.from(formEl.querySelectorAll('[type="file"]')).forEach(function(field) {
                    Array.from(field.files).forEach(function(file, idx) {
                        var name = field.name + "[" + idx + "]";
                        formDataMultipart.append(name, file, file.name);
                    });
                });
                xhrOptions.data = formDataMultipart;
            }
            if (formEl.matches("[data-ajax-settings]")) {
                try {
                    var ajaxSettings = JSON.parse(formEl.getAttribute("data-ajax-settings"));
                    xhrOptions = (0, _helper._mergeObjects)({}, ajaxSettings, xhrOptions);
                } catch (error) {
                    var formName = formEl.getAttribute("name") && 'form "' + formEl.getAttribute("name") + '"' || "the form";
                    throw new Error("data-ajax-settings specified for " + formName + " is not a valid JSON object!");
                }
            }
            var XHR = new XMLHttpRequest(), parseResponse = function parseResponse(xhr) {
                var data = xhr.responseText, getJSON = function getJSON() {
                    try {
                        var obj = JSON.parse(data);
                        return obj;
                    } catch (e) {
                        return false;
                    }
                }, getXML_HTML = function getXML_HTML() {
                    try {
                        var isXML = xhr.responseXML !== null;
                        var obj = isXML ? new DOMParser().parseFromString(data, "text/xml") : data;
                        return obj;
                    } catch (e) {
                        return false;
                    }
                };
                return getJSON() || getXML_HTML() || data;
            }, loadendFn = function loadendFn(e) {
                var xhr = e.target, responseData = parseResponse(xhr);
                if (timeoutTimer) {
                    window.clearTimeout(timeoutTimer);
                }
                btnEl.disabled = false;
                if (typeof options.formOptions.onSubmitComplete === "function") {
                    var readyStateOK = xhr.readyState === 4, statusOK = xhr.status === 200, ajaxData = {
                        dataOrXHR: readyStateOK && statusOK ? responseData : xhr,
                        status: readyStateOK && statusOK ? "success" : "error",
                        XHRorResponse: readyStateOK && statusOK ? xhr : responseData
                    };
                    options.formOptions.onSubmitComplete.call(self, ajaxData);
                }
            }, loadFn = function loadFn(e) {
                var xhr = e.target;
                if (xhr.status === 200) {
                    var responseData = parseResponse(xhr);
                    if (typeof options.formOptions.onSubmitSuccess === "function") {
                        var ajaxData = {
                            data: responseData,
                            status: "success",
                            response: xhr
                        };
                        options.formOptions.onSubmitSuccess.call(self, ajaxData);
                    }
                } else {
                    errorFn(e);
                }
            }, errorFn = function errorFn(e) {
                var xhr = e.target;
                if (typeof options.formOptions.onSubmitError === "function") {
                    var ajaxData = {
                        errorThrown: xhr.statusText,
                        status: "error",
                        response: xhr
                    };
                    options.formOptions.onSubmitError.call(self, ajaxData);
                }
            };
            XHR.addEventListener("loadend", loadendFn, false);
            XHR.addEventListener("load", loadFn, false);
            XHR.addEventListener("error", errorFn, false);
            if (xhrOptions.method === "GET") {
                xhrOptions.url += (/\?/.test(xhrOptions.url) ? "&" : "?") + (0, _helper._serialize)(xhrOptions.data);
                if (xhrOptions.cache === false) {
                    xhrOptions.url += (/\&/.test(xhrOptions.url) ? "&" : "") + "_=" + new Date().getTime();
                }
            }
            XHR.open(xhrOptions.method, xhrOptions.url, xhrOptions.async);
            if (xhrOptions.xhrFields) {
                for (var i in xhrOptions.xhrFields) {
                    XHR[i] = xhrOptions.xhrFields[i];
                }
            }
            if (xhrOptions.mimeType && XHR.overrideMimeType) {
                XHR.overrideMimeType(xhrOptions.mimeType);
            }
            if (xhrOptions.data && xhrOptions.contentType !== "multipart/form-data") {
                XHR.setRequestHeader("Content-Type", xhrOptions.contentType);
            }
            if (!xhrOptions.crossDomain && !xhrOptions.headers["X-Requested-With"]) {
                xhrOptions.headers["X-Requested-With"] = "XMLHttpRequest";
            }
            for (var h in xhrOptions.headers) {
                XHR.setRequestHeader(h, xhrOptions.headers[h]);
            }
            XHR.send(xhrOptions.method === "GET" ? null : xhrOptions.data);
            if (xhrOptions.async && xhrOptions.timeout > 0) {
                timeoutTimer = window.setTimeout(function() {
                    XHR.abort();
                }, xhrOptions.timeout);
            }
        }
    }
});