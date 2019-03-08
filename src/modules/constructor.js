
import { _checkFormEl, _isNodeList, _mergeObjects } from './helper.js';
import { _setCallbackFunctionsInOptions }           from './optionsUtils.js';
import { _formStartup }                             from './formStartup.js';

export function _constructor( formEl, optionsObj = {} ){

    let self = this,
        argsL = arguments.length,
        checkFormEl = _checkFormEl(formEl);

    if( argsL === 0 || (argsL > 0 && !formEl) ){
        throw new Error('First argument "formEl" is missing or falsy!');
    }
    if( _isNodeList(formEl) ){
        throw new Error('First argument "formEl" must be a single DOM node or a form CSS selector, not a NodeList!');
    }
    if( !checkFormEl.result ){
        throw new Error('First argument "formEl" is not a DOM node nor a form CSS selector!');
    }

    self.formEl = checkFormEl.element;
    self.options = _mergeObjects({}, Form.prototype.options, optionsObj);
    _setCallbackFunctionsInOptions.call( self );

    _formStartup.call( self );
    
}
