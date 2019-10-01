/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/modules/helper.js");
/* harmony import */ var _modules_options_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/modules/options.js");
/* harmony import */ var _modules_validationRules_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/modules/validationRules.js");
/* harmony import */ var _modules_validationErrors_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/modules/validationErrors.js");
/* harmony import */ var _modules_constructor_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/modules/constructor.js");
/* harmony import */ var _modules_destroy_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/modules/destroy.js");
/* harmony import */ var _modules_getFormData_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/modules/getFormData.js");
/* harmony import */ var _modules_init_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/modules/init.js");
/* harmony import */ var _modules_validateField_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/modules/validateField.js");
/* harmony import */ var _modules_validateForm_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./src/modules/validateForm.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**! formJS v3.1.0 | Valerio Di Punzio (@SimplySayHi) | https://www.valeriodipunzio.com/plugins/formJS/ | https://github.com/SimplySayHi/formJS | MIT license */



 // CONSTRUCTOR FUNCTION & PUBLIC METHODS







var version = '3.1.0';

var Form =
/*#__PURE__*/
function () {
  function Form(formEl, optionsObj) {
    _classCallCheck(this, Form);

    _modules_constructor_js__WEBPACK_IMPORTED_MODULE_4__["constructorFn"].call(this, formEl, optionsObj);
  }

  _createClass(Form, [{
    key: "destroy",
    value: function destroy() {
      _modules_destroy_js__WEBPACK_IMPORTED_MODULE_5__["destroy"].call(this);
    }
  }, {
    key: "getFormData",
    value: function getFormData() {
      return _modules_getFormData_js__WEBPACK_IMPORTED_MODULE_6__["getFormData"].call(this);
    }
  }, {
    key: "init",
    value: function init() {
      return _modules_init_js__WEBPACK_IMPORTED_MODULE_7__["init"].call(this);
    }
  }, {
    key: "validateField",
    value: function validateField(fieldEl, fieldOptions) {
      return _modules_validateField_js__WEBPACK_IMPORTED_MODULE_8__["validateField"].call(this, fieldEl, fieldOptions);
    }
  }, {
    key: "validateForm",
    value: function validateForm(fieldOptions) {
      return _modules_validateForm_js__WEBPACK_IMPORTED_MODULE_9__["validateForm"].call(this, fieldOptions);
    }
  }], [{
    key: "addValidationErrors",
    value: function addValidationErrors(errorsObj) {
      this.prototype.validationErrors = Object(_modules_helper_js__WEBPACK_IMPORTED_MODULE_0__["mergeObjects"])({}, this.prototype.validationErrors, errorsObj);
    }
  }, {
    key: "addValidationRules",
    value: function addValidationRules(rulesObj) {
      this.prototype.validationRules = Object(_modules_helper_js__WEBPACK_IMPORTED_MODULE_0__["mergeObjects"])({}, this.prototype.validationRules, rulesObj);
    }
  }, {
    key: "setOptions",
    value: function setOptions(optionsObj) {
      this.prototype.options = Object(_modules_helper_js__WEBPACK_IMPORTED_MODULE_0__["mergeObjects"])({}, this.prototype.options, optionsObj);
    }
  }]);

  return Form;
}();

Form.prototype.isInitialized = false;
Form.prototype.options = _modules_options_js__WEBPACK_IMPORTED_MODULE_1__["options"];
Form.prototype.validationErrors = _modules_validationErrors_js__WEBPACK_IMPORTED_MODULE_3__["validationErrors"];
Form.prototype.validationRules = _modules_validationRules_js__WEBPACK_IMPORTED_MODULE_2__["validationRules"];
Form.prototype.version = version;

if (!window.Form) {
  window.Form = Form;
}

if (!window.FormJS) {
  window.FormJS = Form;
}

/***/ }),

/***/ "./src/modules/ajaxCallXhr.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ajaxCall", function() { return ajaxCall; });
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/modules/helper.js");
 // AJAX CALL USING XMLHttpRequest API

function ajaxCall(formDataObj) {
  var self = this,
      formEl = self.formEl,
      fieldOptions = self.options.fieldOptions,
      formOptions = self.options.formOptions,
      btnEl = formEl.querySelector('[type="submit"]'),
      timeoutTimer,
      xhrOptions = Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__["mergeObjects"])({}, formOptions.ajaxOptions),
      isMultipart = xhrOptions.contentType === 'multipart/form-data';
  xhrOptions.data = formDataObj;

  if (isMultipart && fieldOptions.handleFileUpload) {
    var formDataMultipart = new FormData();

    for (var key in xhrOptions.data) {
      formDataMultipart.append(key, xhrOptions.data[key]);
    }

    Array.from(formEl.querySelectorAll('[type="file"]')).forEach(function (field) {
      Array.from(field.files).forEach(function (file, idx) {
        var name = field.name + '[' + idx + ']';
        formDataMultipart.append(name, file, file.name);
      });
    });
    xhrOptions.data = formDataMultipart;
  }

  var XHR = new XMLHttpRequest(),
      parseResponse = function parseResponse(xhr) {
    var data = xhr.responseText,
        getJSON = function getJSON() {
      try {
        var obj = JSON.parse(data);
        return obj;
      } catch (e) {
        return false;
      }
    },
        getXML_HTML = function getXML_HTML() {
      try {
        var isXML = xhr.responseXML !== null,
            obj = isXML ? new DOMParser().parseFromString(data, 'text/xml') : data;
        return obj;
      } catch (e) {
        return false;
      }
    };

    return getJSON() || getXML_HTML() || data;
  },
      successFn = function successFn(e) {
    var xhr = e.target;

    if (xhr.status === 200) {
      var responseData = parseResponse(xhr);
      _helper_js__WEBPACK_IMPORTED_MODULE_0__["executeCallback"].call(self, formOptions.onSubmitSuccess, responseData);
    } else {
      errorFn(e);
    }
  },
      errorFn = function errorFn(e) {
    var xhr = e.target;
    _helper_js__WEBPACK_IMPORTED_MODULE_0__["executeCallback"].call(self, formOptions.onSubmitError, xhr);
  },
      completeFn = function completeFn(e) {
    if (timeoutTimer) {
      window.clearTimeout(timeoutTimer);
    }

    btnEl.disabled = false;
    _helper_js__WEBPACK_IMPORTED_MODULE_0__["executeCallback"].call(self, formOptions.onSubmitComplete);
  };

  XHR.addEventListener('load', successFn, false);
  XHR.addEventListener('error', errorFn, false);
  XHR.addEventListener('loadend', completeFn, false);

  if (xhrOptions.method === 'GET') {
    xhrOptions.url += (/\?/.test(xhrOptions.url) ? '&' : '?') + Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__["serializeObject"])(xhrOptions.data);

    if (xhrOptions.cache === false) {
      xhrOptions.url += (/\&/.test(xhrOptions.url) ? '&' : '') + '_=' + new Date().getTime();
    }
  }

  XHR.open(xhrOptions.method, xhrOptions.url, xhrOptions.async);

  if (xhrOptions.xhrFields) {
    for (var i in xhrOptions.xhrFields) {
      XHR[i] = xhrOptions.xhrFields[i];
    }
  }

  if (xhrOptions.mimeType && XHR.overrideMimeType) {
    XHR.overrideMimeType(xhrOptions.mimeType);
  }

  if (xhrOptions.data && xhrOptions.contentType !== 'multipart/form-data') {
    XHR.setRequestHeader('Content-Type', xhrOptions.contentType);
  }

  for (var h in xhrOptions.headers) {
    XHR.setRequestHeader(h, xhrOptions.headers[h]);
  }

  if (!isMultipart) {
    xhrOptions.data = JSON.stringify(xhrOptions.data);
  }

  XHR.send(xhrOptions.method === 'GET' ? null : xhrOptions.data);

  if (xhrOptions.async && xhrOptions.timeout > 0) {
    timeoutTimer = window.setTimeout(function () {
      XHR.abort();
    }, xhrOptions.timeout);
  }
}

/***/ }),

/***/ "./src/modules/checkDirtyField.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkDirtyField", function() { return checkDirtyField; });
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/modules/helper.js");

function checkDirtyField(fields) {
  var cssClasses = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.options.fieldOptions.cssClasses.dirty;
  var fields = Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__["isNodeList"])(fields) ? Array.from(fields) : [fields];
  fields.forEach(function (fieldEl) {
    if (fieldEl.type !== 'checkbox' && fieldEl.type !== 'radio') {
      var containerEl = fieldEl.closest('[data-formjs-question]') || fieldEl;

      if (fieldEl.value) {
        Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__["addClass"])(containerEl, cssClasses);
      } else {
        Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__["removeClass"])(containerEl, cssClasses);
      }
    }
  });
}

/***/ }),

/***/ "./src/modules/constructor.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "constructorFn", function() { return constructorFn; });
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/modules/helper.js");
/* harmony import */ var _listenerCallbacks_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/modules/listenerCallbacks.js");
/* harmony import */ var _formStartup_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/modules/formStartup.js");



function constructorFn(formEl) {
  var optionsObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var self = this,
      argsL = arguments.length,
      checkFormElem = Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__["checkFormEl"])(formEl);

  if (argsL === 0 || argsL > 0 && !formEl) {
    throw new Error('First argument "formEl" is missing or falsy!');
  }

  if (Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__["isNodeList"])(formEl)) {
    throw new Error('First argument "formEl" must be a single DOM node or a form CSS selector, not a NodeList!');
  }

  if (!checkFormElem.result) {
    throw new Error('First argument "formEl" is not a DOM node nor a form CSS selector!');
  }

  self.formEl = checkFormElem.element;
  self.formEl.formjs = self;
  self.options = Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__["mergeObjects"])({}, Form.prototype.options, optionsObj);
  self.listenerCallbacks = {
    dataTypeNumber: _listenerCallbacks_js__WEBPACK_IMPORTED_MODULE_1__["callbackFns"].dataTypeNumber,
    keypressMaxlength: _listenerCallbacks_js__WEBPACK_IMPORTED_MODULE_1__["callbackFns"].keypressMaxlength,
    pastePrevent: _listenerCallbacks_js__WEBPACK_IMPORTED_MODULE_1__["callbackFns"].pastePrevent.bind(self),
    submit: _listenerCallbacks_js__WEBPACK_IMPORTED_MODULE_1__["callbackFns"].submit.bind(self),
    validation: _listenerCallbacks_js__WEBPACK_IMPORTED_MODULE_1__["callbackFns"].validation.bind(self)
  };
  Object.freeze(self.listenerCallbacks);
  _formStartup_js__WEBPACK_IMPORTED_MODULE_2__["formStartup"].call(self);
}

/***/ }),

/***/ "./src/modules/destroy.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "destroy", function() { return destroy; });
function destroy() {
  var self = this,
      formEl = self.formEl,
      validationListenerNames = self.options.fieldOptions.validateOnEvents;

  if (self.options.fieldOptions.strictHtmlValidation) {
    formEl.removeEventListener('keypress', self.listenerCallbacks.keypressMaxlength, false);
    formEl.removeEventListener('input', self.listenerCallbacks.dataTypeNumber, false);
  }

  if (self.options.fieldOptions.preventPasteFields) {
    formEl.removeEventListener('paste', self.listenerCallbacks.pastePrevent, false);
  }

  if (self.options.formOptions.handleSubmit) {
    formEl.removeEventListener('submit', self.listenerCallbacks.submit);
  }

  validationListenerNames.split(' ').forEach(function (eventName) {
    var useCapturing = eventName === 'blur' ? true : false;
    formEl.removeEventListener(eventName, self.listenerCallbacks.validation, useCapturing);
  });
  delete self.formEl.formjs;
}

/***/ }),

/***/ "./src/modules/formStartup.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formStartup", function() { return formStartup; });
function formStartup() {
  var self = this,
      formEl = self.formEl;

  if (!formEl.matches('[novalidate]')) {
    return null;
  }

  var fieldOptions = self.options.fieldOptions,
      formOptions = self.options.formOptions; // HANDLE FIELD VALIDATION

  if (fieldOptions.handleValidation) {
    // VALIDATION WITH ATTRIBUTES LIKE HTML ONES ( ALSO FOR BUG FIXING, EG: maxlength IN ANDROID )
    if (fieldOptions.strictHtmlValidation) {
      // maxlength
      // MAXLENGTH IS BUGGY IN ANDROID BROWSERS
      formEl.addEventListener('keypress', self.listenerCallbacks.keypressMaxlength, false); // data-type="number"
      // SINCE VALIDATING type="number" WITH NON NUMERIC CHARS WILL RETURN EMPTY STRING IN SOME BROWSERS ( EG: FIREFOX )

      formEl.addEventListener('input', self.listenerCallbacks.dataTypeNumber, false);
    }

    if (fieldOptions.preventPasteFields && formEl.querySelectorAll(fieldOptions.preventPasteFields).length) {
      // INIT EVENT LISTENER FOR "PASTE" EVENT TO PREVENT IT ON SPECIFIED FIELDS
      formEl.addEventListener('paste', self.listenerCallbacks.pastePrevent, false);
    } // INIT EVENTS LISTENER ( AS IN fieldOptions )


    fieldOptions.validateOnEvents.split(' ').forEach(function (eventName) {
      var useCapturing = eventName === 'blur' ? true : false;
      formEl.addEventListener(eventName, self.listenerCallbacks.validation, useCapturing);
    });
  } // HANDLE FORM SUBMIT


  if (formOptions.handleSubmit) {
    // INIT FORM SUBMIT ( DEFAULT AND AJAX )
    formEl.addEventListener('submit', self.listenerCallbacks.submit);

    if (formOptions.ajaxSubmit) {
      if (formEl.getAttribute('enctype')) {
        // FOR XMLHttpRequest API
        formOptions.ajaxOptions.contentType = formEl.getAttribute('enctype'); // FOR fetch API

        formOptions.ajaxOptions.headers['Content-Type'] = formEl.getAttribute('enctype');
      }

      if (formEl.getAttribute('method')) {
        formOptions.ajaxOptions.method = formEl.getAttribute('method').toUpperCase();
      }

      if (formEl.getAttribute('action')) {
        formOptions.ajaxOptions.url = formEl.getAttribute('action');
      }
    }
  }
}

/***/ }),

/***/ "./src/modules/getFormData.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFormData", function() { return getFormData; });
function getFormData() {
  var self = this,
      formEl = self.formEl,
      formFieldsEl = formEl.querySelectorAll('input, select, textarea'),
      excludeSelectors = ':not([type="reset"]):not([type="submit"]):not([type="button"]):not([type="file"]):not([data-exclude-data])',
      filteredFields = Array.from(formFieldsEl).filter(function (elem) {
    return elem.matches(excludeSelectors);
  });
  return self.options.formOptions.getFormData.call(self, filteredFields);
}

/***/ }),

/***/ "./src/modules/helper.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fieldsStringSelector", function() { return fieldsStringSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addClass", function() { return addClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkFormEl", function() { return checkFormEl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "executeCallback", function() { return executeCallback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSplitChar", function() { return getSplitChar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDOMNode", function() { return isDOMNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFieldForChangeEvent", function() { return isFieldForChangeEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNodeList", function() { return isNodeList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPlainObject", function() { return isPlainObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeObjects", function() { return mergeObjects; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeClass", function() { return removeClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serializeObject", function() { return serializeObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toCamelCase", function() { return toCamelCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateFieldObjDefault", function() { return validateFieldObjDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateFormObjDefault", function() { return validateFormObjDefault; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var fieldsStringSelector = 'input:not([type="reset"]):not([type="submit"]):not([type=button]):not([type=hidden]), select, textarea',
    addClass = function addClass(element, cssClasses) {
  cssClasses.split(' ').forEach(function (className) {
    element.classList.add(className);
  });
},
    checkFormEl = function checkFormEl(formEl) {
  var isString = _typeof(formEl),
      isValidNodeSelector = isString === 'string' && isDOMNode(document.querySelector(formEl)),
      isFormSelector = isValidNodeSelector && document.querySelector(formEl).tagName.toLowerCase() === 'form',
      obj = {
    result: isDOMNode(formEl) || isFormSelector,
    element: isString === 'string' ? document.querySelector(formEl) : formEl
  };

  return obj;
},
    executeCallback = function executeCallback(callbackOption) {
  var callbackData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var tempOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var self = this,
      options = mergeObjects({}, self.options, tempOptions),
      callbackFnList = [];

  if (typeof callbackOption === 'function') {
    callbackFnList.push(callbackOption);
  } else if (Array.isArray(callbackOption)) {
    callbackFnList = callbackOption;
  }

  callbackFnList.forEach(function (cbFn) {
    cbFn.call(self, callbackData, options);
  });
},
    getSplitChar = function getSplitChar(string) {
  var splitChar = '.';

  if (string.indexOf(splitChar) === -1) {
    if (string.indexOf('-') >= 0) {
      splitChar = '-';
    } else if (string.indexOf('/') >= 0) {
      splitChar = '/';
    }
  }

  return splitChar;
},
    isDOMNode = function isDOMNode(node) {
  return Element.prototype.isPrototypeOf(node);
},
    isFieldForChangeEvent = function isFieldForChangeEvent(fieldEl) {
  return fieldEl.matches('select, [type="radio"], [type="checkbox"], [type="file"]');
},
    isNodeList = function isNodeList(nodeList) {
  return NodeList.prototype.isPrototypeOf(nodeList);
},
    isPlainObject = function isPlainObject(object) {
  return Object.prototype.toString.call(object) === '[object Object]';
},
    mergeObjects = function mergeObjects() {
  var out = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  for (var i = 1; i < arguments.length; i++) {
    var obj = arguments[i];

    if (!obj) {
      continue;
    }

    for (var key in obj) {
      var isArray = Object.prototype.toString.call(obj[key]) === "[object Array]";
      var isObject = Object.prototype.toString.call(obj[key]) === "[object Object]"; // COPY ONLY ENUMERABLE PROPERTIES

      if (obj.hasOwnProperty(key)) {
        if (isArray) {
          if (typeof out[key] === 'undefined') {
            out[key] = [];
          }

          out[key] = out[key].concat(obj[key].slice(0));
        } else if (isObject) {
          out[key] = mergeObjects(out[key], obj[key]);
        } else {
          // * STRING | NUMBER | BOOLEAN | FUNCTION
          if (Array.isArray(out[key])) {
            // IF THIS IS ONE OF ABOVE (*) AND THE DESTINATION OBJECT IS AN ARRAY
            out[key].push(obj[key]);
          } else {
            out[key] = obj[key];
          }
        }
      }
    }
  }

  return out;
},
    removeClass = function removeClass(element, cssClasses) {
  cssClasses.split(' ').forEach(function (className) {
    element.classList.remove(className);
  });
},
    serializeObject = function serializeObject(obj) {
  var objToString = obj && _typeof(obj) === 'object' && obj.constructor === Object ? Object.keys(obj).reduce(function (a, k) {
    a.push(k + '=' + encodeURIComponent(obj[k]));
    return a;
  }, []).join('&') : obj;
  return objToString;
},
    toCamelCase = function toCamelCase(string) {
  return string.replace(/-([a-z])/ig, function (all, letter) {
    return letter.toUpperCase();
  });
},
    validateFieldObjDefault = {
  result: false,
  fieldEl: null
},
    validateFormObjDefault = {
  result: true,
  fields: []
};

/***/ }),

/***/ "./src/modules/init.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/modules/helper.js");

var init = function init() {
  var self = this,
      formEl = self.formEl,
      formFields = formEl.querySelectorAll(_helper_js__WEBPACK_IMPORTED_MODULE_0__["fieldsStringSelector"]);
  var currentFieldName = '',
      currentFieldType = '';
  Array.from(formFields).forEach(function (fieldEl) {
    var name = fieldEl.name,
        type = fieldEl.type; // AVOID REPEATING VALIDATION IF THE FIELD HAS THE SAME NAME OF THE PREVIOUS ONE

    if (name === currentFieldName && type === currentFieldType) {
      return true;
    }

    var isCheckboxOrRadio = fieldEl.type === 'checkbox' || fieldEl.type === 'radio',
        isFieldForChangeEventBoolean = Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__["isFieldForChangeEvent"])(fieldEl),
        fieldChecked = formEl.querySelector('[name="' + fieldEl.name + '"]:checked'),
        isReqFrom = fieldEl.matches('[data-required-from]'),
        reqMoreEl = isReqFrom ? formEl.querySelector(fieldEl.getAttribute('data-required-from')) : null;

    if (!isReqFrom) {
      currentFieldName = name;
      currentFieldType = type;
    }

    if (fieldChecked) {
      fieldEl = fieldChecked;
    } // VALIDATE FIELD ( BY TRIGGERING THE validation CALLBACK ) IF IT ALREADY HAS A VALUE


    if (!isCheckboxOrRadio && fieldEl.value || isCheckboxOrRadio && fieldChecked !== null || isReqFrom && reqMoreEl.checked) {
      var fakeEventObj = {
        target: fieldEl,
        type: isFieldForChangeEventBoolean ? 'change' : ''
      };
      self.listenerCallbacks.validation.call(self, fakeEventObj);
    }
  });
  self.isInitialized = true;
  return self;
};

/***/ }),

/***/ "./src/modules/isValid.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValid", function() { return isValid; });
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/modules/helper.js");
/* harmony import */ var _validationRules_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/modules/validationRules.js");


function isValid(fieldEl) {
  var fieldOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var self = this,
      fieldType = fieldEl.matches('[data-subtype]') ? Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__["toCamelCase"])(fieldEl.getAttribute('data-subtype')) : fieldEl.type,
      fieldValue = fieldEl.value,
      isValidValue = fieldValue.trim().length > 0,
      // ALPHABETICAL REVERSE ORDER
  fieldAttributes = Array.from(fieldEl.attributes).sort(function (a, b) {
    return a.name < b.name;
  });
  var attrValidations = [],
      attrValidationsResult = isValidValue,
      obj = {
    result: isValidValue
  };

  if (!obj.result) {
    obj.errors = {
      empty: true
    };
    return Promise.resolve(obj);
  } // COLLECT SPECIFIC VALIDATIONS FOR validationRulesAttributes


  fieldAttributes.forEach(function (attr) {
    // FOR data-* ATTRIBUTES -> REMOVE "data-" AND TRANSFORM TO CAMELCASE
    var attrName = Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__["toCamelCase"])(attr.name.replace('data-', '')),
        attrValue = attr.value,
        isAttrValueWithFn = attrName === 'type' && typeof _validationRules_js__WEBPACK_IMPORTED_MODULE_1__["validationRulesAttributes"][attrValue] === 'function',
        isAttrNameWithFn = typeof _validationRules_js__WEBPACK_IMPORTED_MODULE_1__["validationRulesAttributes"][attrName] === 'function';

    if (isAttrValueWithFn || isAttrNameWithFn) {
      var extraValObj = {
        attrName: isAttrValueWithFn ? attrValue : attrName,
        attrValue: attrValue,
        fieldEl: fieldEl,
        fieldOptions: fieldOptions
      };

      if (isAttrValueWithFn || attrName === 'requiredFrom') {
        // THESE VALIDATIONS MUST RUN BEFORE ALL OTHERS
        attrValidations.unshift(extraValObj);
      } else {
        attrValidations.push(extraValObj);
      }
    }
  }); // RUN SPECIFIC VALIDATIONS FOR validationRulesAttributes

  attrValidations.forEach(function (item) {
    var extraVal = _validationRules_js__WEBPACK_IMPORTED_MODULE_1__["validationRulesAttributes"][item.attrName](item);

    if (!extraVal.result) {
      obj = Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__["mergeObjects"])({}, obj, extraVal);
      attrValidationsResult = false;
    }
  });
  return new Promise(function (resolve) {
    // RUN VALIDATIONS FOR validationRules
    if (typeof self.validationRules[fieldType] === 'function') {
      resolve(self.validationRules[fieldType](fieldValue, fieldEl));
    } else {
      resolve(obj);
    }
  }).then(function (data) {
    obj = Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__["mergeObjects"])({}, obj, data);
    obj.result = obj.result && attrValidationsResult;

    if (!obj.result) {
      var fieldErrors = typeof self.validationErrors[fieldType] === 'function' ? self.validationErrors[fieldType](fieldValue, fieldEl) : {};

      if (typeof obj.errors === 'undefined') {
        obj.errors = {};
      }

      obj.errors.rule = true;
      obj.errors = Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__["mergeObjects"])({}, obj.errors, fieldErrors);
    }

    return obj;
  });
}

/***/ }),

/***/ "./src/modules/isValidField.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidField", function() { return isValidField; });
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/modules/helper.js");
/* harmony import */ var _checkDirtyField_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/modules/checkDirtyField.js");
/* harmony import */ var _isValid_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/modules/isValid.js");



function isValidField(fieldElem) {
  var fieldOptionsObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var self = this,
      fieldEl = typeof fieldElem === 'string' ? self.formEl.querySelector(fieldElem) : fieldElem;
  var obj = Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__["mergeObjects"])({}, _helper_js__WEBPACK_IMPORTED_MODULE_0__["validateFieldObjDefault"]);

  if (!Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__["isDOMNode"])(fieldEl)) {
    return Promise.resolve(obj);
  }

  var options = Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__["mergeObjects"])({}, self.options.fieldOptions, fieldOptionsObj),
      isValidValue = fieldEl.value.trim().length > 0,
      isRequired = fieldEl.required,
      isReqFrom = fieldEl.matches('[data-required-from]'),
      isValidateIfFilled = fieldEl.matches('[data-validate-if-filled]');
  _checkDirtyField_js__WEBPACK_IMPORTED_MODULE_1__["checkDirtyField"].call(self, fieldEl);
  return new Promise(function (resolve) {
    if (!isRequired && !isValidateIfFilled && !isReqFrom || // IT IS A NORMAL FORM FIELD
    isValidateIfFilled && !isValidValue || // IT IS data-validate-if-filled AND EMPTY
    isReqFrom && !isRequired // IT IS data-required-from AND NOT required
    ) {
        obj.result = true;
        resolve(obj);
      } else {
      resolve(_isValid_js__WEBPACK_IMPORTED_MODULE_2__["isValid"].call(self, fieldEl, options));
    }
  }).then(function (obj) {
    obj.fieldEl = fieldEl;
    return obj;
  });
}

/***/ }),

/***/ "./src/modules/isValidForm.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidForm", function() { return isValidForm; });
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/modules/helper.js");
/* harmony import */ var _isValidField_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/modules/isValidField.js");


function isValidForm() {
  var fieldOptionsObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var self = this,
      formEl = self.formEl,
      obj = Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__["mergeObjects"])({}, _helper_js__WEBPACK_IMPORTED_MODULE_0__["validateFormObjDefault"]),
      fieldOptions = Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__["mergeObjects"])({}, fieldOptionsObj, {
    focusOnRelated: false
  });
  var currentFieldName = '',
      currentFieldType = '';
  var fieldsList = Array.from(formEl.querySelectorAll(_helper_js__WEBPACK_IMPORTED_MODULE_0__["fieldsStringSelector"])).filter(function (fieldEl) {
    var name = fieldEl.name,
        type = fieldEl.type;

    if (name === currentFieldName && type === currentFieldType) {
      return false;
    }

    if (!fieldEl.matches('[data-required-from]')) {
      currentFieldName = name;
      currentFieldType = type;
    }

    return true;
  });
  return Promise.all(fieldsList.map(function (fieldEl) {
    return _isValidField_js__WEBPACK_IMPORTED_MODULE_1__["isValidField"].call(self, fieldEl, fieldOptions);
  })).then(function (list) {
    var areAllFieldsValid = list.filter(function (fieldObj) {
      return !fieldObj.result;
    }).length === 0;
    obj.result = areAllFieldsValid;
    obj.fields = list;
    return obj;
  });
}

/***/ }),

/***/ "./src/modules/listenerCallbacks.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "callbackFns", function() { return callbackFns; });
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/modules/helper.js");
/* harmony import */ var _submit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/modules/submit.js");


var callbackFns = {
  dataTypeNumber: function dataTypeNumber(event) {
    var fieldEl = event.target;

    if (fieldEl.matches('[data-type="number"]')) {
      var fieldValue = fieldEl.value,
          hasInvalidChars = /[^\d.,+\-]/.test(fieldValue);

      if (hasInvalidChars) {
        event.stopImmediatePropagation();
        var valueReplaced = fieldValue.replace(/[^\d.,+\-]/g, '');
        fieldEl.value = valueReplaced;
      }
    }
  },
  keypressMaxlength: function keypressMaxlength(event) {
    var fieldEl = event.target;

    if (fieldEl.matches('[maxlength]')) {
      var maxLength = fieldEl.maxLength * 1,
          keyPressed = event.which || event.keyCode,
          allowedKeys = [8, 37, 38, 39, 46];

      if (fieldEl.value.length >= maxLength && allowedKeys.indexOf(keyPressed) === -1) {
        return false;
      }
    }
  },
  pastePrevent: function pastePrevent(event) {
    var self = this,
        fieldEl = event.target;
    var fieldOptions = self.options.fieldOptions;

    if (fieldEl.matches(fieldOptions.preventPasteFields)) {
      event.preventDefault();
      _helper_js__WEBPACK_IMPORTED_MODULE_0__["executeCallback"].call(self, fieldOptions.onPastePrevented, fieldEl);
    }
  },
  submit: function submit(event) {
    _submit_js__WEBPACK_IMPORTED_MODULE_1__["submit"].call(this, event);
  },
  validation: function validation(event) {
    var self = this,
        eventName = event.type,
        fieldEl = event.target;

    if (fieldEl.matches(_helper_js__WEBPACK_IMPORTED_MODULE_0__["fieldsStringSelector"])) {
      var isFieldForChangeEventBoolean = Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__["isFieldForChangeEvent"])(fieldEl),
          isRadio = fieldEl.type === 'radio',
          isReqFrom = fieldEl.matches('[data-required-from]'),
          isReqMore = fieldEl.matches('[data-require-more]'),
          isValidValue = fieldEl.value.trim().length > 0; // HANDLE data-require-more FIELDS

      if (isRadio && eventName === 'change') {
        var findReqMoreEl = isReqMore ? fieldEl : self.formEl.querySelector('[name="' + fieldEl.name + '"][data-require-more]'),
            findReqFromEl = findReqMoreEl !== null ? self.formEl.querySelector('[data-required-from="#' + findReqMoreEl.id + '"]') : null;

        if (isReqMore) {
          if (findReqFromEl !== null) {
            findReqFromEl.required = fieldEl.required;

            if (self.options.fieldOptions.focusOnRelated) {
              findReqFromEl.focus();
            }
          }
        } else if (findReqMoreEl !== null) {
          if (findReqFromEl !== null) {
            findReqFromEl.required = findReqMoreEl.required && findReqMoreEl.checked;
            findReqFromEl.value = '';
          }
        }
      } // HANDLE data-required-from FIELDS


      if (isReqFrom) {
        if (isValidValue) {
          var reqMoreEl = self.formEl.querySelector(fieldEl.getAttribute('data-required-from'));
          reqMoreEl.checked = true;
          fieldEl.required = reqMoreEl.required;
        }
      }

      if (isFieldForChangeEventBoolean && eventName === 'change' || !isFieldForChangeEventBoolean && eventName !== 'change') {
        self.validateField(fieldEl).then(function (obj) {
          var type = obj.fieldEl.type,
              realtedFieldEqualTo = obj.fieldEl.closest('form').querySelector('[data-equal-to="' + obj.fieldEl.name + '"]');

          if ( // FIELD IS required OR data-validate-if-filled AND ITS data-equal-to FIELD HAS A VALUE
          (obj.fieldEl.required || obj.fieldEl.matches('[data-validate-if-filled]')) && !(type === 'checkbox' || type === 'radio') && realtedFieldEqualTo && realtedFieldEqualTo.value.trim() !== '') {
            self.validateField(realtedFieldEqualTo);
          }
        });
      }
    }
  }
};

/***/ }),

/***/ "./src/modules/options.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "options", function() { return options; });
/* harmony import */ var _optionsUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/modules/optionsUtils.js");
/* harmony import */ var _optionsAjaxXhr_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/modules/optionsAjaxXhr.js");
 //import { ajaxOptions } from './optionsAjax.js';


var options = {
  fieldOptions: {
    cssClasses: {
      dirty: 'is-dirty',
      error: 'has-error',
      errorEmpty: 'has-error-empty',
      errorRule: 'has-error-rule',
      valid: 'is-valid'
    },
    focusOnRelated: true,
    handleFileUpload: true,
    handleValidation: true,
    maxFileSize: 10,
    onPastePrevented: [],
    onValidation: [_optionsUtils_js__WEBPACK_IMPORTED_MODULE_0__["defaultCallbacksInOptions"].fieldOptions.onValidation],
    preventPasteFields: '[type="password"], [data-equal-to]',
    skipUIfeedback: false,
    strictHtmlValidation: true,
    validateOnEvents: 'input change'
  },
  formOptions: {
    ajaxOptions: _optionsAjaxXhr_js__WEBPACK_IMPORTED_MODULE_1__["ajaxOptions"],
    ajaxSubmit: true,
    beforeSend: [],
    getFormData: _optionsUtils_js__WEBPACK_IMPORTED_MODULE_0__["defaultCallbacksInOptions"].formOptions.getFormData,
    handleSubmit: true,
    onSubmitComplete: [],
    onSubmitError: [],
    onSubmitSuccess: []
  }
};

/***/ }),

/***/ "./src/modules/optionsAjaxXhr.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ajaxOptions", function() { return ajaxOptions; });
var ajaxOptions = {
  async: true,
  cache: false,
  contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  method: 'POST',
  timeout: 0,
  url: location.href
};

/***/ }),

/***/ "./src/modules/optionsUtils.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultCallbacksInOptions", function() { return defaultCallbacksInOptions; });
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/modules/helper.js");

var defaultCallbacksInOptions = {
  fieldOptions: {
    onValidation: function onValidationDefault(fieldsArray) {
      var tempOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var self = this,
          options = Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__["mergeObjects"])({}, self.options.fieldOptions, tempOptions.fieldOptions);
      fieldsArray.forEach(function (obj) {
        var fieldEl = obj.fieldEl,
            containerEl = fieldEl.closest('[data-formjs-question]'),
            isReqFrom = fieldEl.matches('[data-required-from]'),
            reqMoreEl = self.formEl.querySelector(fieldEl.getAttribute('data-required-from'));

        if (containerEl !== null && !options.skipUIfeedback) {
          if (obj.result) {
            if (!isReqFrom || isReqFrom && reqMoreEl.checked) {
              // IF FIELD IS VALID
              var errorClasses = options.cssClasses.error + ' ' + options.cssClasses.errorEmpty + ' ' + options.cssClasses.errorRule;
              Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__["removeClass"])(containerEl, errorClasses);
              Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__["addClass"])(containerEl, options.cssClasses.valid);
            }
          } else {
            // IF FIELD IS NOT VALID
            var extraErrorClass = options.cssClasses.errorRule; // HANDLE CASE OF FIELD data-checks

            var isChecks = fieldEl.matches('[data-checks]'),
                checkedElLength = isChecks ? containerEl.querySelectorAll('[name="' + fieldEl.name + '"]:checked').length : 0;

            if (!isChecks && obj.errors && obj.errors.empty || isChecks && checkedElLength === 0) {
              extraErrorClass = options.cssClasses.errorEmpty;
            }

            var _errorClasses = options.cssClasses.error + ' ' + extraErrorClass,
                errorClassToRemove = options.cssClasses.errorEmpty + ' ' + options.cssClasses.errorRule;

            Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__["removeClass"])(containerEl, options.cssClasses.valid + ' ' + errorClassToRemove);
            Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__["addClass"])(containerEl, _errorClasses);
          }
        }
      });
    }
  },
  formOptions: {
    getFormData: function getFormDataDefault(filteredFields) {
      var formData = {},
          self = this,
          formEl = self.formEl;
      filteredFields.forEach(function (fieldEl) {
        var isCheckbox = fieldEl.type === 'checkbox',
            isRadio = fieldEl.type === 'radio',
            isSelect = fieldEl.matches('select'),
            name = fieldEl.name,
            value = fieldEl.value;

        if (isCheckbox) {
          value = fieldEl.checked;
          var checkboxes = Array.from(formEl.querySelectorAll('[name="' + name + '"]'));

          if (checkboxes.length > 1) {
            value = [];
            var checkedElems = checkboxes.filter(function (field) {
              return field.checked;
            });
            checkedElems.forEach(function (fieldEl) {
              value.push(fieldEl.value);
            });
          }
        } else if (isRadio) {
          var checkedRadio = formEl.querySelector('[name="' + name + '"]:checked');
          value = checkedRadio === null ? null : checkedRadio.value;
        } else if (isSelect) {
          var selectedOpts = Array.from(fieldEl.options).filter(function (option) {
            return option.selected;
          });

          if (selectedOpts.length > 1) {
            value = [];
            selectedOpts.forEach(function (fieldEl) {
              value.push(fieldEl.value);
            });
          }
        }

        formData[name] = value;
      });
      return formData;
    }
  }
};

/***/ }),

/***/ "./src/modules/submit.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "submit", function() { return submit; });
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/modules/helper.js");
/* harmony import */ var _ajaxCallXhr_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/modules/ajaxCallXhr.js");
 //import { ajaxCall }     from './ajaxCall.js';


function submit(event) {
  var self = this,
      options = self.options,
      isAjaxForm = options.formOptions.ajaxSubmit,
      formEl = self.formEl,
      btnEl = formEl.querySelector('[type="submit"]'),
      eventPreventDefault = function eventPreventDefault() {
    var enableBtn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    if (btnEl && enableBtn) {
      btnEl.disabled = false;
    }

    if (event) {
      event.preventDefault();
    }
  };

  if (isAjaxForm) {
    eventPreventDefault(false);
  }

  if (btnEl) {
    if (btnEl.disabled) {
      eventPreventDefault(false);
      return false;
    }

    btnEl.disabled = true;
  }

  var handleValidation = options.fieldOptions.handleValidation,
      formValidationPromise = handleValidation ? self.validateForm() : Promise.resolve(_helper_js__WEBPACK_IMPORTED_MODULE_0__["validateFormObjDefault"]);
  formValidationPromise.then(function (formValidation) {
    var beforeSendData = {
      stopExecution: false,
      formData: {}
    };

    if (!formValidation.result) {
      eventPreventDefault();
      beforeSendData.stopExecution = true;
      return [beforeSendData];
    }

    var formDataObj = isAjaxForm ? self.getFormData() : null,
        callbacksBeforeSend = options.formOptions.beforeSend;

    if (formDataObj) {
      beforeSendData.formData = formDataObj;
    }

    return callbacksBeforeSend.reduce(function (acc, cbFn) {
      return acc.then(function (res) {
        var beforeSendDataNew = Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__["mergeObjects"])({}, res[res.length - 1]);

        if (beforeSendDataNew.stopExecution) {
          return Promise.resolve(res);
        }

        return cbFn.call(self, beforeSendDataNew, options).then(function (result) {
          res.push(result);
          return res;
        });
      });
    }, Promise.resolve([beforeSendData]));
  }).then(function (dataList) {
    if (dataList.filter(function (data) {
      return data.stopExecution;
    }).length > 0) {
      eventPreventDefault();
      return false;
    }

    if (isAjaxForm) {
      var formData = dataList[dataList.length - 1].formData;
      _ajaxCallXhr_js__WEBPACK_IMPORTED_MODULE_1__["ajaxCall"].call(self, formData);
    }
  });
}

/***/ }),

/***/ "./src/modules/validateField.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateField", function() { return validateField; });
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/modules/helper.js");
/* harmony import */ var _isValidField_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/modules/isValidField.js");


function validateField(fieldElem) {
  var fieldOptionsObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var self = this,
      fieldEl = typeof fieldElem === 'string' ? self.formEl.querySelector(fieldElem) : fieldElem,
      fieldOptions = Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__["mergeObjects"])({}, self.options.fieldOptions, fieldOptionsObj);
  return new Promise(function (resolve) {
    var prom = _isValidField_js__WEBPACK_IMPORTED_MODULE_1__["isValidField"].call(self, fieldEl, fieldOptionsObj);
    resolve(prom);
  }).then(function (obj) {
    if (obj.fieldEl) {
      _helper_js__WEBPACK_IMPORTED_MODULE_0__["executeCallback"].call(self, fieldOptions.onValidation, [obj], {
        fieldOptions: fieldOptionsObj
      });
    }

    return obj;
  });
}

/***/ }),

/***/ "./src/modules/validateForm.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateForm", function() { return validateForm; });
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/modules/helper.js");
/* harmony import */ var _isValidForm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/modules/isValidForm.js");


function validateForm() {
  var fieldOptionsObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var self = this,
      fieldOptions = Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__["mergeObjects"])({}, self.options.fieldOptions, fieldOptionsObj);
  return new Promise(function (resolve) {
    var prom = _isValidForm_js__WEBPACK_IMPORTED_MODULE_1__["isValidForm"].call(self, fieldOptionsObj);
    resolve(prom);
  }).then(function (obj) {
    _helper_js__WEBPACK_IMPORTED_MODULE_0__["executeCallback"].call(self, fieldOptions.onValidation, obj.fields, {
      fieldOptions: fieldOptionsObj
    });
    return obj;
  });
}

/***/ }),

/***/ "./src/modules/validationErrors.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validationErrors", function() { return validationErrors; });
var validationErrors = {
  email: function email(string) {
    var obj = {};

    if (string.indexOf('@') === -1) {
      // @ IS MISSING
      obj.missingAtChar = true;
    } else {
      var splitAt_at = string.split('@');

      if (splitAt_at[0].length === 0) {
        // USER NAME IS MISSING
        obj.missingUserName = true;
      }

      if (splitAt_at[1].length === 0) {
        // IS EMPTY AFTER @
        obj.missingDomain = true;
        obj.missingExtensionDot = true;
        obj.missingExtension = true;
      } else if (splitAt_at[1].indexOf('.') === -1) {
        // DOT IS MISSING
        obj.missingExtensionDot = true;
        obj.missingExtension = true;
      } else {
        // EXTENSION MISSING OR NOT LONG ENOUGH
        var splitAt_dot = splitAt_at[1].split('.'),
            extLength = splitAt_dot[1].length;

        if (extLength === 0) {
          obj.missingExtension = true;
        } else if (extLength < 2) {
          obj.minlengthExtension = true;
        }
      }
    }

    return obj;
  }
};

/***/ }),

/***/ "./src/modules/validationRules.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validationRules", function() { return validationRules; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validationRulesAttributes", function() { return validationRulesAttributes; });
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/modules/helper.js");

var validationRules = {
  date: function date(string) {
    // DATE AS ISO 8601 DATE FORMAT     YYYY MM DD | YYYY/MM/DD | YYYY.MM.DD | YYYY-MM-DD
    var date = /^(((19|[2-9]\d)\d{2})[ \/\-.](0[13578]|1[02])[ \/\-.](0[1-9]|[12]\d|3[01]))|(((19|[2-9]\d)\d{2})[ \/\-.](0[13456789]|1[012])[ \/\-.](0[1-9]|[12]\d|30))|(((19|[2-9]\d)\d{2})[ \/\-.]02[ \/\-.](0[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))[ \/\-.]02[ \/\-.]29)$/g.test(string),
        obj = {
      result: date
    };
    return obj;
  },
  email: function email(string) {
    // FROM https://emailregex.com
    // AS FOR RFC 5322 Official Standard EMAIL MUST BE AT LEAST:
    // a@a.aa
    var obj = {
      result: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(string)
    };
    return obj;
  },
  number: function number(string) {
    // ALL NUMBERS ( INTEGERS AND FLOATING )
    // VALID NUMBERS: 123 | 123.456 | .123
    var obj = {
      result: /[+-]?([0-9]*[.])?[0-9]+/.test(string)
    };
    return obj;
  }
};
var validationRulesAttributes = {
  checkbox: function checkbox(data) {
    var formEl = data.fieldEl.closest('form'),
        dataChecksEl = formEl.querySelector('[name="' + data.fieldEl.name + '"][data-checks]'),
        obj = {
      result: data.fieldEl.checked
    };

    if (dataChecksEl !== null) {
      obj = this.checks({
        attrValue: dataChecksEl.getAttribute('data-checks'),
        fieldEl: dataChecksEl
      });
    }

    return obj;
  },
  checks: function checks(data) {
    try {
      var attrValue = JSON.parse(data.attrValue),
          fieldEl = data.fieldEl,
          formEl = fieldEl.closest('form'),
          checkedElLength = formEl.querySelectorAll('[name="' + fieldEl.name + '"]:checked').length,
          isMinOk = checkedElLength >= attrValue[0],
          isMaxOk = checkedElLength <= attrValue[1],
          obj = {
        result: isMinOk && isMaxOk
      };

      if (!obj.result) {
        obj.errors = {
          checks: true
        };

        if (!isMinOk) {
          obj.errors.minChecks = true;
        }

        if (!isMaxOk) {
          obj.errors.maxChecks = true;
        }
      }

      return obj;
    } catch (e) {
      throw new Error('"data-checks" attribute is not a valid array!');
    }
  },
  equalTo: function equalTo(data) {
    var fieldEl = data.fieldEl,
        formEl = fieldEl.closest('form'),
        checkFromEl = formEl.querySelector('[name="' + fieldEl.getAttribute('data-equal-to') + '"]'),
        obj = {
      result: fieldEl.value === checkFromEl.value
    };

    if (!obj.result) {
      obj.errors = {
        equalTo: true
      };
    }

    return obj;
  },
  exactLength: function exactLength(data) {
    var valueLength = data.fieldEl.value.length,
        exactLength = data.attrValue * 1,
        obj = {
      result: valueLength === exactLength
    };

    if (!obj.result) {
      obj.errors = {
        exactLength: true
      };

      if (valueLength < exactLength) {
        obj.errors.minlength = true;
      } else {
        obj.errors.maxlength = true;
      }
    }

    return obj;
  },
  file: function file(data) {
    var fieldEl = data.fieldEl,
        maxFileSize = (fieldEl.getAttribute('data-max-file-size') || data.fieldOptions.maxFileSize) * 1,
        MIMEtype = fieldEl.accept ? new RegExp(fieldEl.accept.replace('*', '[^\\/,]+')) : null,
        filesList = Array.from(fieldEl.files),
        obj = {
      result: true
    };
    filesList.forEach(function (file) {
      var exceedMaxFileSize = maxFileSize > 0 && file.size / 1024 / 1024 > maxFileSize,
          isAcceptedFileType = MIMEtype !== null ? MIMEtype.test(file.type) : true;

      if (exceedMaxFileSize || !isAcceptedFileType) {
        obj.result = false;

        if (typeof obj.errors === 'undefined') {
          obj.errors = {};
        }

        obj.errors.file = true;

        if (exceedMaxFileSize) {
          obj.errors.maxFileSize = true;
        }

        if (!isAcceptedFileType) {
          obj.errors.acceptedFileType = true;
        }
      }
    });
    return obj;
  },
  length: function length(data) {
    try {
      var valueL = data.fieldEl.value.length,
          attrValue = JSON.parse(data.attrValue),
          isMinlengthOk = valueL >= attrValue[0],
          isMaxlengthOk = valueL <= attrValue[1],
          obj = {
        result: isMinlengthOk && isMaxlengthOk
      };

      if (!obj.result) {
        obj.errors = {
          stringLength: true
        };

        if (!isMinlengthOk) {
          obj.errors.minlength = true;
        }

        if (!isMaxlengthOk) {
          obj.errors.maxlength = true;
        }
      }

      return obj;
    } catch (e) {
      throw new Error('"data-length" attribute is not a valid array!');
    }
  },
  max: function max(data) {
    var fieldEl = data.fieldEl,
        isDate = fieldEl.matches('[type="date"]') || fieldEl.matches('[data-subtype="date"]') || fieldEl.matches('[data-subtype="dateDDMMYYYY"]'),
        value = data.fieldEl.value,
        maxVal = data.attrValue;

    if (isDate) {
      var splitChar = Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__["getSplitChar"])(value);

      if (value.indexOf(splitChar) === 2) {
        // DD MM YYYY
        value = value.split(splitChar).reverse();
      } else {
        // YYYY MM DD
        value = value.split(splitChar);
      }

      value = value.join('');
      maxVal = maxVal.split('-').join('');
    }

    value = value * 1;
    maxVal = maxVal * 1;
    var obj = {
      result: value <= maxVal
    };

    if (!obj.result) {
      obj.errors = {
        max: true
      };
    }

    return obj;
  },
  maxlength: function maxlength(data) {
    var obj = {
      result: data.fieldEl.value.length <= data.attrValue * 1
    };

    if (!obj.result) {
      obj.errors = {
        maxlength: true
      };
    }

    return obj;
  },
  min: function min(data) {
    var fieldEl = data.fieldEl,
        isDate = fieldEl.matches('[type="date"]') || fieldEl.matches('[data-subtype="date"]') || fieldEl.matches('[data-subtype="dateDDMMYYYY"]'),
        value = data.fieldEl.value,
        minVal = data.attrValue;

    if (isDate) {
      var splitChar = Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__["getSplitChar"])(value);

      if (value.indexOf(splitChar) === 2) {
        // DD MM YYYY
        value = value.split(splitChar).reverse();
      } else {
        // YYYY MM DD
        value = value.split(splitChar);
      }

      value = value.join('');
      minVal = minVal.split('-').join('');
    }

    value = value * 1;
    minVal = minVal * 1;
    var obj = {
      result: value >= minVal
    };

    if (!obj.result) {
      obj.errors = {
        min: true
      };
    }

    return obj;
  },
  minlength: function minlength(data) {
    var obj = {
      result: data.fieldEl.value.length >= data.attrValue * 1
    };

    if (!obj.result) {
      obj.errors = {
        minlength: true
      };
    }

    return obj;
  },
  pattern: function pattern(data) {
    var fieldEl = data.fieldEl,
        fieldPattern = fieldEl.pattern,
        fieldRegex = new RegExp(fieldPattern),
        obj = {
      result: fieldRegex.test(fieldEl.value)
    };

    if (!obj.result) {
      obj.errors = {
        pattern: true
      };
    }

    return obj;
  },
  radio: function radio(data) {
    var fieldEl = data.fieldEl,
        fieldChecked = fieldEl.closest('form').querySelector('[name="' + fieldEl.name + '"]:checked'),
        isValid = fieldChecked !== null && fieldChecked.value.trim().length > 0,
        obj = {
      result: isValid
    };
    return obj;
  },
  requiredFrom: function requiredFrom(data) {
    var fieldEl = data.fieldEl,
        formEl = fieldEl.closest('form'),
        isValidValue = fieldEl.value.trim().length > 0,
        reqMoreEl = formEl.querySelector(fieldEl.getAttribute('data-required-from')),
        checkedEl = formEl.querySelector('[name="' + reqMoreEl.name + '"]:checked'),
        obj = {
      result: checkedEl !== null
    };

    if (reqMoreEl.checked && reqMoreEl.required) {
      obj.result = isValidValue;
    }

    if (!obj.result) {
      obj.errors = {
        requiredFrom: true
      };
    }

    return obj;
  }
};

/***/ })

/******/ });