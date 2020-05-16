
import { requiredFrom } from '../../src/modules/validationRules/requiredFrom';

describe( 'requiredFrom', () => {

    beforeEach(() => {
        document.body.innerHTML = `
        <form name="my-form">
            <div data-formjs-question>
                <input name="radio-list-1" type="radio" value="1" required />
                <input name="radio-list-1" type="radio" value="2" required />
                <input name="radio-list-1" type="radio" value="3" data-require-more="" id="req-more-1" checked required />
                <input name="radio-list-1-more" type="text" data-required-from="#req-more-1" value="Hi" required />
            </div>
            <div data-formjs-question>
                <input name="radio-list-2" type="radio" value="1" required />
                <input name="radio-list-2" type="radio" value="2" required />
                <input name="radio-list-2" type="radio" value="3" data-require-more="" id="req-more-2" checked required />
                <input name="radio-list-2-more" type="text" data-required-from="#req-more-2" required />
            </div>
        </form>`;
    } );

    test( 'validationRules: requiredFrom -> valid', () => {
        const formEl = document.querySelector('form');
        const field_1more = formEl.querySelector('[name="radio-list-1-more"]');
        const returnObj = {
            result: true
        };
        const obj = requiredFrom( {fieldEl:field_1more} );
        expect( obj ).toEqual( returnObj );
    } );

    test( 'validationRules: requiredFrom -> not valid', () => {
        const formEl = document.querySelector('form');
        const field_2more = formEl.querySelector('[name="radio-list-2-more"]');
        const returnObj = {
            result: false,
            errors: {
                requiredFrom: true
            }
        };
        const obj = requiredFrom( {fieldEl:field_2more} );
        expect( obj ).toEqual( returnObj );
    } );

});