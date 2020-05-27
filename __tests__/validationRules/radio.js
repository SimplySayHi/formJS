
import { radio } from '../../src/modules/validationRules/radio';

describe( 'validationRules: radio', () => {

    beforeEach(() => {
        document.body.innerHTML = `
        <form name="my-form">
            <div data-formjs-question>
                <input name="radio-1" type="radio" value="accepted" required checked />
                <input name="radio-1" type="radio" value="" required />
            </div>
            <div data-formjs-question>
                <input name="radio-2" type="radio" value="accepted" />
                <input name="radio-2" type="radio" value="" checked />
            </div>
            <div data-formjs-question>
                <input name="radio-3" type="radio" value="accepted" required />
                <input name="radio-3" type="radio" value="" required checked />
            </div>
            <div data-formjs-question>
                <input name="radio-4" type="radio" value="accepted" required />
                <input name="radio-4" type="radio" value="" required />
            </div>
        </form>`;
    } );

    test( 'validationRules: radio -> required & checked & valid', () => {
        const el = document.querySelector('[name="radio-1"]');
        const returnObj = {
            result: true
        };
        const runFn = radio( el );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: radio -> not required & checked', () => {
        const el = document.querySelector('[name="radio-2"]');
        const returnObj = {
            result: false
        };
        const runFn = radio( el );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: radio -> required & checked & invalid', () => {
        const el = document.querySelector('[name="radio-3"]');
        const returnObj = {
            result: false
        };
        const runFn = radio( el );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: radio -> required & not checked', () => {
        const el = document.querySelector('[name="radio-4"]');
        const returnObj = {
            result: false
        };
        const runFn = radio( el );
        expect( runFn ).toEqual( returnObj );
    } );

});