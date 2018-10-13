import { _isNodeList, _isPlainObject, _mergeObjects } from './helper.js';

import { _initFieldsFirstLoad }         from './init/fieldsFirstLoad.js';
import { _initValidationEvents }        from './init/validationEvents.js';
import { _initStrictHtmlValidation }    from './init/strictHtmlValidation.js';

export function _init(){
    const self = this,
          formEl = self.formEl;

    if( !formEl || !formEl.matches('[novalidate]:not([data-formjs-init="false"])') ){ return false; }
    
    let fieldOptions = self.options.fieldOptions;

    // INIT FIELDS FOR FIRST LOAD
    _initFieldsFirstLoad.call(self, formEl, fieldOptions);
    
    // INIT EVENTS LISTENER
    _initValidationEvents.call(self, formEl, fieldOptions);
    
    if( fieldOptions.strictHtmlValidation ){
        // VALIDATION WITH ATTRIBUTES LIKE HTML ONES ( ALSO FOR BUG FIXING, EG: maxlength IN ANDROID )
        _initStrictHtmlValidation.call(self, formEl);
    }
    
    if( fieldOptions.preventPasteFields && formEl.querySelectorAll( fieldOptions.preventPasteFields ).length ){
        // INIT EVENT LISTENER FOR "PASTE" EVENT TO PREVENT IT ON SPECIFIED FIELDS
        formEl.addEventListener('paste', function(event){
            const fieldEl = event.target;
            if( fieldEl.matches( fieldOptions.preventPasteFields ) ){
                event.preventDefault();
                if( typeof fieldOptions.onPastePrevented === 'function' ){
                    fieldOptions.onPastePrevented( fieldEl );
                }
            }
        }, false);
    }
    
    // INIT FORM SUBMIT ( DEFAULT AND AJAX )
    formEl.addEventListener('submit', function(event){
        self.submit( self.options, event );
    });

}