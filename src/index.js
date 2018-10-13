/**! formJS v2.0.0 | Valerio Di Punzio (@SimplySayHi) | https://valeriodipunzio.com/plugins/formJS/ | https://github.com/SimplySayHi/formJS | MIT license */

import { _isNodeList, _mergeObjects } from './modules/helper.js';

import { options }              from './modules/options.js';
import { validationRules }      from './modules/validationRules.js';

import { getFormJSON }          from './modules/getFormJSON.js';
import { isValidField }         from './modules/isValidField.js';
import { isValidForm }          from './modules/isValidForm.js';
import { submit }               from './modules/submit.js';

import { _init }                from './modules/init.js';

class Form {
    constructor( formEl, optionsObj = {} ){
        if( !formEl ){ throw new Error('First argument "formEl" is missing!'); }
        if( _isNodeList(formEl) ){ throw new Error('First argument "formEl" must be a single node, not a nodeList!'); }

        this.formEl = formEl;
        this.options = _mergeObjects({}, optionsObj, Form.prototype.options);

        _init.call( this );
    }
    
    getFormJSON(){
        return getFormJSON.call(this);
    }
    
    isValidField( fieldEl, fieldOptionsObj ){
        return isValidField.call(this, fieldEl, fieldOptionsObj);
    }
    
    isValidForm( optionsObj ){
        return isValidForm.call(this, optionsObj);
    }

    submit( optionsObj, event ){
        submit.call(this, optionsObj, event);
    }
    
    static addValidationRules( rulesObj ){
        this.prototype.validationRules = _mergeObjects({}, rulesObj, this.prototype.validationRules);
    }
    
    static setOptions( optionsObj ){
        this.prototype.options = _mergeObjects({}, optionsObj, this.prototype.options);
    }
}

Form.prototype.validationRules = validationRules;

Form.prototype.options = options;

if( !window.Form ){ window.Form = Form; }
if( !window.FormJS ) { window.FormJS = Form; }
