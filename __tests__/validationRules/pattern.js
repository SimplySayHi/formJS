
import { pattern } from '../../src/modules/validationRules/pattern';

describe( 'validationRules: pattern', () => {

    beforeEach(() => {
        document.body.innerHTML = `
        <form name="my-form">
            <div data-formjs-question>
                <input name="field-1" type="text" pattern="^(IT){0,1}[0-9]{11}$" value="12345678901" />
            </div>
            <div data-formjs-question>
                <input name="field-2" type="text" pattern="^(IT){0,1}[0-9]{11}$" value="123" />
            </div>
            <div data-formjs-question>
                <input name="field-3" type="text" pattern="^(IT){0,1}[0-9]{11}$" />
            </div>
        </form>`;
    } );

    test( 'validationRules: pattern -> valid', () => {
        const el = document.querySelector('[name="field-1"]');
        const returnObj = {
            result: true
        };
        const runFn = pattern( {fieldEl:el} );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: pattern -> not valid "asd"', () => {
        const el = document.querySelector('[name="field-2"]');
        const returnObj = {
            result: false,
            errors: {
                pattern: true
            }
        };
        const runFn = pattern( {fieldEl:el} );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: pattern -> value not set', () => {
        const el = document.querySelector('[name="field-3"]');
        const returnObj = {
            result: false,
            errors: {
                pattern: true
            }
        };
        const runFn = pattern( {fieldEl:el} );
        expect( runFn ).toEqual( returnObj );
    } );

});