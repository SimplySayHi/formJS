
import { max } from '../../src/modules/validationRules/max';

describe( 'validationRules: max', () => {

    beforeEach(() => {
        document.body.innerHTML = `
        <form name="my-form">
            <div data-formjs-question>
                <input name="field-1" type="number" max="10" value="7" />
            </div>
            <div data-formjs-question>
                <input name="field-2" type="number" max="10" value="11" />
            </div>
            <div data-formjs-question>
                <input name="field-3" type="number" max="10" />
            </div>
            <div data-formjs-question>
                <input name="field-4" type="date" max="2012-12-12" value="2012-12-11" />
            </div>
            <div data-formjs-question>
                <input name="field-5" type="date" max="2012-12-12" value="2012-12-13" />
            </div>
        </form>`;
    } );

    test( 'validationRules: max number -> valid', () => {
        const el = document.querySelector('[name="field-1"]');
        const data = {
            fieldEl: el,
            attrValue: el.max
        };
        const returnObj = {
            result: true
        };
        const runFn = max( data );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: max number -> not valid', () => {
        const el = document.querySelector('[name="field-2"]');
        const data = {
            fieldEl: el,
            attrValue: el.max
        };
        const returnObj = {
            result: false,
            errors: {
                max: true
            }
        };
        const runFn = max( data );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: max -> value not set', () => {
        const el = document.querySelector('[name="field-3"]');
        const data = {
            fieldEl: el,
            attrValue: el.max
        };
        const returnObj = {
            result: true
        };
        const runFn = max( data );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: max date -> valid', () => {
        const el = document.querySelector('[name="field-4"]');
        const data = {
            fieldEl: el,
            attrValue: el.max
        };
        const returnObj = {
            result: true
        };
        const runFn = max( data );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: max date -> not valid', () => {
        const el = document.querySelector('[name="field-5"]');
        const data = {
            fieldEl: el,
            attrValue: el.max
        };
        const returnObj = {
            result: false,
            errors: {
                max: true
            }
        };
        const runFn = max( data );
        expect( runFn ).toEqual( returnObj );
    } );

});