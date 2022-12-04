/* formJS Lite v5.4.0 | Valerio Di Punzio (@SimplySayHi) | https://valeriodipunzio.com/plugins/formJS/ | https://github.com/SimplySayHi/formJS | MIT license */
const isDOMNode = node => Element.prototype.isPrototypeOf(node), isPlainObject = object => "[object Object]" === Object.prototype.toString.call(object), mergeObjects = function(out = {}) {
    return Array.from(arguments).slice(1).filter(arg => !!arg).forEach(arg => {
        Object.keys(arg).forEach(key => {
            Array.isArray(arg[key]) ? out[key] = (out[key] || []).concat(arg[key].slice(0)) : isPlainObject(arg[key]) ? out[key] = mergeObjects(out[key] || {}, arg[key]) : Array.isArray(out[key]) ? out[key].push(arg[key]) : out[key] = arg[key];
        });
    }), out;
}, dispatchCustomEvent = (elem, eventName, eventOptions) => {
    eventOptions = mergeObjects({}, {
        bubbles: !0
    }, eventOptions);
    const eventObj = new CustomEvent(eventName, eventOptions);
    elem.dispatchEvent(eventObj);
}, finalizeFieldPromise = ({errors: errors, result: result}) => result ? Promise.resolve() : Promise.reject(errors), finalizeFormPromise = ({fields: fields, result: result}) => result ? Promise.resolve(fields) : Promise.reject(fields), formatMap = {
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
    if (dateFormat.includes(splitChar)) return dateFormat = dateFormat.replace(/[^YMD]/g, "-"), 
    dateString = dateString.split(splitChar), dateString = formatMap[dateFormat](dateString).join("");
}, mergeValidateFieldDefault = obj => mergeObjects({}, {
    result: !1,
    $field: null
}, obj), toCamelCase = string => string.replace(/-([a-z])/gi, (all, letter) => letter.toUpperCase()), customEvents_field = {
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
        const $dataChecks = $field.closest("form").querySelector('[name="' + $field.name + '"][data-checks]');
        return $dataChecks ? function($field) {
            const attrValue = JSON.parse($field.getAttribute("data-checks")), checkedLength = $field.closest("form").querySelectorAll('[name="' + $field.name + '"]:checked').length, isMinOk = checkedLength >= attrValue[0], isMaxOk = checkedLength <= attrValue[1], obj = {
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
        const valueLength = value.length, exactLength = 1 * $field.getAttribute("data-exact-length"), obj = {
            result: valueLength === exactLength
        };
        return obj.result || (obj.errors = {}, valueLength < exactLength ? obj.errors.minlength = !0 : obj.errors.maxlength = !0), 
        obj;
    },
    file: function(value, $field, fieldOptions) {
        const maxFileSize = 1 * ($field.getAttribute("data-max-file-size") || fieldOptions.maxFileSize), MIMEtype = $field.accept ? new RegExp($field.accept.replace("*", "[^\\/,]+")) : null, filesList = Array.from($field.files), obj = {
            result: !0
        };
        return filesList.forEach(file => {
            const exceedMaxFileSize = maxFileSize > 0 && file.size / 1024 / 1024 > maxFileSize, isAcceptedFileType = null === MIMEtype || MIMEtype.test(file.type);
            !exceedMaxFileSize && isAcceptedFileType || (obj.result = !1, void 0 === obj.errors && (obj.errors = {}), 
            exceedMaxFileSize && (obj.errors.maxFileSize = !0), isAcceptedFileType || (obj.errors.acceptedFileType = !0));
        }), obj;
    },
    length: function(value, $field) {
        const valueL = value.length, attrValue = JSON.parse($field.getAttribute("data-length")), isMinlengthOk = valueL >= attrValue[0], isMaxlengthOk = valueL <= attrValue[1], obj = {
            result: isMinlengthOk && isMaxlengthOk
        };
        return obj.result || (obj.errors = {}, isMinlengthOk || (obj.errors.minlength = !0), 
        isMaxlengthOk || (obj.errors.maxlength = !0)), obj;
    },
    max: function(value, $field) {
        let maxVal = $field.max;
        const dateFormat = $field.getAttribute("data-date-format");
        return ("date" === $field.type || dateFormat) && (value = getDateAsNumber(value, dateFormat), 
        maxVal = maxVal.split("-").join("")), maxVal *= 1, {
            result: (value *= 1) <= maxVal
        };
    },
    maxlength: function(value, $field) {
        return {
            result: value.length <= 1 * $field.maxLength
        };
    },
    min: function(value, $field) {
        let minVal = $field.min;
        const dateFormat = $field.getAttribute("data-date-format");
        return ("date" === $field.type || dateFormat) && (value = getDateAsNumber(value, dateFormat), 
        minVal = minVal.split("-").join("")), minVal *= 1, {
            result: (value *= 1) >= minVal
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
        const $fieldChecked = $field.closest("form").querySelector('[name="' + $field.name + '"]:checked');
        return {
            result: null !== $fieldChecked && $fieldChecked.value.trim().length > 0
        };
    }
};

function checkFieldValidity($field, fieldOptions, validationRules, validationErrors) {
    if (!isDOMNode($field)) {
        const obj = mergeValidateFieldDefault({
            $field: $field
        });
        return Promise.resolve(obj);
    }
    const $form = $field.closest("form"), isValidValue = $field.value.trim().length > 0, dataFieldOptions = ((fieldEl, attrName) => {
        const customAttrEl = fieldEl.closest("[" + attrName + "]");
        return customAttrEl && JSON.parse(customAttrEl.getAttribute(attrName)) || {};
    })($field, "data-field-options");
    if (fieldOptions = mergeObjects(fieldOptions, dataFieldOptions), "radio" === $field.type) {
        const $checked = $field.checked ? $field : $form.querySelector('[name="' + $field.name + '"]:checked'), reqMoreIsChecked = $checked && $checked.matches("[data-require-more]"), $findReqMore = reqMoreIsChecked ? $checked : $form.querySelector('[data-require-more][name="' + $field.name + '"]'), $findReqFrom = $findReqMore ? $form.querySelector('[data-required-from="#' + $findReqMore.id + '"]') : null;
        $checked && $findReqFrom && ($findReqFrom.required = $findReqMore.required && $findReqMore.checked, 
        reqMoreIsChecked ? fieldOptions.focusOnRelated && $findReqFrom.focus() : $findReqFrom.value = "");
    }
    if ($field.matches("[data-required-from]") && isValidValue) {
        const $reqMore = $form.querySelector($field.getAttribute("data-required-from"));
        $reqMore.checked = !0, $field.required = $reqMore.required;
    }
    const needsValidation = $field.required || $field.matches("[data-validate-if-filled]") && isValidValue;
    return (({functionsList: functionsList = [], data: data = {}, stopConditionFn: stopConditionFn = (() => !1)} = {}) => functionsList.reduce((acc, promiseFn) => acc.then(res => {
        let dataNew = mergeObjects({}, res[res.length - 1]);
        return stopConditionFn(dataNew) ? Promise.resolve(res) : new Promise(resolve => {
            resolve(promiseFn(dataNew));
        }).then((result = dataNew) => (res.push(result), res));
    }), Promise.resolve([ data ])).then(dataList => dataList.length > 1 ? dataList.slice(1) : dataList))({
        functionsList: fieldOptions.beforeValidation,
        data: {
            $field: $field,
            fieldOptions: fieldOptions
        }
    }).then(data => {
        const dataObj = data.pop();
        return new Promise(resolve => {
            needsValidation || (dataObj.result = !0), resolve(needsValidation ? function($field, fieldOptions, validationRules, validationErrors) {
                const fieldValue = $field.value, obj = mergeValidateFieldDefault({
                    result: fieldValue.trim().length > 0,
                    $field: $field
                }), isRadioOrCheckbox = /^(radio|checkbox)$/.test($field.type), hasSelectedInput = $field.closest("form").querySelectorAll('[name="' + $field.name + '"]:checked').length > 0;
                if (!isRadioOrCheckbox && !obj.result || isRadioOrCheckbox && !hasSelectedInput) return obj.result = !1, 
                obj.errors = {
                    empty: !0
                }, Promise.resolve(obj);
                const validationMethods = Array.from($field.attributes).reduce((accList, attr) => {
                    const attrName = toCamelCase(attr.name.replace("data-", "")), attrValue = toCamelCase(attr.value), isAttrValueWithFn = ("type" === attrName || "subtype" === attrName) && validationRules[attrValue], isAttrNameWithFn = validationRules[attrName];
                    return (isAttrValueWithFn || isAttrNameWithFn) && accList.push(isAttrValueWithFn ? attrValue : attrName), 
                    accList;
                }, []);
                return new Promise(resolve => {
                    resolve(validationMethods.reduce((accPromise, methodName) => accPromise.then(accObj => new Promise(resolveVal => {
                        resolveVal(validationRules[methodName](fieldValue, $field, fieldOptions));
                    }).then(valObj => {
                        if (!valObj.result) {
                            const errorObj = {};
                            void 0 !== valObj.errors && void 0 !== valObj.errors[methodName] || (errorObj[methodName] = !0), 
                            valObj.errors = mergeObjects({}, valObj.errors, errorObj);
                        }
                        return valObj = valObj.result ? {} : valObj, mergeObjects(accObj, valObj);
                    })), Promise.resolve(obj)));
                }).then(data => (data.result || (data.errors = validationMethods.reduce((accObj, methodName) => {
                    const errors = validationErrors[methodName] && validationErrors[methodName](fieldValue, $field) || {};
                    return mergeObjects(accObj, errors);
                }, data.errors)), data));
            }($field, fieldOptions, validationRules, validationErrors) : dataObj);
        });
    });
}

function checkFieldsValidity($fields, fieldOptions, validationRules, validationErrors, fieldToSkip = null) {
    fieldOptions = mergeObjects({}, fieldOptions, {
        focusOnRelated: !1
    });
    const $fieldsList = ($nodeList => {
        let currentFieldName = "", currentFieldType = "";
        return Array.from($nodeList).filter($field => {
            const name = $field.name, type = $field.type;
            return (name !== currentFieldName || type !== currentFieldType) && ($field.matches("[data-required-from]") || (currentFieldName = name, 
            currentFieldType = type), !0);
        });
    })($fields);
    return Promise.all($fieldsList.map($field => {
        if (fieldToSkip && $field === fieldToSkip) {
            const obj = mergeValidateFieldDefault({
                $field: $field,
                result: !0
            });
            return Promise.resolve(obj);
        }
        return checkFieldValidity($field, fieldOptions, validationRules, validationErrors);
    })).then(fields => {
        const areAllFieldsValid = fields.every(({result: result}) => result);
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
    constructor(form, optionsObj) {
        const argsL = arguments.length, checkFormElem = (form => {
            let isString = typeof form, isFormSelector = "string" === isString && isDOMNode(document.querySelector(form)) && "form" === document.querySelector(form).tagName.toLowerCase();
            return {
                result: isDOMNode(form) || isFormSelector,
                $el: "string" === isString ? document.querySelector(form) : form
            };
        })(form);
        if (0 === argsL || argsL > 0 && !form) throw new Error('First argument "form" is missing or falsy!');
        if (nodeList = form, NodeList.prototype.isPrototypeOf(nodeList)) throw new Error('First argument "form" must be a single DOM node or a form CSS selector, not a NodeList!');
        var nodeList;
        if (!checkFormElem.result) throw new Error('First argument "form" is not a DOM node nor a form CSS selector!');
        const self = this;
        self.$form = checkFormElem.$el, self.$form.formjs = self, self.options = mergeObjects({}, Form.prototype.options, optionsObj), 
        self.options.fieldOptions.beforeValidation = self.options.fieldOptions.beforeValidation.map(cbFn => cbFn.bind(self)), 
        self.$form.noValidate = !0, dispatchCustomEvent(self.$form, customEvents_form.init);
    }
    destroy() {
        delete this.$form.formjs, dispatchCustomEvent(this.$form, customEvents_form.destroy);
    }
    validateField(field, fieldOptions) {
        return checkFieldValidity("string" == typeof field ? this.$form.querySelector(field) : field, fieldOptions = mergeObjects({}, this.options.fieldOptions, fieldOptions), this.validationRules, this.validationErrors).then(obj => (dispatchCustomEvent(obj.$field, customEvents_field.validation, {
            detail: obj
        }), obj)).then(finalizeFieldPromise);
    }
    validateForm(fieldOptions) {
        const $form = this.$form;
        return checkFieldsValidity($form.querySelectorAll('input:not([type="reset"]):not([type="submit"]):not([type="button"]):not([type="hidden"]), select, textarea'), fieldOptions = mergeObjects({}, this.options.fieldOptions, fieldOptions), this.validationRules, this.validationErrors).then(data => (data.fields.forEach(obj => {
            obj.isCheckingForm = !0, dispatchCustomEvent(obj.$field, customEvents_field.validation, {
                detail: obj
            });
        }), dispatchCustomEvent($form, customEvents_form.validation, {
            detail: data
        }), data)).then(finalizeFormPromise);
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
Form.prototype.version = "5.4.0";

export { Form as default };
