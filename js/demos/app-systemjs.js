System.register([], (function () {
  'use strict';
  return {
    execute: (function () {

      function _typeof(obj) {
        "@babel/helpers - typeof";

        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
          return typeof obj;
        } : function (obj) {
          return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }, _typeof(obj);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", {
          writable: false
        });
        return Constructor;
      }
      function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
      }
      function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) return _arrayLikeToArray(arr);
      }
      function _iterableToArray(iter) {
        if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
      }
      function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
      }
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
        return arr2;
      }
      function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }

      /* formJS v5.4.0 | Valerio Di Punzio (@SimplySayHi) | https://valeriodipunzio.com/plugins/formJS/ | https://github.com/SimplySayHi/formJS | MIT license */
      var addClass = function addClass(element, cssClasses) {
          cssClasses.split(" ").forEach(function (className) {
            element.classList.add(className);
          });
        },
        isNodeList = function isNodeList(nodeList) {
          return NodeList.prototype.isPrototypeOf(nodeList);
        },
        removeClass = function removeClass(element, cssClasses) {
          cssClasses.split(" ").forEach(function (className) {
            element.classList.remove(className);
          });
        },
        isDOMNode = function isDOMNode(node) {
          return Element.prototype.isPrototypeOf(node);
        },
        checkTouchedField = function checkTouchedField($field, fieldOptions) {
          var $container = $field.closest(fieldOptions.questionContainer) || $field;
          addClass($container, fieldOptions.cssClasses.touched);
        },
        customEvents_field = {
          validation: "fjs.field:validation"
        },
        customEvents_form = {
          destroy: "fjs.form:destroy",
          init: "fjs.form:init",
          submit: "fjs.form:submit",
          validation: "fjs.form:validation"
        },
        customEvents_group = {
          validation: "fjs.group:validation"
        },
        isPlainObject = function isPlainObject(object) {
          return "[object Object]" === Object.prototype.toString.call(object);
        },
        mergeObjects = function mergeObjects() {
          var out = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          return Array.from(arguments).slice(1).filter(function (arg) {
            return !!arg;
          }).forEach(function (arg) {
            Object.keys(arg).forEach(function (key) {
              Array.isArray(arg[key]) ? out[key] = (out[key] || []).concat(arg[key].slice(0)) : isPlainObject(arg[key]) ? out[key] = mergeObjects(out[key] || {}, arg[key]) : Array.isArray(out[key]) ? out[key].push(arg[key]) : out[key] = arg[key];
            });
          }), out;
        },
        dispatchCustomEvent = function dispatchCustomEvent(elem, eventName, eventOptions) {
          eventOptions = mergeObjects({}, {
            bubbles: !0
          }, eventOptions);
          var eventObj = new CustomEvent(eventName, eventOptions);
          elem.dispatchEvent(eventObj);
        },
        excludeSelector = ':not([type="reset"]):not([type="submit"]):not([type="button"]):not([type="file"]):not([data-exclude-data])',
        fieldsStringSelector = 'input:not([type="reset"]):not([type="submit"]):not([type="button"]):not([type="hidden"]), select, textarea',
        finalizeFieldPromise = function finalizeFieldPromise(_ref) {
          var errors = _ref.errors,
            result = _ref.result;
          return result ? Promise.resolve() : Promise.reject(errors);
        },
        finalizeFieldsGroupPromise = function finalizeFieldsGroupPromise(_ref2) {
          var canSubmit = _ref2.canSubmit,
            fields = _ref2.fields,
            group = _ref2.group,
            result = _ref2.result;
          return result ? Promise.resolve({
            canSubmit: canSubmit,
            fields: fields,
            group: group
          }) : Promise.reject({
            fields: fields,
            group: group
          });
        },
        finalizeFormPromise = function finalizeFormPromise(_ref3) {
          var fields = _ref3.fields,
            result = _ref3.result;
          return result ? Promise.resolve(fields) : Promise.reject(fields);
        },
        formatMap = {
          "YYYY-MM-DD": function YYYYMMDD(dateArray) {
            return dateArray;
          },
          "MM-DD-YYYY": function MMDDYYYY(dateArray) {
            return [dateArray[2], dateArray[0], dateArray[1]];
          },
          "DD-MM-YYYY": function DDMMYYYY(dateArray) {
            return dateArray.reverse();
          }
        },
        getDateAsNumber = function getDateAsNumber(dateString, dateFormat) {
          dateFormat = dateFormat || "YYYY-MM-DD";
          var splitChar = function (string) {
            var separator = string.match(/\D/);
            return separator && separator.length > 0 ? separator[0] : null;
          }(dateString);
          if (!(dateFormat.indexOf(splitChar) < 0)) return dateFormat = dateFormat.replace(/[^YMD]/g, "-"), dateString = dateString.split(splitChar), dateString = formatMap[dateFormat](dateString).join("");
        },
        getInitialValues = function getInitialValues($form) {
          return _toConsumableArray($form.querySelectorAll("input, select, textarea")).filter(function ($el) {
            return $el.matches(excludeSelector);
          }).reduce(function (accData, _ref4) {
            var tagName = _ref4.tagName,
              type = _ref4.type,
              name = _ref4.name,
              value = _ref4.value,
              checked = _ref4.checked,
              multiple = _ref4.multiple,
              options = _ref4.options;
            var isCheckboxOrRadio = ["checkbox", "radio"].includes(type),
              isMultiCheckbox = "checkbox" === type && $form.querySelectorAll("[name=\"".concat(name, "\"]")).length > 1;
            if (void 0 !== accData[name] && isCheckboxOrRadio && !checked) return accData;
            if (void 0 === accData[name]) {
              if (isCheckboxOrRadio && !checked) return accData[name] = isMultiCheckbox ? [] : null, accData;
              var isMultiSelect = "SELECT" === tagName && multiple,
                multiSelectValues = options && _toConsumableArray(options).filter(function (opt) {
                  return opt.selected;
                });
              accData[name] = isMultiSelect ? multiSelectValues : isMultiCheckbox ? [value] : value;
            } else isMultiCheckbox ? accData[name].push(value) : accData[name] = value;
            return accData;
          }, {});
        },
        getJSONobjectFromFieldAttribute = function getJSONobjectFromFieldAttribute(fieldEl, attrName) {
          var customAttrEl = fieldEl.closest("[" + attrName + "]");
          return customAttrEl && JSON.parse(customAttrEl.getAttribute(attrName)) || {};
        },
        getUniqueFields = function getUniqueFields($nodeList) {
          var currentFieldName = "",
            currentFieldType = "";
          return Array.from($nodeList).filter(function ($field) {
            var name = $field.name,
              type = $field.type;
            return (name !== currentFieldName || type !== currentFieldType) && ($field.matches("[data-required-from]") || (currentFieldName = name, currentFieldType = type), !0);
          });
        },
        mergeValidateFieldDefault = function mergeValidateFieldDefault(obj) {
          return mergeObjects({}, {
            result: !1,
            $field: null
          }, obj);
        },
        mergeValidateFormDefault = function mergeValidateFormDefault(obj) {
          return mergeObjects({}, {
            result: !0,
            fields: []
          }, obj);
        },
        isFieldForChangeEvent = function isFieldForChangeEvent($field) {
          return $field.matches('select, [type="radio"], [type="checkbox"], [type="file"]');
        },
        runFunctionsSequence = function runFunctionsSequence() {
          var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref5$functionsList = _ref5.functionsList,
            functionsList = _ref5$functionsList === void 0 ? [] : _ref5$functionsList,
            _ref5$data = _ref5.data,
            data = _ref5$data === void 0 ? {} : _ref5$data,
            _ref5$stopConditionFn = _ref5.stopConditionFn,
            stopConditionFn = _ref5$stopConditionFn === void 0 ? function () {
              return !1;
            } : _ref5$stopConditionFn;
          return functionsList.reduce(function (acc, promiseFn) {
            return acc.then(function (res) {
              var dataNew = mergeObjects({}, res[res.length - 1]);
              return stopConditionFn(dataNew) ? Promise.resolve(res) : new Promise(function (resolve) {
                resolve(promiseFn(dataNew));
              }).then(function () {
                var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : dataNew;
                return res.push(result), res;
              });
            });
          }, Promise.resolve([data])).then(function (dataList) {
            return dataList.length > 1 ? dataList.slice(1) : dataList;
          });
        },
        serializeObject = function serializeObject(obj) {
          return obj && "object" == _typeof(obj) && obj.constructor === Object ? Object.keys(obj).reduce(function (a, k) {
            return a.push(k + "=" + encodeURIComponent(obj[k])), a;
          }, []).join("&") : obj;
        },
        toCamelCase = function toCamelCase(string) {
          return string.replace(/-([a-z])/gi, function (all, letter) {
            return letter.toUpperCase();
          });
        },
        options = {
          fieldOptions: {
            beforeValidation: [function (_ref6) {
              var $field = _ref6.$field,
                fieldOptions = _ref6.fieldOptions;
              var initialValues = $field.form.formjs._.initialValues;
              fieldOptions.trimValue && !isFieldForChangeEvent($field) && ($field.value = $field.value.trim()), function ($fields, fieldOptions) {
                ($fields = isNodeList($fields) ? Array.from($fields) : [$fields]).forEach(function ($field) {
                  if ("checkbox" !== $field.type && "radio" !== $field.type) {
                    var $container = $field.closest(fieldOptions.questionContainer) || $field;
                    $field.value ? addClass($container, fieldOptions.cssClasses.dirty) : removeClass($container, fieldOptions.cssClasses.dirty);
                  }
                });
              }($field, fieldOptions), function ($field, initialValues, fieldOptions) {
                var $container = $field.closest(fieldOptions.questionContainer) || $field;
                (function (_ref7, initValues) {
                  var form = _ref7.form,
                    tagName = _ref7.tagName,
                    type = _ref7.type,
                    name = _ref7.name,
                    value = _ref7.value,
                    multiple = _ref7.multiple,
                    options = _ref7.options;
                  var isRadio = "radio" === type,
                    isCheckbox = "checkbox" === type,
                    isSelect = "SELECT" === tagName;
                  if (isCheckbox && form.querySelectorAll("[name=\"".concat(name, "\"]")).length > 1 || isSelect && multiple) {
                    var multiValues = isCheckbox ? _toConsumableArray(form.querySelectorAll("[name=\"".concat(name, "\"]:checked"))).map(function ($el) {
                      return $el.value;
                    }) : _toConsumableArray(options).filter(function (opt) {
                      return opt.selected;
                    });
                    return initValues[name].length !== multiValues.length || multiValues.filter(function (val) {
                      return initValues[name].includes(val);
                    }).length !== initValues[name].length;
                  }
                  if (isRadio) {
                    var $checkedRadio = form.querySelector("[name=\"".concat(name, "\"]:checked"));
                    value = null, $checkedRadio && (value = $checkedRadio.value);
                  }
                  return value !== initValues[name];
                })($field, initialValues) ? addClass($container, fieldOptions.cssClasses.modified) : removeClass($container, fieldOptions.cssClasses.modified);
              }($field, initialValues, fieldOptions), fieldOptions.skipUIfeedback || addClass($field.closest(fieldOptions.questionContainer), fieldOptions.cssClasses.pending);
            }],
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
            getFormData: function getFormData($filteredFields, trimValues) {
              var formData = {},
                $form = this.$form;
              var prevObj = formData;
              return $filteredFields.forEach(function ($field) {
                var isCheckbox = "checkbox" === $field.type,
                  isRadio = "radio" === $field.type,
                  isSelect = $field.matches("select"),
                  name = $field.name;
                var value = trimValues ? $field.value.trim() : $field.value;
                if (isCheckbox) {
                  value = $field.checked;
                  var $checkboxes = Array.from($form.querySelectorAll('[name="' + name + '"]'));
                  if ($checkboxes.length > 1) {
                    value = [], $checkboxes.filter(function (field) {
                      return field.checked;
                    }).forEach(function ($field) {
                      value.push($field.value);
                    });
                  }
                } else if (isRadio) {
                  var $checkedRadio = $form.querySelector('[name="' + name + '"]:checked');
                  value = null === $checkedRadio ? null : $checkedRadio.value;
                } else if (isSelect) {
                  var $selectedOpts = Array.from($field.options).filter(function (option) {
                    return option.selected;
                  });
                  $selectedOpts.length > 1 && (value = [], $selectedOpts.forEach(function ($field) {
                    value.push($field.value);
                  }));
                }
                name.split(".").forEach(function (keyName, index, list) {
                  var isLastKeyName = index + 1 === list.length;
                  if (Array.isArray(prevObj)) {
                    var keyNameSplit = keyName.split("___"),
                      arrPos = keyNameSplit[0] - 1,
                      arrayHasItemAtIndex = void 0 !== prevObj[arrPos],
                      arrItemKeyName = keyNameSplit[1];
                    if (arrayHasItemAtIndex || prevObj.push({}), keyName = arrItemKeyName, isLastKeyName ? prevObj[arrPos][keyName] = value : void 0 === prevObj[arrPos][keyName] && (prevObj[arrPos][keyName] = {}), !isLastKeyName) return void (prevObj = prevObj[arrPos][keyName]);
                  } else {
                    var isKeyNameArray = keyName.endsWith("[]");
                    keyName = keyName.replace("[]", ""), isLastKeyName ? prevObj[keyName] = value : void 0 === prevObj[keyName] && (prevObj[keyName] = isKeyNameArray ? [] : {});
                  }
                  prevObj = isLastKeyName ? formData : prevObj[keyName];
                });
              }), formData;
            },
            groups: [],
            handleFileUpload: !0,
            handleSubmit: !0,
            onInitCheckFilled: !0
          }
        },
        validationRules = {
          date: function date(string) {
            return {
              result: /^((((19|[2-9]\d)\d{2})[ \/\-.](0[13578]|1[02])[ \/\-.](0[1-9]|[12]\d|3[01]))|(((19|[2-9]\d)\d{2})[ \/\-.](0[13456789]|1[012])[ \/\-.](0[1-9]|[12]\d|30))|(((19|[2-9]\d)\d{2})[ \/\-.]02[ \/\-.](0[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))[ \/\-.]02[ \/\-.]29))$/g.test(string)
            };
          },
          email: function email(string) {
            return {
              result: /^[a-zA-Z_-]([\w.-]?[a-zA-Z0-9])*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?){2,})+$/.test(string)
            };
          },
          number: function number(string) {
            return {
              result: /[+-]?([0-9]*[.])?[0-9]+/.test(string)
            };
          },
          checkbox: function checkbox(value, $field) {
            var $dataChecks = $field.closest("form").querySelector('[name="' + $field.name + '"][data-checks]');
            return $dataChecks ? function ($field) {
              var attrValue = JSON.parse($field.getAttribute("data-checks")),
                checkedLength = $field.closest("form").querySelectorAll('[name="' + $field.name + '"]:checked').length,
                isMinOk = checkedLength >= attrValue[0],
                isMaxOk = checkedLength <= attrValue[1],
                obj = {
                  result: isMinOk && isMaxOk
                };
              return obj.result || (obj.errors = {
                checks: !0
              }, isMinOk || (obj.errors.minChecks = !0), isMaxOk || (obj.errors.maxChecks = !0)), obj;
            }($dataChecks) : {
              result: $field.checked
            };
          },
          equalTo: function equalTo(value, $field) {
            return {
              result: value === $field.closest("form").querySelector('[name="' + $field.getAttribute("data-equal-to") + '"]').value
            };
          },
          exactLength: function exactLength(value, $field) {
            var valueLength = value.length,
              exactLength = 1 * $field.getAttribute("data-exact-length"),
              obj = {
                result: valueLength === exactLength
              };
            return obj.result || (obj.errors = {}, valueLength < exactLength ? obj.errors.minlength = !0 : obj.errors.maxlength = !0), obj;
          },
          file: function file(value, $field, fieldOptions) {
            var maxFileSize = 1 * ($field.getAttribute("data-max-file-size") || fieldOptions.maxFileSize),
              MIMEtype = $field.accept ? new RegExp($field.accept.replace("*", "[^\\/,]+")) : null,
              filesList = Array.from($field.files),
              obj = {
                result: !0
              };
            return filesList.forEach(function (file) {
              var exceedMaxFileSize = maxFileSize > 0 && file.size / 1024 / 1024 > maxFileSize,
                isAcceptedFileType = null === MIMEtype || MIMEtype.test(file.type);
              !exceedMaxFileSize && isAcceptedFileType || (obj.result = !1, void 0 === obj.errors && (obj.errors = {}), exceedMaxFileSize && (obj.errors.maxFileSize = !0), isAcceptedFileType || (obj.errors.acceptedFileType = !0));
            }), obj;
          },
          length: function length(value, $field) {
            var valueL = value.length,
              attrValue = JSON.parse($field.getAttribute("data-length")),
              isMinlengthOk = valueL >= attrValue[0],
              isMaxlengthOk = valueL <= attrValue[1],
              obj = {
                result: isMinlengthOk && isMaxlengthOk
              };
            return obj.result || (obj.errors = {}, isMinlengthOk || (obj.errors.minlength = !0), isMaxlengthOk || (obj.errors.maxlength = !0)), obj;
          },
          max: function max(value, $field) {
            var maxVal = $field.max;
            var dateFormat = $field.getAttribute("data-date-format");
            return ("date" === $field.type || dateFormat) && (value = getDateAsNumber(value, dateFormat), maxVal = maxVal.split("-").join("")), maxVal *= 1, {
              result: (value *= 1) <= maxVal
            };
          },
          maxlength: function maxlength(value, $field) {
            return {
              result: value.length <= 1 * $field.maxLength
            };
          },
          min: function min(value, $field) {
            var minVal = $field.min;
            var dateFormat = $field.getAttribute("data-date-format");
            return ("date" === $field.type || dateFormat) && (value = getDateAsNumber(value, dateFormat), minVal = minVal.split("-").join("")), minVal *= 1, {
              result: (value *= 1) >= minVal
            };
          },
          minlength: function minlength(value, $field) {
            return {
              result: value.length >= 1 * $field.minLength
            };
          },
          pattern: function pattern(value, $field) {
            return {
              result: new RegExp($field.pattern).test(value)
            };
          },
          radio: function radio(value, $field) {
            var $fieldChecked = $field.closest("form").querySelector('[name="' + $field.name + '"]:checked');
            return {
              result: null !== $fieldChecked && $fieldChecked.value.trim().length > 0
            };
          }
        },
        blurHandler = function blurHandler(event) {
          var $field = event.target,
            fieldOptions = $field.form.formjs.options.fieldOptions;
          checkTouchedField($field, fieldOptions);
        },
        dataTypeNumber = function dataTypeNumber(event) {
          var $field = event.target;
          if ($field.matches('[data-type="number"]')) {
            var fieldValue = $field.value;
            if (/[^\d.,+\-]/.test(fieldValue)) {
              event.stopImmediatePropagation();
              var valueReplaced = fieldValue.replace(/[^\d.,+\-]/g, "");
              $field.value = valueReplaced;
            }
          }
        },
        formValidationEnd = function formValidationEnd(event) {
          var _event$detail = event.detail,
            result = _event$detail.result,
            fields = _event$detail.fields,
            $form = event.target,
            _$form$formjs$options = $form.formjs.options,
            fieldOptions = _$form$formjs$options.fieldOptions,
            cssClasses = _$form$formjs$options.formOptions.cssClasses;
          if (fields[0].isCheckingForm && fields.forEach(function (_ref8) {
            var $field = _ref8.$field;
            checkTouchedField($field, fieldOptions);
          }), !fieldOptions.skipUIfeedback) {
            var feedbackClassesKey = result ? "valid" : "error";
            removeClass($form, "".concat(cssClasses.pending, " ").concat(cssClasses.valid, " ").concat(cssClasses.error)), addClass($form, cssClasses[feedbackClassesKey]);
          }
        },
        keypressMaxlength = function keypressMaxlength(event) {
          var $field = event.target;
          if ($field.matches("[maxlength]")) {
            var maxLength = 1 * $field.maxLength,
              keyPressed = event.which || event.keyCode,
              allowedKeys = [8, 37, 38, 39, 46];
            if ($field.value.length >= maxLength && -1 === allowedKeys.indexOf(keyPressed)) return !1;
          }
        },
        pastePrevent = function pastePrevent(event) {
          var $field = event.target,
            fieldOptions = $field.closest("form").formjs.options.fieldOptions;
          $field.matches(fieldOptions.preventPasteFields) && event.preventDefault();
        };
      function ajaxCall($form, formDataObj, options) {
        var timeoutTimer;
        var ajaxOptions = mergeObjects({}, options.formOptions.ajaxOptions),
          isMultipart = "multipart/form-data" === ajaxOptions.headers["Content-Type"];
        if (ajaxOptions.body = formDataObj, isMultipart && options.formOptions.handleFileUpload) {
          var formDataMultipart = new FormData();
          for (var key in ajaxOptions.body) {
            formDataMultipart.append(key, ajaxOptions.body[key]);
          }
          Array.from($form.querySelectorAll('[type="file"]')).forEach(function ($field) {
            Array.from($field.files).forEach(function (file, idx) {
              var name = $field.name + "[" + idx + "]";
              formDataMultipart.append(name, file, file.name);
            });
          }), ajaxOptions.body = formDataMultipart;
        }
        if ("GET" === ajaxOptions.method ? (ajaxOptions.url += (/\?/.test(ajaxOptions.url) ? "&" : "?") + serializeObject(ajaxOptions.body), delete ajaxOptions.body) : ajaxOptions.headers["Content-Type"].indexOf("application/x-www-form-urlencoded") > -1 ? ajaxOptions.body = serializeObject(ajaxOptions.body) : isMultipart || (ajaxOptions.body = JSON.stringify(ajaxOptions.body)), ajaxOptions.headers = new Headers(ajaxOptions.headers), ajaxOptions.timeout > 0) {
          var controller = new AbortController(),
            signal = controller.signal;
          ajaxOptions.signal = signal, timeoutTimer = window.setTimeout(function () {
            controller.abort();
          }, ajaxOptions.timeout);
        }
        return fetch(ajaxOptions.url, ajaxOptions).then(function (response) {
          if (!response.ok) throw new Error(response.statusText);
          var fetchMethod = function (response, options) {
            var accept = options.headers.get("Accept"),
              contentType = response.headers.get("Content-Type"),
              headerOpt = accept || contentType || "";
            return headerOpt.indexOf("application/json") > -1 || "" === headerOpt ? "json" : headerOpt.indexOf("text/") > -1 ? "text" : "blob";
          }(response, ajaxOptions);
          return response[fetchMethod]();
        }).then(function (data) {
          return addClass($form, options.formOptions.cssClasses.ajaxSuccess), data;
        })["catch"](function (error) {
          throw addClass($form, options.formOptions.cssClasses.ajaxError), new Error(error.message);
        })["finally"](function () {
          timeoutTimer && window.clearTimeout(timeoutTimer), removeClass($form, options.formOptions.cssClasses.submit + " " + options.formOptions.cssClasses.ajaxPending), addClass($form, options.formOptions.cssClasses.ajaxComplete), $form.querySelector('[type="submit"]').disabled = !1;
        });
      }
      function submit(event) {
        var $form = event.target,
          instance = $form.formjs,
          options = instance.options,
          formCssClasses = options.formOptions.cssClasses,
          isAjaxForm = options.formOptions.ajaxSubmit,
          $btn = $form.querySelector('[type="submit"]'),
          eventPreventDefault = function eventPreventDefault() {
            var enableBtn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !0;
            $btn && enableBtn && ($btn.disabled = !1), event && event.preventDefault();
          };
        if (isAjaxForm && eventPreventDefault(!1), $btn) {
          if ($btn.disabled) return eventPreventDefault(!1), !1;
          $btn.disabled = !0;
        }
        removeClass($form, formCssClasses.ajaxComplete + " " + formCssClasses.ajaxError + " " + formCssClasses.ajaxSuccess), instance.validateForm().then(function (data) {
          if (void 0 !== data.group && !data.canSubmit) return [{
            stopExecution: !0
          }];
          var beforeSendData = {
              stopExecution: !1,
              formData: isAjaxForm ? instance.getFormData() : null
            },
            rfsObject = {
              functionsList: options.formOptions.beforeSend,
              data: beforeSendData,
              stopConditionFn: function stopConditionFn(data) {
                return data.stopExecution;
              }
            };
          return runFunctionsSequence(rfsObject);
        }).then(function (dataList) {
          if (dataList.some(function (_ref9) {
            var stopExecution = _ref9.stopExecution;
            return stopExecution;
          })) return eventPreventDefault(), !1;
          if (addClass($form, formCssClasses.submit), isAjaxForm) {
            var formData = dataList.pop().formData;
            addClass($form, formCssClasses.ajaxPending), dispatchCustomEvent($form, customEvents_form.submit, {
              detail: ajaxCall($form, formData, options)
            });
          }
        })["catch"](function (fields) {
          eventPreventDefault(), removeClass($form, formCssClasses.submit);
        });
      }
      var groupValidationEnd = function groupValidationEnd(event) {
          var detail = event.detail,
            _event$target$formjs$ = event.target.formjs.options,
            fieldOptions = _event$target$formjs$.fieldOptions,
            formOptions = _event$target$formjs$.formOptions;
          detail.result && (event.target.formjs.currentGroup = detail.group.next), detail.fields[0].isCheckingGroup && detail.fields.forEach(function (_ref10) {
            var $field = _ref10.$field;
            checkTouchedField($field, fieldOptions);
          }), fieldOptions.skipUIfeedback || removeClass($form, formOptions.cssClasses.pending);
        },
        validation = function validation(event) {
          var isChangeEvent = "change" === event.type,
            $field = event.target,
            self = $field.closest("form").formjs;
          if ($field.matches(fieldsStringSelector)) {
            var isFieldForChangeEventBoolean = isFieldForChangeEvent($field),
              hasOnlyChangeEvent = "change" === self.options.fieldOptions.validateOnEvents;
            (isFieldForChangeEventBoolean && isChangeEvent || !isFieldForChangeEventBoolean && (!isChangeEvent || hasOnlyChangeEvent)) && self.validateField($field).then(function () {
              var type = $field.type,
                $relatedEqualTo = $field.closest("form").querySelector('[data-equal-to="' + $field.name + '"]');
              ($field.required || $field.matches("[data-validate-if-filled]")) && "checkbox" !== type && "radio" !== type && $relatedEqualTo && "" !== $relatedEqualTo.value.trim() && self.validateField($relatedEqualTo)["catch"](function (errors) {});
            })["catch"](function (errors) {});
          }
        },
        validationEnd = function validationEnd(event) {
          var _event$detail2 = event.detail,
            $field = _event$detail2.$field,
            result = _event$detail2.result,
            errors = _event$detail2.errors,
            dataFieldOptions = getJSONobjectFromFieldAttribute($field, "data-field-options"),
            _mergeObjects = mergeObjects({}, $field.form.formjs.options.fieldOptions, dataFieldOptions),
            cssClasses = _mergeObjects.cssClasses,
            questionContainer = _mergeObjects.questionContainer,
            skipUIfeedback = _mergeObjects.skipUIfeedback,
            $container = $field.closest(questionContainer),
            isReqFrom = $field.matches("[data-required-from]"),
            $reqMore = document.querySelector($field.getAttribute("data-required-from"));
          if ($container && !skipUIfeedback) {
            var formClasses = Object.values($field.form.formjs.options.formOptions.cssClasses).reduce(function (accString, cssClass) {
              return "".concat(accString, " ").concat(cssClass);
            }, "").trim();
            if (removeClass($field.form, formClasses), removeClass($container, cssClasses.pending), result) {
              if (!isReqFrom || isReqFrom && $reqMore.checked) {
                var errorClasses = cssClasses.error + " " + cssClasses.errorEmpty + " " + cssClasses.errorRule;
                removeClass($container, errorClasses), addClass($container, cssClasses.valid);
              }
            } else {
              var extraErrorClass = cssClasses.errorRule;
              var isChecks = $field.matches("[data-checks]"),
                checkedElLength = isChecks ? $container.querySelectorAll('[name="' + $field.name + '"]:checked').length : 0;
              (!isChecks && errors && errors.empty || isChecks && 0 === checkedElLength) && (extraErrorClass = cssClasses.errorEmpty);
              var _errorClasses = cssClasses.error + " " + extraErrorClass,
                errorClassToRemove = cssClasses.errorEmpty + " " + cssClasses.errorRule;
              removeClass($container, cssClasses.valid + " " + errorClassToRemove), addClass($container, _errorClasses);
            }
          }
        };
      function checkFieldValidity($field, fieldOptions, validationRules, validationErrors) {
        if (!isDOMNode($field)) {
          var obj = mergeValidateFieldDefault({
            $field: $field
          });
          return Promise.resolve(obj);
        }
        var $form = $field.closest("form"),
          isValidValue = $field.value.trim().length > 0,
          dataFieldOptions = getJSONobjectFromFieldAttribute($field, "data-field-options");
        if (fieldOptions = mergeObjects(fieldOptions, dataFieldOptions), "radio" === $field.type) {
          var $checked = $field.checked ? $field : $form.querySelector('[name="' + $field.name + '"]:checked'),
            reqMoreIsChecked = $checked && $checked.matches("[data-require-more]"),
            $findReqMore = reqMoreIsChecked ? $checked : $form.querySelector('[data-require-more][name="' + $field.name + '"]'),
            $findReqFrom = $findReqMore ? $form.querySelector('[data-required-from="#' + $findReqMore.id + '"]') : null;
          $checked && $findReqFrom && ($findReqFrom.required = $findReqMore.required && $findReqMore.checked, reqMoreIsChecked ? fieldOptions.focusOnRelated && $findReqFrom.focus() : $findReqFrom.value = "");
        }
        if ($field.matches("[data-required-from]") && isValidValue) {
          var $reqMore = $form.querySelector($field.getAttribute("data-required-from"));
          $reqMore.checked = !0, $field.required = $reqMore.required;
        }
        var needsValidation = $field.required || $field.matches("[data-validate-if-filled]") && isValidValue;
        return runFunctionsSequence({
          functionsList: fieldOptions.beforeValidation,
          data: {
            $field: $field,
            fieldOptions: fieldOptions
          }
        }).then(function (data) {
          var dataObj = data.pop();
          return new Promise(function (resolve) {
            needsValidation || (dataObj.result = !0), resolve(needsValidation ? function ($field, fieldOptions, validationRules, validationErrors) {
              var fieldValue = $field.value,
                obj = mergeValidateFieldDefault({
                  result: fieldValue.trim().length > 0,
                  $field: $field
                }),
                isRadioOrCheckbox = /^(radio|checkbox)$/.test($field.type),
                hasSelectedInput = $field.closest("form").querySelectorAll('[name="' + $field.name + '"]:checked').length > 0;
              if (!isRadioOrCheckbox && !obj.result || isRadioOrCheckbox && !hasSelectedInput) return obj.result = !1, obj.errors = {
                empty: !0
              }, Promise.resolve(obj);
              var validationMethods = Array.from($field.attributes).reduce(function (accList, attr) {
                var attrName = toCamelCase(attr.name.replace("data-", "")),
                  attrValue = toCamelCase(attr.value),
                  isAttrValueWithFn = ("type" === attrName || "subtype" === attrName) && validationRules[attrValue],
                  isAttrNameWithFn = validationRules[attrName];
                return (isAttrValueWithFn || isAttrNameWithFn) && accList.push(isAttrValueWithFn ? attrValue : attrName), accList;
              }, []);
              return new Promise(function (resolve) {
                resolve(validationMethods.reduce(function (accPromise, methodName) {
                  return accPromise.then(function (accObj) {
                    return new Promise(function (resolveVal) {
                      resolveVal(validationRules[methodName](fieldValue, $field, fieldOptions));
                    }).then(function (valObj) {
                      if (!valObj.result) {
                        var errorObj = {};
                        void 0 !== valObj.errors && void 0 !== valObj.errors[methodName] || (errorObj[methodName] = !0), valObj.errors = mergeObjects({}, valObj.errors, errorObj);
                      }
                      return valObj = valObj.result ? {} : valObj, mergeObjects(accObj, valObj);
                    });
                  });
                }, Promise.resolve(obj)));
              }).then(function (data) {
                return data.result || (data.errors = validationMethods.reduce(function (accObj, methodName) {
                  var errors = validationErrors[methodName] && validationErrors[methodName](fieldValue, $field) || {};
                  return mergeObjects(accObj, errors);
                }, data.errors)), data;
              });
            }($field, fieldOptions, validationRules, validationErrors) : dataObj);
          });
        });
      }
      function checkFieldsValidity($fields, fieldOptions, validationRules, validationErrors) {
        var fieldToSkip = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
        fieldOptions = mergeObjects({}, fieldOptions, {
          focusOnRelated: !1
        });
        var $fieldsList = getUniqueFields($fields);
        return Promise.all($fieldsList.map(function ($field) {
          if (fieldToSkip && $field === fieldToSkip) {
            var obj = mergeValidateFieldDefault({
              $field: $field,
              result: !0
            });
            return Promise.resolve(obj);
          }
          return checkFieldValidity($field, fieldOptions, validationRules, validationErrors);
        })).then(function (fields) {
          var areAllFieldsValid = fields.every(function (_ref11) {
            var result = _ref11.result;
            return result;
          });
          return mergeValidateFormDefault({
            result: areAllFieldsValid,
            fields: fields
          });
        });
      }
      var Form = /*#__PURE__*/function () {
        function Form(form, optionsObj) {
          _classCallCheck(this, Form);
          var argsL = arguments.length,
            checkFormElem = function (form) {
              var isString = _typeof(form),
                isFormSelector = "string" === isString && isDOMNode(document.querySelector(form)) && "form" === document.querySelector(form).tagName.toLowerCase();
              return {
                result: isDOMNode(form) || isFormSelector,
                $el: "string" === isString ? document.querySelector(form) : form
              };
            }(form);
          if (0 === argsL || argsL > 0 && !form) throw new Error('First argument "form" is missing or falsy!');
          if (isNodeList(form)) throw new Error('First argument "form" must be a single DOM node or a form CSS selector, not a NodeList!');
          if (!checkFormElem.result) throw new Error('First argument "form" is not a DOM node nor a form CSS selector!');
          var self = this;
          self.$form = checkFormElem.$el, self.$form.formjs = self, self.options = mergeObjects({}, Form.prototype.options, optionsObj), self.currentGroup = self.options.formOptions.groups[0];
          ["beforeValidation", "beforeSend", "getFormData"].forEach(function (cbName) {
            var optionType = self.options.formOptions[cbName] ? "formOptions" : "fieldOptions";
            var cbOpt = self.options[optionType][cbName];
            cbOpt && (self.options[optionType][cbName] = Array.isArray(cbOpt) ? cbOpt.map(function (cbFn) {
              return cbFn.bind(self);
            }) : cbOpt.bind(self));
          }), self._ = {
            initialValues: getInitialValues(self.$form)
          }, function ($form, options) {
            $form.noValidate = !0;
            var fieldOptions = options.fieldOptions,
              formOptions = options.formOptions;
            fieldOptions.strictHtmlValidation && ($form.addEventListener("keypress", keypressMaxlength, !1), $form.addEventListener("input", dataTypeNumber, !1)), fieldOptions.preventPasteFields && $form.querySelectorAll(fieldOptions.preventPasteFields).length && $form.addEventListener("paste", pastePrevent, !1), $form.addEventListener("blur", blurHandler, !0), fieldOptions.validateOnEvents.split(" ").forEach(function (eventName) {
              var useCapture = /^(blur|focus)$/.test(eventName);
              $form.addEventListener(eventName, validation, useCapture);
            }), $form.addEventListener(customEvents_field.validation, validationEnd, !1), formOptions.groups.length > 0 && $form.addEventListener(customEvents_group.validation, groupValidationEnd, !1), $form.addEventListener(customEvents_form.validation, formValidationEnd, !1), formOptions.handleSubmit && ($form.addEventListener("submit", submit), formOptions.ajaxSubmit && ($form.getAttribute("enctype") && (formOptions.ajaxOptions.headers["Content-Type"] = $form.getAttribute("enctype")), $form.getAttribute("method") && (formOptions.ajaxOptions.method = $form.getAttribute("method").toUpperCase()), $form.getAttribute("action") && (formOptions.ajaxOptions.url = $form.getAttribute("action"))));
          }(self.$form, self.options);
          var initOptions = {};
          self.options.formOptions.onInitCheckFilled && (initOptions.detail = self.validateFilledFields()["catch"](function (fields) {})), dispatchCustomEvent(self.$form, customEvents_form.init, initOptions);
        }
        _createClass(Form, [{
          key: "destroy",
          value: function destroy() {
            !function ($form, options) {
              options.fieldOptions.strictHtmlValidation && ($form.removeEventListener("keypress", keypressMaxlength, !1), $form.removeEventListener("input", dataTypeNumber, !1)), options.fieldOptions.preventPasteFields && $form.removeEventListener("paste", pastePrevent, !1), options.formOptions.handleSubmit && $form.removeEventListener("submit", submit), $form.removeEventListener("blur", blurHandler, !0), options.fieldOptions.validateOnEvents.split(" ").forEach(function (eventName) {
                var useCapturing = ["blur", "focus"].includes(eventName);
                $form.removeEventListener(eventName, validation, useCapturing);
              }), $form.removeEventListener(customEvents_field.validation, validationEnd, !1), options.formOptions.groups.length > 0 && $form.removeEventListener(customEvents_group.validation, groupValidationEnd, !1), $form.removeEventListener(customEvents_form.validation, formValidationEnd, !1), delete $form.formjs;
            }(this.$form, this.options), dispatchCustomEvent(this.$form, customEvents_form.destroy);
          }
        }, {
          key: "getFormData",
          value: function getFormData() {
            var trimValues = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options.fieldOptions.trimValue;
            var $formFields = this.$form.querySelectorAll("input, select, textarea"),
              $filteredFields = Array.from($formFields).filter(function (elem) {
                return elem.matches(excludeSelector);
              });
            return this.options.formOptions.getFormData($filteredFields, trimValues);
          }
        }, {
          key: "validateField",
          value: function validateField(field, fieldOptions) {
            var self = this,
              $form = self.$form;
            return checkFieldValidity("string" == typeof field ? $form.querySelector(field) : field, fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptions), self.validationRules, self.validationErrors).then(function (obj) {
              if (dispatchCustomEvent(obj.$field, customEvents_field.validation, {
                detail: obj
              }), obj.result) {
                if (fieldOptions.onValidationCheckAll) {
                  var selector = self.currentGroup || fieldsStringSelector;
                  checkFieldsValidity($form.querySelectorAll(selector), fieldOptions, self.validationRules, self.validationErrors, obj.$field).then(function (dataForm) {
                    var groups = self.options.formOptions.groups,
                      validationEventName = self.currentGroup ? customEvents_group.validation : customEvents_form.validation;
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
        }, {
          key: "validateFieldsGroup",
          value: function validateFieldsGroup() {
            var group = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentGroup;
            var fieldOptions = arguments.length > 1 ? arguments[1] : undefined;
            var self = this;
            fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptions);
            var $fields = self.$form.querySelectorAll(group);
            return fieldOptions.skipUIfeedback || addClass(self.$form, self.options.formOptions.cssClasses.pending), checkFieldsValidity($fields, fieldOptions, self.validationRules, self.validationErrors).then(function (data) {
              data.fields.forEach(function (obj) {
                obj.isCheckingGroup = !0, dispatchCustomEvent(obj.$field, customEvents_field.validation, {
                  detail: obj
                });
              });
              var groups = self.options.formOptions.groups;
              return groups.length > 0 && (data.group = {
                prev: groups[groups.indexOf(group) - 1],
                current: group,
                next: groups[groups.indexOf(group) + 1]
              }, data.canSubmit = data.result && !data.group.next), dispatchCustomEvent(self.$form, customEvents_group.validation, {
                detail: data
              }), data;
            }).then(finalizeFieldsGroupPromise);
          }
        }, {
          key: "validateFilledFields",
          value: function validateFilledFields(fieldOptions) {
            var $form = this.$form,
              $filledFields = function ($form) {
                return getUniqueFields($form.querySelectorAll(fieldsStringSelector)).map(function ($field) {
                  var name = $field.name,
                    type = $field.type,
                    isCheckboxOrRadio = "checkbox" === type || "radio" === type,
                    fieldChecked = $form.querySelector('[name="' + name + '"]:checked'),
                    isReqFrom = $field.matches("[data-required-from]"),
                    $reqMore = isReqFrom ? $form.querySelector($field.getAttribute("data-required-from")) : null;
                  return isCheckboxOrRadio ? fieldChecked || null : isReqFrom && $reqMore.checked || !isReqFrom && $field.value ? $field : null;
                }).filter(function ($field) {
                  return null !== $field;
                });
              }($form),
              requiredFieldsLength = getUniqueFields($form.querySelectorAll(fieldsStringSelector)).filter(function ($field) {
                return $field.required;
              }).length,
              formClasses = this.options.formOptions.cssClasses;
            if (0 === $filledFields.length) {
              var obj = mergeValidateFormDefault({
                result: !0,
                fields: []
              });
              return Promise.resolve(obj);
            }
            var skipUIfeedback = (fieldOptions = mergeObjects({}, this.options.fieldOptions, fieldOptions)).skipUIfeedback;
            return skipUIfeedback || addClass($form, formClasses.pending), checkFieldsValidity($filledFields, fieldOptions, this.validationRules, this.validationErrors).then(function (data) {
              return data.fields.forEach(function (obj) {
                checkTouchedField(obj.$field, fieldOptions), dispatchCustomEvent(obj.$field, customEvents_field.validation, {
                  detail: obj
                });
              }), skipUIfeedback || (removeClass($form, "".concat(formClasses.pending, " ").concat(formClasses.valid, " ").concat(formClasses.error)), data.result && $filledFields.length === requiredFieldsLength ? addClass($form, formClasses.valid) : data.result || addClass($form, formClasses.error)), data;
            }).then(finalizeFormPromise);
          }
        }, {
          key: "validateForm",
          value: function validateForm(fieldOptions) {
            var self = this;
            if (fieldOptions = mergeObjects({}, self.options.fieldOptions, fieldOptions), self.currentGroup) return self.validateFieldsGroup(self.currentGroup, fieldOptions);
            var $form = self.$form,
              $fields = $form.querySelectorAll(fieldsStringSelector);
            return fieldOptions.skipUIfeedback || addClass($form, self.options.formOptions.cssClasses.pending), checkFieldsValidity($fields, fieldOptions, self.validationRules, self.validationErrors).then(function (data) {
              return data.fields.forEach(function (obj) {
                obj.isCheckingForm = !0, dispatchCustomEvent(obj.$field, customEvents_field.validation, {
                  detail: obj
                });
              }), dispatchCustomEvent($form, customEvents_form.validation, {
                detail: data
              }), data;
            }).then(finalizeFormPromise);
          }
        }], [{
          key: "addValidationErrors",
          value: function addValidationErrors(errorsObj) {
            Form.prototype.validationErrors = mergeObjects({}, Form.prototype.validationErrors, errorsObj);
          }
        }, {
          key: "addValidationRules",
          value: function addValidationRules(rulesObj) {
            Form.prototype.validationRules = mergeObjects({}, Form.prototype.validationRules, rulesObj);
          }
        }, {
          key: "setOptions",
          value: function setOptions(optionsObj) {
            Form.prototype.options = mergeObjects({}, Form.prototype.options, optionsObj);
          }
        }]);
        return Form;
      }();
      Form.prototype.options = options, Form.prototype.validationErrors = {}, Form.prototype.validationRules = validationRules, Form.prototype.version = "5.4.0";

      var $form$1 = document.querySelector('form');
      new Form($form$1);

    })
  };
}));
