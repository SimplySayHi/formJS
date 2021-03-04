/* formJS Lite v4.4.0 | Valerio Di Punzio (@SimplySayHi) | https://valeriodipunzio.com/plugins/formJS/ | https://github.com/SimplySayHi/formJS | MIT license */
System.register([], (function(exports) {
    "use strict";
    return {
        execute: function() {
            function _typeof(obj) {
                return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                    return typeof obj;
                } : function(obj) {
                    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                })(obj);
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            var isNodeList = function(nodeList) {
                return NodeList.prototype.isPrototypeOf(nodeList);
            }, isDOMNode = function(node) {
                return Element.prototype.isPrototypeOf(node);
            }, checkFormEl = function(formEl) {
                var isString = _typeof(formEl), isFormSelector = "string" === isString && isDOMNode(document.querySelector(formEl)) && "form" === document.querySelector(formEl).tagName.toLowerCase();
                return {
                    result: isDOMNode(formEl) || isFormSelector,
                    element: "string" === isString ? document.querySelector(formEl) : formEl
                };
            }, isPlainObject = function(object) {
                return "[object Object]" === Object.prototype.toString.call(object);
            }, mergeObjects = function mergeObjects() {
                var out = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return Array.from(arguments).slice(1).filter((function(arg) {
                    return !!arg;
                })).forEach((function(arg) {
                    Object.keys(arg).forEach((function(key) {
                        Array.isArray(arg[key]) ? out[key] = (out[key] || []).concat(arg[key].slice(0)) : isPlainObject(arg[key]) ? out[key] = mergeObjects(out[key] || {}, arg[key]) : Array.isArray(out[key]) ? out[key].push(arg[key]) : out[key] = arg[key];
                    }));
                })), out;
            }, fieldsStringSelector = 'input:not([type="reset"]):not([type="submit"]):not([type="button"]):not([type="hidden"]), select, textarea', formatMap = {
                "YYYY-MM-DD": function(dateArray) {
                    return dateArray;
                },
                "MM-DD-YYYY": function(dateArray) {
                    return [ dateArray[2], dateArray[0], dateArray[1] ];
                },
                "DD-MM-YYYY": function(dateArray) {
                    return dateArray.reverse();
                }
            }, getDateAsNumber = function(dateString, dateFormat) {
                dateFormat = dateFormat || "YYYY-MM-DD";
                var separator, splitChar = (separator = dateString.match(/\D/)) && separator.length > 0 ? separator[0] : null;
                if (!(dateFormat.indexOf(splitChar) < 0)) return dateFormat = dateFormat.replace(/[^YMD]/g, "-"), 
                dateString = dateString.split(splitChar), dateString = formatMap[dateFormat](dateString).join("");
            }, getUniqueFields = function(nodeList) {
                var currentFieldName = "", currentFieldType = "";
                return Array.from(nodeList).filter((function(fieldEl) {
                    var name = fieldEl.name, type = fieldEl.type;
                    return (name !== currentFieldName || type !== currentFieldType) && (fieldEl.matches("[data-required-from]") || (currentFieldName = name, 
                    currentFieldType = type), !0);
                }));
            }, getValidateFieldDefault = function(obj) {
                return mergeObjects({}, {
                    result: !1,
                    fieldEl: null
                }, obj);
            }, getValidateFormDefault = function(obj) {
                return mergeObjects({}, {
                    result: !0,
                    fields: []
                }, obj);
            }, toCamelCase = function(string) {
                return string.replace(/-([a-z])/gi, (function(all, letter) {
                    return letter.toUpperCase();
                }));
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
                },
                checkbox: function(value, fieldEl) {
                    var dataChecksEl = fieldEl.closest("form").querySelector('[name="' + fieldEl.name + '"][data-checks]');
                    return dataChecksEl ? function(fieldEl) {
                        var attrValue = JSON.parse(fieldEl.getAttribute("data-checks")), checkedElLength = fieldEl.closest("form").querySelectorAll('[name="' + fieldEl.name + '"]:checked').length, isMinOk = checkedElLength >= attrValue[0], isMaxOk = checkedElLength <= attrValue[1], obj = {
                            result: isMinOk && isMaxOk
                        };
                        return obj.result || (obj.errors = {
                            checks: !0
                        }, isMinOk || (obj.errors.minChecks = !0), isMaxOk || (obj.errors.maxChecks = !0)), 
                        obj;
                    }(dataChecksEl) : {
                        result: fieldEl.checked
                    };
                },
                equalTo: function(value, fieldEl) {
                    return {
                        result: value === fieldEl.closest("form").querySelector('[name="' + fieldEl.getAttribute("data-equal-to") + '"]').value
                    };
                },
                exactLength: function(value, fieldEl) {
                    var valueLength = value.length, exactLength = 1 * fieldEl.getAttribute("data-exact-length"), obj = {
                        result: valueLength === exactLength
                    };
                    return obj.result || (obj.errors = {}, valueLength < exactLength ? obj.errors.minlength = !0 : obj.errors.maxlength = !0), 
                    obj;
                },
                file: function(value, fieldEl, fieldOptions) {
                    var maxFileSize = 1 * (fieldEl.getAttribute("data-max-file-size") || fieldOptions.maxFileSize), MIMEtype = fieldEl.accept ? new RegExp(fieldEl.accept.replace("*", "[^\\/,]+")) : null, filesList = Array.from(fieldEl.files), obj = {
                        result: !0
                    };
                    return filesList.forEach((function(file) {
                        var exceedMaxFileSize = maxFileSize > 0 && file.size / 1024 / 1024 > maxFileSize, isAcceptedFileType = null === MIMEtype || MIMEtype.test(file.type);
                        !exceedMaxFileSize && isAcceptedFileType || (obj.result = !1, void 0 === obj.errors && (obj.errors = {}), 
                        exceedMaxFileSize && (obj.errors.maxFileSize = !0), isAcceptedFileType || (obj.errors.acceptedFileType = !0));
                    })), obj;
                },
                length: function(value, fieldEl) {
                    var valueL = value.length, attrValue = JSON.parse(fieldEl.getAttribute("data-length")), isMinlengthOk = valueL >= attrValue[0], isMaxlengthOk = valueL <= attrValue[1], obj = {
                        result: isMinlengthOk && isMaxlengthOk
                    };
                    return obj.result || (obj.errors = {
                        stringLength: !0
                    }, isMinlengthOk || (obj.errors.minlength = !0), isMaxlengthOk || (obj.errors.maxlength = !0)), 
                    obj;
                },
                max: function(value, fieldEl) {
                    var maxVal = fieldEl.max, dateFormat = fieldEl.getAttribute("data-date-format");
                    return ("date" === fieldEl.type || dateFormat) && (value = getDateAsNumber(value, dateFormat), 
                    maxVal = maxVal.split("-").join("")), {
                        result: (value *= 1) <= (maxVal *= 1)
                    };
                },
                maxlength: function(value, fieldEl) {
                    return {
                        result: value.length <= 1 * fieldEl.maxLength
                    };
                },
                min: function(value, fieldEl) {
                    var minVal = fieldEl.min, dateFormat = fieldEl.getAttribute("data-date-format");
                    return ("date" === fieldEl.type || dateFormat) && (value = getDateAsNumber(value, dateFormat), 
                    minVal = minVal.split("-").join("")), {
                        result: (value *= 1) >= (minVal *= 1)
                    };
                },
                minlength: function(value, fieldEl) {
                    return {
                        result: value.length >= 1 * fieldEl.minLength
                    };
                },
                pattern: function(value, fieldEl) {
                    return {
                        result: new RegExp(fieldEl.pattern).test(value)
                    };
                },
                radio: function(value, fieldEl) {
                    var fieldChecked = fieldEl.closest("form").querySelector('[name="' + fieldEl.name + '"]:checked');
                    return {
                        result: null !== fieldChecked && fieldChecked.value.trim().length > 0
                    };
                }
            };
            function checkFieldValidity(fieldEl, fieldOptions, validationRules, validationErrors) {
                if (!isDOMNode(fieldEl)) {
                    var obj = getValidateFieldDefault({
                        fieldEl: fieldEl
                    });
                    return Promise.resolve(obj);
                }
                var formEl = fieldEl.closest("form"), isValidValue = fieldEl.value.trim().length > 0, dataFieldOptions = function(fieldEl, attrName) {
                    var customAttrEl = fieldEl.closest("[" + attrName + "]");
                    return customAttrEl && JSON.parse(customAttrEl.getAttribute(attrName)) || {};
                }(fieldEl, "data-field-options");
                if (fieldOptions = mergeObjects(fieldOptions, dataFieldOptions), "radio" === fieldEl.type) {
                    var checkedEl = fieldEl.checked ? fieldEl : formEl.querySelector('[name="' + fieldEl.name + '"]:checked'), reqMoreIsChecked = checkedEl && checkedEl.matches("[data-require-more]"), findReqMoreEl = reqMoreIsChecked ? checkedEl : formEl.querySelector('[data-require-more][name="' + fieldEl.name + '"]'), findReqFromEl = findReqMoreEl ? formEl.querySelector('[data-required-from="#' + findReqMoreEl.id + '"]') : null;
                    checkedEl && findReqFromEl && (findReqFromEl.required = findReqMoreEl.required && findReqMoreEl.checked, 
                    reqMoreIsChecked ? fieldOptions.focusOnRelated && findReqFromEl.focus() : findReqFromEl.value = "");
                }
                if (fieldEl.matches("[data-required-from]") && isValidValue) {
                    var reqMoreEl = formEl.querySelector(fieldEl.getAttribute("data-required-from"));
                    reqMoreEl.checked = !0, fieldEl.required = reqMoreEl.required;
                }
                var needsValidation = fieldEl.required || fieldEl.matches("[data-validate-if-filled]") && isValidValue;
                return function() {
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
                }({
                    functionsList: fieldOptions.beforeValidation,
                    data: {
                        fieldEl: fieldEl,
                        fieldOptions: fieldOptions
                    }
                }).then((function(data) {
                    var dataObj = data.pop();
                    return new Promise((function(resolve) {
                        needsValidation || (dataObj.result = !0), resolve(needsValidation ? function(fieldEl, fieldOptions, validationRules, validationErrors) {
                            var fieldValue = fieldEl.value, obj = getValidateFieldDefault({
                                result: fieldValue.trim().length > 0,
                                fieldEl: fieldEl
                            }), isRadioOrCheckbox = /^(radio|checkbox)$/.test(fieldEl.type), hasSelectedInput = fieldEl.closest("form").querySelectorAll('[name="' + fieldEl.name + '"]:checked').length > 0;
                            if (!isRadioOrCheckbox && !obj.result || isRadioOrCheckbox && !hasSelectedInput) return obj.result = !1, 
                            obj.errors = {
                                empty: !0
                            }, Promise.resolve(obj);
                            var validationMethods = Array.from(fieldEl.attributes).reduce((function(accList, attr) {
                                var attrName = toCamelCase(attr.name.replace("data-", "")), attrValue = toCamelCase(attr.value), isAttrValueWithFn = ("type" === attrName || "subtype" === attrName) && validationRules[attrValue], isAttrNameWithFn = validationRules[attrName];
                                return (isAttrValueWithFn || isAttrNameWithFn) && accList.push(isAttrValueWithFn ? attrValue : attrName), 
                                accList;
                            }), []);
                            return new Promise((function(resolve) {
                                resolve(validationMethods.reduce((function(accPromise, methodName) {
                                    return accPromise.then((function(accObj) {
                                        return new Promise((function(resolveVal) {
                                            resolveVal(validationRules[methodName](fieldValue, fieldEl, fieldOptions));
                                        })).then((function(valObj) {
                                            if (!valObj.result) {
                                                var errorObj = {};
                                                void 0 !== valObj.errors && void 0 !== valObj.errors[methodName] || (errorObj[methodName] = !0), 
                                                valObj.errors = mergeObjects({}, valObj.errors, errorObj);
                                            }
                                            return valObj = valObj.result ? {} : valObj, mergeObjects(accObj, valObj);
                                        }));
                                    }));
                                }), Promise.resolve(obj)));
                            })).then((function(data) {
                                return data.result || (data.errors = validationMethods.reduce((function(accObj, methodName) {
                                    var errors = validationErrors[methodName] && validationErrors[methodName](fieldValue, fieldEl) || {};
                                    return mergeObjects(accObj, errors);
                                }), data.errors), data.errors.rule = !0), data;
                            }));
                        }(fieldEl, fieldOptions, validationRules, validationErrors) : dataObj);
                    }));
                })).then((function(data) {
                    var element, containerEl = fieldOptions.questionContainer && data.fieldEl.closest(fieldOptions.questionContainer);
                    return containerEl && (element = containerEl, fieldOptions.cssClasses.pending.split(" ").forEach((function(className) {
                        element.classList.remove(className);
                    }))), data;
                }));
            }
            var Form = exports("default", function() {
                function Form(formEl, optionsObj) {
                    _classCallCheck(this, Form);
                    var argsL = arguments.length, checkFormElem = checkFormEl(formEl);
                    if (0 === argsL || argsL > 0 && !formEl) throw new Error('First argument "formEl" is missing or falsy!');
                    if (isNodeList(formEl)) throw new Error('First argument "formEl" must be a single DOM node or a form CSS selector, not a NodeList!');
                    if (!checkFormElem.result) throw new Error('First argument "formEl" is not a DOM node nor a form CSS selector!');
                    var self = this;
                    self.formEl = checkFormElem.element, self.formEl.formjs = self, self.options = mergeObjects({}, Form.prototype.options, optionsObj), 
                    self.options.fieldOptions.beforeValidation = self.options.fieldOptions.beforeValidation.map((function(cbFn) {
                        return cbFn.bind(self);
                    })), self.formEl.noValidate = !0;
                }
                var Constructor, protoProps, staticProps;
                return Constructor = Form, staticProps = [ {
                    key: "addValidationErrors",
                    value: function(errorsObj) {
                        Form.prototype.validationErrors = mergeObjects({}, Form.prototype.validationErrors, errorsObj);
                    }
                }, {
                    key: "addValidationRules",
                    value: function(rulesObj) {
                        Form.prototype.validationRules = mergeObjects({}, Form.prototype.validationRules, rulesObj);
                    }
                }, {
                    key: "setOptions",
                    value: function(optionsObj) {
                        Form.prototype.options = mergeObjects({}, Form.prototype.options, optionsObj);
                    }
                } ], (protoProps = [ {
                    key: "destroy",
                    value: function() {
                        delete this.formEl.formjs;
                    }
                }, {
                    key: "validateField",
                    value: function(fieldEl, fieldOptions) {
                        return checkFieldValidity(fieldEl = "string" == typeof fieldEl ? this.formEl.querySelector(fieldEl) : fieldEl, fieldOptions = mergeObjects({}, this.options.fieldOptions, fieldOptions), this.validationRules, this.validationErrors);
                    }
                }, {
                    key: "validateForm",
                    value: function(fieldOptions) {
                        return fieldOptions = mergeObjects({}, this.options.fieldOptions, fieldOptions), 
                        function(formEl, fieldOptions, validationRules, validationErrors) {
                            var fieldToSkip = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null;
                            fieldOptions = mergeObjects({}, fieldOptions, {
                                focusOnRelated: !1
                            });
                            var fieldsList = getUniqueFields(formEl.querySelectorAll(fieldsStringSelector));
                            return Promise.all(fieldsList.map((function(fieldEl) {
                                if (fieldToSkip && fieldEl === fieldToSkip) {
                                    var obj = getValidateFieldDefault({
                                        fieldEl: fieldEl,
                                        result: !0
                                    });
                                    return Promise.resolve(obj);
                                }
                                return checkFieldValidity(fieldEl, fieldOptions, validationRules, validationErrors);
                            }))).then((function(fields) {
                                var areAllFieldsValid = 0 === fields.filter((function(fieldObj) {
                                    return !fieldObj.result;
                                })).length;
                                return getValidateFormDefault({
                                    result: areAllFieldsValid,
                                    fields: fields
                                });
                            }));
                        }(this.formEl, fieldOptions, this.validationRules, this.validationErrors);
                    }
                } ]) && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
                Form;
            }());
            Form.prototype.options = {
                fieldOptions: {
                    beforeValidation: [],
                    focusOnRelated: !0,
                    maxFileSize: 10
                }
            }, Form.prototype.validationErrors = {}, Form.prototype.validationRules = validationRules, 
            Form.prototype.version = "4.4.0";
        }
    };
}));
