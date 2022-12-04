/* formJS Lite v5.4.0 | Valerio Di Punzio (@SimplySayHi) | https://valeriodipunzio.com/plugins/formJS/ | https://github.com/SimplySayHi/formJS | MIT license */
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
            }, checkFormEl = function(form) {
                var isString = _typeof(form), isFormSelector = "string" === isString && isDOMNode(document.querySelector(form)) && "form" === document.querySelector(form).tagName.toLowerCase();
                return {
                    result: isDOMNode(form) || isFormSelector,
                    $el: "string" === isString ? document.querySelector(form) : form
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
            }, dispatchCustomEvent = function(elem, eventName, eventOptions) {
                eventOptions = mergeObjects({}, {
                    bubbles: !0
                }, eventOptions);
                var eventObj = new CustomEvent(eventName, eventOptions);
                elem.dispatchEvent(eventObj);
            }, finalizeFieldPromise = function(_ref) {
                var errors = _ref.errors;
                return _ref.result ? Promise.resolve() : Promise.reject(errors);
            }, finalizeFormPromise = function(_ref) {
                var fields = _ref.fields;
                return _ref.result ? Promise.resolve(fields) : Promise.reject(fields);
            }, formatMap = {
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
                if (dateFormat.includes(splitChar)) return dateFormat = dateFormat.replace(/[^YMD]/g, "-"), 
                dateString = dateString.split(splitChar), dateString = formatMap[dateFormat](dateString).join("");
            }, getUniqueFields = function($nodeList) {
                var currentFieldName = "", currentFieldType = "";
                return Array.from($nodeList).filter((function($field) {
                    var name = $field.name, type = $field.type;
                    return (name !== currentFieldName || type !== currentFieldType) && ($field.matches("[data-required-from]") || (currentFieldName = name, 
                    currentFieldType = type), !0);
                }));
            }, mergeValidateFieldDefault = function(obj) {
                return mergeObjects({}, {
                    result: !1,
                    $field: null
                }, obj);
            }, mergeValidateFormDefault = function(obj) {
                return mergeObjects({}, {
                    result: !0,
                    fields: []
                }, obj);
            }, toCamelCase = function(string) {
                return string.replace(/-([a-z])/gi, (function(all, letter) {
                    return letter.toUpperCase();
                }));
            }, customEvents_field = {
                validation: "fjs.field:validation"
            }, customEvents_form = {
                destroy: "fjs.form:destroy",
                init: "fjs.form:init",
                validation: "fjs.form:validation"
            }, validationRules = {
                date: function(string) {
                    return {
                        result: /^((((19|[2-9]\d)\d{2})[ /\-.](0[13578]|1[02])[ /\-.](0[1-9]|[12]\d|3[01]))|(((19|[2-9]\d)\d{2})[ /\-.](0[13456789]|1[012])[ /\-.](0[1-9]|[12]\d|30))|(((19|[2-9]\d)\d{2})[ /\-.]02[ /\-.](0[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))[ /\-.]02[ /\-.]29))$/g.test(string)
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
                checkbox: function(value, $field) {
                    var $dataChecks = $field.closest("form").querySelector('[name="' + $field.name + '"][data-checks]');
                    return $dataChecks ? function($field) {
                        var attrValue = JSON.parse($field.getAttribute("data-checks")), checkedLength = $field.closest("form").querySelectorAll('[name="' + $field.name + '"]:checked').length, isMinOk = checkedLength >= attrValue[0], isMaxOk = checkedLength <= attrValue[1], obj = {
                            result: isMinOk && isMaxOk
                        };
                        return obj.result || (obj.errors = {
                            checks: !0
                        }, isMinOk || (obj.errors.minChecks = !0), isMaxOk || (obj.errors.maxChecks = !0)), 
                        obj;
                    }($dataChecks) : {
                        result: $field.checked
                    };
                },
                equalTo: function(value, $field) {
                    return {
                        result: value === $field.closest("form").querySelector('[name="' + $field.getAttribute("data-equal-to") + '"]').value
                    };
                },
                exactLength: function(value, $field) {
                    var valueLength = value.length, exactLength = 1 * $field.getAttribute("data-exact-length"), obj = {
                        result: valueLength === exactLength
                    };
                    return obj.result || (obj.errors = {}, valueLength < exactLength ? obj.errors.minlength = !0 : obj.errors.maxlength = !0), 
                    obj;
                },
                file: function(value, $field, fieldOptions) {
                    var maxFileSize = 1 * ($field.getAttribute("data-max-file-size") || fieldOptions.maxFileSize), MIMEtype = $field.accept ? new RegExp($field.accept.replace("*", "[^\\/,]+")) : null, filesList = Array.from($field.files), obj = {
                        result: !0
                    };
                    return filesList.forEach((function(file) {
                        var exceedMaxFileSize = maxFileSize > 0 && file.size / 1024 / 1024 > maxFileSize, isAcceptedFileType = null === MIMEtype || MIMEtype.test(file.type);
                        !exceedMaxFileSize && isAcceptedFileType || (obj.result = !1, void 0 === obj.errors && (obj.errors = {}), 
                        exceedMaxFileSize && (obj.errors.maxFileSize = !0), isAcceptedFileType || (obj.errors.acceptedFileType = !0));
                    })), obj;
                },
                length: function(value, $field) {
                    var valueL = value.length, attrValue = JSON.parse($field.getAttribute("data-length")), isMinlengthOk = valueL >= attrValue[0], isMaxlengthOk = valueL <= attrValue[1], obj = {
                        result: isMinlengthOk && isMaxlengthOk
                    };
                    return obj.result || (obj.errors = {}, isMinlengthOk || (obj.errors.minlength = !0), 
                    isMaxlengthOk || (obj.errors.maxlength = !0)), obj;
                },
                max: function(value, $field) {
                    var maxVal = $field.max, dateFormat = $field.getAttribute("data-date-format");
                    return ("date" === $field.type || dateFormat) && (value = getDateAsNumber(value, dateFormat), 
                    maxVal = maxVal.split("-").join("")), {
                        result: (value *= 1) <= (maxVal *= 1)
                    };
                },
                maxlength: function(value, $field) {
                    return {
                        result: value.length <= 1 * $field.maxLength
                    };
                },
                min: function(value, $field) {
                    var minVal = $field.min, dateFormat = $field.getAttribute("data-date-format");
                    return ("date" === $field.type || dateFormat) && (value = getDateAsNumber(value, dateFormat), 
                    minVal = minVal.split("-").join("")), {
                        result: (value *= 1) >= (minVal *= 1)
                    };
                },
                minlength: function(value, $field) {
                    return {
                        result: value.length >= 1 * $field.minLength
                    };
                },
                pattern: function(value, $field) {
                    return {
                        result: new RegExp($field.pattern).test(value)
                    };
                },
                radio: function(value, $field) {
                    var $fieldChecked = $field.closest("form").querySelector('[name="' + $field.name + '"]:checked');
                    return {
                        result: null !== $fieldChecked && $fieldChecked.value.trim().length > 0
                    };
                }
            };
            function checkFieldValidity($field, fieldOptions, validationRules, validationErrors) {
                if (!isDOMNode($field)) {
                    var obj = mergeValidateFieldDefault({
                        $field: $field
                    });
                    return Promise.resolve(obj);
                }
                var attrName, customAttrEl, $form = $field.closest("form"), isValidValue = $field.value.trim().length > 0, dataFieldOptions = (attrName = "data-field-options", 
                (customAttrEl = $field.closest("[" + attrName + "]")) && JSON.parse(customAttrEl.getAttribute(attrName)) || {});
                if (fieldOptions = mergeObjects(fieldOptions, dataFieldOptions), "radio" === $field.type) {
                    var $checked = $field.checked ? $field : $form.querySelector('[name="' + $field.name + '"]:checked'), reqMoreIsChecked = $checked && $checked.matches("[data-require-more]"), $findReqMore = reqMoreIsChecked ? $checked : $form.querySelector('[data-require-more][name="' + $field.name + '"]'), $findReqFrom = $findReqMore ? $form.querySelector('[data-required-from="#' + $findReqMore.id + '"]') : null;
                    $checked && $findReqFrom && ($findReqFrom.required = $findReqMore.required && $findReqMore.checked, 
                    reqMoreIsChecked ? fieldOptions.focusOnRelated && $findReqFrom.focus() : $findReqFrom.value = "");
                }
                if ($field.matches("[data-required-from]") && isValidValue) {
                    var $reqMore = $form.querySelector($field.getAttribute("data-required-from"));
                    $reqMore.checked = !0, $field.required = $reqMore.required;
                }
                var needsValidation = $field.required || $field.matches("[data-validate-if-filled]") && isValidValue;
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
                        $field: $field,
                        fieldOptions: fieldOptions
                    }
                }).then((function(data) {
                    var dataObj = data.pop();
                    return new Promise((function(resolve) {
                        needsValidation || (dataObj.result = !0), resolve(needsValidation ? function($field, fieldOptions, validationRules, validationErrors) {
                            var fieldValue = $field.value, obj = mergeValidateFieldDefault({
                                result: fieldValue.trim().length > 0,
                                $field: $field
                            }), isRadioOrCheckbox = /^(radio|checkbox)$/.test($field.type), hasSelectedInput = $field.closest("form").querySelectorAll('[name="' + $field.name + '"]:checked').length > 0;
                            if (!isRadioOrCheckbox && !obj.result || isRadioOrCheckbox && !hasSelectedInput) return obj.result = !1, 
                            obj.errors = {
                                empty: !0
                            }, Promise.resolve(obj);
                            var validationMethods = Array.from($field.attributes).reduce((function(accList, attr) {
                                var attrName = toCamelCase(attr.name.replace("data-", "")), attrValue = toCamelCase(attr.value), isAttrValueWithFn = ("type" === attrName || "subtype" === attrName) && validationRules[attrValue], isAttrNameWithFn = validationRules[attrName];
                                return (isAttrValueWithFn || isAttrNameWithFn) && accList.push(isAttrValueWithFn ? attrValue : attrName), 
                                accList;
                            }), []);
                            return new Promise((function(resolve) {
                                resolve(validationMethods.reduce((function(accPromise, methodName) {
                                    return accPromise.then((function(accObj) {
                                        return new Promise((function(resolveVal) {
                                            resolveVal(validationRules[methodName](fieldValue, $field, fieldOptions));
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
                                    var errors = validationErrors[methodName] && validationErrors[methodName](fieldValue, $field) || {};
                                    return mergeObjects(accObj, errors);
                                }), data.errors)), data;
                            }));
                        }($field, fieldOptions, validationRules, validationErrors) : dataObj);
                    }));
                }));
            }
            var Form = exports("default", function() {
                function Form(form, optionsObj) {
                    _classCallCheck(this, Form);
                    var argsL = arguments.length, checkFormElem = checkFormEl(form);
                    if (0 === argsL || argsL > 0 && !form) throw new Error('First argument "form" is missing or falsy!');
                    if (isNodeList(form)) throw new Error('First argument "form" must be a single DOM node or a form CSS selector, not a NodeList!');
                    if (!checkFormElem.result) throw new Error('First argument "form" is not a DOM node nor a form CSS selector!');
                    var self = this;
                    self.$form = checkFormElem.$el, self.$form.formjs = self, self.options = mergeObjects({}, Form.prototype.options, optionsObj), 
                    self.options.fieldOptions.beforeValidation = self.options.fieldOptions.beforeValidation.map((function(cbFn) {
                        return cbFn.bind(self);
                    })), self.$form.noValidate = !0, dispatchCustomEvent(self.$form, customEvents_form.init);
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
                        delete this.$form.formjs, dispatchCustomEvent(this.$form, customEvents_form.destroy);
                    }
                }, {
                    key: "validateField",
                    value: function(field, fieldOptions) {
                        return checkFieldValidity("string" == typeof field ? this.$form.querySelector(field) : field, fieldOptions = mergeObjects({}, this.options.fieldOptions, fieldOptions), this.validationRules, this.validationErrors).then((function(obj) {
                            return dispatchCustomEvent(obj.$field, customEvents_field.validation, {
                                detail: obj
                            }), obj;
                        })).then(finalizeFieldPromise);
                    }
                }, {
                    key: "validateForm",
                    value: function(fieldOptions) {
                        var $form = this.$form;
                        return function($fields, fieldOptions, validationRules, validationErrors) {
                            var fieldToSkip = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null;
                            fieldOptions = mergeObjects({}, fieldOptions, {
                                focusOnRelated: !1
                            });
                            var $fieldsList = getUniqueFields($fields);
                            return Promise.all($fieldsList.map((function($field) {
                                if (fieldToSkip && $field === fieldToSkip) {
                                    var obj = mergeValidateFieldDefault({
                                        $field: $field,
                                        result: !0
                                    });
                                    return Promise.resolve(obj);
                                }
                                return checkFieldValidity($field, fieldOptions, validationRules, validationErrors);
                            }))).then((function(fields) {
                                var areAllFieldsValid = fields.every((function(_ref) {
                                    return _ref.result;
                                }));
                                return mergeValidateFormDefault({
                                    result: areAllFieldsValid,
                                    fields: fields
                                });
                            }));
                        }($form.querySelectorAll('input:not([type="reset"]):not([type="submit"]):not([type="button"]):not([type="hidden"]), select, textarea'), fieldOptions = mergeObjects({}, this.options.fieldOptions, fieldOptions), this.validationRules, this.validationErrors).then((function(data) {
                            return data.fields.forEach((function(obj) {
                                obj.isCheckingForm = !0, dispatchCustomEvent(obj.$field, customEvents_field.validation, {
                                    detail: obj
                                });
                            })), dispatchCustomEvent($form, customEvents_form.validation, {
                                detail: data
                            }), data;
                        })).then(finalizeFormPromise);
                    }
                } ]) && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
                Object.defineProperty(Constructor, "prototype", {
                    writable: !1
                }), Form;
            }());
            Form.prototype.options = {
                fieldOptions: {
                    beforeValidation: [],
                    focusOnRelated: !0,
                    maxFileSize: 10
                }
            }, Form.prototype.validationErrors = {}, Form.prototype.validationRules = validationRules, 
            Form.prototype.version = "5.4.0";
        }
    };
}));
