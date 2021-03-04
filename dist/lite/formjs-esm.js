/* formJS Lite v4.4.0 | Valerio Di Punzio (@SimplySayHi) | https://valeriodipunzio.com/plugins/formJS/ | https://github.com/SimplySayHi/formJS | MIT license */
const isDOMNode = node => Element.prototype.isPrototypeOf(node), isPlainObject = object => "[object Object]" === Object.prototype.toString.call(object), mergeObjects = function(out = {}) {
    return Array.from(arguments).slice(1).filter(arg => !!arg).forEach(arg => {
        Object.keys(arg).forEach(key => {
            Array.isArray(arg[key]) ? out[key] = (out[key] || []).concat(arg[key].slice(0)) : isPlainObject(arg[key]) ? out[key] = mergeObjects(out[key] || {}, arg[key]) : Array.isArray(out[key]) ? out[key].push(arg[key]) : out[key] = arg[key];
        });
    }), out;
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
}, getDateAsNumber = (dateString, dateFormat) => {
    dateFormat = dateFormat || "YYYY-MM-DD";
    const splitChar = (string => {
        const separator = string.match(/\D/);
        return separator && separator.length > 0 ? separator[0] : null;
    })(dateString);
    if (!(dateFormat.indexOf(splitChar) < 0)) return dateFormat = dateFormat.replace(/[^YMD]/g, "-"), 
    dateString = dateString.split(splitChar), dateString = formatMap[dateFormat](dateString).join("");
}, getValidateFieldDefault = obj => mergeObjects({}, {
    result: !1,
    fieldEl: null
}, obj), toCamelCase = string => string.replace(/-([a-z])/gi, (all, letter) => letter.toUpperCase()), validationRules = {
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
        const dataChecksEl = fieldEl.closest("form").querySelector('[name="' + fieldEl.name + '"][data-checks]');
        return dataChecksEl ? function(fieldEl) {
            const attrValue = JSON.parse(fieldEl.getAttribute("data-checks")), checkedElLength = fieldEl.closest("form").querySelectorAll('[name="' + fieldEl.name + '"]:checked').length, isMinOk = checkedElLength >= attrValue[0], isMaxOk = checkedElLength <= attrValue[1], obj = {
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
        const valueLength = value.length, exactLength = 1 * fieldEl.getAttribute("data-exact-length"), obj = {
            result: valueLength === exactLength
        };
        return obj.result || (obj.errors = {}, valueLength < exactLength ? obj.errors.minlength = !0 : obj.errors.maxlength = !0), 
        obj;
    },
    file: function(value, fieldEl, fieldOptions) {
        const maxFileSize = 1 * (fieldEl.getAttribute("data-max-file-size") || fieldOptions.maxFileSize), MIMEtype = fieldEl.accept ? new RegExp(fieldEl.accept.replace("*", "[^\\/,]+")) : null, filesList = Array.from(fieldEl.files), obj = {
            result: !0
        };
        return filesList.forEach(file => {
            const exceedMaxFileSize = maxFileSize > 0 && file.size / 1024 / 1024 > maxFileSize, isAcceptedFileType = null === MIMEtype || MIMEtype.test(file.type);
            !exceedMaxFileSize && isAcceptedFileType || (obj.result = !1, void 0 === obj.errors && (obj.errors = {}), 
            exceedMaxFileSize && (obj.errors.maxFileSize = !0), isAcceptedFileType || (obj.errors.acceptedFileType = !0));
        }), obj;
    },
    length: function(value, fieldEl) {
        const valueL = value.length, attrValue = JSON.parse(fieldEl.getAttribute("data-length")), isMinlengthOk = valueL >= attrValue[0], isMaxlengthOk = valueL <= attrValue[1], obj = {
            result: isMinlengthOk && isMaxlengthOk
        };
        return obj.result || (obj.errors = {
            stringLength: !0
        }, isMinlengthOk || (obj.errors.minlength = !0), isMaxlengthOk || (obj.errors.maxlength = !0)), 
        obj;
    },
    max: function(value, fieldEl) {
        let maxVal = fieldEl.max;
        const dateFormat = fieldEl.getAttribute("data-date-format");
        return ("date" === fieldEl.type || dateFormat) && (value = getDateAsNumber(value, dateFormat), 
        maxVal = maxVal.split("-").join("")), maxVal *= 1, {
            result: (value *= 1) <= maxVal
        };
    },
    maxlength: function(value, fieldEl) {
        return {
            result: value.length <= 1 * fieldEl.maxLength
        };
    },
    min: function(value, fieldEl) {
        let minVal = fieldEl.min;
        const dateFormat = fieldEl.getAttribute("data-date-format");
        return ("date" === fieldEl.type || dateFormat) && (value = getDateAsNumber(value, dateFormat), 
        minVal = minVal.split("-").join("")), minVal *= 1, {
            result: (value *= 1) >= minVal
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
        const fieldChecked = fieldEl.closest("form").querySelector('[name="' + fieldEl.name + '"]:checked');
        return {
            result: null !== fieldChecked && fieldChecked.value.trim().length > 0
        };
    }
};

function checkFieldValidity(fieldEl, fieldOptions, validationRules, validationErrors) {
    if (!isDOMNode(fieldEl)) {
        const obj = getValidateFieldDefault({
            fieldEl: fieldEl
        });
        return Promise.resolve(obj);
    }
    const formEl = fieldEl.closest("form"), isValidValue = fieldEl.value.trim().length > 0, dataFieldOptions = ((fieldEl, attrName) => {
        const customAttrEl = fieldEl.closest("[" + attrName + "]");
        return customAttrEl && JSON.parse(customAttrEl.getAttribute(attrName)) || {};
    })(fieldEl, "data-field-options");
    if (fieldOptions = mergeObjects(fieldOptions, dataFieldOptions), "radio" === fieldEl.type) {
        const checkedEl = fieldEl.checked ? fieldEl : formEl.querySelector('[name="' + fieldEl.name + '"]:checked'), reqMoreIsChecked = checkedEl && checkedEl.matches("[data-require-more]"), findReqMoreEl = reqMoreIsChecked ? checkedEl : formEl.querySelector('[data-require-more][name="' + fieldEl.name + '"]'), findReqFromEl = findReqMoreEl ? formEl.querySelector('[data-required-from="#' + findReqMoreEl.id + '"]') : null;
        checkedEl && findReqFromEl && (findReqFromEl.required = findReqMoreEl.required && findReqMoreEl.checked, 
        reqMoreIsChecked ? fieldOptions.focusOnRelated && findReqFromEl.focus() : findReqFromEl.value = "");
    }
    if (fieldEl.matches("[data-required-from]") && isValidValue) {
        const reqMoreEl = formEl.querySelector(fieldEl.getAttribute("data-required-from"));
        reqMoreEl.checked = !0, fieldEl.required = reqMoreEl.required;
    }
    const needsValidation = fieldEl.required || fieldEl.matches("[data-validate-if-filled]") && isValidValue;
    return (({functionsList: functionsList = [], data: data = {}, stopConditionFn: stopConditionFn = (() => !1)} = {}) => functionsList.reduce((acc, promiseFn) => acc.then(res => {
        let dataNew = mergeObjects({}, res[res.length - 1]);
        return stopConditionFn(dataNew) ? Promise.resolve(res) : new Promise(resolve => {
            resolve(promiseFn(dataNew));
        }).then((result = dataNew) => (res.push(result), res));
    }), Promise.resolve([ data ])).then(dataList => dataList.length > 1 ? dataList.slice(1) : dataList))({
        functionsList: fieldOptions.beforeValidation,
        data: {
            fieldEl: fieldEl,
            fieldOptions: fieldOptions
        }
    }).then(data => {
        const dataObj = data.pop();
        return new Promise(resolve => {
            needsValidation || (dataObj.result = !0), resolve(needsValidation ? function(fieldEl, fieldOptions, validationRules, validationErrors) {
                const fieldValue = fieldEl.value, obj = getValidateFieldDefault({
                    result: fieldValue.trim().length > 0,
                    fieldEl: fieldEl
                }), isRadioOrCheckbox = /^(radio|checkbox)$/.test(fieldEl.type), hasSelectedInput = fieldEl.closest("form").querySelectorAll('[name="' + fieldEl.name + '"]:checked').length > 0;
                if (!isRadioOrCheckbox && !obj.result || isRadioOrCheckbox && !hasSelectedInput) return obj.result = !1, 
                obj.errors = {
                    empty: !0
                }, Promise.resolve(obj);
                const validationMethods = Array.from(fieldEl.attributes).reduce((accList, attr) => {
                    const attrName = toCamelCase(attr.name.replace("data-", "")), attrValue = toCamelCase(attr.value), isAttrValueWithFn = ("type" === attrName || "subtype" === attrName) && validationRules[attrValue], isAttrNameWithFn = validationRules[attrName];
                    return (isAttrValueWithFn || isAttrNameWithFn) && accList.push(isAttrValueWithFn ? attrValue : attrName), 
                    accList;
                }, []);
                return new Promise(resolve => {
                    resolve(validationMethods.reduce((accPromise, methodName) => accPromise.then(accObj => new Promise(resolveVal => {
                        resolveVal(validationRules[methodName](fieldValue, fieldEl, fieldOptions));
                    }).then(valObj => {
                        if (!valObj.result) {
                            const errorObj = {};
                            void 0 !== valObj.errors && void 0 !== valObj.errors[methodName] || (errorObj[methodName] = !0), 
                            valObj.errors = mergeObjects({}, valObj.errors, errorObj);
                        }
                        return valObj = valObj.result ? {} : valObj, mergeObjects(accObj, valObj);
                    })), Promise.resolve(obj)));
                }).then(data => (data.result || (data.errors = validationMethods.reduce((accObj, methodName) => {
                    const errors = validationErrors[methodName] && validationErrors[methodName](fieldValue, fieldEl) || {};
                    return mergeObjects(accObj, errors);
                }, data.errors), data.errors.rule = !0), data));
            }(fieldEl, fieldOptions, validationRules, validationErrors) : dataObj);
        });
    }).then(data => {
        const containerEl = fieldOptions.questionContainer && data.fieldEl.closest(fieldOptions.questionContainer);
        var element;
        return containerEl && (element = containerEl, fieldOptions.cssClasses.pending.split(" ").forEach(className => {
            element.classList.remove(className);
        })), data;
    });
}

function checkFormValidity(formEl, fieldOptions, validationRules, validationErrors, fieldToSkip = null) {
    fieldOptions = mergeObjects({}, fieldOptions, {
        focusOnRelated: !1
    });
    const fieldsList = (nodeList => {
        let currentFieldName = "", currentFieldType = "";
        return Array.from(nodeList).filter(fieldEl => {
            const name = fieldEl.name, type = fieldEl.type;
            return (name !== currentFieldName || type !== currentFieldType) && (fieldEl.matches("[data-required-from]") || (currentFieldName = name, 
            currentFieldType = type), !0);
        });
    })(formEl.querySelectorAll('input:not([type="reset"]):not([type="submit"]):not([type="button"]):not([type="hidden"]), select, textarea'));
    return Promise.all(fieldsList.map(fieldEl => {
        if (fieldToSkip && fieldEl === fieldToSkip) {
            const obj = getValidateFieldDefault({
                fieldEl: fieldEl,
                result: !0
            });
            return Promise.resolve(obj);
        }
        return checkFieldValidity(fieldEl, fieldOptions, validationRules, validationErrors);
    })).then(fields => {
        const areAllFieldsValid = 0 === fields.filter(fieldObj => !fieldObj.result).length;
        return mergeObjects({}, {
            result: !0,
            fields: []
        }, {
            result: areAllFieldsValid,
            fields: fields
        });
    });
}

class Form {
    constructor(formEl, optionsObj) {
        const argsL = arguments.length, checkFormElem = (formEl => {
            const isString = typeof formEl, isFormSelector = "string" === isString && isDOMNode(document.querySelector(formEl)) && "form" === document.querySelector(formEl).tagName.toLowerCase();
            return {
                result: isDOMNode(formEl) || isFormSelector,
                element: "string" === isString ? document.querySelector(formEl) : formEl
            };
        })(formEl);
        if (0 === argsL || argsL > 0 && !formEl) throw new Error('First argument "formEl" is missing or falsy!');
        if (nodeList = formEl, NodeList.prototype.isPrototypeOf(nodeList)) throw new Error('First argument "formEl" must be a single DOM node or a form CSS selector, not a NodeList!');
        var nodeList;
        if (!checkFormElem.result) throw new Error('First argument "formEl" is not a DOM node nor a form CSS selector!');
        const self = this;
        self.formEl = checkFormElem.element, self.formEl.formjs = self, self.options = mergeObjects({}, Form.prototype.options, optionsObj), 
        self.options.fieldOptions.beforeValidation = self.options.fieldOptions.beforeValidation.map(cbFn => cbFn.bind(self)), 
        self.formEl.noValidate = !0;
    }
    destroy() {
        delete this.formEl.formjs;
    }
    validateField(fieldEl, fieldOptions) {
        return checkFieldValidity(fieldEl = "string" == typeof fieldEl ? this.formEl.querySelector(fieldEl) : fieldEl, fieldOptions = mergeObjects({}, this.options.fieldOptions, fieldOptions), this.validationRules, this.validationErrors);
    }
    validateForm(fieldOptions) {
        return fieldOptions = mergeObjects({}, this.options.fieldOptions, fieldOptions), 
        checkFormValidity(this.formEl, fieldOptions, this.validationRules, this.validationErrors);
    }
    static addValidationErrors(errorsObj) {
        Form.prototype.validationErrors = mergeObjects({}, Form.prototype.validationErrors, errorsObj);
    }
    static addValidationRules(rulesObj) {
        Form.prototype.validationRules = mergeObjects({}, Form.prototype.validationRules, rulesObj);
    }
    static setOptions(optionsObj) {
        Form.prototype.options = mergeObjects({}, Form.prototype.options, optionsObj);
    }
}

Form.prototype.options = {
    fieldOptions: {
        beforeValidation: [],
        focusOnRelated: !0,
        maxFileSize: 10
    }
}, Form.prototype.validationErrors = {}, Form.prototype.validationRules = validationRules, 
Form.prototype.version = "4.4.0";

export default Form;
