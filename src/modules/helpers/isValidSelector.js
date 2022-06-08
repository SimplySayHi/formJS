
export const isValidSelector = stringSelector => {
    try{
        const isString = typeof stringSelector === 'string';
        document.querySelector(stringSelector);
        return isString;
    } catch(error){
        return false;
    }
}
