/* formJS Lite v4.0.2 | Valerio Di Punzio (@SimplySayHi) | https://valeriodipunzio.com/plugins/formJS/ | https://github.com/SimplySayHi/formJS | MIT license */
const isNodeList = nodeList => NodeList.prototype.isPrototypeOf(nodeList), isDOMNode = node => Element.prototype.isPrototypeOf(node), checkFormEl = formEl => {
    let isString = typeof formEl, isFormSelector = "string" === isString && isDOMNode(document.querySelector(formEl)) && "form" === document.querySelector(formEl).tagName.toLowerCase();
    return {
        result: isDOMNode(formEl) || isFormSelector,
        element: "string" === isString ? document.querySelector(formEl) : formEl
    };
}, mergeObjects = function(out = {}) {
    for (let i = 1; i < arguments.length; i++) {
        let obj = arguments[i];
        if (obj) for (let key in obj) {
            let isArray = "[object Array]" === Object.prototype.toString.call(obj[key]), isObject = "[object Object]" === Object.prototype.toString.call(obj[key]);
            obj.hasOwnProperty(key) && (isArray ? (void 0 === out[key] && (out[key] = []), out[key] = out[key].concat(obj[key].slice(0))) : isObject ? out[key] = mergeObjects(out[key], obj[key]) : Array.isArray(out[key]) ? out[key].push(obj[key]) : out[key] = obj[key]);
        }
    }
    return out;
}, getSplitChar = string => {
    const separator = string.match(/\D/);
    return separator && separator.length > 0 ? separator[0] : null;
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
    }
};

const validationRulesAttributes = {
    checkbox: function(fieldEl) {
        let dataChecksEl = fieldEl.closest("form").querySelector('[name="' + fieldEl.name + '"][data-checks]');
        return dataChecksEl ? function(fieldEl) {
            try {
                let attrValue = JSON.parse(fieldEl.getAttribute("data-checks")), checkedElLength = fieldEl.closest("form").querySelectorAll('[name="' + fieldEl.name + '"]:checked').length, isMinOk = checkedElLength >= attrValue[0], isMaxOk = checkedElLength <= attrValue[1], obj = {
                    result: isMinOk && isMaxOk
                };
                return obj.result || (obj.errors = {
                    checks: !0
                }, isMinOk || (obj.errors.minChecks = !0), isMaxOk || (obj.errors.maxChecks = !0)), 
                obj;
            } catch (e) {
                throw new Error('"data-checks" attribute is not a valid array!');
            }
        }(dataChecksEl) : {
            result: fieldEl.checked
        };
    },
    equalTo: function(fieldEl) {
        let checkFromEl = fieldEl.closest("form").querySelector('[name="' + fieldEl.getAttribute("data-equal-to") + '"]'), obj = {
            result: !!checkFromEl && fieldEl.value === checkFromEl.value
        };
        return obj.result || (obj.errors = {
            equalTo: !0
        }), obj;
    },
    exactLength: function(fieldEl) {
        try {
            let valueLength = fieldEl.value.length, exactLength = 1 * fieldEl.getAttribute("data-exact-length"), obj = {
                result: !Number.isNaN(exactLength) && valueLength === exactLength
            };
            return obj.result || (obj.errors = {
                exactLength: !0
            }, valueLength < exactLength ? obj.errors.minlength = !0 : obj.errors.maxlength = !0), 
            obj;
        } catch (e) {
            throw new Error('"data-exact-length" attribute is not a number!');
        }
    },
    file: function(fieldEl, fieldOptions) {
        let maxFileSize = 1 * (fieldEl.getAttribute("data-max-file-size") || fieldOptions.maxFileSize), MIMEtype = fieldEl.accept ? new RegExp(fieldEl.accept.replace("*", "[^\\/,]+")) : null, filesList = Array.from(fieldEl.files), obj = {
            result: !0
        };
        return filesList.forEach((function(file) {
            let exceedMaxFileSize = maxFileSize > 0 && file.size / 1024 / 1024 > maxFileSize, isAcceptedFileType = null === MIMEtype || MIMEtype.test(file.type);
            !exceedMaxFileSize && isAcceptedFileType || (obj.result = !1, void 0 === obj.errors && (obj.errors = {}), 
            obj.errors.file = !0, exceedMaxFileSize && (obj.errors.maxFileSize = !0), isAcceptedFileType || (obj.errors.acceptedFileType = !0));
        })), obj;
    },
    length: function(fieldEl) {
        try {
            let valueL = fieldEl.value.length, attrValue = JSON.parse(fieldEl.getAttribute("data-length")), isMinlengthOk = valueL >= attrValue[0], isMaxlengthOk = valueL <= attrValue[1], obj = {
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
    max: function(fieldEl) {
        let value = fieldEl.value, maxVal = fieldEl.max;
        if ("date" === fieldEl.type) {
            let splitChar = getSplitChar(value);
            value = value.split(splitChar).join(""), maxVal = maxVal.split("-").join("");
        }
        value *= 1, maxVal *= 1;
        let obj = {
            result: value <= maxVal
        };
        return obj.result || (obj.errors = {
            max: !0
        }), obj;
    },
    maxlength: function(fieldEl) {
        try {
            const obj = {
                result: fieldEl.value.length <= 1 * fieldEl.maxLength
            };
            return obj.result || (obj.errors = {
                maxlength: !0
            }), obj;
        } catch (e) {
            throw new Error('"maxlength" is not a number!');
        }
    },
    min: function(fieldEl) {
        let value = fieldEl.value, minVal = fieldEl.min;
        if ("date" === fieldEl.type) {
            let splitChar = getSplitChar(value);
            value = value.split(splitChar).join(""), minVal = minVal.split("-").join("");
        }
        value *= 1, minVal *= 1;
        let obj = {
            result: value >= minVal
        };
        return obj.result || (obj.errors = {
            min: !0
        }), obj;
    },
    minlength: function(fieldEl) {
        try {
            const obj = {
                result: fieldEl.value.length >= 1 * fieldEl.minLength
            };
            return obj.result || (obj.errors = {
                minlength: !0
            }), obj;
        } catch (e) {
            throw new Error('"minlength" is not a number!');
        }
    },
    pattern: function(fieldEl) {
        try {
            let fieldPattern = fieldEl.pattern, obj = {
                result: new RegExp(fieldPattern).test(fieldEl.value)
            };
            return obj.result || (obj.errors = {
                pattern: !0
            }), obj;
        } catch (e) {
            throw new Error('"pattern" is not a valid RegExp!');
        }
    },
    radio: function(fieldEl) {
        let fieldChecked = fieldEl.closest("form").querySelector('[name="' + fieldEl.name + '"]:checked');
        return {
            result: null !== fieldChecked && fieldChecked.value.trim().length > 0
        };
    },
    requiredFrom: function(fieldEl) {
        let formEl = fieldEl.closest("form"), isValidValue = fieldEl.value.trim().length > 0, reqMoreEl = formEl.querySelector(fieldEl.getAttribute("data-required-from")), obj = {
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
    const formEl = fieldEl.closest("form"), isValidValue = fieldEl.value.trim().length > 0;
    if ("radio" === fieldEl.type) {
        const checkedEl = fieldEl.checked ? fieldEl : formEl.querySelector('[name="' + fieldEl.name + '"]:checked'), reqMoreIsChecked = checkedEl.matches("[data-require-more]"), findReqMoreEl = reqMoreIsChecked ? checkedEl : formEl.querySelector('[data-require-more][name="' + fieldEl.name + '"]'), findReqFromEl = findReqMoreEl ? formEl.querySelector('[data-required-from="#' + findReqMoreEl.id + '"]') : null;
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
            fieldEl: fieldEl
        }
    }).then(data => {
        let dataObj = data.pop();
        return new Promise(resolve => {
            needsValidation || (dataObj.result = !0), resolve(needsValidation ? function(fieldEl, fieldOptions, validationRules, validationErrors) {
                const fieldType = fieldEl.matches("[data-subtype]") ? toCamelCase(fieldEl.getAttribute("data-subtype")) : fieldEl.type, fieldValue = fieldEl.value, isValidValue = fieldValue.trim().length > 0;
                let attrValidationsResult, obj = getValidateFieldDefault({
                    result: isValidValue,
                    fieldEl: fieldEl
                });
                return obj.result ? new Promise(resolve => {
                    attrValidationsResult = Array.from(fieldEl.attributes).reduce((valResult, attr) => {
                        const attrName = toCamelCase(attr.name.replace("data-", "")), attrValue = attr.value, isAttrValueWithFn = "type" === attrName && "function" == typeof validationRulesAttributes[attrValue], isAttrNameWithFn = "function" == typeof validationRulesAttributes[attrName];
                        if (isAttrValueWithFn || isAttrNameWithFn) {
                            const extraVal = validationRulesAttributes[isAttrValueWithFn ? attrValue : attrName](fieldEl, fieldOptions);
                            if (!extraVal.result) return obj = mergeObjects({}, obj, extraVal), !1;
                        }
                        return valResult;
                    }, isValidValue), "function" == typeof validationRules[fieldType] ? resolve(validationRules[fieldType](fieldValue, fieldEl)) : resolve(obj);
                }).then(data => {
                    if (obj = mergeObjects({}, obj, data), obj.result = obj.result && attrValidationsResult, 
                    !obj.result) {
                        const fieldErrors = "function" == typeof validationErrors[fieldType] ? validationErrors[fieldType](fieldValue, fieldEl) : {};
                        obj.errors = mergeObjects({}, obj.errors || {}, fieldErrors), obj.errors.rule = !0;
                    }
                    return obj;
                }) : (obj.errors = {
                    empty: !0
                }, Promise.resolve(obj));
            }(fieldEl, fieldOptions, validationRules, validationErrors) : dataObj);
        });
    });
}

function checkFormValidity(formEl, fieldOptions, validationRules, validationErrors, fieldToSkip = null) {
    fieldOptions = mergeObjects({}, fieldOptions, {
        focusOnRelated: !1
    });
    const obj = (obj => mergeObjects({}, {
        result: !0,
        fields: []
    }, obj))(), fieldsList = (nodeList => {
        let currentFieldName = "", currentFieldType = "";
        return Array.from(nodeList).filter(fieldEl => {
            const name = fieldEl.name, type = fieldEl.type;
            return (name !== currentFieldName || type !== currentFieldType) && (fieldEl.matches("[data-required-from]") || (currentFieldName = name, 
            currentFieldType = type), !0);
        });
    })(formEl.querySelectorAll('input:not([type="reset"]):not([type="submit"]):not([type="button"]):not([type="hidden"]), select, textarea'));
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
            self.formEl = checkFormElem.element, self.formEl.formjs = self, self.options = mergeObjects({}, self.constructor.prototype.options, optionsObj), 
            self.options.fieldOptions.beforeValidation = self.options.fieldOptions.beforeValidation.map(cbFn => cbFn.bind(self)), 
            self.formEl.noValidate = !0;
        }(this, formEl, optionsObj);
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
        this.prototype.validationErrors = mergeObjects({}, this.prototype.validationErrors, errorsObj);
    }
    static addValidationRules(rulesObj) {
        this.prototype.validationRules = mergeObjects({}, this.prototype.validationRules, rulesObj);
    }
    static setOptions(optionsObj) {
        this.prototype.options = mergeObjects({}, this.prototype.options, optionsObj);
    }
}

Form.prototype.options = {
    fieldOptions: {
        beforeValidation: [],
        maxFileSize: 10
    }
}, Form.prototype.validationErrors = {}, Form.prototype.validationRules = validationRules, 
Form.prototype.version = "4.0.2";

export default Form;
