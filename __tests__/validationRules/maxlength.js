
import { maxlength } from '../../src/modules/validationRules/maxlength';

describe( 'validationRules: maxlength', () => {

    beforeEach(() => {
        document.body.innerHTML = `
        <form name="my-form">
            <div data-formjs-question>
                <input name="field-1" type="text" maxlength="10" value="hello" />
            </div>
            <div data-formjs-question>
                <input name="field-2" type="text" maxlength="10" value="hellohellohello" />
            </div>
            <div data-formjs-question>
                <input name="field-3" type="text" maxlength="10" />
            </div>
        </form>`;
    } );

    test( 'validationRules: maxlength number -> valid', () => {
        const el = document.querySelector('[name="field-1"]');
        const returnObj = {
            result: true
        };
        const runFn = maxlength( el );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: maxlength number -> not valid', () => {
        const el = document.querySelector('[name="field-2"]');
        const returnObj = {
            result: false,
            errors: {
                maxlength: true
            }
        };
        const runFn = maxlength( el );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: maxlength -> value not set', () => {
        const el = document.querySelector('[name="field-3"]');
        const returnObj = {
            result: true
        };
        const runFn = maxlength( el );
        expect( runFn ).toEqual( returnObj );
    } );

});