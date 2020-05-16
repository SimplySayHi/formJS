
import { date } from '../../src/modules/validationRules/date';

describe( 'validationRules: date', () => {

    beforeEach(() => {
        document.body.innerHTML = `
        <form name="my-form">
            <div data-formjs-question>
                <input name="date-1" type="date" value="2012-12-12" required />
            </div>
            <div data-formjs-question>
                <input name="date-2" type="text" data-subtype="date" value="2012/12/12" required />
            </div>
            <div data-formjs-question>
                <input name="date-3" type="date" value="2012-99-12" required />
            </div>
        </form>`;
    } );

    test( 'validationRules: date -> type date & date "2012-12-12"', () => {
        const el = document.querySelector('[name="date-1"]');
        const returnObj = {
            result: true
        };
        const runFn = date( el.value );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: date -> subtype date & date "2012/12/12"', () => {
        const el = document.querySelector('[name="date-2"]');
        const returnObj = {
            result: true
        };
        const runFn = date( el.value );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: date -> type date & invalid date "2012-99-12"', () => {
        const el = document.querySelector('[name="date-3"]');
        const returnObj = {
            result: false
        };
        const runFn = date( el.value );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: date -> date not passed', () => {
        const returnObj = {
            result: false
        };
        const runFn = date();
        expect( runFn ).toEqual( returnObj );
    } );

});