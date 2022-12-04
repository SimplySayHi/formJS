
export const objectToFormData = ( dataObj, nestedToJSON = true, formData = new FormData() ) => {

    function createFormData (obj, subKeyStr = ''){
        for( let i in obj ){
            const value             = obj[i];
            const i_isNumber        = !Object.is((i*1), Number.NaN)
            const subSubKeyString   = i_isNumber ? '[' + i + ']' : '.' + i;
            const subKeyStrTrans    = subKeyStr ? subKeyStr + subSubKeyString : i;

            if( typeof value === 'object' && value != null ){
                if( nestedToJSON || (Array.isArray(value) && value.length === 0) ){
                    formData.append(subKeyStrTrans, JSON.stringify(value));
                } else {
                    createFormData(value, subKeyStrTrans);
                }
            } else {
                formData.append(subKeyStrTrans, value);
            }
        }
    }

    createFormData(dataObj);

    return formData;

}
