/* formJS Lite v4.0.2 | Valerio Di Punzio (@SimplySayHi) | https://valeriodipunzio.com/plugins/formJS/ | https://github.com/SimplySayHi/formJS | MIT license */
const checkFormEl = formEl => {
    let isString = typeof formEl, isFormSelector = "string" === isString && isDOMNode(document.querySelector(formEl)) && "form" === document.querySelector(formEl).tagName.toLowerCase();
    return {
        result: isDOMNode(formEl) || isFormSelector,
        element: "string" === isString ? document.querySelector(formEl) : formEl
    };
}, getSplitChar = string => {
    let splitChar = ".";
    return -1 === string.indexOf(splitChar) && (string.indexOf("-") >= 0 ? splitChar = "-" : string.indexOf("/") >= 0 && (splitChar = "/")), 
    splitChar;
}, isDOMNode = node => Element.prototype.isPrototypeOf(node), isNodeList = nodeList => NodeList.prototype.isPrototypeOf(nodeList), mergeObjects = function(out = {}) {
    for (let i = 1; i < arguments.length; i++) {
        let obj = arguments[i];
        if (obj) for (let key in obj) {
            let isArray = "[object Array]" === Object.prototype.toString.call(obj[key]), isObject = "[object Object]" === Object.prototype.toString.call(obj[key]);
            obj.hasOwnProperty(key) && (isArray ? (void 0 === out[key] && (out[key] = []), out[key] = out[key].concat(obj[key].slice(0))) : isObject ? out[key] = mergeObjects(out[key], obj[key]) : Array.isArray(out[key]) ? out[key].push(obj[key]) : out[key] = obj[key]);
        }
    }
    return out;
}, toCamelCase = string => string.replace(/-([a-z])/gi, (all, letter) => letter.toUpperCase()), validateFieldObjDefault = {
    result: !1,
    fieldEl: null
}, validateFormObjDefault = {
    result: !0,
    fields: []
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

function isValidField(fieldEl, fieldOptions, validationRules, validationErrors) {
    const obj = mergeObjects({}, validateFieldObjDefault, {
        fieldEl: fieldEl
    });
    if (!isDOMNode(fieldEl)) return Promise.resolve(obj);
    const isValidValue = fieldEl.value.trim().length > 0, isRequired = fieldEl.required, isReqFrom = fieldEl.matches("[data-required-from]"), isValidateIfFilled = fieldEl.matches("[data-validate-if-filled]");
    return (({functionsList: functionsList = [], data: data = {}, stopConditionFn: stopConditionFn = function() {
        return !1;
    }} = {}) => functionsList.reduce((acc, promiseFn) => acc.then(res => {
        let dataNew = mergeObjects({}, res[res.length - 1]);
        return stopConditionFn(dataNew) ? Promise.resolve(res) : new Promise(resolve => {
            resolve(promiseFn(dataNew));
        }).then((result = dataNew) => (res.push(result), res));
    }), Promise.resolve([ data ])).then(dataList => dataList.length > 1 ? dataList.slice(1) : dataList))({
        functionsList: fieldOptions.beforeValidation,
        data: {
            fieldEl: fieldEl
        }
    }).then(data => {
        let dataObj = data.pop();
        return new Promise(resolve => {
            !isRequired && !isValidateIfFilled && !isReqFrom || isValidateIfFilled && !isValidValue || isReqFrom && !isRequired ? (dataObj.result = !0, 
            resolve(dataObj)) : resolve(function(fieldEl, fieldOptions, validationRules, validationErrors) {
                const fieldType = fieldEl.matches("[data-subtype]") ? toCamelCase(fieldEl.getAttribute("data-subtype")) : fieldEl.type, fieldValue = fieldEl.value, isValidValue = fieldValue.trim().length > 0, fieldAttributes = Array.from(fieldEl.attributes).sort((a, b) => a.name < b.name), attrValidations = [];
                let attrValidationsResult = isValidValue, obj = {
                    result: isValidValue,
                    fieldEl: fieldEl
                };
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

function isValidForm(formEl, fieldOptions, validationRules, validationErrors) {
    fieldOptions = mergeObjects({}, fieldOptions, {
        focusOnRelated: !1
    });
    const obj = mergeObjects({}, validateFormObjDefault), fieldsList = (nodeList => {
        let currentFieldName = "", currentFieldType = "";
        return Array.from(nodeList).filter(fieldEl => {
            const name = fieldEl.name, type = fieldEl.type;
            return (name !== currentFieldName || type !== currentFieldType) && (fieldEl.matches("[data-required-from]") || (currentFieldName = name, 
            currentFieldType = type), !0);
        });
    })(formEl.querySelectorAll('input:not([type="reset"]):not([type="submit"]):not([type="button"]):not([type="hidden"]), select, textarea'));
    return Promise.all(fieldsList.map(fieldEl => isValidField(fieldEl, fieldOptions, validationRules, validationErrors))).then(list => {
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
            let beforeValidation = self.options.fieldOptions.beforeValidation;
            self.options.fieldOptions.beforeValidation = Array.isArray(beforeValidation) ? beforeValidation.map(cbFn => cbFn.bind(self)) : beforeValidation.bind(self);
        }(this, formEl, optionsObj);
    }
    destroy() {
        delete this.formEl.formjs;
    }
    validateField(fieldEl, fieldOptions = {}) {
        return isValidField(fieldEl = "string" == typeof fieldEl ? this.formEl.querySelector(fieldEl) : fieldEl, fieldOptions = mergeObjects({}, this.options.fieldOptions, fieldOptions), this.validationRules, this.validationErrors);
    }
    validateForm(fieldOptions = {}) {
        return fieldOptions = mergeObjects({}, this.options.fieldOptions, fieldOptions), 
        isValidForm(this.formEl, fieldOptions, this.validationRules, this.validationErrors);
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

Form.prototype.isInitialized = !1, Form.prototype.options = {
    fieldOptions: {
        beforeValidation: [],
        maxFileSize: 10
    }
}, Form.prototype.validationErrors = {}, Form.prototype.validationRules = {
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
}, Form.prototype.version = "4.0.2";

export default Form;
