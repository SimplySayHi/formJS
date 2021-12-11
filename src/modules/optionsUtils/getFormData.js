
export const getFormData = function getFormDataDefault( $filteredFields, trimValues ){

    const formData = {};
    const $form = this.$form;
    let prevObj = formData;
  
    $filteredFields.forEach($field => {
        const isCheckbox = $field.type === "checkbox";
        const isRadio = $field.type === "radio";
        const isSelect = $field.matches("select");
        const name = $field.name;
        let value = trimValues ? $field.value.trim() : $field.value;
  
        if( isCheckbox ){

            value = $field.checked;
            let $checkboxes = Array.from( $form.querySelectorAll('[name="' + name + '"]') );
            if( $checkboxes.length > 1 ){
                value = [];
                let $checked = $checkboxes.filter((field) => field.checked);
                $checked.forEach($field => {
                    value.push($field.value);
                });
            }

        } else if( isRadio ){

            const $checkedRadio = $form.querySelector('[name="' + name + '"]:checked');
            value = $checkedRadio === null ? null : $checkedRadio.value;

        } else if( isSelect ){

            const $selectedOpts = Array.from($field.options).filter(option => option.selected);
            if( $selectedOpts.length > 1 ){
                value = [];
                $selectedOpts.forEach($field => { 
                    value.push($field.value); 
                });
            }
        }
  
        const nameSplit = name.split(".");
        nameSplit.forEach((keyName, index, list) => {
            const isLastKeyName = index + 1 === list.length;
  
            if( Array.isArray(prevObj) ){
                const keyNameSplit = keyName.split("___");
                const arrPos = keyNameSplit[0] - 1;
                const arrayHasItemAtIndex = typeof prevObj[arrPos] !== "undefined";
                const arrItemKeyName = keyNameSplit[1];
  
                if( !arrayHasItemAtIndex ){
                    prevObj.push({});
                }
  
                keyName = arrItemKeyName;

                if( isLastKeyName ){
                    prevObj[arrPos][keyName] = value;
                } else if( typeof prevObj[arrPos][keyName] === 'undefined' ) {
                    prevObj[arrPos][keyName] = {};
                }
                
                if( !isLastKeyName ){
                    prevObj = prevObj[arrPos][keyName];
                    return;
                }
            } else {
                const isKeyNameArray = keyName.endsWith("[]");
                keyName = keyName.replace("[]", "");
  
                if( isLastKeyName ){
                    prevObj[keyName] = value;
                } else if( typeof prevObj[keyName] === "undefined" ){
                    if( isKeyNameArray ){
                        prevObj[keyName] = [];
                    } else {
                        prevObj[keyName] = {};
                    }
                }
            }
  
            prevObj = isLastKeyName ? formData : prevObj[keyName];
        });
    });
  
    return formData;

}
