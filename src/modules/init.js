import { _initFieldsFirstLoad } from './initFieldsFirstLoad.js';

export function _init(){
    const self = this,
          formEl = self.formEl;

    if( !formEl || !formEl.matches('[novalidate]:not([data-formjs-init="false"])') ){ return false; }
    
    let fieldOptions = self.options.fieldOptions;

    // INIT FIELDS FOR FIRST LOAD
    _initFieldsFirstLoad.call(self, formEl, fieldOptions);
    
    // INIT EVENTS LISTENER
    fieldOptions.validateOnEvents.split(' ').forEach(function( eventName ){
        let useCapturing = (eventName === 'blur' ? true : false);
        formEl.addEventListener(eventName, self.listenerCallbacks.validation, useCapturing);
    });
    
    if( fieldOptions.strictHtmlValidation ){
        // VALIDATION WITH ATTRIBUTES LIKE HTML ONES ( ALSO FOR BUG FIXING, EG: maxlength IN ANDROID )
        formEl.addEventListener('keypress', self.listenerCallbacks.keypressMaxlength, false);
    }
    
    if( fieldOptions.preventPasteFields && formEl.querySelectorAll( fieldOptions.preventPasteFields ).length ){
        // INIT EVENT LISTENER FOR "PASTE" EVENT TO PREVENT IT ON SPECIFIED FIELDS
        formEl.addEventListener('paste', self.listenerCallbacks.pastePrevent, false);
    }
    
    if( self.options.formOptions.handleSubmit ){
        // INIT FORM SUBMIT ( DEFAULT AND AJAX )
        formEl.addEventListener('submit', self.listenerCallbacks.submit);
    }

}