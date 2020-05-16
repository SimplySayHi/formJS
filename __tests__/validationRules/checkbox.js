
import { checkbox } from '../../src/modules/validationRules/checkbox';

describe( 'validationRules: checkbox', () => {

    beforeEach(() => {
        document.body.innerHTML = `
        <form name="my-form">
            <div data-formjs-question>
                <input name="check-1" type="checkbox" value="ok" required checked />
            </div>
            <div data-formjs-question>
                <input name="check-2" type="checkbox" value="ok" required />
            </div>
            <div data-formjs-question>
                <input name="check-3" type="checkbox" value="ok" checked />
            </div>
            <div data-formjs-question>
                <input name="check-4" type="checkbox" value="ok" />
            </div>
            <div data-formjs-question>
                <input name="check-0" type="checkbox" value="sms" data-checks="[1,2]" required />
                <input name="check-0" type="checkbox" value="email" />
                <input name="check-0" type="checkbox" value="app-notiifcation" />
            </div>
        </form>`;
    } );

    test( 'validationRules: checkbox -> required & checked', () => {
        const el = document.querySelector('[name="check-1"]');
        const data = {
            fieldEl: el
        };
        const returnObj = {
            result: true
        };
        const runFn = checkbox( data );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: checkbox -> not required & checked', () => {
        const el = document.querySelector('[name="check-2"]');
        const data = {
            fieldEl: el
        };
        const returnObj = {
            result: false
        };
        const runFn = checkbox( data );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: checkbox -> required & checked', () => {
        const el = document.querySelector('[name="check-3"]');
        const data = {
            fieldEl: el
        };
        const returnObj = {
            result: true
        };
        const runFn = checkbox( data );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: checkbox -> required & not checked', () => {
        const el = document.querySelector('[name="check-4"]');
        const data = {
            fieldEl: el
        };
        const returnObj = {
            result: false
        };
        const runFn = checkbox( data );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: checkbox data-checks -> required & 0 checked', () => {
        const el = document.querySelector('[name="check-0"]');
        const data = {
            fieldEl: el
        };
        const returnObj = {
            result: false,
            errors: {
                checks: true,
                minChecks: true
            }
        };
        const runFn = checkbox( data );
        expect( runFn ).toEqual( returnObj );
    } );

});