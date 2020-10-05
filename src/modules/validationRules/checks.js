
export const checks = function( $field ){
    const attrValue = JSON.parse( $field.getAttribute('data-checks') ),
          checkedLength = $field.closest('form').querySelectorAll('[name="' + $field.name + '"]:checked').length,
          isMinOk = checkedLength >= attrValue[0],
          isMaxOk = checkedLength <= attrValue[1],
          obj = { result: isMinOk && isMaxOk };

    if( !obj.result ){
        obj.errors = { checks: true };
        if( !isMinOk ){ obj.errors.minChecks = true; }
        if( !isMaxOk ){ obj.errors.maxChecks = true; }
    }

    return obj;
}
