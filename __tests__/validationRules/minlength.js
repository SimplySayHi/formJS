
import { minlength } from '../../src/modules/validationRules/minlength';

describe( 'validationRules: minlength', () => {

    beforeEach(() => {
        document.body.innerHTML = `
        <form name="my-form">
            <div data-formjs-question>
                <input name="field-1" type="text" minlength="10" value="hellohellohello" />
            </div>
            <div data-formjs-question>
                <input name="field-2" type="text" minlength="10" value="hello" />
            </div>
            <div data-formjs-question>
                <input name="field-3" type="text" minlength="10" />
            </div>
        </form>`;
    } );

    test( 'validationRules: minlength -> valid', () => {
        const el = document.querySelector('[name="field-1"]');
        const returnObj = {
            result: true
        };
        const runFn = minlength( el );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: minlength -> not valid', () => {
        const el = document.querySelector('[name="field-2"]');
        const returnObj = {
            result: false,
            errors: {
                minlength: true
            }
        };
        const runFn = minlength( el );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: minlength -> value not set', () => {
        const el = document.querySelector('[name="field-3"]');
        const returnObj = {
            result: false,
            errors: {
                minlength: true
            }
        };
        const runFn = minlength( el );
        expect( runFn ).toEqual( returnObj );
    } );

});