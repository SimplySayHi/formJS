/* formJS v6.0.0 | Valerio Di Punzio (@SimplySayHi) | https://valeriodipunzio.com/plugins/formJS/ | https://github.com/SimplySayHi/formJS | MIT license */
const addClass = ($el, cssClasses = "") => {
    $el && $el.classList.add(...cssClasses.split(" "));
}, isNodeList = nodeList => NodeList.prototype.isPrototypeOf(nodeList), removeClass = ($el, cssClasses = "") => {
    $el && $el.classList.remove(...cssClasses.split(" "));
}, isDOMNode = node => Element.prototype.isPrototypeOf(node), customEvents = {
    field: {
        validation: "fjs.field:validation"
    },
    form: {
        destroy: "fjs.form:destroy",
        init: "fjs.form:init",
        submit: "fjs.form:submit",
        validation: "fjs.form:validation"
    },
    group: {
        validation: "fjs.group:validation"
    }
}, mergeObjects = function(out = {}) {
    return Array.from(arguments).slice(1).filter((arg => !!arg)).forEach((arg => {
        Object.keys(arg).forEach((key => {
            var object;
            Array.isArray(arg[key]) ? out[key] = (out[key] || []).concat(arg[key].slice(0)) : (object = arg[key], 
            "[object Object]" === Object.prototype.toString.call(object) ? out[key] = mergeObjects(out[key] || {}, arg[key]) : Array.isArray(out[key]) ? out[key].push(arg[key]) : out[key] = arg[key]);
        }));
    })), out;
}, dispatchCustomEvent = ($el, eventName, eventOptions) => {
    const eventOptionsNew = mergeObjects({}, {
        bubbles: !0
    }, eventOptions), eventObj = new CustomEvent(eventName, eventOptionsNew);
    $el.dispatchEvent(eventObj);
}, fieldsStringSelector = 'input:not([type="reset"]):not([type="submit"]):not([type="button"]):not([type="hidden"]), select, textarea', finalizeFormPromise = ({fields: fields, result: result}) => result ? Promise.resolve(fields) : Promise.reject(fields), formatMap = {
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
}, getUniqueFields = $nodeList => {
    let currentFieldName = "", currentFieldType = "";
    return Array.from($nodeList).filter(($field => {
        const {name: name, type: type} = $field;
        return (name !== currentFieldName || type !== currentFieldType) && ($field.matches("[data-required-from]") || (currentFieldName = name, 
        currentFieldType = type), !0);
    }));
}, getFormFields = ($form, {unique: unique = !1, hidden: hidden = !0, file: file = !0, excludeData: excludeData = !0} = {}) => {
    const FIELDS_SELECTOR = `select, textarea, input:not([type="reset"]):not([type="submit"]):not([type="button"])${hidden ? "" : ':not([type="hidden"])'}${file ? "" : ':not([type="file"])'}${excludeData ? "" : ":not([data-exclude-data])"}`;
    return (unique ? getUniqueFields($form.elements) : Array.from($form.elements)).filter(($el => $el.matches(FIELDS_SELECTOR)));
}, getJSONobjectFromFieldAttribute = ($field, attrName) => {
    const $customAttr = $field.closest(`[${attrName}]`);
    return $customAttr && JSON.parse($customAttr.getAttribute(attrName)) || {};
}, mergeValidateFieldDefault = obj => mergeObjects({}, {
    result: !1,
    $field: null
}, obj), isFieldForChangeEvent = $field => $field.matches('select, [type="radio"], [type="checkbox"], [type="file"]'), runFunctionsSequence = async ({functionsList: functionsList = [], data: data = {}, stopConditionFn: stopConditionFn = (() => !1)} = {}) => await functionsList.reduce(((acc, promiseFn) => acc.then((res => {
    let dataNew = mergeObjects({}, res[res.length - 1]);
    return stopConditionFn(dataNew) ? Promise.resolve(res) : new Promise((resolve => {
        resolve(promiseFn(dataNew));
    })).then(((result = dataNew) => (res.push(result), res)));
}))), Promise.resolve([ data ])).then((dataList => dataList.length > 1 ? dataList.slice(1) : dataList)), serializeObject = obj => obj && "object" == typeof obj && obj.constructor === Object ? Object.keys(obj).reduce(((a, k) => (a.push(k + "=" + encodeURIComponent(obj[k])), 
a)), []).join("&") : obj, toCamelCase = string => string.replace(/-([a-z])/gi, ((all, letter) => letter.toUpperCase())), options = {
    fieldOptions: {
        beforeValidation: [ function({$field: $field, fieldOptions: fieldOptions}) {
            const $form = $field.form, $formFields = getFormFields($form), isValidValue = $field.value.trim().length > 0;
            if ("radio" === $field.type) {
                const $checked = $field.checked ? $field : $formFields.find(($el => $el.matches(`[name="${$field.name}"]:checked`))), reqMoreIsChecked = $checked && $checked.matches("[data-require-more]"), $findReqMore = reqMoreIsChecked ? $checked : $formFields.find(($el => $el.matches(`[data-require-more][name="${$field.name}"]`))), $findReqFrom = $findReqMore ? $formFields.find(($el => $el.matches(`[data-required-from="#${$findReqMore.id}"]`))) : null;
                $checked && $findReqFrom && ($findReqFrom.required = $findReqMore.required && $findReqMore.checked, 
                reqMoreIsChecked ? fieldOptions.focusOnRelated && $findReqFrom.focus() : $findReqFrom.value = "");
            }
            if ($field.matches("[data-required-from]") && isValidValue) {
                const $reqMore = $formFields.find(($el => $el.matches($field.dataset.requiredFrom)));
                $reqMore.checked = !0, $field.required = $reqMore.required;
            }
        }, function({$field: $field, fieldOptions: fieldOptions}) {
            fieldOptions.trimValue && !isFieldForChangeEvent($field) && ($field.value = $field.value.trim()), 
            (($fields, fieldOptions) => {
                (isNodeList($fields) ? Array.from($fields) : [ $fields ]).forEach(($field => {
                    if (![ "checkbox", "radio" ].includes($field.type)) {
                        const $container = $field.closest(fieldOptions.questionContainer) || $field;
                        $field.value ? addClass($container, fieldOptions.cssClasses.dirty) : removeClass($container, fieldOptions.cssClasses.dirty);
                    }
                }));
            })($field, fieldOptions), fieldOptions.skipUIfeedback || addClass($field.closest(fieldOptions.questionContainer), fieldOptions.cssClasses.pending);
        } ],
        cssClasses: {
            dirty: "is-dirty",
            error: "has-error",
            errorEmpty: "has-error-empty",
            errorRule: "has-error-rule",
            pending: "is-pending",
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
            submit: "is-submitting",
            valid: "is-valid"
        },
        getFormData: function($filteredFields, trimValues) {
            const formData = {}, $form = this.$form, $formFields = getFormFields($form);
            let prevObj = formData;
            return $filteredFields.forEach(($field => {
                const isCheckbox = "checkbox" === $field.type, isRadio = "radio" === $field.type, isSelect = $field.matches("select"), name = $field.name;
                let value = trimValues ? $field.value.trim() : $field.value;
                if (isCheckbox) {
                    value = $field.checked;
                    let $checkboxes = $formFields.filter(($el => $el.name === name));
                    if ($checkboxes.length > 1) {
                        value = [], $checkboxes.filter((field => field.checked)).forEach(($field => {
                            value.push($field.value);
                        }));
                    }
                } else if (isRadio) {
                    const $checkedRadio = $formFields.find(($el => $el.matches(`[name="${name}"]:checked`)));
                    value = $checkedRadio ? $checkedRadio.value : null;
                } else if (isSelect) {
                    const $selectedOpts = Array.from($field.options).filter((option => option.selected));
                    $selectedOpts.length > 1 && (value = [], $selectedOpts.forEach(($field => {
                        value.push($field.value);
                    })));
                }
                name.split(".").forEach(((keyName, index, list) => {
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
                }));
            })), formData;
        },
        groups: [],
        handleFileUpload: !0,
        handleSubmit: !0,
        onInitCheckFilled: !0
    }
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
    checkbox: function(value, $field) {
        const $dataChecks = getFormFields($field.form).find(($el => $el.matches(`[name="${$field.name}"][data-checks]`)));
        return $dataChecks ? function($field) {
            const attrValue = JSON.parse($field.dataset.checks), checkedLength = getFormFields($field.form).filter(($el => $el.matches(`[name="${$field.name}"]:checked`))).length, isMinOk = checkedLength >= attrValue[0], isMaxOk = checkedLength <= attrValue[1], obj = {
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
            result: value === getFormFields($field.form).find(($el => $el.matches(`[name="${$field.dataset.equalTo}"]`))).value
        };
    },
    exactLength: function(value, $field) {
        const valueLength = value.length, exactLength = 1 * $field.dataset.exactLength, obj = {
            result: valueLength === exactLength
        };
        return obj.result || (obj.errors = {}, valueLength < exactLength ? obj.errors.minlength = !0 : obj.errors.maxlength = !0), 
        obj;
    },
    file: function(value, $field, fieldOptions) {
        const maxFileSize = 1 * ($field.getAttribute("data-max-file-size") || fieldOptions.maxFileSize), MIMEtype = $field.accept ? new RegExp($field.accept.replace("*", "[^\\/,]+")) : null, filesList = Array.from($field.files), obj = {
            result: !0
        };
        return filesList.forEach((file => {
            const exceedMaxFileSize = maxFileSize > 0 && file.size / 1024 / 1024 > maxFileSize, isAcceptedFileType = null === MIMEtype || MIMEtype.test(file.type);
            !exceedMaxFileSize && isAcceptedFileType || (obj.result = !1, void 0 === obj.errors && (obj.errors = {}), 
            exceedMaxFileSize && (obj.errors.maxFileSize = !0), isAcceptedFileType || (obj.errors.acceptedFileType = !0));
        })), obj;
    },
    length: function(value, $field) {
        const valueL = value.length, attrValue = JSON.parse($field.dataset.length), isMinlengthOk = valueL >= attrValue[0], isMaxlengthOk = valueL <= attrValue[1], obj = {
            result: isMinlengthOk && isMaxlengthOk
        };
        return obj.result || (obj.errors = {}, isMinlengthOk || (obj.errors.minlength = !0), 
        isMaxlengthOk || (obj.errors.maxlength = !0)), obj;
    },
    max: function(value, $field) {
        let maxVal = $field.max;
        const dateFormat = $field.dataset.dateFormat;
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
        const dateFormat = $field.dataset.dateFormat;
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
        const $fieldChecked = getFormFields($field.form).find(($el => $el.matches(`[name="${$field.name}"]:checked`)));
        return {
            result: null !== $fieldChecked && $fieldChecked.value.trim().length > 0
        };
    }
}, dataTypeNumber = function(event) {
    const $field = event.target;
    if ($field.matches('[data-type="number"]')) {
        const fieldValue = $field.value;
        if (/[^\d.,+\-]/.test(fieldValue)) {
            event.stopImmediatePropagation();
            const valueReplaced = fieldValue.replace(/[^\d.,+\-]/g, "");
            $field.value = valueReplaced;
        }
    }
}, formValidationEnd = function(event) {
    const $form = event.target, {fieldOptions: fieldOptions, formOptions: formOptions} = $form.formjs.options;
    if (!fieldOptions.skipUIfeedback) {
        const formClasses = formOptions.cssClasses.valid;
        event.detail.result ? addClass($form, formClasses) : removeClass($form, formClasses);
    }
}, keypressMaxlength = function(event) {
    const $field = event.target;
    if ($field.matches("[maxlength]")) {
        const maxLength = 1 * $field.maxLength, keyPressed = event.which || event.keyCode, allowedKeys = [ 8, 37, 38, 39, 46 ];
        if ($field.value.length >= maxLength && -1 === allowedKeys.indexOf(keyPressed)) return !1;
    }
}, pastePrevent = function(event) {
    const $field = event.target, fieldOptions = $field.form.formjs.options.fieldOptions;
    $field.matches(fieldOptions.preventPasteFields) && event.preventDefault();
}, getFetchMethod = (response, options) => {
    const accept = options.headers.get("Accept"), contentType = response.headers.get("Content-Type"), headerOpt = accept || contentType || "";
    return headerOpt.indexOf("application/json") > -1 || "" === headerOpt ? "json" : headerOpt.indexOf("text/") > -1 ? "text" : "blob";
};

async function ajaxCall($form, formDataObj, options) {
    let timeoutTimer;
    const {formOptions: formOptions} = options, ajaxOptions = mergeObjects({}, formOptions.ajaxOptions), isMultipart = "multipart/form-data" === ajaxOptions.headers["Content-Type"];
    if (ajaxOptions.body = formDataObj, isMultipart && formOptions.handleFileUpload) {
        let formDataMultipart = new FormData;
        for (let key in ajaxOptions.body) formDataMultipart.append(key, ajaxOptions.body[key]);
        getFormFields($form).filter(($el => "file" === $el.type)).forEach(($field => {
            Array.from($field.files).forEach(((file, idx) => {
                const name = `${$field.name}[${idx}]`;
                formDataMultipart.append(name, file, file.name);
            }));
        })), ajaxOptions.body = formDataMultipart;
    }
    if ("GET" === ajaxOptions.method ? (ajaxOptions.url += (/\?/.test(ajaxOptions.url) ? "&" : "?") + serializeObject(ajaxOptions.body), 
    delete ajaxOptions.body) : ajaxOptions.headers["Content-Type"].indexOf("application/x-www-form-urlencoded") > -1 ? ajaxOptions.body = serializeObject(ajaxOptions.body) : isMultipart || (ajaxOptions.body = JSON.stringify(ajaxOptions.body)), 
    ajaxOptions.headers = new Headers(ajaxOptions.headers), ajaxOptions.timeout > 0) {
        const controller = new AbortController, signal = controller.signal;
        ajaxOptions.signal = signal, timeoutTimer = window.setTimeout((() => {
            controller.abort();
        }), ajaxOptions.timeout);
    }
    return await fetch(ajaxOptions.url, ajaxOptions).then((response => {
        if (!response.ok) throw new Error(response.statusText);
        return response[getFetchMethod(response, ajaxOptions)]();
    })).then((data => (addClass($form, formOptions.cssClasses.ajaxSuccess), data))).catch((error => {
        throw addClass($form, formOptions.cssClasses.ajaxError), new Error(error.message);
    })).finally((() => {
        timeoutTimer && window.clearTimeout(timeoutTimer), removeClass($form, `${formOptions.cssClasses.submit} ${formOptions.cssClasses.ajaxPending}`), 
        addClass($form, formOptions.cssClasses.ajaxComplete), Array.from($form.elements).find(($el => "submit" === $el.type)).disabled = !1;
    }));
}

function submit(event) {
    const $form = event.target, instance = $form.formjs, options = instance.options, formCssClasses = options.formOptions.cssClasses, isAjaxForm = options.formOptions.ajaxSubmit, $btn = Array.from($form.elements).find(($el => $el.matches('[type="submit"]'))), eventPreventDefault = (enableBtn = !0) => {
        $btn && enableBtn && ($btn.disabled = !1), event && event.preventDefault();
    };
    if (isAjaxForm && eventPreventDefault(!1), $btn) {
        if ($btn.disabled) return eventPreventDefault(!1), !1;
        $btn.disabled = !0;
    }
    removeClass($form, `${formCssClasses.ajaxComplete} ${formCssClasses.ajaxError} ${formCssClasses.ajaxSuccess}`), 
    addClass($form, formCssClasses.submit), instance.validateForm().then((async data => {
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
        return await runFunctionsSequence(rfsObject);
    })).then((dataList => {
        if (dataList.some((({stopExecution: stopExecution}) => stopExecution))) return eventPreventDefault(), 
        !1;
        if (isAjaxForm) {
            const {formData: formData} = dataList.pop();
            addClass($form, formCssClasses.ajaxPending), dispatchCustomEvent($form, customEvents.form.submit, {
                detail: ajaxCall($form, formData, options)
            });
        }
    })).catch((() => {
        eventPreventDefault(), removeClass($form, formCssClasses.submit);
    }));
}

const groupValidationEnd = function(event) {
    const detail = event.detail;
    detail.result && (event.target.formjs.currentGroup = detail.group.next);
}, validation = function(event) {
    const isChangeEvent = "change" === event.type, $field = event.target, self = $field.form.formjs;
    if ($field.matches(fieldsStringSelector)) {
        const isFieldForChangeEventBoolean = isFieldForChangeEvent($field), hasOnlyChangeEvent = "change" === self.options.fieldOptions.validateOnEvents;
        (isFieldForChangeEventBoolean && isChangeEvent || !isFieldForChangeEventBoolean && (!isChangeEvent || hasOnlyChangeEvent)) && self.validateField($field).then((() => {
            const type = $field.type, $relatedEqualTo = getFormFields($field.form).find(($el => $el.matches(`[data-equal-to="${$field.name}"]`)));
            ($field.required || $field.matches("[data-validate-if-filled]")) && "checkbox" !== type && "radio" !== type && $relatedEqualTo && "" !== $relatedEqualTo.value.trim() && self.validateField($relatedEqualTo).catch((errors => {}));
        })).catch((errors => {}));
    }
}, validationEnd = function(event) {
    const eventDetail = event.detail, $field = eventDetail.$field, $form = $field.form, dataFieldOptions = getJSONobjectFromFieldAttribute($field, "data-field-options"), fieldOptions = mergeObjects({}, $form.formjs.options.fieldOptions, dataFieldOptions), $container = $field.closest(fieldOptions.questionContainer), isReqFrom = $field.matches("[data-required-from]"), $reqMore = getFormFields($form).find(($el => $el.matches($field.dataset.requiredFrom)));
    if (!fieldOptions.skipUIfeedback) if (removeClass($container, fieldOptions.cssClasses.pending), 
    eventDetail.result) {
        if (!isReqFrom || isReqFrom && $reqMore.checked) {
            const errorClasses = `${fieldOptions.cssClasses.error} ${fieldOptions.cssClasses.errorEmpty} ${fieldOptions.cssClasses.errorRule}`;
            removeClass($container, errorClasses), addClass($container, fieldOptions.cssClasses.valid);
        }
    } else {
        let extraErrorClass = fieldOptions.cssClasses.errorRule;
        const isChecks = $field.matches("[data-checks]"), checkedElLength = isChecks ? getFormFields($form).filter(($el => $el.matches(`[name="${$field.name}"]:checked`))).length : 0;
        (!isChecks && eventDetail.errors && eventDetail.errors.empty || isChecks && 0 === checkedElLength) && (extraErrorClass = fieldOptions.cssClasses.errorEmpty);
        const errorClasses = `${fieldOptions.cssClasses.error} ${extraErrorClass}`, errorClassToRemove = `${fieldOptions.cssClasses.errorEmpty} ${fieldOptions.cssClasses.errorRule}`;
        removeClass($container, `${fieldOptions.cssClasses.valid} ${errorClassToRemove}`), 
        addClass($container, errorClasses), removeClass($form, $form.formjs.options.formOptions.cssClasses.valid);
    }
};

async function checkFieldValidity($field, fieldOptions, validationRules, validationErrors) {
    if (!isDOMNode($field)) {
        const obj = mergeValidateFieldDefault({
            $field: $field
        });
        return Promise.resolve(obj);
    }
    const dataFieldOptions = getJSONobjectFromFieldAttribute($field, "data-field-options"), fieldOptionsTemp = mergeObjects({}, fieldOptions, dataFieldOptions), dataBeforeValidation = (await runFunctionsSequence({
        functionsList: fieldOptionsTemp.beforeValidation,
        data: {
            $field: $field,
            fieldOptions: fieldOptionsTemp
        }
    })).pop(), isValidValue = $field.value.trim().length > 0, needsValidation = $field.required || $field.matches("[data-validate-if-filled]") && isValidValue;
    return needsValidation || (delete dataBeforeValidation.fieldOptions, dataBeforeValidation.result = !0), 
    needsValidation ? await async function($field, fieldOptions, validationRules, validationErrors) {
        const fieldValue = $field.value, obj = mergeValidateFieldDefault({
            result: fieldValue.trim().length > 0,
            $field: $field
        }), isCheckboxOrRadio = [ "checkbox", "radio" ].includes($field.type), hasSelectedInput = getFormFields($field.form).filter(($el => $el.matches(`[name="${$field.name}"]:checked`))).length > 0;
        if (!isCheckboxOrRadio && !obj.result || isCheckboxOrRadio && !hasSelectedInput) return obj.result = !1, 
        obj.errors = {
            empty: !0
        }, Promise.resolve(obj);
        const validationMethods = Array.from($field.attributes).reduce(((accList, attr) => {
            const attrName = toCamelCase(attr.name.replace("data-", "")), attrValue = toCamelCase(attr.value), isAttrValueWithFn = [ "type", "subtype" ].includes(attrName) && validationRules[attrValue], isAttrNameWithFn = validationRules[attrName];
            return (isAttrValueWithFn || isAttrNameWithFn) && accList.push(isAttrValueWithFn ? attrValue : attrName), 
            accList;
        }), []), validity = await new Promise((resolve => {
            resolve(validationMethods.reduce(((accPromise, methodName) => accPromise.then((accObj => new Promise((resolveVal => {
                resolveVal(validationRules[methodName](fieldValue, $field, fieldOptions));
            })).then((valObj => {
                if (!valObj.result) {
                    const errorObj = {};
                    void 0 !== valObj.errors && void 0 !== valObj.errors[methodName] || (errorObj[methodName] = !0), 
                    valObj.errors = mergeObjects({}, valObj.errors, errorObj);
                }
                return valObj = valObj.result ? {} : valObj, mergeObjects(accObj, valObj);
            }))))), Promise.resolve(obj)));
        }));
        return validity.result || (validity.errors = validationMethods.reduce(((accObj, methodName) => {
            const errors = validationErrors[methodName] && validationErrors[methodName](fieldValue, $field) || {};
            return mergeObjects(accObj, errors);
        }), validity.errors)), validity;
    }($field, fieldOptionsTemp, validationRules, validationErrors) : dataBeforeValidation;
}

async function checkFieldsValidity($fields, fieldOptions, validationRules, validationErrors, fieldToSkip = {}) {
    const fieldOptionsTemp = mergeObjects({}, fieldOptions, {
        focusOnRelated: !1
    }), $fieldsList = getUniqueFields($fields), fieldsValidity = await Promise.all($fieldsList.map((async $field => fieldToSkip.$field && $field === fieldToSkip.$field ? Promise.resolve(fieldToSkip) : await checkFieldValidity($field, fieldOptionsTemp, validationRules, validationErrors)))), areAllFieldsValid = fieldsValidity.every((({result: result}) => result));
    return mergeObjects({}, {
        result: !0,
        fields: []
    }, {
        result: areAllFieldsValid,
        fields: fieldsValidity
    });
}

class Form {
    constructor(form, options) {
        const argsL = arguments.length, {$el: $el, result: result} = (form => {
            const formIsString = "string" == typeof form, isFormSelector = formIsString && isDOMNode(document.querySelector(form)) && "form" === document.querySelector(form).tagName.toLowerCase();
            return {
                result: isDOMNode(form) || isFormSelector,
                $el: formIsString ? document.querySelector(form) : form
            };
        })(form);
        if (0 === argsL || argsL > 0 && !form) throw new Error('First argument "form" is missing or falsy!');
        if (isNodeList(form)) throw new Error('First argument "form" must be a single DOM node or a form CSS selector, not a NodeList!');
        if (!result) throw new Error('First argument "form" is not a DOM node nor a form CSS selector!');
        const self = this;
        self.$form = $el, self.$form.formjs = self, self.options = mergeObjects({}, Form.prototype.options, options), 
        self.currentGroup = self.options.formOptions.groups[0];
        [ "beforeValidation", "beforeSend", "getFormData" ].forEach((cbName => {
            const optionType = self.options.formOptions[cbName] ? "formOptions" : "fieldOptions";
            let cbOpt = self.options[optionType][cbName];
            cbOpt && (self.options[optionType][cbName] = Array.isArray(cbOpt) ? cbOpt.map((cbFn => cbFn.bind(self))) : cbOpt.bind(self));
        })), function($form, options) {
            const {fieldOptions: fieldOptions, formOptions: formOptions} = options;
            $form.noValidate = !0, fieldOptions.strictHtmlValidation && ($form.addEventListener("keypress", keypressMaxlength, !1), 
            $form.addEventListener("input", dataTypeNumber, !1)), fieldOptions.preventPasteFields && getFormFields($form).filter(($el => $el.matches(fieldOptions.preventPasteFields))).length && $form.addEventListener("paste", pastePrevent, !1), 
            fieldOptions.validateOnEvents.split(" ").forEach((eventName => {
                const useCapture = [ "blur", "focus" ].includes(eventName);
                $form.addEventListener(eventName, validation, useCapture);
            })), $form.addEventListener(customEvents.field.validation, validationEnd, !1), formOptions.groups.length > 0 && $form.addEventListener(customEvents.group.validation, groupValidationEnd, !1), 
            $form.addEventListener(customEvents.form.validation, formValidationEnd, !1), formOptions.handleSubmit && ($form.addEventListener("submit", submit), 
            formOptions.ajaxSubmit && ($form.getAttribute("enctype") && (formOptions.ajaxOptions.headers["Content-Type"] = $form.getAttribute("enctype")), 
            $form.getAttribute("method") && (formOptions.ajaxOptions.method = $form.getAttribute("method").toUpperCase()), 
            $form.getAttribute("action") && (formOptions.ajaxOptions.url = $form.getAttribute("action"))));
        }(self.$form, self.options);
        const initOptions = {};
        self.options.formOptions.onInitCheckFilled && (initOptions.detail = self.validateFilledFields().catch((fields => {}))), 
        dispatchCustomEvent(self.$form, customEvents.form.init, initOptions);
    }
    destroy() {
        const {$form: $form, options: options} = this;
        !function($form, options) {
            const {fieldOptions: fieldOptions, formOptions: formOptions} = options;
            fieldOptions.strictHtmlValidation && ($form.removeEventListener("keypress", keypressMaxlength, !1), 
            $form.removeEventListener("input", dataTypeNumber, !1)), fieldOptions.preventPasteFields && $form.removeEventListener("paste", pastePrevent, !1), 
            formOptions.handleSubmit && $form.removeEventListener("submit", submit), fieldOptions.validateOnEvents.split(" ").forEach((eventName => {
                const useCapturing = "blur" === eventName;
                $form.removeEventListener(eventName, validation, useCapturing);
            })), $form.removeEventListener(customEvents.field.validation, validationEnd, !1), 
            formOptions.groups.length > 0 && $form.removeEventListener(customEvents.group.validation, groupValidationEnd, !1), 
            $form.removeEventListener(customEvents.form.validation, formValidationEnd, !1), 
            delete $form.formjs;
        }($form, options), dispatchCustomEvent($form, customEvents.form.destroy);
    }
    getFormData(trimValues = this.options.fieldOptions.trimValue) {
        return this.options.formOptions.getFormData(this.$dataFields, trimValues);
    }
    async validateField(field, fieldOptions) {
        const {$fields: $fields, $form: $form, currentGroup: currentGroup, options: options, validationErrors: validationErrors, validationRules: validationRules} = this;
        let $field = field;
        if ("string" == typeof field) {
            const element = $form.elements.namedItem(field);
            $field = isDOMNode(element) ? element : element[0];
        }
        const fieldOptionsTemp = mergeObjects({}, options.fieldOptions, fieldOptions), fieldValidity = await checkFieldValidity($field, fieldOptionsTemp, validationRules, validationErrors);
        if (dispatchCustomEvent(fieldValidity.$field, customEvents.field.validation, {
            detail: fieldValidity
        }), fieldOptionsTemp.onValidationCheckAll) {
            const selector = currentGroup || fieldsStringSelector;
            checkFieldsValidity($fields.filter(($el => $el.matches(selector))), mergeObjects({}, fieldOptionsTemp, {
                skipUIfeedback: !0
            }), validationRules, validationErrors, fieldValidity).then((dataForm => {
                const {groups: groups} = options.formOptions, validationEventName = currentGroup ? customEvents.group.validation : customEvents.form.validation;
                groups.length > 0 && (dataForm.group = {
                    prev: groups[groups.indexOf(selector) - 1],
                    current: selector,
                    next: groups[groups.indexOf(selector) + 1]
                }, dataForm.canSubmit = dataForm.result && !dataForm.group.next), dispatchCustomEvent($form, validationEventName, {
                    detail: dataForm
                });
            }));
        }
        return (({errors: errors, result: result}) => result ? Promise.resolve() : Promise.reject(errors))(fieldValidity);
    }
    async validateFieldsGroup(group = this.currentGroup, fieldOptions) {
        const {$fields: $fields, $form: $form, options: options, validationErrors: validationErrors, validationRules: validationRules} = this, fieldOptionsTemp = mergeObjects({}, options.fieldOptions, fieldOptions), $fieldsGroup = $fields.filter(($el => $el.matches(group))), groupValidity = await checkFieldsValidity($fieldsGroup, fieldOptionsTemp, validationRules, validationErrors);
        groupValidity.fields.forEach((obj => {
            obj.isCheckingGroup = !0, dispatchCustomEvent(obj.$field, customEvents.field.validation, {
                detail: obj
            });
        }));
        const groups = options.formOptions.groups;
        return groups.length > 0 && (groupValidity.group = {
            prev: groups[groups.indexOf(group) - 1],
            current: group,
            next: groups[groups.indexOf(group) + 1]
        }, groupValidity.canSubmit = groupValidity.result && !groupValidity.group.next), 
        dispatchCustomEvent($form, customEvents.group.validation, {
            detail: groupValidity
        }), (({canSubmit: canSubmit, fields: fields, group: group, result: result}) => result ? Promise.resolve({
            canSubmit: canSubmit,
            fields: fields,
            group: group
        }) : Promise.reject({
            fields: fields,
            group: group
        }))(groupValidity);
    }
    async validateFilledFields(fieldOptions) {
        const {$form: $form, options: options, validationErrors: validationErrors, validationRules: validationRules} = this, $filledFields = ($form => {
            const $formFields = getFormFields($form, {
                unique: !0,
                hidden: !1
            });
            return $formFields.map(($field => {
                const {dataset: dataset, name: name, type: type, value: value} = $field, isCheckboxOrRadio = [ "checkbox", "radio" ].includes(type), fieldChecked = $formFields.find(($el => $el.matches(`[name="${name}"]:checked`))), isReqFrom = $field.matches("[data-required-from]"), $reqMore = isReqFrom ? $formFields.find(($el => $el.matches(dataset.requiredFrom))) : null;
                return isCheckboxOrRadio ? fieldChecked || null : isReqFrom && $reqMore.checked || !isReqFrom && value ? $field : null;
            })).filter(($field => null !== $field));
        })($form), fieldOptionsTemp = mergeObjects({}, options.fieldOptions, fieldOptions), filledFieldsValidity = await checkFieldsValidity($filledFields, fieldOptionsTemp, validationRules, validationErrors);
        return filledFieldsValidity.fields.forEach((obj => {
            dispatchCustomEvent(obj.$field, customEvents.field.validation, {
                detail: obj
            });
        })), finalizeFormPromise(filledFieldsValidity);
    }
    async validateForm(fieldOptions) {
        const {$form: $form, $visibleFields: $visibleFields, currentGroup: currentGroup, options: options, validationErrors: validationErrors, validationRules: validationRules} = this, fieldOptionsTemp = mergeObjects({}, options.fieldOptions, fieldOptions);
        if (currentGroup) return await this.validateFieldsGroup(currentGroup, fieldOptionsTemp);
        const formValidity = await checkFieldsValidity($visibleFields, fieldOptionsTemp, validationRules, validationErrors);
        return formValidity.fields.forEach((obj => {
            obj.isCheckingForm = !0, dispatchCustomEvent(obj.$field, customEvents.field.validation, {
                detail: obj
            });
        })), dispatchCustomEvent($form, customEvents.form.validation, {
            detail: formValidity
        }), finalizeFormPromise(formValidity);
    }
    get $fields() {
        return getFormFields(this.$form);
    }
    get $dataFields() {
        return getFormFields(this.$form, {
            file: !1,
            excludeData: !1
        });
    }
    get $groupFields() {
        return this.$fields.filter(($el => $el.matches(this.currentGroup)));
    }
    get $uniqueFields() {
        return getFormFields(this.$form, {
            unique: !0
        });
    }
    get $visibleFields() {
        return getFormFields(this.$form, {
            hidden: !1
        });
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
Form.prototype.version = "6.0.0";

export { Form as default };
