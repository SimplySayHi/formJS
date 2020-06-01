
export const requiredFrom = function( fieldEl ){
    return {
        result: fieldEl.value.trim().length > 0
    };
}
