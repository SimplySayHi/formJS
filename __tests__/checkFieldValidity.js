
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
                <input name="name" type="text" data-length="[3,20]" value="Valerio" />
            </div>
            <div data-formjs-question>
                <input name="email" type="email" required />
            </div>
            <div data-formjs-question>
                <input name="date" data-subtype="date" type="text" required />
            </div>
            <div data-formjs-question>
                <input name="custom" type="text" data-subtype="custom" minlength="3" required />
            </div>
            <div data-formjs-question>
                <input name="fileUpload" type="file" files="[]" required />
            </div>
            <div data-formjs-question>
                <input name="email-2" type="email" data-validate-if-filled />
            </div>
            <div data-formjs-question>
                <input name="radio-list-1" type="radio" value="1" required />
                <input name="radio-list-1" type="radio" value="2" required />
                <input name="radio-list-1" type="radio" value="3" data-require-more="" id="req-more-1" checked required />
                <input name="radio-list-1-more" type="text" data-required-from="#req-more-1" value="Hi" required />
            </div>
            <div data-formjs-question>
                <input name="contactPrefCheck" type="checkbox" value="sms" data-checks="[1,2]" checked />
                <input name="contactPrefCheck" type="checkbox" value="email" checked />
                <input name="contactPrefCheck" type="checkbox" value="app-notiifcation" />
            </div>
            <div data-formjs-question>
                <input name="share-my-infos" type="checkbox" required />
            </div>
            <div data-formjs-question>
                <input name="privacyCheck" type="radio" value="accepted" checked />
                <input name="privacyCheck" type="radio" value="" />
            </div>
        </form>`;
    } );

    test( 'checkFieldValidity - fieldEl required & empty & rule not defined', () => {
        const el = document.querySelector('[name="custom"]');
        const returnObj = {
            fieldEl: el,
            result: false,
            errors: {
                empty: true
            }
        };
        const promiseRun = checkFieldValidity( el, options.fieldOptions );
        return expect( promiseRun ).resolves.toEqual( returnObj );
    } );

    test( 'checkFieldValidity - fieldEl required & filled wrongly & rule not defined', () => {
        const el = document.querySelector('[name="custom"]');
        el.value = 'aa';
        const returnObj = {
            fieldEl: el,
            result: false,
            errors: {
                rule: true,
                minlength: true
            }
        };
        /* const promiseRun = checkFieldValidity( el, options.fieldOptions );
        return expect( promiseRun ).resolves.toEqual( returnObj ); */
        checkFieldValidity( el, options.fieldOptions ).then(obj => {
            expect( obj ).toEqual( returnObj );
        })
    } );

    test( 'checkFieldValidity - fieldEl required & filled & rule not defined', () => {
        const el = document.querySelector('[name="custom"]');
        el.value = 'aaa';
        const returnObj = {
            fieldEl: el,
            result: true
        };
        /* const promiseRun = checkFieldValidity( el, options.fieldOptions );
        return expect( promiseRun ).resolves.toEqual( returnObj ); */
        checkFieldValidity( el, options.fieldOptions ).then(obj => {
            expect( obj ).toEqual( returnObj );
        })
    } );

    test( 'checkFieldValidity - all agrs - fieldEl required & filled wrongly & rule defined', () => {
        const el = document.querySelector('[name="date"]');
        el.value = 'aaa';
        const returnObj = {
            fieldEl: el,
            result: false,
            errors: {
                rule: true
            }
        };
        checkFieldValidity( el, options.fieldOptions, validationRules, validationErrors ).then(obj => {
            expect( obj ).toEqual( returnObj );
        })
    } );

    test( 'checkFieldValidity - all agrs - fieldEl required & empty', () => {
        const el = document.querySelector('[name="email"]');
        const returnObj = {
            fieldEl: el,
            result: false,
            errors: {
                empty: true
            }
        };
        const promiseRun = checkFieldValidity( el, options.fieldOptions, validationRules, validationErrors );
        return expect( promiseRun ).resolves.toEqual( returnObj );
    } );

    test( 'checkFieldValidity - all agrs - fieldEl required & filled wrongly', () => {
        const el = document.querySelector('[name="email"]');
        el.value = 'aaa';
        const returnObj = {
            fieldEl: el,
            result: false,
            errors: {
                rule: true,
                missingAtChar: true
            }
        };
        const promiseRun = checkFieldValidity( el, options.fieldOptions, validationRules, validationErrors );
        return expect( promiseRun ).resolves.toEqual( returnObj );
    } );

    test( 'checkFieldValidity - all agrs - fieldEl required & filled correctly', () => {
        const el = document.querySelector('[name="email"]');
        el.value = 'aaa@aaa.aaa';
        const returnObj = {
            fieldEl: el,
            result: true
        };
        const promiseRun = checkFieldValidity( el, options.fieldOptions, validationRules, validationErrors );
        return expect( promiseRun ).resolves.toEqual( returnObj );
    } );

    test( 'checkFieldValidity - all agrs - fieldEl "validate if filled" && empty', () => {
        const el = document.querySelector('[data-validate-if-filled]');
        const returnObj = {
            fieldEl: el,
            result: true
        };
        const promiseRun = checkFieldValidity( el, options.fieldOptions, validationRules, validationErrors );
        return expect( promiseRun ).resolves.toEqual( returnObj );
    } );

    test( 'checkFieldValidity - all agrs - fieldEl "validate if filled" && filled wrongly', () => {
        const el = document.querySelector('[data-validate-if-filled]');
        el.value = 'aaa';
        const returnObj = {
            fieldEl: el,
            result: false,
            errors: {
                rule: true,
                missingAtChar: true
            }
        };
        const promiseRun = checkFieldValidity( el, options.fieldOptions, validationRules, validationErrors );
        return expect( promiseRun ).resolves.toEqual( returnObj );
    } );

    test( 'checkFieldValidity - all agrs - fieldEl "validate if filled" && filled correctly', () => {
        const el = document.querySelector('[data-validate-if-filled]');
        el.value = 'aaa@aaa.aaa';
        const returnObj = {
            fieldEl: el,
            result: true
        };
        const promiseRun = checkFieldValidity( el, options.fieldOptions, validationRules, validationErrors );
        return expect( promiseRun ).resolves.toEqual( returnObj );
    } );

    test( 'checkFieldValidity - all agrs - fieldEl not required & empty', () => {
        const el = document.querySelector('[name="name"]');
        const returnObj = {
            fieldEl: el,
            result: true
        };
        const promiseRun = checkFieldValidity( el, options.fieldOptions, validationRules, validationErrors );
        return expect( promiseRun ).resolves.toEqual( returnObj );
    } );

    test( 'checkFieldValidity - all agrs - fieldEl not required & filled', () => {
        const el = document.querySelector('[name="name"]');
        el.value = 'aaa@aaa.aaa';
        const returnObj = {
            fieldEl: el,
            result: true
        };
        const promiseRun = checkFieldValidity( el, options.fieldOptions, validationRules, validationErrors );
        return expect( promiseRun ).resolves.toEqual( returnObj );
    } );

    test( 'checkFieldValidity - all agrs - fieldEl "data-required-from" & filled', () => {
        const el = document.querySelector('[data-required-from]');
        el.value = 'aaa';
        const returnObj = {
            fieldEl: el,
            result: true
        };
        const promiseRun = checkFieldValidity( el, options.fieldOptions, validationRules, validationErrors );
        return expect( promiseRun ).resolves.toEqual( returnObj );
    } );

    test( 'checkFieldValidity - all agrs - fieldEl required & checkbox', () => {
        const el = document.querySelector('[name="share-my-infos"]');
        const returnObj = {
            fieldEl: el,
            result: false
        };
        checkFieldValidity( el, options.fieldOptions, validationRules, validationErrors ).then(obj => {
            expect( obj ).toEqual( returnObj );
        })
    } );

    test( 'checkFieldValidity - all agrs - fieldEl is fake 1', () => {
        const el = document.querySelector('[name="aaa"]');
        const returnObj = {
            fieldEl: el,
            result: false
        };
        const promiseRun = checkFieldValidity( el, options.fieldOptions, validationRules, validationErrors );
        return expect( promiseRun ).resolves.toEqual( returnObj );
    } );

    test( 'checkFieldValidity - all agrs - fieldEl is fake 2', () => {
        const el = '[name="aaa"]';
        const returnObj = {
            fieldEl: '[name="aaa"]',
            result: false
        };
        const promiseRun = checkFieldValidity( el, options.fieldOptions, validationRules, validationErrors );
        return expect( promiseRun ).resolves.toEqual( returnObj );
    } );

    test( 'checkFieldValidity - all agrs - fieldEl fileUpload required', () => {
        const el = document.querySelector('[name="fileUpload"]');
        const returnObj = {
            fieldEl: el,
            result: false,
            errors: {
                empty: true
            }
        };
        const promiseRun = checkFieldValidity( el, options.fieldOptions, validationRules, validationErrors );
        return expect( promiseRun ).resolves.toEqual( returnObj );
    } );

} );
