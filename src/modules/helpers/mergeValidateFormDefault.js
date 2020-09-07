
import { mergeObjects } from './mergeObjects';

export const mergeValidateFormDefault = obj => {
    return mergeObjects({}, { result: true, fields: [] }, obj);
}
