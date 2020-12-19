
export const alphabetic = function( string ){
    const regex = new RegExp(/^[a-z]+$/i),
        obj = {
            result: regex.test( string )
        };

    return obj;
}

export const alphabeticExtended = function( string ){
    const regex = new RegExp(/^[-'A-ZÀ-ÖØ-öø-ÿ]+$/i),
        obj = {
            result: regex.test( string )
        };

    return obj;
}

export const alphanumeric = function( string ){
    const regex = new RegExp(/^[\w]+$/i), // OR [a-z0-9_]
        obj = {
            result: regex.test( string )
        };

    return obj;
}

export const cap = function( string ){
    // VALID ITALIAN CAP WITH 5 DIGITS
    const regex = new RegExp(/^[0-9]{5}$/),
        obj = {
            result: regex.test( string )
        };

    return obj;
}

export const color = function( string ){
    // HEX COLOR WITH/WITHOUT #
    // CAN BE 3 OR 6 CHARACTERS ( fff | FFF | ffffff | FFFFFF )
    const obj = {
        result: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test( string )
    };

    return obj;
}

export const dateDDMMYYYY = function( string ){
    // DATE AS ITALIAN SYNTAX       DD MM YYYY | DD/MM/YYYY | DD.MM.YYYY | DD-MM-YYYY

    const date = /^(((0[1-9]|[12]\d|3[01])[ \/\-.](0[13578]|1[02])[ \/\-.]((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)[ \/\-.](0[13456789]|1[012])[ \/\-.]((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])[ \/\-.]02[ \/\-.]((19|[2-9]\d)\d{2}))|(29[ \/\-.]02[ \/\-.]((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g.test( string ),
        obj = {
            result: date
        };

    return obj;
}

export const fiscalCode = function( string ){
    // http://blog.marketto.it/2016/01/regex-validazione-codice-fiscale-con-omocodia/
    const obj = {
            result: /^(?:[B-DF-HJ-NP-TV-Z](?:[AEIOU]{2}|[AEIOU]X)|[AEIOU]{2}X|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[1256LMRS][\dLMNP-V])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[\dLMNP-V][1-9MNP-V]|[1-9MNP-V][0L]))[A-Z]$/i.test( string )
        };
    
    return obj;
}

export const landlineNumber = function( string ){
    // LANDLINE PREFIX:
    // +39 | 0039 | not-set ( ALSO WITH INTERNATIONAL PREFIXES WITH 2 DIGITS )
    // LANDLINE NUMBER MUST START WITH 0 ( AS FOR ITALIAN ONES ):
    // 1234567890 | 12 34567890 | 123456789 | 1234 56789 ( ALSO WITH . - / AS SEPARATOR )
    const obj = {
        result: /^((00|\+)\d{2}[\-\. ]??)??(((0[\d]{1,4}))([\/\-\. ]){0,1}([\d, ]{5,10}))$/.test( string )
    };

    return obj; 
}

export const mobileNumber = function( string ){
    // +39 | 0039 | 39 | not-set ( ALSO WITH ALL INTERNATIONAL PREFIXES WITH 2 DIGITS )
    // MOBILE NUMBER MUST START WITH 3
    // 3234567890 | 323 4567890 | 323 45 67 890 ( ALSO WITH . OR - AS SEPARATOR )
    const obj = {
        result: /^((00|\+)??\d{2}[\-\. ]??)??3\d{2}[\-\. ]??(\d{6,7}|\d{2}[\-\. ]??\d{2}[\-\. ]??\d{3})$/.test( string )
    };

    return obj;
}

export const numberFloat = function( string ){
    // ONLY FLOATING NUMBERS
    // VALID NUMBERS: 123.456 | .123
    const obj = {
        result: /[+-]?([0-9]*[.])[0-9]+/.test( string )
    };

    return obj;
}

export const numberInteger = function( string ){
    // ONLY INTEGER NUMBERS
    const obj = {
        result: /^\d+$/.test( string )
    };

    return obj;
}

export const password = function( string ){
    // PASSWORD ( NO SPECIAL CHARACTERS ) WITH AT LEAST:
    // ONE DIGIT + ONE LOWERCASE + ONE UPPERCASE + MIN LENGTH OF 8 CHARACTERS
    const obj = {
        result: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(string)
    };

    return obj;
}

export const tel = function( string ){
    // CHECK IF ONE OF landlineNumber OR mobileNumber IS VALID
    const obj = {
        result: this.landlineNumber(string).result || this.mobileNumber(string).result
    };

    return obj;
}

export const url = function( string ){
    // MUST NOT CONTAIN PARAMETERS:
    // www.mysite.com/index.html         --> VALID URL
    // www.mysite.com/index.html?v=hello --> INVALID URL
    const obj = {
        result: /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test( string )
    };

    return obj;
}

export const username = function( string, $field ){
    // MUST START WITH A LETTER/NUMBER/UNDERSCORE
    // CAN ALSO CONTAIN . - @
    // MIN LENGTH 3 AND MAX LENGTH 24

    const instance = $field.closest('form').formjs;
    const obj = {
        result: /^(?=\w)(?=[\-\.\@]?)[\w\-\.\@]{3,24}$/.test( string )
    };

    if( !obj.result ){
        return obj;
    }

    const url = $field.getAttribute('data-async-validation-url');
    const fetchOptions = instance.options.formOptions.ajaxOptions;
    fetchOptions.body = JSON.stringify({username: string});
    
    return fetch(url, fetchOptions)
            .then(response => {
                if( !response.ok ){
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(response => {
                return response;
            })
            .catch(error => {
                return {
                    result: false,
                    errors: { ajaxCall: true },
                    errorThrown: error
                };
            });
}

export const vatNumber = function( string ){
    // VAT NUMBER CAN CONTAIN OR NOT THE 'IT' STRING AND THEN 11 NUMBERS
    const obj = {
        result: /^(IT){0,1}[0-9]{11}$/i.test( string )
    };

    return obj;
}
