
export const _setCallbackFunctionsInOptions = function(){
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

            self.options[opt][fnName] = fnList;
        });
    }

}
