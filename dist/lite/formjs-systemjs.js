/* formJS Lite v4.1.0 | Valerio Di Punzio (@SimplySayHi) | https://valeriodipunzio.com/plugins/formJS/ | https://github.com/SimplySayHi/formJS | MIT license */
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
            }, mergeObjects = function mergeObjects() {
                for (var out = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i = 1; i < arguments.length; i++) {
                    var obj = arguments[i];
                    if (obj) for (var key in obj) {
                        var isArray = "[object Array]" === Object.prototype.toString.call(obj[key]), isObject = "[object Object]" === Object.prototype.toString.call(obj[key]);
                        obj.hasOwnProperty(key) && (isArray ? (void 0 === out[key] && (out[key] = []), out[key] = out[key].concat(obj[key].slice(0))) : isObject ? out[key] = mergeObjects(out[key], obj[key]) : Array.isArray(out[key]) ? out[key].push(obj[key]) : out[key] = obj[key]);
                    }
                }
                return out;
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
                    var date = /^((((19|[2-9]\d)\d{2})[ \/\-.](0[13578]|1[02])[ \/\-.](0[1-9]|[12]\d|3[01]))|(((19|[2-9]\d)\d{2})[ \/\-.](0[13456789]|1[012])[ \/\-.](0[1-9]|[12]\d|30))|(((19|[2-9]\d)\d{2})[ \/\-.]02[ \/\-.](0[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))[ \/\-.]02[ \/\-.]29))$/g.test(string);
                    return {
                        result: date
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
            var validationRulesAttributes = {
                checkbox: function(fieldEl) {
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
                equalTo: function(fieldEl) {
                    var checkFromEl = fieldEl.closest("form").querySelector('[name="' + fieldEl.getAttribute("data-equal-to") + '"]'), obj = {
                        result: fieldEl.value === checkFromEl.value
                    };
                    return obj.result || (obj.errors = {
                        equalTo: !0
                    }), obj;
                },
                exactLength: function(fieldEl) {
                    var valueLength = fieldEl.value.length, exactLength = 1 * fieldEl.getAttribute("data-exact-length"), obj = {
                        result: valueLength === exactLength
                    };
                    return obj.result || (obj.errors = {
                        exactLength: !0
                    }, valueLength < exactLength ? obj.errors.minlength = !0 : obj.errors.maxlength = !0), 
                    obj;
                },
                file: function(fieldEl, fieldOptions) {
                    var maxFileSize = 1 * (fieldEl.getAttribute("data-max-file-size") || fieldOptions.maxFileSize), MIMEtype = fieldEl.accept ? new RegExp(fieldEl.accept.replace("*", "[^\\/,]+")) : null, filesList = Array.from(fieldEl.files), obj = {
                        result: !0
                    };
                    return filesList.forEach((function(file) {
                        var exceedMaxFileSize = maxFileSize > 0 && file.size / 1024 / 1024 > maxFileSize, isAcceptedFileType = null === MIMEtype || MIMEtype.test(file.type);
                        !exceedMaxFileSize && isAcceptedFileType || (obj.result = !1, void 0 === obj.errors && (obj.errors = {}), 
                        obj.errors.file = !0, exceedMaxFileSize && (obj.errors.maxFileSize = !0), isAcceptedFileType || (obj.errors.acceptedFileType = !0));
                    })), obj;
                },
                length: function(fieldEl) {
                    var valueL = fieldEl.value.length, attrValue = JSON.parse(fieldEl.getAttribute("data-length")), isMinlengthOk = valueL >= attrValue[0], isMaxlengthOk = valueL <= attrValue[1], obj = {
                        result: isMinlengthOk && isMaxlengthOk
                    };
                    return obj.result || (obj.errors = {
                        stringLength: !0
                    }, isMinlengthOk || (obj.errors.minlength = !0), isMaxlengthOk || (obj.errors.maxlength = !0)), 
                    obj;
                },
                max: function(fieldEl) {
                    var value = fieldEl.value, maxVal = fieldEl.max, dateFormat = fieldEl.getAttribute("data-date-format");
                    ("date" === fieldEl.type || dateFormat) && (value = getDateAsNumber(value, dateFormat), 
                    maxVal = maxVal.split("-").join(""));
                    var obj = {
                        result: (value *= 1) <= (maxVal *= 1)
                    };
                    return obj.result || (obj.errors = {
                        max: !0
                    }), obj;
                },
                maxlength: function(fieldEl) {
                    var obj = {
                        result: fieldEl.value.length <= 1 * fieldEl.maxLength
                    };
                    return obj.result || (obj.errors = {
                        maxlength: !0
                    }), obj;
                },
                min: function(fieldEl) {
                    var value = fieldEl.value, minVal = fieldEl.min, dateFormat = fieldEl.getAttribute("data-date-format");
                    ("date" === fieldEl.type || fieldEl.getAttribute("data-date-format")) && (value = getDateAsNumber(value, dateFormat), 
                    minVal = minVal.split("-").join(""));
                    var obj = {
                        result: (value *= 1) >= (minVal *= 1)
                    };
                    return obj.result || (obj.errors = {
                        min: !0
                    }), obj;
                },
                minlength: function(fieldEl) {
                    var obj = {
                        result: fieldEl.value.length >= 1 * fieldEl.minLength
                    };
                    return obj.result || (obj.errors = {
                        minlength: !0
                    }), obj;
                },
                pattern: function(fieldEl) {
                    var fieldPattern = fieldEl.pattern, obj = {
                        result: new RegExp(fieldPattern).test(fieldEl.value)
                    };
                    return obj.result || (obj.errors = {
                        pattern: !0
                    }), obj;
                },
                radio: function(fieldEl) {
                    var fieldChecked = fieldEl.closest("form").querySelector('[name="' + fieldEl.name + '"]:checked');
                    return {
                        result: null !== fieldChecked && fieldChecked.value.trim().length > 0
                    };
                },
                requiredFrom: function(fieldEl) {
                    return {
                        result: fieldEl.value.trim().length > 0
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
                var formEl = fieldEl.closest("form"), isValidValue = fieldEl.value.trim().length > 0;
                if ("radio" === fieldEl.type) {
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
                        fieldEl: fieldEl
                    }
                }).then((function(data) {
                    var dataObj = data.pop();
                    return new Promise((function(resolve) {
                        needsValidation || (dataObj.result = !0), resolve(needsValidation ? function(fieldEl, fieldOptions, validationRules, validationErrors) {
                            var attrValidationsResult, fieldType = fieldEl.matches("[data-subtype]") ? toCamelCase(fieldEl.getAttribute("data-subtype")) : fieldEl.type, fieldValue = fieldEl.value, isValidValue = fieldValue.trim().length > 0, obj = getValidateFieldDefault({
                                result: isValidValue,
                                fieldEl: fieldEl
                            });
                            return obj.result ? new Promise((function(resolve) {
                                attrValidationsResult = Array.from(fieldEl.attributes).reduce((function(valResult, attr) {
                                    var attrName = toCamelCase(attr.name.replace("data-", "")), attrValue = attr.value, isAttrValueWithFn = "type" === attrName && "function" == typeof validationRulesAttributes[attrValue], isAttrNameWithFn = "function" == typeof validationRulesAttributes[attrName];
                                    if (isAttrValueWithFn || isAttrNameWithFn) {
                                        var extraVal = validationRulesAttributes[isAttrValueWithFn ? attrValue : attrName](fieldEl, fieldOptions);
                                        if (!extraVal.result) return obj = mergeObjects({}, obj, extraVal), !1;
                                    }
                                    return valResult;
                                }), isValidValue), "function" == typeof validationRules[fieldType] ? resolve(validationRules[fieldType](fieldValue, fieldEl)) : resolve(obj);
                            })).then((function(data) {
                                if ((obj = mergeObjects({}, obj, data)).result = obj.result && attrValidationsResult, 
                                !obj.result) {
                                    var fieldErrors = "function" == typeof validationErrors[fieldType] ? validationErrors[fieldType](fieldValue, fieldEl) : {};
                                    obj.errors = mergeObjects({}, obj.errors || {}, fieldErrors), obj.errors.rule = !0;
                                }
                                return obj;
                            })) : (obj.errors = {
                                empty: !0
                            }, Promise.resolve(obj));
                        }(fieldEl, fieldOptions, validationRules, validationErrors) : dataObj);
                    }));
                }));
            }
            var Form = exports("default", function() {
                function Form(formEl, optionsObj) {
                    !function(instance, Constructor) {
                        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                    }(this, Form), function(self, formEl, optionsObj) {
                        var argsL = arguments.length, checkFormElem = checkFormEl(formEl);
                        if (0 === argsL || argsL > 0 && !formEl) throw new Error('First argument "formEl" is missing or falsy!');
                        if (isNodeList(formEl)) throw new Error('First argument "formEl" must be a single DOM node or a form CSS selector, not a NodeList!');
                        if (!checkFormElem.result) throw new Error('First argument "formEl" is not a DOM node nor a form CSS selector!');
                        self.formEl = checkFormElem.element, self.formEl.formjs = self, self.options = mergeObjects({}, self.constructor.prototype.options, optionsObj), 
                        self.options.fieldOptions.beforeValidation = self.options.fieldOptions.beforeValidation.map((function(cbFn) {
                            return cbFn.bind(self);
                        })), self.formEl.noValidate = !0;
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
                            var obj = getValidateFormDefault(), fieldsList = getUniqueFields(formEl.querySelectorAll(fieldsStringSelector));
                            return Promise.all(fieldsList.map((function(fieldEl) {
                                if (fieldToSkip && fieldEl === fieldToSkip) {
                                    var obj2 = getValidateFieldDefault({
                                        fieldEl: fieldEl,
                                        result: !0
                                    });
                                    return Promise.resolve(obj2);
                                }
                                return checkFieldValidity(fieldEl, fieldOptions, validationRules, validationErrors);
                            }))).then((function(list) {
                                var areAllFieldsValid = 0 === list.filter((function(fieldObj) {
                                    return !fieldObj.result;
                                })).length;
                                return obj.result = areAllFieldsValid, obj.fields = list, obj;
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
            Form.prototype.version = "4.1.0";
        }
    };
}));
