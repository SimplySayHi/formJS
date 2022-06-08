
export const finalizeFormPromise = ({fields, result}) => {
    if( result ){
        return Promise.resolve(fields);
    }
    return Promise.reject(fields);
}
