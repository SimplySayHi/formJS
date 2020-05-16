
import { checks } from '../../src/modules/validationRules/checks';

describe( 'validationRules: checks', () => {

    beforeEach(() => {
        document.body.innerHTML = `
        <form name="my-form">
            <div data-formjs-question>
                <input name="check-0" type="checkbox" value="sms" data-checks="[1,2]" required />
                <input name="check-0" type="checkbox" value="email" />
                <input name="check-0" type="checkbox" value="app-notiifcation" />
            </div>
            <div data-formjs-question>
                <input name="check-1" type="checkbox" value="sms" data-checks="[1,2]" checked required />
                <input name="check-1" type="checkbox" value="email" checked required />
                <input name="check-1" type="checkbox" value="app-notiifcation" required />
            </div>
            <div data-formjs-question>
                <input name="check-2" type="checkbox" value="sms" data-checks="[1,2]" checked required />
                <input name="check-2" type="checkbox" value="email" checked required />
                <input name="check-2" type="checkbox" value="app-notiifcation" checked required />
            </div>
            <div data-formjs-question>
                <input name="check-3" type="checkbox" value="sms" data-checks="1,2" checked required />
                <input name="check-3" type="checkbox" value="email" checked />
                <input name="check-3" type="checkbox" value="app-notiifcation" />
            </div>
        </form>`;
    } );

    test( 'validationRules: checks [1,2] -> required & 0 checked', () => {
        const el = document.querySelector('[name="check-0"]');
        const data = {
            fieldEl: el,
            attrValue: el.getAttribute('data-checks')
        };
        const returnObj = {
            result: false,
            errors: {
                checks: true,
                minChecks: true
            }
        };
        const runFn = checks( data );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: checks [1,2] -> required & 2 checked', () => {
        const el = document.querySelector('[name="check-1"]');
        const data = {
            fieldEl: el,
            attrValue: el.getAttribute('data-checks')
        };
        const returnObj = {
            result: true
        };
        const runFn = checks( data );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: checks [1,2] -> required & 3 checked', () => {
        const el = document.querySelector('[name="check-2"]');
        const data = {
            fieldEl: el,
            attrValue: el.getAttribute('data-checks')
        };
        const returnObj = {
            result: false,
            errors: {
                checks: true,
                maxChecks: true
            }
        };
        const runFn = checks( data );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: checks 1,2 (invalid json) -> required & 1 checked', () => {
        const el = document.querySelector('[name="check-3"]');
        const data = {
            fieldEl: el,
            attrValue: el.getAttribute('data-checks')
        };
        const returnObj = new Error('"data-checks" attribute is not a valid array!');
        expect( () => { checks(data) } ).toThrow( returnObj );
    } );

});