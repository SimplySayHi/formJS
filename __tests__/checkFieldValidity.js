
import { checkFieldValidity } from '../src/modules/checkFieldValidity';
import { options } from '../src/modules/options';
import { validationRules } from '../src/modules/validationRules';
import { validationErrors } from '../src/modules/validationErrors';

describe( 'checkFieldValidity', () => {

    options.fieldOptions.beforeValidation = [];

    beforeEach(() => {
        document.body.innerHTML = `
        <form name="my-form">
            <div data-formjs-question>
                <input name="custom" type="text" data-subtype="custom" minlength="3" required />
            </div>
            <div data-formjs-question>
                <input name="field-70" type="radio" value="1" required />
                <input name="field-70" type="radio" value="2" required />
                <input name="field-70" type="radio" value="3" data-require-more="" id="req-more-2" checked required />
                <input name="field-70-more" type="text" data-required-from="#req-more-2" required />
            </div>
        </form>`;
    } );

    test( 'checkFieldValidity - all agrs - fieldEl obj is fake 1', () => {
        const el = document.querySelector('[name="aaa"]');
        const returnObj = {
            fieldEl: el,
            result: false
        };
        const promiseRun = checkFieldValidity( el, options.fieldOptions, validationRules, validationErrors );
        return expect( promiseRun ).resolves.toEqual( returnObj );
    } );

    test( 'checkFieldValidity - all agrs - fieldEl string is fake 2', () => {
        const el = '[name="aaa"]';
        const returnObj = {
            fieldEl: '[name="aaa"]',
            result: false
        };
        const promiseRun = checkFieldValidity( el, options.fieldOptions, validationRules, validationErrors );
        return expect( promiseRun ).resolves.toEqual( returnObj );
    } );

    test( 'checkFieldValidity - all agrs - fieldEl is req-more/from - to test focus', () => {
        const el = document.querySelector('[name="field-70"]');
        const returnObj = {
            fieldEl: el,
            result: true
        };
        const promiseRun = checkFieldValidity( el, options.fieldOptions, validationRules, validationErrors );
        return expect( promiseRun ).resolves.toEqual( returnObj );
    } );

} );
