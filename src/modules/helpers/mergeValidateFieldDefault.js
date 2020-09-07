
import { mergeObjects } from './mergeObjects';

export const mergeValidateFieldDefault = obj => {
    return mergeObjects({}, { result: false, fieldEl: null }, obj);
}
