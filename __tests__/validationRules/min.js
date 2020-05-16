
import { min } from '../../src/modules/validationRules/min';

describe( 'validationRules: min', () => {

    beforeEach(() => {
        document.body.innerHTML = `
        <form name="my-form">
            <div data-formjs-question>
                <input name="field-1" type="number" min="10" value="11" />
            </div>
            <div data-formjs-question>
                <input name="field-2" type="number" min="10" value="7" />
            </div>
            <div data-formjs-question>
                <input name="field-3" type="number" min="10" />
            </div>
            <div data-formjs-question>
                <input name="field-4" type="date" min="2012-12-12" value="2012-12-13" />
            </div>
            <div data-formjs-question>
                <input name="field-5" type="date" min="2012-12-12" value="2012-12-11" />
            </div>
        </form>`;
    } );

    test( 'validationRules: min number -> valid', () => {
        const el = document.querySelector('[name="field-1"]');
        const data = {
            fieldEl: el,
            attrValue: el.min
        };
        const returnObj = {
            result: true
        };
        const runFn = min( data );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: min number -> not valid', () => {
        const el = document.querySelector('[name="field-2"]');
        const data = {
            fieldEl: el,
            attrValue: el.min
        };
        const returnObj = {
            result: false,
            errors: {
                min: true
            }
        };
        const runFn = min( data );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: min -> value not set', () => {
        const el = document.querySelector('[name="field-3"]');
        const data = {
            fieldEl: el,
            attrValue: el.min
        };
        const returnObj = {
            result: false,
            errors: {
                min: true
            }
        };
        const runFn = min( data );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: min date -> valid', () => {
        const el = document.querySelector('[name="field-4"]');
        const data = {
            fieldEl: el,
            attrValue: el.min
        };
        const returnObj = {
            result: true
        };
        const runFn = min( data );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: min date -> not valid', () => {
        const el = document.querySelector('[name="field-5"]');
        const data = {
            fieldEl: el,
            attrValue: el.min
        };
        const returnObj = {
            result: false,
            errors: {
                min: true
            }
        };
        const runFn = min( data );
        expect( runFn ).toEqual( returnObj );
    } );

});