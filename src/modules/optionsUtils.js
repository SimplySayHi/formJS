
import { addClass, removeClass }  from './helper.js';
import { checkDirtyField }         from './checkDirtyField.js';

const _defaultCallbacksInOptions = {
    fieldOptions: {
        onValidation: function onValidationDefault ( fieldsArray ) {

            let self = this,
                options = self.options.fieldOptions;

            fieldsArray.forEach(function( obj ){
                let fieldEl = obj.fieldEl,
                    containerEl = fieldEl.closest('[data-formjs-question]'),
                    isReqFrom = fieldEl.matches('[data-required-from]'),
                    reqMoreEl = self.formEl.querySelector( fieldEl.getAttribute('data-required-from') );

                if( options.checkDirtyField ){
                    checkDirtyField.call( self, fieldEl );
                }
                
                if( containerEl !== null && !options.skipUIfeedback ){
                    if( obj.result ){

                        if( !isReqFrom || (isReqFrom && reqMoreEl.checked) ){
                            // IF FIELD IS VALID
                            let errorClasses = options.cssClasses.error + ' ' + options.cssClasses.errorEmpty + ' ' + options.cssClasses.errorRule;
                            removeClass( containerEl, errorClasses );
                            addClass( containerEl, options.cssClasses.valid );
                        }

                    } else {

                        // IF FIELD IS NOT VALID
                        let extraErrorClass = options.cssClasses.errorRule;

                        // HANDLE CASE OF FIELD data-checks
                        let isChecks = fieldEl.matches('[data-checks]'),
                            checkedElLength = (isChecks ? containerEl.querySelectorAll('[name="' + fieldEl.name + '"]:checked').length : 0);

                        if( (!isChecks && (obj.errors && obj.errors.empty)) || (isChecks && checkedElLength === 0) ){
                            extraErrorClass = options.cssClasses.errorEmpty;
                        }

                        let errorClasses = options.cssClasses.error + ' ' + extraErrorClass,
                            errorClassToRemove = options.cssClasses.errorEmpty + ' ' + options.cssClasses.errorRule;
                        removeClass( containerEl, options.cssClasses.valid + ' ' + errorClassToRemove );
                        addClass( containerEl, errorClasses );

                    }
                }
            });
            
        }
    }
};

export const setCallbackFunctionsInOptions = function(){
    const   self = this,
            callbacks = {
                fieldOptions: ['onPastePrevented', 'onValidation'],
                formOptions: ['beforeSend', 'onSubmitComplete', 'onSubmitError', 'onSubmitSuccess']
            };

    for(let opt in callbacks){
        let fjsOpt = callbacks[opt];

        fjsOpt.forEach(function(fnName){
            let fnInOptions = self.options[opt][fnName],
                fnList = [];

            if( Array.isArray(fnInOptions) ) {
                fnList.concat(fnInOptions);
            } else if( fnInOptions ) {
                fnList.push(fnInOptions);
            }

            if( typeof _defaultCallbacksInOptions[opt] !== 'undefined' && typeof _defaultCallbacksInOptions[opt][fnName] === 'function' ){
                fnList.unshift(_defaultCallbacksInOptions[opt][fnName]);
            }

            self.options[opt][fnName] = fnList;
        });
    }

}
