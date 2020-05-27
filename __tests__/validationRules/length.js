
import { length } from '../../src/modules/validationRules/length';

describe( 'validationRules: length', () => {

    beforeEach(() => {
        document.body.innerHTML = `
        <form name="my-form">
            <div data-formjs-question>
                <input name="field-1" type="text" data-length="[3,20]" value="Valerio" />
            </div>
            <div data-formjs-question>
                <input name="field-2" type="text" data-length="[3,20]" value="a" />
            </div>
            <div data-formjs-question>
                <input name="field-3" type="text" data-length="[3,20]" value="ValerioValerioValerio" />
            </div>
            <div data-formjs-question>
                <input name="field-4" type="text" data-length="3,20" value="Valerio" />
            </div>
        </form>`;
    } );

    test( 'validationRules: length - valid', () => {
        const el = document.querySelector('[name="field-1"]');
        const returnObj = {
            result: true
        };
        const runFn = length( el );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: length - not valid minlength', () => {
        const el = document.querySelector('[name="field-2"]');
        const returnObj = {
            result: false,
            errors: {
                stringLength: true,
                minlength: true
            }
        };
        const runFn = length( el );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: length - not valid maxlength', () => {
        const el = document.querySelector('[name="field-3"]');
        const returnObj = {
            result: false,
            errors: {
                stringLength: true,
                maxlength: true
            }
        };
        const runFn = length( el );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: length - not valid data-length', () => {
        const el = document.querySelector('[name="field-4"]');
        const returnObj = new Error('"data-length" attribute is not a valid array!');
        expect( () => { length(el) } ).toThrow( returnObj );
    } );

});