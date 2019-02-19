
import { _addClass, _removeClass }  from './helper.js';
import { _checkDirtyField }         from './checkDirtyField.js';

const _defaultCallbacksInOptions = {
    fieldOptions: {
        onValidation: function ( fieldsArray ) {

            let self = this,
                options = self.options.fieldOptions;

            fieldsArray.forEach(function( obj ){
                let fieldEl = obj.fieldEl,
                    hasTypedValue = fieldEl.value.trim().length > 0,
                    containerEl = fieldEl.closest('[data-formjs-question]'),
                    isReqFrom = fieldEl.matches('[data-required-from]'),
                    reqMoreEl = self.formEl.querySelector( fieldEl.getAttribute('data-required-from') );

                if( options.checkDirtyField ){
                    _checkDirtyField.call( self, fieldEl );
                }
                
                if( containerEl !== null && !options.skipUIfeedback ){
                    if( obj.result ){

                        if( !isReqFrom || (isReqFrom && reqMoreEl.checked) ){
                            // IF FIELD IS VALID
                            let errorClasses = options.cssClasses.error + ' ' + options.cssClasses.errorEmpty + ' ' + options.cssClasses.errorRule;
                            _removeClass( containerEl, errorClasses );
                            _addClass( containerEl, options.cssClasses.valid );
                        }

                    } else {

                        // IF FIELD IS NOT VALID
                        let extraErrorClass = options.cssClasses.errorRule;

                        // HANDLE CASE OF FIELD data-checks
                        let isChecks = fieldEl.matches('[data-checks]'),
                            checkedElLength = (isChecks ? containerEl.querySelectorAll('[name="' + fieldEl.name + '"]:checked').length : 0);

                        if( (!isChecks && !hasTypedValue) || (isChecks && checkedElLength === 0) ){
                            extraErrorClass = options.cssClasses.errorEmpty;
                        }

                        let errorClasses = options.cssClasses.error + ' ' + extraErrorClass,
                            errorClassToRemove = options.cssClasses.errorEmpty + ' ' + options.cssClasses.errorRule;
                        _removeClass( containerEl, options.cssClasses.valid + ' ' + errorClassToRemove );
                        _addClass( containerEl, errorClasses );

                    }
                }
            });
            
        }
    }
};

export const _setCallbackFunctionsInOptions = function(){

    const self = this,
            callbacks = {
                fieldOptions: ['onPastePrevented', 'onValidation'],
                formOptions: ['beforeSend', 'onSubmitComplete', 'onSubmitError', 'onSubmitSuccess']
            };

    for(let opt in callbacks){
        let fjsOpt = callbacks[opt];

        fjsOpt.forEach(function(fnName){
            let fnInOptions = self.options[opt][fnName],
                fnList = [];

            if( typeof fnInOptions === 'function' ){
                fnList.push(fnInOptions);
            } else if( Array.isArray(fnInOptions) ) {
                fnList.concat(fnInOptions);
            } else {
                return;
            }

            if( typeof _defaultCallbacksInOptions[opt] !== 'undefined' && typeof _defaultCallbacksInOptions[opt][fnName] === 'function' ){
                fnList.unshift(_defaultCallbacksInOptions[opt][fnName]);
            }

            self.options[opt][fnName] = fnList;
        });
    }

}
