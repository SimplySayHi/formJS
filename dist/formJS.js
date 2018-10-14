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
 /**! formJS v2.0.0 | Valerio Di Punzio (@SimplySayHi) | https://valeriodipunzio.com/plugins/formJS/ | https://github.com/SimplySayHi/formJS | MIT license */        var _helper = __webpack_require__("./src/modules/helper.js");
        var _options = __webpack_require__("./src/modules/options.js");
        var _validationRules = __webpack_require__("./src/modules/validationRules.js");
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
        var Form = function() {
            function Form(formEl) {
                var optionsObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                _classCallCheck(this, Form);
                if (!formEl) {
                    throw new Error('First argument "formEl" is missing!');
                }
                if ((0, _helper._isNodeList)(formEl)) {
                    throw new Error('First argument "formEl" must be a single node, not a nodeList!');
                }
                this.formEl = formEl;
                this.options = (0, _helper._mergeObjects)({}, optionsObj, Form.prototype.options);
                _init2._init.call(this);
            }
            _createClass(Form, [ {
                key: "getFormJSON",
                value: function getFormJSON() {
                    return _getFormJSON2.getFormJSON.call(this);
                }
            }, {
                key: "isValidField",
                value: function isValidField(fieldEl, fieldOptionsObj) {
                    return _isValidField2.isValidField.call(this, fieldEl, fieldOptionsObj);
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
        var _helper = __webpack_require__("./src/modules/helper.js");
        var _fieldsFirstLoad = __webpack_require__("./src/modules/init/fieldsFirstLoad.js");
        var _validationEvents = __webpack_require__("./src/modules/init/validationEvents.js");
        var _strictHtmlValidation = __webpack_require__("./src/modules/init/strictHtmlValidation.js");
        function _init() {
            var self = this, formEl = self.formEl;
            if (!formEl || !formEl.matches('[novalidate]:not([data-formjs-init="false"])')) {
                return false;
            }
            var fieldOptions = self.options.fieldOptions;
            _fieldsFirstLoad._initFieldsFirstLoad.call(self, formEl, fieldOptions);
            _validationEvents._initValidationEvents.call(self, formEl, fieldOptions);
            if (fieldOptions.strictHtmlValidation) {
                _strictHtmlValidation._initStrictHtmlValidation.call(self, formEl);
            }
            if (fieldOptions.preventPasteFields && formEl.querySelectorAll(fieldOptions.preventPasteFields).length) {
                formEl.addEventListener("paste", function(event) {
                    var fieldEl = event.target;
                    if (fieldEl.matches(fieldOptions.preventPasteFields)) {
                        event.preventDefault();
                        if (typeof fieldOptions.onPastePrevented === "function") {
                            fieldOptions.onPastePrevented(fieldEl);
                        }
                    }
                }, false);
            }
            formEl.addEventListener("submit", function(event) {
                self.submit(self.options, event);
            });
        }
    },
    "./src/modules/init/fieldsFirstLoad.js": function(module, exports, __webpack_require__) {
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
                var isCheckboxOrRadio = fieldEl.type === "checkbox" || fieldEl.type === "radio";
                if (!isCheckboxOrRadio) {
                    if (fieldOptions.checkDirtyField) {
                        (0, _checkDirtyField2._checkDirtyField)(fieldEl, fieldOptions.cssClasses.dirty);
                    }
                    if (fieldEl.matches("[data-char-count]")) {
                        var _printCharLength = function _printCharLength(field) {
                            var usedChars = field.value.length;
                            field.closest("[data-formjs-question]").querySelector("[data-char-length]").textContent = usedChars;
                        };
                        if (fieldEl.matches("[maxlength]")) {
                            var maxlength = fieldEl.getAttribute("maxlength");
                            fieldEl.closest("[data-formjs-question]").querySelector("[data-char-maxlength]").textContent = maxlength;
                        }
                        _printCharLength(fieldEl);
                        fieldEl.addEventListener("input", function() {
                            _printCharLength(this);
                        }, false);
                    }
                    if (fieldEl.type === "file" && fieldOptions.maxFileSize > 0) {
                        if (formEl.querySelector("[data-max-file-size]") !== null) {
                            formEl.querySelector("[data-max-file-size]").textContent = fieldOptions.maxFileSize;
                        }
                    }
                }
                if (!isCheckboxOrRadio && fieldEl.value || isCheckboxOrRadio && fieldEl.closest("[data-formjs-question]").querySelectorAll(":checked").length > 0) {
                    if (isCheckboxOrRadio) {
                        fieldEl = fieldEl.closest("[data-formjs-question]").querySelector(":checked");
                    }
                    self.isValidField(fieldEl, fieldOptions);
                }
            });
        };
    },
    "./src/modules/init/strictHtmlValidation.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports._initStrictHtmlValidation = _initStrictHtmlValidation;
        function _initStrictHtmlValidation(formEl) {
            formEl.addEventListener("keypress", function(event) {
                var fieldEl = event.target;
                if (fieldEl.matches("[maxlength]")) {
                    var maxLength = fieldEl.maxLength * 1, keyPressed = event.which || event.keyCode, allowedKeys = [ 8, 37, 38, 39, 46 ];
                    if (fieldEl.value.length >= maxLength && allowedKeys.indexOf(keyPressed) === -1) {
                        return false;
                    }
                }
            }, false);
        }
    },
    "./src/modules/init/validationEvents.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports._initValidationEvents = _initValidationEvents;
        var _helper = __webpack_require__("./src/modules/helper.js");
        function _initValidationEvents(formEl, fieldOptions) {
            var self = this;
            fieldOptions.validateOnEvents.split(" ").forEach(function(eventName) {
                var useCapturing = eventName === "blur" ? true : false;
                formEl.addEventListener(eventName, function(event) {
                    var fieldEl = event.target;
                    if (fieldEl.matches(_helper._fieldsStringSelector)) {
                        var isFieldForChangeEvent = fieldEl.matches('select, [type="radio"], [type="checkbox"]');
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
                }, useCapturing);
            });
        }
    },
    "./src/modules/isFieldChecked.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports._isFieldChecked = _isFieldChecked;
        function _isFieldChecked(fieldEl, fieldOptions) {
            var containerEl = fieldEl.closest("form") || fieldEl.closest("[data-formjs-question]"), sameInputName = '[name="' + fieldEl.name + '"]';
            if (fieldEl.type === "radio") {
                var fieldChecked = containerEl.querySelector(sameInputName + ":checked"), requireMoreEl = containerEl.querySelectorAll(sameInputName + "[data-require-more]"), validReqFrom = true;
                if (requireMoreEl.length > 0) {
                    Array.from(requireMoreEl).forEach(function(reqMoreEl) {
                        var reqFromEl = containerEl.querySelector('[data-required-from="#' + reqMoreEl.id + '"]');
                        if (reqFromEl !== null) {
                            reqFromEl.required = false;
                            if (reqMoreEl.checked) {
                                reqFromEl.required = true;
                                if (fieldOptions.focusOnRelated) {
                                    reqFromEl.focus();
                                } else {
                                    if (reqMoreEl.required && reqFromEl.value.trim().length === 0) {
                                        validReqFrom = false;
                                    }
                                }
                            } else {
                                reqFromEl.value = "";
                            }
                        }
                    });
                }
                return fieldEl.required ? fieldChecked !== null && fieldChecked.value.trim().length > 0 && validReqFrom : true;
            } else if (fieldEl.type === "checkbox") {
                if (fieldEl.closest("[data-max-check]") !== null) {
                    var maxCheck = fieldEl.closest("[data-max-check]").getAttribute("data-max-check"), checkboxCHKDEl = containerEl.querySelectorAll('[name="' + fieldEl.name + '"]:checked'), checkedLength = checkboxCHKDEl.length, obj = {
                        isChecked: checkedLength > 0 && checkedLength <= maxCheck,
                        exceedMaxCheck: checkedLength > maxCheck
                    };
                    return obj;
                } else {
                    return fieldEl.checked;
                }
            }
        }
    },
    "./src/modules/isValid.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports._isValid = _isValid;
        var _helper = __webpack_require__("./src/modules/helper.js");
        var _validationRules = __webpack_require__("./src/modules/validationRules.js");
        function _isValid(field) {
            var addedValidations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var self = this, fieldType = field.matches("[data-subtype]") ? (0, _helper._toCamelCase)(field.getAttribute("data-subtype")) : field.type, fieldValue = field.value;
            var extraValidationsResult = true;
            for (var val in addedValidations) {
                var extraVal = _validationRules._validationRulesStrictHtml[val](fieldValue, addedValidations[val]);
                if (!extraVal) {
                    extraValidationsResult = false;
                }
            }
            return (typeof self.validationRules[fieldType] === "function" ? self.validationRules[fieldType](fieldValue) : fieldValue.trim().length > 0) && extraValidationsResult;
        }
    },
    "./src/modules/isValidField.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.isValidField = isValidField;
        var _helper = __webpack_require__("./src/modules/helper.js");
        var _validationRules = __webpack_require__("./src/modules/validationRules.js");
        var _isValid2 = __webpack_require__("./src/modules/isValid.js");
        var _isFieldChecked2 = __webpack_require__("./src/modules/isFieldChecked.js");
        var _checkDirtyField2 = __webpack_require__("./src/modules/checkDirtyField.js");
        var _isValidFileField2 = __webpack_require__("./src/modules/isValidFileField.js");
        function isValidField(fieldElem) {
            var fieldOptionsObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            if (!fieldElem) {
                return false;
            }
            var self = this, fieldEl = typeof fieldElem === "string" ? self.formEl.querySelector(fieldElem) : fieldElem;
            var options = (0, _helper._mergeObjects)({}, fieldOptionsObj, self.options.fieldOptions), fieldType = fieldEl.type, isValidValue = fieldEl.value.trim().length > 0, exceedMaxChoice = false, isMultiChoice = fieldEl.closest("[data-max-check]") !== null, isRequired = fieldEl.required, isRequiredFrom = fieldEl.matches("[data-required-from]"), isValidateIfFilled = fieldEl.matches("[data-validate-if-filled]"), isValid = isValidValue, containerEl = fieldEl.closest("[data-formjs-question]");
            if (options.checkDirtyField) {
                (0, _checkDirtyField2._checkDirtyField)(fieldEl, options.cssClasses.dirty);
            }
            if (!isRequired && !isValidateIfFilled && !isRequiredFrom && fieldType !== "checkbox" && fieldType !== "radio" || isValidateIfFilled && !isValidValue) {
                isValid = true;
            } else {
                if (fieldEl.pattern !== "") {
                    var fieldPattern = fieldEl.pattern, fieldRegex = new RegExp(fieldPattern);
                    isValid = fieldRegex.test(fieldEl.value);
                } else if (fieldType === "checkbox") {
                    var checkField = (0, _isFieldChecked2._isFieldChecked)(fieldEl, options);
                    isValid = isMultiChoice ? checkField.isChecked : checkField;
                    exceedMaxChoice = isMultiChoice ? checkField.exceedMaxCheck : false;
                } else if (fieldType === "file" && options.maxFileSize > 0) {
                    isValid = (0, _isValidFileField2._isValidFileField)(fieldEl, options);
                } else if (fieldType === "radio") {
                    isValid = (0, _isFieldChecked2._isFieldChecked)(fieldEl, options);
                } else {
                    var extraValidations = {}, doExtraValidations = true;
                    if (fieldEl.matches("[data-equal-to]")) {
                        var checkFromEl = document.querySelector('[name="' + fieldEl.getAttribute("data-equal-to") + '"]');
                        isValid = fieldEl.value === checkFromEl.value;
                        doExtraValidations = false;
                    } else {
                        if (isRequiredFrom) {
                            var reqMoreEl = document.querySelector(fieldEl.getAttribute("data-required-from")), checkedEl = document.querySelector('[name="' + reqMoreEl.name + '"]:checked');
                            if (isValidValue) {
                                reqMoreEl.checked = true;
                                fieldEl.required = true;
                            }
                            if (!reqMoreEl.checked) {
                                doExtraValidations = false;
                            }
                            isValid = reqMoreEl.required && reqMoreEl.checked ? isValidValue : reqMoreEl.required ? checkedEl !== null : true;
                        }
                        Array.from(fieldEl.attributes).forEach(function(attr) {
                            var attrName = (0, _helper._toCamelCase)(attr.name.replace("data-", "")), attrValue = attr.value;
                            if (typeof _validationRules._validationRulesStrictHtml[attrName] === "function") {
                                extraValidations[attrName] = attrValue;
                            }
                        });
                    }
                    isValid = doExtraValidations ? _isValid2._isValid.call(self, fieldEl, extraValidations) : isValid;
                }
            }
            if (containerEl !== null) {
                if (options.skipUIfeedback) {
                    var cssClasses = options.cssClasses.valid + " " + options.cssClasses.error + " " + options.cssClasses.errorMultiChoice;
                    (0, _helper._removeClass)(containerEl, cssClasses);
                } else {
                    if (isValid) {
                        (0, _helper._removeClass)(containerEl, options.cssClasses.error);
                        (0, _helper._addClass)(containerEl, options.cssClasses.valid);
                        if (isMultiChoice && !exceedMaxChoice) {
                            (0, _helper._removeClass)(containerEl, options.cssClasses.errorMultiChoice);
                        }
                    } else {
                        (0, _helper._addClass)(containerEl, options.cssClasses.error);
                        (0, _helper._removeClass)(containerEl, options.cssClasses.valid);
                        if (isMultiChoice && exceedMaxChoice) {
                            (0, _helper._addClass)(containerEl, options.cssClasses.errorMultiChoice);
                        }
                    }
                }
            }
            return isValid;
        }
    },
    "./src/modules/isValidFileField.js": function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _isValidFileField = exports._isValidFileField = function _isValidFileField(fieldEl, fieldOptions) {
            var isValid = true, MIMEtype = fieldEl.accept ? new RegExp(fieldEl.accept.replace("*", "[^\\/,]+")) : null, filesList = Array.from(fieldEl.files);
            filesList.forEach(function(file) {
                var exceedMaxFileSize = fieldOptions.maxFileSize > 0 && file.size / 1024 / 1024 > fieldOptions.maxFileSize, isAcceptedFileType = MIMEtype !== null ? MIMEtype.test(file.type) : true;
                if (exceedMaxFileSize || !isAcceptedFileType) {
                    isValid = false;
                }
            });
            return isValid;
        };
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
                    errorMultiChoice: "has-error-switch",
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
                beforeSend: null,
                manageFileUpload: true,
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
            var self = this, formEl = self.formEl, isAjaxForm = formEl.matches("[data-ajax-submit]"), eventPreventDefault = function eventPreventDefault() {
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
            var formValidation = self.isValidForm(options), btnEl = formEl.querySelector('[type="submit"]');
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
                return /^(0?[1-9]|[12][0-9]|3[01])([ \/\-.])(0?[1-9]|1[012])\2([0-9][0-9][0-9][0-9])(([ -])([0-1]?[0-9]|2[0-3]):[0-5]?[0-9]:[0-5]?[0-9])?$/.test(string);
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
        var _validationRulesStrictHtml = exports._validationRulesStrictHtml = {
            exactLength: function exactLength(value, validationValue) {
                return value.length === validationValue * 1;
            },
            max: function max(value, validationValue) {
                var value = value * 1, maxVal = validationValue * 1;
                return value <= maxVal;
            },
            maxlength: function maxlength(value, validationValue) {
                return value.length <= validationValue * 1;
            },
            min: function min(value, validationValue) {
                var value = value * 1, minVal = validationValue * 1;
                return value >= minVal;
            },
            minlength: function minlength(value, validationValue) {
                return value.length >= validationValue * 1;
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
            if (xhrOptions.contentType === "multipart/form-data" && options.formOptions.manageFileUpload) {
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