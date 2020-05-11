
import { mergeObjects } from './mergeObjects';

export const getValidateFormDefault = obj => {
    return mergeObjects({}, { result: true, fields: [] }, obj);
}
