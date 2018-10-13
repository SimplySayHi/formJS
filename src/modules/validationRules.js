export const validationRules = {
            
    cap: function( string ){
        // VALID ITALIAN CAP WITH 5 DIGITS
        return /^[0-9]{5}$/.test( string );
    },
    
    date: function( string ){
        // DATE AS ITALIAN SYNTAX WITH/WITHOUT TIME
        // dd mm yyyy | dd/mm/yyyy | dd.mm.yyyy | dd-mm-yyyy | dd/mm/yyyy-hh:mm:ss ( WITH SPACE / . - AS SEPARATOR FOR THE DATE )
        return /^(0?[1-9]|[12][0-9]|3[01])([ \/\-.])(0?[1-9]|1[012])\2([0-9][0-9][0-9][0-9])(([ -])([0-1]?[0-9]|2[0-3]):[0-5]?[0-9]:[0-5]?[0-9])?$/.test( string );
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

export const _validationRulesStrictHtml = {
            
    exactLength: function( value, validationValue ){
        return value.length === (validationValue * 1);
    },
    
    max: function( value, validationValue ){
        var value = value * 1,
            maxVal = validationValue * 1;
        
        return value <= maxVal;
    },
    
    maxlength: function( value, validationValue ){
        return value.length <= (validationValue * 1);
    },
    
    min: function( value, validationValue ){
        var value = value * 1,
            minVal = validationValue * 1;
        
        return value >= minVal;
    },

    minlength: function( value, validationValue ){
        return value.length >= (validationValue * 1);
    }
    
};