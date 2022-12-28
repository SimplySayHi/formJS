/* formJS v5.4.0 | Valerio Di Punzio (@SimplySayHi) | https://valeriodipunzio.com/plugins/formJS/ | https://github.com/SimplySayHi/formJS | MIT license */
const addClass = (element, cssClasses) => {
    cssClasses.split(" ").forEach(className => {
        element.classList.add(className);
    });
}, isNodeList = nodeList => NodeList.prototype.isPrototypeOf(nodeList), removeClass = (element, cssClasses) => {
    cssClasses.split(" ").forEach(className => {
        element.classList.remove(className);
    });
}, isDOMNode = node => Element.prototype.isPrototypeOf(node), checkTouchedField = ($field, fieldOptions) => {
    const $container = $field.closest(fieldOptions.questionContainer) || $field;
    addClass($container, fieldOptions.cssClasses.touched);
}, customEvents_field = {
    validation: "fjs.field:validation"
}, customEvents_form = {
    destroy: "fjs.form:destroy",
    init: "fjs.form:init",
    submit: "fjs.form:submit",
    validation: "fjs.form:validation"
}, customEvents_group = {
    validation: "fjs.group:validation"
}, isPlainObject = object => "[object Object]" === Object.prototype.toString.call(object), mergeObjects = function(out = {}) {
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
}, excludeSelector = ':not([type="reset"]):not([type="submit"]):not([type="button"]):not([type="file"]):not([data-exclude-data])', fieldsStringSelector = 'input:not([type="reset"]):not([type="submit"]):not([type="button"]):not([type="hidden"]), select, textarea', finalizeFieldPromise = ({errors: errors, result: result}) => result ? Promise.resolve() : Promise.reject(errors), finalizeFieldsGroupPromise = ({canSubmit: canSubmit, fields: fields, group: group, result: result}) => result ? Promise.resolve({
    canSubmit: canSubmit,
    fields: fields,
    group: group
}) : Promise.reject({
    fields: fields,
    group: group
}), finalizeFormPromise = ({fields: fields, result: result}) => result ? Promise.resolve(fields) : Promise.reject(fields), formatMap = {
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
}, getInitialValues = $form => [ ...$form.querySelectorAll("input, select, textarea") ].filter($el => $el.matches(excludeSelector)).reduce((accData, {tagName: tagName, type: type, name: name, value: value, checked: checked, multiple: multiple, options: options}) => {
    const isCheckboxOrRadio = [ "checkbox", "radio" ].includes(type), isMultiCheckbox = "checkbox" === type && $form.querySelectorAll(`[name="${name}"]`).length > 1;
    if (void 0 !== accData[name] && isCheckboxOrRadio && !checked) return accData;
    if (void 0 === accData[name]) {
        if (isCheckboxOrRadio && !checked) return accData[name] = isMultiCheckbox ? [] : null, 
        accData;
        const isMultiSelect = "SELECT" === tagName && multiple, multiSelectValues = options && [ ...options ].filter(opt => opt.selected);
        accData[name] = isMultiSelect ? multiSelectValues : isMultiCheckbox ? [ value ] : value;
    } else isMultiCheckbox ? accData[name].push(value) : accData[name] = value;
    return accData;
}, {}), getJSONobjectFromFieldAttribute = (fieldEl, attrName) => {
    const customAttrEl = fieldEl.closest("[" + attrName + "]");
    return customAttrEl && JSON.parse(customAttrEl.getAttribute(attrName)) || {};
}, getUniqueFields = $nodeList => {
    let currentFieldName = "", currentFieldType = "";
    return Array.from($nodeList).filter($field => {
        const name = $field.name, type = $field.type;
        return (name !== currentFieldName || type !== currentFieldType) && ($field.matches("[data-required-from]") || (currentFieldName = name, 
        currentFieldType = type), !0);
    });
}, mergeValidateFieldDefault = obj => mergeObjects({}, {
    result: !1,
    $field: null
}, obj), mergeValidateFormDefault = obj => mergeObjects({}, {
    result: !0,
    fields: []
}, obj), isFieldForChangeEvent = $field => $field.matches('select, [type="radio"], [type="checkbox"], [type="file"]'), runFunctionsSequence = ({functionsList: functionsList = [], data: data = {}, stopConditionFn: stopConditionFn = (() => !1)} = {}) => functionsList.reduce((acc, promiseFn) => acc.then(res => {
    let dataNew = mergeObjects({}, res[res.length - 1]);
    return stopConditionFn(dataNew) ? Promise.resolve(res) : new Promise(resolve => {
        resolve(promiseFn(dataNew));
    }).then((result = dataNew) => (res.push(result), res));
}), Promise.resolve([ data ])).then(dataList => dataList.length > 1 ? dataList.slice(1) : dataList), serializeObject = obj => obj && "object" == typeof obj && obj.constructor === Object ? Object.keys(obj).reduce((a, k) => (a.push(k + "=" + encodeURIComponent(obj[k])), 
a), []).join("&") : obj, toCamelCase = string => string.replace(/-([a-z])/gi, (all, letter) => letter.toUpperCase()), options = {
    fieldOptions: {
        beforeValidation: [ function({$field: $field, fieldOptions: fieldOptions}) {
            const initialValues = $field.form.formjs._.initialValues;
            fieldOptions.trimValue && !isFieldForChangeEvent($field) && ($field.value = $field.value.trim()), 
            (($fields, fieldOptions) => {
                ($fields = isNodeList($fields) ? Array.from($fields) : [ $fields ]).forEach($field => {
                    if ("checkbox" !== $field.type && "radio" !== $field.type) {
                        const $container = $field.closest(fieldOptions.questionContainer) || $field;
                        $field.value ? addClass($container, fieldOptions.cssClasses.dirty) : removeClass($container, fieldOptions.cssClasses.dirty);
                    }
                });
            })($field, fieldOptions), (($field, initialValues, fieldOptions) => {
                const $container = $field.closest(fieldOptions.questionContainer) || $field;
                (({form: form, tagName: tagName, type: type, name: name, value: value, multiple: multiple, options: options}, initValues) => {
                    if (!(name in initValues)) return !0;
                    const isRadio = "radio" === type, isCheckbox = "checkbox" === type, isSelect = "SELECT" === tagName;
                    if (isCheckbox && form.querySelectorAll(`[name="${name}"]`).length > 1 || isSelect && multiple) {
                        const multiValues = isCheckbox ? [ ...form.querySelectorAll(`[name="${name}"]:checked`) ].map($el => $el.value) : [ ...options ].filter(opt => opt.selected);
                        return initValues[name].length !== multiValues.length || multiValues.filter(val => initValues[name].includes(val)).length !== initValues[name].length;
                    }
                    if (isRadio) {
                        const $checkedRadio = form.querySelector(`[name="${name}"]:checked`);
                        value = null, $checkedRadio && (value = $checkedRadio.value);
                    }
                    return value !== initValues[name];
                })($field, initialValues) ? addClass($container, fieldOptions.cssClasses.modified) : removeClass($container, fieldOptions.cssClasses.modified);
            })($field, initialValues, fieldOptions), fieldOptions.skipUIfeedback || addClass($field.closest(fieldOptions.questionContainer), fieldOptions.cssClasses.pending);
        } ],
        cssClasses: {
            dirty: "is-dirty",
            error: "has-error",
            errorEmpty: "has-error-empty",
            errorRule: "has-error-rule",
            modified: "is-modified",
            pending: "is-pending",
            touched: "is-touched",
            valid: "is-valid"
        },
        focusOnRelated: !0,
        maxFileSize: 10,
        onValidationCheckAll: !1,
        preventPasteFields: '[type="password"], [data-equal-to]',
        questionContainer: "[data-formjs-question]",
        skipUIfeedback: !1,
        strictHtmlValidation: !0,
        trimValue: !1,
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
        ajaxSubmit: !0,
        beforeSend: [],
        cssClasses: {
            ajaxComplete: "ajax-complete",
            ajaxError: "ajax-error",
            ajaxPending: "ajax-pending",
            ajaxSuccess: "ajax-success",
            error: "form-error",
            pending: "form-pending",
            submit: "is-submitting",
            valid: "is-valid"
        },
        getFormData: function($filteredFields, trimValues) {
            const formData = {}, $form = this.$form;
            let prevObj = formData;
            return $filteredFields.forEach($field => {
                const isCheckbox = "checkbox" === $field.type, isRadio = "radio" === $field.type, isSelect = $field.matches("select"), name = $field.name;
                let value = trimValues ? $field.value.trim() : $field.value;
                if (isCheckbox) {
                    value = $field.checked;
                    let $checkboxes = Array.from($form.querySelectorAll('[name="' + name + '"]'));
                    if ($checkboxes.length > 1) {
                        value = [], $checkboxes.filter(field => field.checked).forEach($field => {
                            value.push($field.value);
                        });
                    }
                } else if (isRadio) {
                    const $checkedRadio = $form.querySelector('[name="' + name + '"]:checked');
                    value = null === $checkedRadio ? null : $checkedRadio.value;
                } else if (isSelect) {
                    const $selectedOpts = Array.from($field.options).filter(option => option.selected);
                    $selectedOpts.length > 1 && (value = [], $selectedOpts.forEach($field => {
                        value.push($field.value);
                    }));
                }
                name.split(".").forEach((keyName, index, list) => {
                    const isLastKeyName = index + 1 === list.length;
                    if (Array.isArray(prevObj)) {
                        const keyNameSplit = keyName.split("___"), arrPos = keyNameSplit[0] - 1, arrayHasItemAtIndex = void 0 !== prevObj[arrPos], arrItemKeyName = keyNameSplit[1];
                        if (arrayHasItemAtIndex || prevObj.push({}), keyName = arrItemKeyName, isLastKeyName ? prevObj[arrPos][keyName] = value : void 0 === prevObj[arrPos][keyName] && (prevObj[arrPos][keyName] = {}), 
                        !isLastKeyName) return void (prevObj = prevObj[arrPos][keyName]);
                    } else {
                        const isKeyNameArray = keyName.endsWith("[]");
                        keyName = keyName.replace("[]", ""), isLastKeyName ? prevObj[keyName] = value : void 0 === prevObj[keyName] && (prevObj[keyName] = isKeyNameArray ? [] : {});
                    }
                    prevObj = isLastKeyName ? formData : prevObj[keyName];
                });
            }), formData;
        },
        groups: [],
        handleFileUpload: !0,
        handleSubmit: !0,
        nestedMultipartDataToJSON: !0,
        onInitCheckFilled: !0
    }
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
}, blurHandler = function(event) {
    const $field = event.target, {fieldOptions: fieldOptions} = $field.form.formjs.options;
    checkTouchedField($field, fieldOptions);
}, dataTypeNumber = function(event) {
    const $field = event.target;
    if ($field.matches('[data-type="number"]')) {
        let fieldValue = $field.value;
        if (/[^\d.,+-]/.test(fieldValue)) {
            event.stopImmediatePropagation();
            let valueReplaced = fieldValue.replace(/[^\d.,+-]/g, "");
            $field.value = valueReplaced;
        }
    }
}, formValidationEnd = function(event) {
    const {result: result, fields: fields} = event.detail, $form = event.target, {fieldOptions: fieldOptions, formOptions: {cssClasses: cssClasses}} = $form.formjs.options;
    if (fields[0].isCheckingForm ? fields.forEach(({$field: $field}) => {
        checkTouchedField($field, fieldOptions);
    }) : fields.forEach(({$field: $field}) => {
        removeClass($field.closest(fieldOptions.questionContainer), fieldOptions.cssClasses.pending);
    }), !fieldOptions.skipUIfeedback) {
        const feedbackClassesKey = result ? "valid" : "error";
        removeClass($form, `${cssClasses.pending} ${cssClasses.valid} ${cssClasses.error}`), 
        addClass($form, cssClasses[feedbackClassesKey]);
    }
}, keypressMaxlength = function(event) {
    const $field = event.target;
    if ($field.matches("[maxlength]")) {
        const maxLength = 1 * $field.maxLength, keyPressed = event.which || event.keyCode, allowedKeys = [ 8, 37, 38, 39, 46 ];
        if ($field.value.length >= maxLength && -1 === allowedKeys.indexOf(keyPressed)) return !1;
    }
}, pastePrevent = function(event) {
    const $field = event.target, fieldOptions = $field.closest("form").formjs.options.fieldOptions;
    $field.matches(fieldOptions.preventPasteFields) && event.preventDefault();
};

function ajaxCall($form, formDataObj, options) {
    let timeoutTimer;
    const ajaxOptions = mergeObjects({}, options.formOptions.ajaxOptions);
    ajaxOptions.body = formDataObj;
    const enctypeAttr = $form.getAttribute("enctype"), isMultipartForm = enctypeAttr && enctypeAttr.includes("multipart/form-data"), isMultipartHeader = ajaxOptions.headers["Content-Type"].includes("multipart/form-data");
    let bodyIsPlainObj = isPlainObject(ajaxOptions.body);
    if ((isMultipartForm || isMultipartHeader) && bodyIsPlainObj) {
        let formDataMultipart = ((dataObj, nestedToJSON = !0, formData = new FormData) => (function createFormData(obj, subKeyStr = "") {
            for (let i in obj) {
                const value = obj[i], subSubKeyString = Object.is(1 * i, Number.NaN) ? "." + i : "[" + i + "]", subKeyStrTrans = subKeyStr ? subKeyStr + subSubKeyString : i;
                "object" == typeof value && null != value ? nestedToJSON || Array.isArray(value) && 0 === value.length ? formData.append(subKeyStrTrans, JSON.stringify(value)) : createFormData(value, subKeyStrTrans) : formData.append(subKeyStrTrans, value);
            }
        }(dataObj), formData))(ajaxOptions.body, options.formOptions.nestedMultipartDataToJSON);
        options.formOptions.handleFileUpload && Array.from($form.querySelectorAll('[type="file"]')).forEach($field => {
            Array.from($field.files).forEach((file, idx) => {
                const name = $field.name + "[" + idx + "]";
                formDataMultipart.append(name, file, file.name);
            });
        }), ajaxOptions.body = formDataMultipart, bodyIsPlainObj = !1;
    }
    "GET" === ajaxOptions.method ? (ajaxOptions.url += (/\?/.test(ajaxOptions.url) ? "&" : "?") + serializeObject(ajaxOptions.body), 
    delete ajaxOptions.body) : ajaxOptions.headers["Content-Type"].includes("application/x-www-form-urlencoded") ? ajaxOptions.body = serializeObject(ajaxOptions.body) : bodyIsPlainObj && (ajaxOptions.body = JSON.stringify(ajaxOptions.body));
    if (!("string" == typeof ajaxOptions.body) && isMultipartForm && !isMultipartHeader && delete ajaxOptions.headers["Content-Type"], 
    ajaxOptions.headers = new Headers(ajaxOptions.headers), ajaxOptions.timeout > 0) {
        const controller = new AbortController, signal = controller.signal;
        ajaxOptions.signal = signal, timeoutTimer = window.setTimeout(() => {
            controller.abort();
        }, ajaxOptions.timeout);
    }
    return fetch(ajaxOptions.url, ajaxOptions).then(response => {
        if (!response.ok) throw new Error(response.statusText);
        const fetchMethod = ((response, options) => {
            const accept = options.headers.get("Accept"), contentType = response.headers.get("Content-Type"), headerOpt = accept || contentType || "";
            return headerOpt.includes("application/json") || "" === headerOpt ? "json" : headerOpt.includes("text/") ? "text" : "blob";
        })(response, ajaxOptions);
        return response[fetchMethod]();
    }).then(data => (addClass($form, options.formOptions.cssClasses.ajaxSuccess), data)).catch(error => {
        throw addClass($form, options.formOptions.cssClasses.ajaxError), new Error(error.message);
    }).finally(() => {
        timeoutTimer && window.clearTimeout(timeoutTimer), removeClass($form, options.formOptions.cssClasses.submit + " " + options.formOptions.cssClasses.ajaxPending), 
        addClass($form, options.formOptions.cssClasses.ajaxComplete), $form.querySelector('[type="submit"]').disabled = !1;
    });
}

function submit(event) {
    const $form = event.target, instance = $form.formjs, options = instance.options, formCssClasses = options.formOptions.cssClasses, isAjaxForm = options.formOptions.ajaxSubmit, $btn = $form.querySelector('[type="submit"]'), eventPreventDefault = (enableBtn = !0) => {
        $btn && enableBtn && ($btn.disabled = !1), event && event.preventDefault();
    };
    if (isAjaxForm && eventPreventDefault(!1), $btn) {
        if ($btn.disabled) return eventPreventDefault(!1), !1;
        $btn.disabled = !0;
    }
    removeClass($form, formCssClasses.ajaxComplete + " " + formCssClasses.ajaxError + " " + formCssClasses.ajaxSuccess), 
    instance.validateForm().then(data => {
        if (void 0 !== data.group && !data.canSubmit) return [ {
            stopExecution: !0
        } ];
        const beforeSendData = {
            stopExecution: !1,
            formData: isAjaxForm ? instance.getFormData() : null
        }, rfsObject = {
            functionsList: options.formOptions.beforeSend,
            data: beforeSendData,
            stopConditionFn: function(data) {
                return data.stopExecution;
            }
        };
        return runFunctionsSequence(rfsObject);
    }).then(dataList => {
        if (dataList.some(({stopExecution: stopExecution}) => stopExecution)) return eventPreventDefault(), 
        !1;
        if (addClass($form, formCssClasses.submit), isAjaxForm) {
            const formData = dataList.pop().formData;
            addClass($form, formCssClasses.ajaxPending), dispatchCustomEvent($form, customEvents_form.submit, {
                detail: ajaxCall($form, formData, options)
            });
        }
    }).catch(() => {
        eventPreventDefault(), removeClass($form, formCssClasses.submit);
    });
}

const groupValidationEnd = function(event) {
    const $form = event.target, {result: result, group: group, fields: fields} = event.detail, {fieldOptions: fieldOptions, formOptions: formOptions} = $form.formjs.options;
    if (result && ($form.formjs.currentGroup = group.next), fields[0].isCheckingGroup ? fields.forEach(({$field: $field}) => {
        checkTouchedField($field, fieldOptions);
    }) : fields.forEach(({$field: $field}) => {
        removeClass($field.closest(fieldOptions.questionContainer), fieldOptions.cssClasses.pending);
    }), !fieldOptions.skipUIfeedback) {
        removeClass($form, `${formOptions.cssClasses.pending} ${formOptions.cssClasses.valid} ${formOptions.cssClasses.error}`);
        const feedbackClassesKey = result ? group.next ? "" : "valid" : "error";
        feedbackClassesKey && addClass($form, formOptions.cssClasses[feedbackClassesKey]);
    }
}, validation = function(event) {
    const isChangeEvent = "change" === event.type, $field = event.target, self = $field.closest("form").formjs;
    if ($field.matches(fieldsStringSelector)) {
        const isFieldForChangeEventBoolean = isFieldForChangeEvent($field), hasOnlyChangeEvent = "change" === self.options.fieldOptions.validateOnEvents;
        (isFieldForChangeEventBoolean && isChangeEvent || !isFieldForChangeEventBoolean && (!isChangeEvent || hasOnlyChangeEvent)) && self.validateField($field).then(() => {
            const type = $field.type, $relatedEqualTo = $field.closest("form").querySelector('[data-equal-to="' + $field.name + '"]');
            ($field.required || $field.matches("[data-validate-if-filled]")) && "checkbox" !== type && "radio" !== type && $relatedEqualTo && "" !== $relatedEqualTo.value.trim() && self.validateField($relatedEqualTo).catch(() => {});
        }).catch(() => {});
    }
}, validationEnd = function(event) {
    const {$field: $field, result: result, errors: errors} = event.detail, dataFieldOptions = getJSONobjectFromFieldAttribute($field, "data-field-options"), {cssClasses: cssClasses, questionContainer: questionContainer, skipUIfeedback: skipUIfeedback} = mergeObjects({}, $field.form.formjs.options.fieldOptions, dataFieldOptions), $container = $field.closest(questionContainer), isReqFrom = $field.matches("[data-required-from]"), $reqMore = document.querySelector($field.getAttribute("data-required-from"));
    if ($container && !skipUIfeedback) {
        const formClasses = Object.values($field.form.formjs.options.formOptions.cssClasses).reduce((accString, cssClass) => `${accString} ${cssClass}`, "").trim();
        if (removeClass($field.form, formClasses), removeClass($container, cssClasses.pending), 
        result) {
            if (!isReqFrom || isReqFrom && $reqMore.checked) {
                const errorClasses = cssClasses.error + " " + cssClasses.errorEmpty + " " + cssClasses.errorRule;
                removeClass($container, errorClasses), addClass($container, cssClasses.valid);
            }
        } else {
            let extraErrorClass = cssClasses.errorRule;
            const isChecks = $field.matches("[data-checks]"), checkedElLength = isChecks ? $container.querySelectorAll('[name="' + $field.name + '"]:checked').length : 0;
            (!isChecks && errors && errors.empty || isChecks && 0 === checkedElLength) && (extraErrorClass = cssClasses.errorEmpty);
            let errorClasses = cssClasses.error + " " + extraErrorClass, errorClassToRemove = cssClasses.errorEmpty + " " + cssClasses.errorRule;
            removeClass($container, cssClasses.valid + " " + errorClassToRemove), addClass($container, errorClasses);
        }
    }
};

function checkFieldValidity($field, fieldOptions, validationRules, validationErrors) {
    if (!isDOMNode($field)) {
        const obj = mergeValidateFieldDefault({
            $field: $field
        });
        return Promise.resolve(obj);
    }
    const $form = $field.closest("form"), isValidValue = $field.value.trim().length > 0, dataFieldOptions = getJSONobjectFromFieldAttribute($field, "data-field-options");
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
    return runFunctionsSequence({
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
    const $fieldsList = getUniqueFields($fields);
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
        return mergeValidateFormDefault({
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
        if (isNodeList(form)) throw new Error('First argument "form" must be a single DOM node or a form CSS selector, not a NodeList!');
        if (!checkFormElem.result) throw new Error('First argument "form" is not a DOM node nor a form CSS selector!');
        const self = this;
        self.$form = checkFormElem.$el, self.$form.formjs = self, self.options = mergeObjects({}, Form.prototype.options, optionsObj), 
        self.currentGroup = self.options.formOptions.groups[0];
        [ "beforeValidation", "beforeSend", "getFormData" ].forEach(cbName => {
            const optionType = self.options.formOptions[cbName] ? "formOptions" : "fieldOptions";
            let cbOpt = self.options[optionType][cbName];
            cbOpt && (self.options[optionType][cbName] = Array.isArray(cbOpt) ? cbOpt.map(cbFn => cbFn.bind(self)) : cbOpt.bind(self));
        }), self._ = {
            initialValues: getInitialValues(self.$form),
            asyncInitEnd: function() {
                const onInitCheckFilled = self.options.formOptions.onInitCheckFilled;
                return this.initialValues = getInitialValues(self.$form), onInitCheckFilled ? self.validateFilledFields().catch(fields => fields) : Promise.resolve([]);
            }
        }, function($form, options) {
            $form.noValidate = !0;
            const fieldOptions = options.fieldOptions, formOptions = options.formOptions;
            if (fieldOptions.strictHtmlValidation && ($form.addEventListener("keypress", keypressMaxlength, !1), 
            $form.addEventListener("input", dataTypeNumber, !1)), fieldOptions.preventPasteFields && $form.querySelectorAll(fieldOptions.preventPasteFields).length && $form.addEventListener("paste", pastePrevent, !1), 
            $form.addEventListener("blur", blurHandler, !0), fieldOptions.validateOnEvents.split(" ").forEach(eventName => {
                const useCapture = /^(blur|focus)$/.test(eventName);
                $form.addEventListener(eventName, validation, useCapture);
            }), $form.addEventListener(customEvents_field.validation, validationEnd, !1), formOptions.groups.length > 0 && $form.addEventListener(customEvents_group.validation, groupValidationEnd, !1), 
            $form.addEventListener(customEvents_form.validation, formValidationEnd, !1), formOptions.handleSubmit && ($form.addEventListener("submit", submit), 
            formOptions.ajaxSubmit)) {
                const enctype = $form.getAttribute("enctype");
                enctype && !enctype.includes("multipart/form-data") && (formOptions.ajaxOptions.headers["Content-Type"] = enctype);
                const method = $form.getAttribute("method");
                method && (formOptions.ajaxOptions.method = method.toUpperCase());
                const action = $form.getAttribute("action");
                action && (formOptions.ajaxOptions.url = action);
            }
        }(self.$form, self.options);
        const initOptions = {};
        self.options.formOptions.onInitCheckFilled && (initOptions.detail = self.validateFilledFields().catch(fields => fields)), 
        dispatchCustomEvent(self.$form, customEvents_form.init, initOptions);
    }
    destroy() {
        !function($form, options) {
            options.fieldOptions.strictHtmlValidation && ($form.removeEventListener("keypress", keypressMaxlength, !1), 
            $form.removeEventListener("input", dataTypeNumber, !1)), options.fieldOptions.preventPasteFields && $form.removeEventListener("paste", pastePrevent, !1), 
            options.formOptions.handleSubmit && $form.removeEventListener("submit", submit), 
            $form.removeEventListener("blur", blurHandler, !0), options.fieldOptions.validateOnEvents.split(" ").forEach(eventName => {
                const useCapturing = [ "blur", "focus" ].includes(eventName);
                $form.removeEventListener(eventName, validation, useCapturing);
            }), $form.removeEventListener(customEvents_field.validation, validationEnd, !1), 
            options.formOptions.groups.length > 0 && $form.removeEventListener(customEvents_group.validation, groupValidationEnd, !1), 
            $form.removeEventListener(customEvents_form.validation, formValidationEnd, !1), 
            delete $form.formjs;
        }(this.$form, this.options), dispatchCustomEvent(this.$form, customEvents_form.destroy);
    }
    getFormData(trimValues = this.options.fieldOptions.trimValue) {
        const $formFields = this.$form.querySelectorAll("input, select, textarea"), $filteredFields = Array.from($formFields).filter(elem => elem.matches(excludeSelector));
        return this.options.formOptions.getFormData($filteredFields, trimValues);
    }
    validateField(field, fieldOptions) {
        const self = this, $form = self.$form;
        return checkFieldValidity("string" == typeof field ? $form.querySelector(field) : field, fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptions), self.validationRules, self.validationErrors).then(obj => {
            if (dispatchCustomEvent(obj.$field, customEvents_field.validation, {
                detail: obj
            }), obj.result) {
                if (fieldOptions.onValidationCheckAll) {
                    const selector = self.currentGroup || fieldsStringSelector;
                    checkFieldsValidity($form.querySelectorAll(selector), fieldOptions, self.validationRules, self.validationErrors, obj.$field).then(dataForm => {
                        const groups = self.options.formOptions.groups, validationEventName = self.currentGroup ? customEvents_group.validation : customEvents_form.validation;
                        groups.length > 0 && (dataForm.group = {
                            prev: groups[groups.indexOf(selector) - 1],
                            current: selector,
                            next: groups[groups.indexOf(selector) + 1]
                        }, dataForm.canSubmit = dataForm.result && !dataForm.group.next), dispatchCustomEvent($form, validationEventName, {
                            detail: dataForm
                        });
                    });
                }
            } else removeClass($form, self.options.formOptions.cssClasses.valid), addClass($form, self.options.formOptions.cssClasses.error);
            return obj;
        }).then(finalizeFieldPromise);
    }
    validateFieldsGroup(group = this.currentGroup, fieldOptions) {
        const self = this;
        fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptions);
        const $fields = self.$form.querySelectorAll(group);
        return fieldOptions.skipUIfeedback || addClass(self.$form, self.options.formOptions.cssClasses.pending), 
        checkFieldsValidity($fields, fieldOptions, self.validationRules, self.validationErrors).then(data => {
            data.fields.forEach(obj => {
                obj.isCheckingGroup = !0, dispatchCustomEvent(obj.$field, customEvents_field.validation, {
                    detail: obj
                });
            });
            const groups = self.options.formOptions.groups;
            return groups.length > 0 && (data.group = {
                prev: groups[groups.indexOf(group) - 1],
                current: group,
                next: groups[groups.indexOf(group) + 1]
            }, data.canSubmit = data.result && !data.group.next), dispatchCustomEvent(self.$form, customEvents_group.validation, {
                detail: data
            }), data;
        }).then(finalizeFieldsGroupPromise);
    }
    validateFilledFields(fieldOptions) {
        const $form = this.$form, $filledFields = ($form => getUniqueFields($form.querySelectorAll(fieldsStringSelector)).map($field => {
            const name = $field.name, type = $field.type, isCheckboxOrRadio = "checkbox" === type || "radio" === type, fieldChecked = $form.querySelector('[name="' + name + '"]:checked'), isReqFrom = $field.matches("[data-required-from]"), $reqMore = isReqFrom ? $form.querySelector($field.getAttribute("data-required-from")) : null;
            return isCheckboxOrRadio ? fieldChecked || null : isReqFrom && $reqMore.checked || !isReqFrom && $field.value ? $field : null;
        }).filter($field => null !== $field))($form), requiredFieldsLength = getUniqueFields($form.querySelectorAll(fieldsStringSelector)).filter($field => $field.required).length, formClasses = this.options.formOptions.cssClasses;
        if (0 === $filledFields.length) {
            const obj = mergeValidateFormDefault({
                result: !0,
                fields: []
            });
            return Promise.resolve(obj);
        }
        const skipUIfeedback = (fieldOptions = mergeObjects({}, this.options.fieldOptions, fieldOptions)).skipUIfeedback;
        return skipUIfeedback || addClass($form, formClasses.pending), checkFieldsValidity($filledFields, fieldOptions, this.validationRules, this.validationErrors).then(data => (data.fields.forEach(obj => {
            checkTouchedField(obj.$field, fieldOptions), dispatchCustomEvent(obj.$field, customEvents_field.validation, {
                detail: obj
            });
        }), skipUIfeedback || (removeClass($form, `${formClasses.pending} ${formClasses.valid} ${formClasses.error}`), 
        data.result && $filledFields.length === requiredFieldsLength ? addClass($form, formClasses.valid) : data.result || addClass($form, formClasses.error)), 
        data)).then(finalizeFormPromise);
    }
    validateForm(fieldOptions) {
        const self = this;
        if (fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptions), self.currentGroup) return self.validateFieldsGroup(self.currentGroup, fieldOptions);
        const $form = self.$form, $fields = $form.querySelectorAll(fieldsStringSelector);
        return fieldOptions.skipUIfeedback || addClass($form, self.options.formOptions.cssClasses.pending), 
        checkFieldsValidity($fields, fieldOptions, self.validationRules, self.validationErrors).then(data => (data.fields.forEach(obj => {
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

Form.prototype.options = options, Form.prototype.validationErrors = {}, Form.prototype.validationRules = validationRules, 
Form.prototype.version = "5.4.0";

export { Form as default };
