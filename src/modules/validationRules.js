
import { getSplitChar } from './helpers';

export const validationRules = {
            
    date: function( string ){
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
        let obj = {
            result: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test( string )
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
    }
    
}

export const validationRulesAttributes = {

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
        try {
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
            maxFileSize = (fieldEl.getAttribute('data-max-file-size') || data.fieldOptions.maxFileSize) * 1,
            MIMEtype = (fieldEl.accept ? new RegExp(fieldEl.accept.replace( '*', '[^\\/,]+' )) : null),
            filesList = Array.from(fieldEl.files),
            obj = { result: true };

        filesList.forEach(function( file ){
            let exceedMaxFileSize = maxFileSize > 0 && (file.size/1024/1024) > maxFileSize,
                isAcceptedFileType = (MIMEtype !== null ? MIMEtype.test(file.type) : true);

            if( exceedMaxFileSize || !isAcceptedFileType ){
                obj.result = false;
                if( typeof obj.errors === 'undefined' ){
                    obj.errors = {};
                }
                obj.errors.file = true;
                if( exceedMaxFileSize ){ obj.errors.maxFileSize = true; }
                if( !isAcceptedFileType ){ obj.errors.acceptedFileType = true; }

            }
        });

        return obj;
    },

    length: function( data ){
        try {
            let valueL = data.fieldEl.value.length,
                attrValue = JSON.parse(data.attrValue),
                isMinlengthOk = valueL >= attrValue[0],
                isMaxlengthOk = valueL <= attrValue[1],
                obj = { result: isMinlengthOk && isMaxlengthOk };

            if( !obj.result ){

                obj.errors = { stringLength: true };
                if( !isMinlengthOk ){ obj.errors.minlength = true; }
                if( !isMaxlengthOk ){ obj.errors.maxlength = true; }

            }

            return obj;
        } catch(e){
            throw new Error('"data-length" attribute is not a valid array!');
        }
    },
    
    max: function( data ){
        let fieldEl = data.fieldEl,
            isDate = (fieldEl.matches('[type="date"]') || fieldEl.matches('[data-subtype="date"]') || fieldEl.matches('[data-subtype="dateDDMMYYYY"]')),
            value = data.fieldEl.value,
            maxVal = data.attrValue;
        
        if( isDate ){

            let splitChar = getSplitChar( value );

            if( value.indexOf(splitChar) === 2 ){
                // DD MM YYYY
                value = value.split( splitChar ).reverse();
            } else {
                // YYYY MM DD
                value = value.split( splitChar );
            }

            value = value.join('');
            maxVal = maxVal.split('-').join('');

        }

        value = value * 1;
        maxVal = maxVal * 1;

        let obj = {
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
        let fieldEl = data.fieldEl,
            isDate = (fieldEl.matches('[type="date"]') || fieldEl.matches('[data-subtype="date"]') || fieldEl.matches('[data-subtype="dateDDMMYYYY"]')),
            value = data.fieldEl.value,
            minVal = data.attrValue;
        
        if( isDate ){

            let splitChar = getSplitChar( value );

            if( value.indexOf(splitChar) === 2 ){
                // DD MM YYYY
                value = value.split( splitChar ).reverse();
            } else {
                // YYYY MM DD
                value = value.split( splitChar );
            }

            value = value.join('');
            minVal = minVal.split('-').join('');

        }

        value = value * 1;
        minVal = minVal * 1;

        let obj = {
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
