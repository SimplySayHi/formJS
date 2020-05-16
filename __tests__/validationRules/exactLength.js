
import { exactLength } from '../../src/modules/validationRules/exactLength';

describe( 'validationRules: exactLength', () => {

    beforeEach(() => {
        document.body.innerHTML = `
        <form name="my-form">
            <div data-formjs-question>
                <input name="field-1" type="text" value="hello" data-exact-length="5" required />
            </div>
            <div data-formjs-question>
                <input name="field-2" type="text" value="hellohello" data-exact-length="5" required />
            </div>
            <div data-formjs-question>
                <input name="field-3" type="text" value="he" data-exact-length="5" required />
            </div>
            <div data-formjs-question>
                <input name="field-4" type="text" value="hellohello" data-exact-length="a" required />
            </div>
        </form>`;
    } );

    test( 'validationRules: exactLength -> valid', () => {
        const el = document.querySelector('[name="field-1"]');
        const data = {
            fieldEl: el,
            attrValue: el.dataset.exactLength
        };
        const returnObj = {
            result: true
        };
        const runFn = exactLength( data );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: exactLength -> too long', () => {
        const el = document.querySelector('[name="field-2"]');
        const data = {
            fieldEl: el,
            attrValue: el.dataset.exactLength
        };
        const returnObj = {
            result: false,
            errors: {
                exactLength: true,
                maxlength: true
            }
        };
        const runFn = exactLength( data );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: exactLength -> too short', () => {
        const el = document.querySelector('[name="field-3"]');
        const data = {
            fieldEl: el,
            attrValue: el.dataset.exactLength
        };
        const returnObj = {
            result: false,
            errors: {
                exactLength: true,
                minlength: true
            }
        };
        const runFn = exactLength( data );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: exactLength -> attr value is not a number', () => {
        const el = document.querySelector('[name="field-4"]');
        const data = {
            fieldEl: el,
            attrValue: el.dataset.exactLength
        };
        const returnObj = {
            result: false,
            errors: {
                exactLength: true,
                maxlength: true
            }
        };
        const runFn = exactLength( data );
        expect( runFn ).toEqual( returnObj );
    } );

});