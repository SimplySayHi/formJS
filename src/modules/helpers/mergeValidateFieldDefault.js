
import { mergeObjects } from './mergeObjects';

export const mergeValidateFieldDefault = obj => {
    return mergeObjects({}, { result: false, $field: null }, obj);
}
