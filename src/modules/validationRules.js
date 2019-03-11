export const validationRules = {
            
    cap: function( string ){
        // VALID ITALIAN CAP WITH 5 DIGITS
        return /^[0-9]{5}$/.test( string );
    },
    
    date: function( string ){
        // DATE AS ITALIAN SYNTAX       DD MM YYYY | DD/MM/YYYY | DD.MM.YYYY | DD-MM-YYYY
        // OR AS ISO 8601 DATE FORMAT   YYYY MM DD | YYYY/MM/DD | YYYY.MM.DD | YYYY-MM-DD

        let dateIT = /^(((0[1-9]|[12]\d|3[01])[ \/\-.](0[13578]|1[02])[ \/\-.]((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)[ \/\-.](0[13456789]|1[012])[ \/\-.]((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])[ \/\-.]02[ \/\-.]((19|[2-9]\d)\d{2}))|(29[ \/\-.]02[ \/\-.]((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g.test( string ),

            dateISO8601ext = /^(((19|[2-9]\d)\d{2})[ \/\-.](0[13578]|1[02])[ \/\-.](0[1-9]|[12]\d|3[01]))|(((19|[2-9]\d)\d{2})[ \/\-.](0[13456789]|1[012])[ \/\-.](0[1-9]|[12]\d|30))|(((19|[2-9]\d)\d{2})[ \/\-.]02[ \/\-.](0[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))[ \/\-.]02[ \/\-.]29)$/g.test( string );

        return dateIT || dateISO8601ext;
    },
    
    email: function( string ){
        // FROM https://emailregex.com
        // AS FOR RFC 5322 Official Standard
        // EMAIL MUST BE AT LEAST ( FOR EXAMPLE ):
        // a@a.aa
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test( string );
    },
    
    fiscalCode: function( string ){
        // http://blog.marketto.it/2016/01/regex-validazione-codice-fiscale-con-omocodia/
        return /^(?:[B-DF-HJ-NP-TV-Z](?:[AEIOU]{2}|[AEIOU]X)|[AEIOU]{2}X|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[1256LMRS][\dLMNP-V])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[\dLMNP-V][1-9MNP-V]|[1-9MNP-V][0L]))[A-Z]$/i.test( string );
    },
    
    hexColor: function( string ){
        // HEX COLOR WITH/WITHOUT #
        // CAN BE 3 OR 6 CHARACTERS ( fff | FFF | ffffff | FFFFFF )
        return /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test( string );
    },
    
    landlineNumber: function( string ){
        // LANDLINE PREFIX:
        // +39 | 0039 | not-set ( ALSO WITH INTERNATIONAL PREFIXES WITH 2 DIGITS )
        // LANDLINE NUMBER MUST START WITH 0 ( AS FOR ITALIAN ONES ):
        // 1234567890 | 12 34567890 | 123456789 | 1234 56789 ( ALSO WITH . - / AS SEPARATOR )
        return /^((00|\+)\d{2}[\-\. ]??)??(((0[\d]{1,4}))([\/\-\. ]){0,1}([\d, ]{5,10}))$/.test( string ); 
    },
    
    mobileNumber: function( string ){
        // +39 | 0039 | 39 | not-set ( ALSO WITH ALL INTERNATIONAL PREFIXES WITH 2 DIGITS )
        // MOBILE NUMBER MUST START WITH 3
        // 3234567890 | 323 4567890 | 323 45 67 890 ( ALSO WITH . OR - AS SEPARATOR )
        return /^((00|\+)??\d{2}[\-\. ]??)??3\d{2}[\-\. ]??(\d{6,7}|\d{2}[\-\. ]??\d{2}[\-\. ]??\d{3})$/.test( string );
    },
    
    number: function( string ){
        // ALL NUMBERS ( INTEGERS AND FLOATING )
        // VALID NUMBERS: 123 | 123.456 | .123                
        return /[+-]?([0-9]*[.])?[0-9]+/.test( string );
    },
    
    numberFloat: function( string ){
        // ONLY FLOATING NUMBERS
        // VALID NUMBERS: 123.456 | .123                
        return /[+-]?([0-9]*[.])[0-9]+/.test( string );
    },
    
    numberInteger: function( string ){
        // ONLY INTEGER NUMBERS                
        return /^\d+$/.test( string );
    },
    
    password: function( string ){
        // PASSWORD ( NO SPECIAL CHARACTERS ) WITH AT LEAST:
        // ONE DIGIT + ONE LOWERCASE + ONE UPPERCASE + MIN LENGTH OF 8 CHARACTERS
        return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(string);
    },
    
    url: function( string ){
        // MUST NOT CONTAIN PARAMETERS:
        // www.mysite.com/index.html         --> VALID URL
        // www.mysite.com/index.html?v=hello --> INVALID URL
        return /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test( string );
    },
    
    username: function( string ){
        // USERNAME WITH LETTERS/NUMBERS/UNDERSCORE AND . - @ WITH MIN LENGTH 3 AND MAX LENGTH 24
        //return /^[\w\.\-\@]{3,24}$/.test( string );
        
        // USERNAME MUST START WITH A LETTER/NUMBER/UNDERSCORE AND CAN ALSO CONTAIN . - @ WITH MIN LENGTH 3 AND MAX LENGTH
        return /^(?=\w)(?=[\-\.\@]?)[\w\-\.\@]{3,24}$/.test( string );
    },
    
    vatNumber: function( string ){
        // VAT NUMBER CAN CONTAIN OR NOT THE 'IT' STRING AND THEN 11 NUMBERS
        return /^(IT){0,1}[0-9]{11}$/i.test( string );
    }
    
};

export const _validationRulesAttributes = {

    checkbox: function( data ){
        let isValid = data.fieldEl.checked,
            formEl = data.fieldEl.closest('form'),
            dataChecksEl = formEl.querySelector('[name="' + data.fieldEl.name + '"][data-checks]');

        if( dataChecksEl !== null ){
            isValid = this.checks({ attrValue: dataChecksEl.getAttribute('data-checks'), fieldEl: dataChecksEl});
        }

        return isValid;
    },

    checks: function( data ){
        try{
            let attrValue = JSON.parse(data.attrValue),
                fieldEl = data.fieldEl,
                formEl = fieldEl.closest('form'),
                checkedElLength = formEl.querySelectorAll('[name="' + fieldEl.name + '"]:checked').length;

            return checkedElLength >= attrValue[0] && checkedElLength <= attrValue[1];
        } catch(e){
            throw new Error('"data-checks" attribute is not a valid array!');
        }
    },

    equalTo: function( data ){
        let fieldEl = data.fieldEl,
            formEl = fieldEl.closest('form'),
            checkFromEl = formEl.querySelector( '[name="' + fieldEl.getAttribute('data-equal-to') + '"]' );

        return fieldEl.value === checkFromEl.value;
    },
    
    exactLength: function( data ){
        return data.fieldEl.value.length === (data.attrValue * 1);
    },

    file: function( data ){
        let isValid = true,
            fieldEl = data.fieldEl,
            MIMEtype = (fieldEl.accept ? new RegExp(fieldEl.accept.replace( '*', '[^\\/,]+' )) : null),
            filesList = Array.from(fieldEl.files);

        filesList.forEach(function( file ){
            let exceedMaxFileSize = data.fieldOptions.maxFileSize > 0 && (file.size/1024/1024) > data.fieldOptions.maxFileSize,
                isAcceptedFileType = (MIMEtype !== null ? MIMEtype.test(file.type) : true);

            if( exceedMaxFileSize || !isAcceptedFileType ){
                isValid = false;
            }
        });

        return isValid;
    },

    length: function( data ){
        try{
            var valueL = data.fieldEl.value.length,
                attrValue = JSON.parse(data.attrValue);

            return valueL >= attrValue[0] && valueL <= attrValue[1];
        } catch(e){
            throw new Error('"data-length" attribute is not a valid array!');
        }
    },
    
    max: function( data ){
        var value = data.fieldEl.value * 1,
            maxVal = data.attrValue * 1;
        
        return value <= maxVal;
    },
    
    maxlength: function( data ){
        return data.fieldEl.value.length <= (data.attrValue * 1);
    },
    
    min: function( data ){
        var value = data.fieldEl.value * 1,
            minVal = data.attrValue * 1;
        
        return value >= minVal;
    },

    minlength: function( data ){
        return data.fieldEl.value.length >= (data.attrValue * 1);
    },

    pattern: function( data ){
        let fieldEl = data.fieldEl,
            fieldPattern = fieldEl.pattern,
            fieldRegex = new RegExp( fieldPattern );

        return fieldRegex.test( fieldEl.value );
    },

    radio: function( data ){
        let fieldEl = data.fieldEl,
            fieldChecked = fieldEl.closest('form').querySelector( '[name="'+ fieldEl.name +'"]:checked' ),
            isValid = fieldChecked !== null && fieldChecked.value.trim().length > 0;

        return isValid;
    },

    requiredFrom: function( data ){
        let fieldEl = data.fieldEl,
            formEl = fieldEl.closest('form'),
            isValidValue = fieldEl.value.trim().length > 0,
            reqMoreEl = formEl.querySelector( fieldEl.getAttribute('data-required-from') ),
            checkedEl = formEl.querySelector( '[name="'+ reqMoreEl.name +'"]:checked' );

        if( reqMoreEl.checked && reqMoreEl.required ){
            return isValidValue;
        }
        
        return checkedEl !== null;
    }
    
};