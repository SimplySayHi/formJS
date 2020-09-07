
export const finalizeFieldPromise = obj => {
    if( obj.result ){
        return Promise.resolve();
    }
    return Promise.reject(obj.errors);
}
