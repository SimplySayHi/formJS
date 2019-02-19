
export const validationRules = {
            
    cap: function( string ){
        // VALID ITALIAN CAP WITH 5 DIGITS
        const
            regex = new RegExp(/^[0-9]{5}$/),
            obj = {
                result: regex.test( string )
            };

        if( !obj.result ){

            obj.errors = {};
            const strLength = string.length;
            if( strLength > 5 ){ obj.errors.maxlength = true; }
            if( strLength > 0 && strLength < 5 ){ obj.errors.minlength = true; }
            if( /[^0-9]/.test(string) ){ obj.errors.invalidChars = true; }
        }

        return obj;
    },

    color: function( string ){
        // HEX COLOR WITH/WITHOUT #
        // CAN BE 3 OR 6 CHARACTERS ( fff | FFF | ffffff | FFFFFF )
        let obj = {
            result: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test( string )
        };

        return obj;
    },
    
    date: function( string ){
        let obj = {
                result: this.dateDDMMYYYY(string).result || this.dateYYYYMMDD(string).result
            };

        return obj;
    },

    dateDDMMYYYY: function( string ){
        // DATE AS ITALIAN SYNTAX       DD MM YYYY | DD/MM/YYYY | DD.MM.YYYY | DD-MM-YYYY

        let date = /^(((0[1-9]|[12]\d|3[01])[ \/\-.](0[13578]|1[02])[ \/\-.]((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)[ \/\-.](0[13456789]|1[012])[ \/\-.]((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])[ \/\-.]02[ \/\-.]((19|[2-9]\d)\d{2}))|(29[ \/\-.]02[ \/\-.]((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g.test( string ),
            obj = {
                result: date
            };

        return obj;
    },

    dateYYYYMMDD: function( string ){
        // DATE AS ISO 8601 DATE FORMAT     YYYY MM DD | YYYY/MM/DD | YYYY.MM.DD | YYYY-MM-DD

        let date = /^(((19|[2-9]\d)\d{2})[ \/\-.](0[13578]|1[02])[ \/\-.](0[1-9]|[12]\d|3[01]))|(((19|[2-9]\d)\d{2})[ \/\-.](0[13456789]|1[012])[ \/\-.](0[1-9]|[12]\d|30))|(((19|[2-9]\d)\d{2})[ \/\-.]02[ \/\-.](0[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))[ \/\-.]02[ \/\-.]29)$/g.test( string ),
            obj = {
                result: date
            };

        return obj;
    },
    
    email: function( string ){
        // FROM https://emailregex.com
        // AS FOR RFC 5322 Official Standard EMAIL MUST BE AT LEAST:
        // a@a.aa
        const obj = {
            result: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test( string )
        };

        if( !obj.result ){

            obj.errors = {};
            if( string.indexOf('@') === -1 ){

                // @ IS MISSING
                obj.errors.missingAtChar = true;

            } else {

                let splitAt_at = string.split('@');
                if( splitAt_at[0].length === 0 ){

                    // USER NAME IS MISSING
                    obj.errors.missingUserName = true;

                }

                if( splitAt_at[1].length === 0 ){

                    // IS EMPTY AFTER @
                    obj.errors.missingDomain = true;
                    obj.errors.missingExtensionDot = true;
                    obj.errors.missingExtension = true;

                } else if( splitAt_at[1].indexOf('.') === -1 ) {

                    // DOT IS MISSING
                    obj.errors.missingExtensionDot = true;
                    obj.errors.missingExtension = true;

                } else {

                    // EXTENSION MISSING OR NOT LONG ENOUGH
                    let splitAt_dot = splitAt_at[1].split('.'),
                        extLength = splitAt_dot[1].length;
                    if( extLength === 0 ) {
                        obj.errors.missingExtension = true;
                    } else if( extLength < 2 ){
                        obj.errors.minlengthExtension = true;
                    }

                }
            }

        }

        return obj;
    },
    
    fiscalCode: function( string ){
        // http://blog.marketto.it/2016/01/regex-validazione-codice-fiscale-con-omocodia/
        let obj = {
                result: /^(?:[B-DF-HJ-NP-TV-Z](?:[AEIOU]{2}|[AEIOU]X)|[AEIOU]{2}X|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[1256LMRS][\dLMNP-V])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[\dLMNP-V][1-9MNP-V]|[1-9MNP-V][0L]))[A-Z]$/i.test( string )
            };
        
        return obj;
    },
    
    landlineNumber: function( string ){
        // LANDLINE PREFIX:
        // +39 | 0039 | not-set ( ALSO WITH INTERNATIONAL PREFIXES WITH 2 DIGITS )
        // LANDLINE NUMBER MUST START WITH 0 ( AS FOR ITALIAN ONES ):
        // 1234567890 | 12 34567890 | 123456789 | 1234 56789 ( ALSO WITH . - / AS SEPARATOR )
        let obj = {
            result: /^((00|\+)\d{2}[\-\. ]??)??(((0[\d]{1,4}))([\/\-\. ]){0,1}([\d, ]{5,10}))$/.test( string )
        };

        return obj; 
    },
    
    mobileNumber: function( string ){
        // +39 | 0039 | 39 | not-set ( ALSO WITH ALL INTERNATIONAL PREFIXES WITH 2 DIGITS )
        // MOBILE NUMBER MUST START WITH 3
        // 3234567890 | 323 4567890 | 323 45 67 890 ( ALSO WITH . OR - AS SEPARATOR )
        let obj = {
            result: /^((00|\+)??\d{2}[\-\. ]??)??3\d{2}[\-\. ]??(\d{6,7}|\d{2}[\-\. ]??\d{2}[\-\. ]??\d{3})$/.test( string )
        };

        return obj;
    },
    
    number: function( string ){
        // ALL NUMBERS ( INTEGERS AND FLOATING )
        // VALID NUMBERS: 123 | 123.456 | .123
        let obj = {
            result: /[+-]?([0-9]*[.])?[0-9]+/.test( string )
        };

        return obj;
    },
    
    numberFloat: function( string ){
        // ONLY FLOATING NUMBERS
        // VALID NUMBERS: 123.456 | .123
        let obj = {
            result: /[+-]?([0-9]*[.])[0-9]+/.test( string )
        };

        return obj;
    },
    
    numberInteger: function( string ){
        // ONLY INTEGER NUMBERS
        let obj = {
            result: /^\d+$/.test( string )
        };

        return obj;
    },
    
    password: function( string ){
        // PASSWORD ( NO SPECIAL CHARACTERS ) WITH AT LEAST:
        // ONE DIGIT + ONE LOWERCASE + ONE UPPERCASE + MIN LENGTH OF 8 CHARACTERS
        let obj = {
            result: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(string)
        };

        if( !obj.result ){

            obj.errors = {};
            let strLength = string.length;
            if( strLength < 8 ){ obj.errors.minlength = true; }
            if( !/\d/.test(string) ){ obj.errors.missingNumber = true; }
            if( !/[A-Z]/.test(string) ){ obj.errors.missingUppercase = true; }
            if( /[^0-9a-zA-Z]/.test(string) ){ obj.errors.invalidChars = true; }

        }

        return obj;
    },

    tel: function( string ){
        // CHECK IF ONE OF landlineNumber OR mobileNumber IS VALID
        let obj = {
            result: this.landlineNumber(string).result || this.mobileNumber(string).result
        };

        return obj;
    },
    
    url: function( string ){
        // MUST NOT CONTAIN PARAMETERS:
        // www.mysite.com/index.html         --> VALID URL
        // www.mysite.com/index.html?v=hello --> INVALID URL
        let obj = {
            result: /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test( string )
        };

        return obj;
    },
    
    username: function( string ){
        // USERNAME WITH LETTERS/NUMBERS/UNDERSCORE AND . - @ WITH MIN LENGTH 3 AND MAX LENGTH 24
        //return /^[\w\.\-\@]{3,24}$/.test( string );
        
        // USERNAME MUST START WITH A LETTER/NUMBER/UNDERSCORE AND CAN ALSO CONTAIN . - @ WITH MIN LENGTH 3 AND MAX LENGTH 24
        let obj = {
            result: /^(?=\w)(?=[\-\.\@]?)[\w\-\.\@]{3,24}$/.test( string )
        };

        if( !obj.result ){

            obj.errors = {};
            let strLength = string.length;
            if( strLength < 3 ){ obj.errors.minlength = true; }
            if( strLength > 24 ){ obj.errors.maxlength = true; }
            if( /[^\w\-\.\@]/.test(string) ){ obj.errors.invalidChars = true; }
            if( !/^[\w]/.test(string) ){ obj.errors.invalidStartChar = true; }

        }

        return obj;
    },
    
    vatNumber: function( string ){
        // VAT NUMBER CAN CONTAIN OR NOT THE 'IT' STRING AND THEN 11 NUMBERS
        let obj = {
            result: /^(IT){0,1}[0-9]{11}$/i.test( string )
        };

        if( !obj.result ){
            obj.errors = {};
            var strLength = string.length,
                indexOfIT = string.indexOf('IT'),
                checkLength = (indexOfIT === 0 ? 13 : 11);
            if( indexOfIT < 1 ){
                if( strLength < checkLength ){ obj.errors.minlength = true; }
                else { obj.errors.maxlength = true; }
            }
        }

        return obj;
    }
    
}

export const _validationRulesAttributes = {

    checkbox: function( data ){
        let formEl = data.fieldEl.closest('form'),
            dataChecksEl = formEl.querySelector('[name="' + data.fieldEl.name + '"][data-checks]'),
            obj = { result: data.fieldEl.checked };

        if( dataChecksEl !== null ){
            obj = this.checks({ attrValue: dataChecksEl.getAttribute('data-checks'), fieldEl: dataChecksEl});
        }

        return obj;
    },

    checks: function( data ){
        try{
            let attrValue = JSON.parse(data.attrValue),
                fieldEl = data.fieldEl,
                formEl = fieldEl.closest('form'),
                checkedElLength = formEl.querySelectorAll('[name="' + fieldEl.name + '"]:checked').length,
                isMinOk = checkedElLength >= attrValue[0],
                isMaxOk = checkedElLength <= attrValue[1],
                obj = {
                    result: isMinOk && isMaxOk
                };

            if( !obj.result ){

                obj.errors = { checks: true };
                if( !isMinOk ){ obj.errors.minChecks = true; }
                if( !isMaxOk ){ obj.errors.maxChecks = true; }

            }

            return obj;
        } catch(e){
            throw new Error('"data-checks" attribute is not a valid array!');
        }
    },

    equalTo: function( data ){
        let fieldEl = data.fieldEl,
            formEl = fieldEl.closest('form'),
            checkFromEl = formEl.querySelector( '[name="' + fieldEl.getAttribute('data-equal-to') + '"]' ),
            obj = {
                result: fieldEl.value === checkFromEl.value
            };

        if( !obj.result ){
            
            obj.errors = { equalTo: true };
        }

        return obj;
    },
    
    exactLength: function( data ){
        let valueLength = data.fieldEl.value.length,
            exactLength = (data.attrValue * 1),
            obj = {
                result: valueLength === exactLength
            };

        if( !obj.result ){

            obj.errors = { exactLength: true };
            if( valueLength < exactLength ){ obj.errors.minlength = true; }
            else { obj.errors.maxlength = true; }

        }

        return obj;
    },

    file: function( data ){
        let fieldEl = data.fieldEl,
            MIMEtype = (fieldEl.accept ? new RegExp(fieldEl.accept.replace( '*', '[^\\/,]+' )) : null),
            filesList = Array.from(fieldEl.files),
            obj = { result: true };

        filesList.forEach(function( file ){
            let exceedMaxFileSize = data.fieldOptions.maxFileSize > 0 && (file.size/1024/1024) > data.fieldOptions.maxFileSize,
                isAcceptedFileType = (MIMEtype !== null ? MIMEtype.test(file.type) : true);

            if( exceedMaxFileSize || !isAcceptedFileType ){
                obj.result = false;
                if( typeof obj.errors === 'undefined' ){
                    obj.errors = {};
                }
                if( exceedMaxFileSize ){ obj.errors.maxFileSize = true; }
                if( !isAcceptedFileType ){ obj.errors.acceptedFileType = true; }

            }
        });

        return obj;
    },

    length: function( data ){
        try{
            let valueL = data.fieldEl.value.length,
                attrValue = JSON.parse(data.attrValue),
                isMinlengthOk = valueL >= attrValue[0],
                isMaxlengthOk = valueL <= attrValue[1],
                obj = { result: isMinlengthOk && isMaxlengthOk };

            if( !obj.result ){

                obj.errors = { length: true };
                if( !isMinlengthOk ){ obj.errors.minlength = true; }
                if( !isMaxlengthOk ){ obj.errors.maxlength = true; }

            }

            return obj;
        } catch(e){
            throw new Error('"data-length" attribute is not a valid array!');
        }
    },
    
    max: function( data ){
        var value = data.fieldEl.value * 1,
            maxVal = data.attrValue * 1,
            obj = {
                result: value <= maxVal
            };

        if( !obj.result ){
            
            obj.errors = { max: true };
        }
        
        return obj;
    },
    
    maxlength: function( data ){
        const obj = {
            result: data.fieldEl.value.length <= (data.attrValue * 1)
        };

        if( !obj.result ){

            obj.errors = { maxlength: true };
        }

        return obj;
    },
    
    min: function( data ){
        var value = data.fieldEl.value * 1,
            minVal = data.attrValue * 1,
            obj = {
                result: value >= minVal
            };

        if( !obj.result ){
            
            obj.errors = { min: true };
        }
        
        return obj;
    },

    minlength: function( data ){
        const obj = {
            result: data.fieldEl.value.length >= (data.attrValue * 1)
        };

        if( !obj.result ){

            obj.errors = { minlength: true };
        }

        return obj;
    },

    pattern: function( data ){
        let fieldEl = data.fieldEl,
            fieldPattern = fieldEl.pattern,
            fieldRegex = new RegExp( fieldPattern ),
            obj = {
                result: fieldRegex.test( fieldEl.value )
            };

        if( !obj.result ){

            obj.errors = { pattern: true };
        }

        return obj;
    },

    radio: function( data ){
        let fieldEl = data.fieldEl,
            fieldChecked = fieldEl.closest('form').querySelector( '[name="'+ fieldEl.name +'"]:checked' ),
            isValid = fieldChecked !== null && fieldChecked.value.trim().length > 0,
            obj = { result: isValid };

        return obj;
    },

    requiredFrom: function( data ){
        let fieldEl = data.fieldEl,
            formEl = fieldEl.closest('form'),
            isValidValue = fieldEl.value.trim().length > 0,
            reqMoreEl = formEl.querySelector( fieldEl.getAttribute('data-required-from') ),
            checkedEl = formEl.querySelector( '[name="'+ reqMoreEl.name +'"]:checked' ),
            obj = { result: checkedEl !== null };

        if( reqMoreEl.checked && reqMoreEl.required ){
            obj.result = isValidValue;
        }

        if( !obj.result ){
            obj.errors = { requiredFrom: true };
        }
        
        return obj;
    }
    
}
