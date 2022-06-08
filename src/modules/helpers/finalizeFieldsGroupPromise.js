
export const finalizeFieldsGroupPromise = ({canSubmit, fields, group, result}) => {
    if( result ){
        return Promise.resolve({canSubmit, fields, group});
    }
    return Promise.reject({fields, group});
}
