
export const file = function( value, $field, fieldOptions ){
    const maxFileSize = ($field.getAttribute('data-max-file-size') || fieldOptions.maxFileSize) * 1,
          MIMEtype = $field.accept ? new RegExp($field.accept.replace( '*', '[^\\/,]+' )) : null,
          filesList = Array.from($field.files),
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
