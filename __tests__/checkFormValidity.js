
import { checkFormValidity } from '../src/modules/checkFormValidity';
import { options } from '../src/modules/options';
import { validationRules } from '../src/modules/validationRules';
import { validationErrors } from '../src/modules/validationErrors';

describe( 'checkFormValidity', () => {

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
                <input name="radio-list-1" type="radio" value="1" required />
                <input name="radio-list-1" type="radio" value="2" required />
                <input name="radio-list-1" type="radio" value="3" data-require-more="" id="req-more-1" checked required />
                <input name="radio-list-1-more" type="text" data-required-from="#req-more-1" value="Hi" required />
            </div>
            <div data-formjs-question>
                <input name="contactPrefCheck" type="checkbox" value="sms" data-checks="[1,2]" checked required />
                <input name="contactPrefCheck" type="checkbox" value="email" checked required />
                <input name="contactPrefCheck" type="checkbox" value="app-notiifcation" required />
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

    test( 'checkFormValidity basic usage', () => {
        const formEl = document.querySelector('form');
        const field_1 = formEl.querySelector('[name="name"]');
        const field_2 = formEl.querySelector('[name="email"]');
        const field_3 = formEl.querySelector('[name="radio-list-1"]');
        const field_3more = formEl.querySelector('[name="radio-list-1-more"]');
        const field_4 = formEl.querySelector('[name="contactPrefCheck"]');
        const field_5 = formEl.querySelector('[name="share-my-infos"]');
        const field_6 = formEl.querySelector('[name="privacyCheck"]');
        const returnObj = {
            fields: [
                { fieldEl: field_1, result: true },
                { fieldEl: field_2, result: false, errors: {empty:true} },
                { fieldEl: field_3, result: true },
                { fieldEl: field_3more, result: true },
                { fieldEl: field_4, result: true },
                { fieldEl: field_5, result: false },
                { fieldEl: field_6, result: true }
            ],
            result: false
        };
        checkFormValidity( formEl, options.fieldOptions, validationRules, validationErrors ).then(obj => {
            expect( obj ).toStrictEqual( returnObj );
        });
    } );

    test( 'checkFormValidity skip field', () => {
        const formEl = document.querySelector('form');
        const field_1 = formEl.querySelector('[name="name"]');
        const field_2 = formEl.querySelector('[name="email"]');
        const field_3 = formEl.querySelector('[name="radio-list-1"]');
        const field_3more = formEl.querySelector('[name="radio-list-1-more"]');
        const field_4 = formEl.querySelector('[name="contactPrefCheck"]');
        const field_5 = formEl.querySelector('[name="share-my-infos"]');
        const field_6 = formEl.querySelector('[name="privacyCheck"]');
        const returnObj = {
            fields: [
                { fieldEl: field_1, result: true },
                { fieldEl: field_2, result: false, errors: {empty:true} },
                { fieldEl: field_3, result: true },
                { fieldEl: field_3more, result: true },
                { fieldEl: field_4, result: true },
                { fieldEl: field_5, result: false },
                { fieldEl: field_6, result: true }
            ],
            result: false
        };
        checkFormValidity( formEl, options.fieldOptions, validationRules, validationErrors, field_1 ).then(obj => {
            expect( obj ).toStrictEqual( returnObj );
        });
    } );

});