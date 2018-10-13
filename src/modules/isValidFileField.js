export const _isValidFileField = function( fieldEl, fieldOptions ){
    let isValid = true,
        MIMEtype = (fieldEl.accept ? new RegExp(fieldEl.accept.replace( '*', '[^\\/,]+' )) : null),
        filesList = Array.from(fieldEl.files);

    filesList.forEach(function( file ){
        let exceedMaxFileSize = fieldOptions.maxFileSize > 0 && (file.size/1024/1024) > fieldOptions.maxFileSize,
            isAcceptedFileType = (MIMEtype !== null ? MIMEtype.test(file.type) : true);

        if( exceedMaxFileSize || !isAcceptedFileType ){
            isValid = false;
        }
    });

    return isValid;
}