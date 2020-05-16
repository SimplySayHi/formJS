
import { number } from '../../src/modules/validationRules/number';

describe( 'validationRules: number', () => {

    beforeEach(() => {
        document.body.innerHTML = `
        <form name="my-form">
            <div data-formjs-question>
                <input name="field-1" type="number" value="7" />
            </div>
            <div data-formjs-question>
                <input name="field-2" type="number" value="asd" />
            </div>
            <div data-formjs-question>
                <input name="field-3" type="number" />
            </div>
        </form>`;
    } );

    test( 'validationRules: number -> valid', () => {
        const el = document.querySelector('[name="field-1"]');
        const returnObj = {
            result: true
        };
        const runFn = number( el.value );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: number -> not valid "asd"', () => {
        const el = document.querySelector('[name="field-2"]');
        const returnObj = {
            result: false
        };
        const runFn = number( el.value );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: number -> value not set', () => {
        const el = document.querySelector('[name="field-3"]');
        const returnObj = {
            result: false
        };
        const runFn = number( el.value );
        expect( runFn ).toEqual( returnObj );
    } );

});