/**
 * @const FORM_FIELDS_BLACKLIST_SELECTOR
 * @description selector to blacklist form fields that must not be validated
 *
 * @type {string}
 */
const FORM_FIELDS_BLACKLIST_SELECTOR = ':not([type="reset"]):not([type="submit"]):not([type="button"]):not([type="file"]):not([data-exclude-data])';

/**
 * @function formEl
 * @description Returns a list of form fields to be validated
 *
 * @returns {[]} array containing form fields
 */
export const getFormFields = formEl => {
    let formFieldsEl = formEl.querySelectorAll('input, select, textarea');

    return Array.from(formFieldsEl).filter( elem => elem.matches( FORM_FIELDS_BLACKLIST_SELECTOR ) );
};