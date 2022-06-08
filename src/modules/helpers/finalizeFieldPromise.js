
export const finalizeFieldPromise = ({errors, result}) => {
    if( result ){
        return Promise.resolve();
    }
    return Promise.reject(errors);
}
