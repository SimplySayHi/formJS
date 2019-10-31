import { mergeObjects } from '../helpers';

/**
 * @function runFunctionsSequence
 * @description Run a sequence of functions (both sync and async). 
 * Each executed function will return its result merged with the previous functions results.
 * 
 * @param {functionsList} param0 Object containing needed data
 * @param {Array} [param0.functionsList=[]] List of function to be executed
 * @param {*} [param0.data={}] Data to be passed to the first function as parameter
 * @param {Function} [param0.stopConditionFn=alwaysFalse] Function to check if execution must be stopped
 * @param {Array} [param0.results=[]] Array where the results of each executed function will be stored
 * 
 * @returns {Array} array containing results of each executed function.
 */
export const runFunctionsSequence = ({ functionsList = [], data = {}, stopConditionFn = alwaysFalse, results = [] } = {}) => {
    const nextFunc = functionsList[0];

    if (!stopConditionFn(data) && nextFunc) {
        //Store result of next func, then run remaining functions
        return Promise.resolve(nextFunc(data))
            .then(result => [ ...results, result ])
            .then(currentResults => {
                const remainingFunctions = functionsList.slice(1);
                const newData = mergeObjects({}, currentResults[currentResults.length - 1]);

                return runFunctionsSequence({
                    functionsList: remainingFunctions,
                    data: newData,
                    stopConditionFn,
                    results: currentResults
                });
            });
    }

    //Final results
    return Promise.resolve(results.length ? results : [data]);
};