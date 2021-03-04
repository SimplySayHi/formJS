
export const file = function( value, fieldEl, fieldOptions ){
    const maxFileSize = (fieldEl.getAttribute('data-max-file-size') || fieldOptions.maxFileSize) * 1,
          MIMEtype = fieldEl.accept ? new RegExp(fieldEl.accept.replace( '*', '[^\\/,]+' )) : null,
          filesList = Array.from(fieldEl.files),
          obj = { result: true };

    filesList.forEach(file => {
        const exceedMaxFileSize = maxFileSize > 0 && (file.size/1024/1024) > maxFileSize,
              isAcceptedFileType = MIMEtype !== null ? MIMEtype.test(file.type) : true;

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
}
