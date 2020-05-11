
import { mergeObjects } from './mergeObjects';

export const getValidateFieldDefault = obj => {
    return mergeObjects({}, { result: false, fieldEl: null }, obj);
}
