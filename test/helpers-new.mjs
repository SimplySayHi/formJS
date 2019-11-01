const mergeObjects = function (out = {}) {
    for (let i = 1; i < arguments.length; i++) {
        let obj = arguments[i];

        if (!obj) { continue; }

        for (let key in obj) {
            let isArray = Object.prototype.toString.call(obj[key]) === "[object Array]";
            let isObject = Object.prototype.toString.call(obj[key]) === "[object Object]";

            // COPY ONLY ENUMERABLE PROPERTIES
            if (obj.hasOwnProperty(key)) {
                if (isArray) {

                    if (typeof out[key] === 'undefined') {
                        out[key] = [];
                    }
                    out[key] = out[key].concat(obj[key].slice(0));

                } else if (isObject) {

                    out[key] = mergeObjects(out[key], obj[key]);

                } else {

                    // * STRING | NUMBER | BOOLEAN | FUNCTION
                    if (Array.isArray(out[key])) {
                        // IF THIS IS ONE OF ABOVE (*) AND THE DESTINATION OBJECT IS AN ARRAY
                        out[key].push(obj[key]);
                    } else {
                        out[key] = obj[key];
                    }

                }
            }
        }
    }

    return out;
};

/**
 * @function alwaysFalse
 * @description function that always return false
 *
 * @returns {boolean} false
 */
export const alwaysFalse = () => false;

export const runFunctionsSequence = ({ functionsList = [], data = {}, stopConditionFn = alwaysFalse, results = [] } = {}) => {
    const nextFunc = functionsList[0];

    if (!stopConditionFn(data) && nextFunc) {

        return Promise.resolve(nextFunc(data))
            .then(result => [...results, result])
            .then(currentResults => runFunctionsSequence({
                functionsList: functionsList.slice(1),
                data: mergeObjects({}, currentResults[currentResults.length - 1]),
                stopConditionFn,
                results: currentResults
            }));

    }

    console.log( 'Results ', results );

    return Promise.resolve(results.length ? results : [data]);
};