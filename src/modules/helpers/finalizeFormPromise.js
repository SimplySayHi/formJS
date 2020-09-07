
export const finalizeFormPromise = obj => {
    if( obj.result ){
        return Promise.resolve(obj.fields);
    }
    return Promise.reject(obj.fields);
}
