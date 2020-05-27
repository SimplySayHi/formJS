
import { mergeObjects } from './mergeObjects';

export const runFunctionsSequence = ( { functionsList = [], data = {}, stopConditionFn = () => false } = {} ) => {
    return functionsList.reduce((acc, promiseFn) => {
        return acc.then(res => {
            let dataNew = mergeObjects({}, res[res.length - 1]);
            if( stopConditionFn(dataNew) ){
                return Promise.resolve(res);
            }
            return new Promise(resolve => { resolve(promiseFn(dataNew)) })
                .then((result = dataNew) => {
                    res.push(result);
                    return res;
                });
        });
    }, Promise.resolve([data]))
        .then(dataList => dataList.length > 1 ? dataList.slice(1) : dataList);
}
