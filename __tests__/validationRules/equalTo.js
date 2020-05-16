
import { equalTo } from '../../src/modules/validationRules/equalTo';

describe( 'validationRules: equalTo', () => {

    beforeEach(() => {
        document.body.innerHTML = `
        <form name="my-form">
            <div data-formjs-question>
                <input name="field-1" type="text" value="hello" required />
                <input name="field-1-equalto" type="text" value="hello" data-equal-to="field-1" required />
            </div>
            <div data-formjs-question>
                <input name="field-2" type="text" value="hello" required />
                <input name="field-2-equalto" type="text" value="hell" data-equal-to="field-2" required />
            </div>
            <div data-formjs-question>
                <input name="field-3" type="text" value="hello" required />
                <input name="field-3-equalto" type="text" value="hello" data-equal-to="field-3-" required />
            </div>
        </form>`;
    } );

    test( 'validationRules: equalTo -> valid', () => {
        const el = document.querySelector('[name="field-1-equalto"]');
        const data = {
            fieldEl: el
        };
        const returnObj = {
            result: true
        };
        const runFn = equalTo( data );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: equalTo -> not valid', () => {
        const el = document.querySelector('[name="field-2-equalto"]');
        const data = {
            fieldEl: el
        };
        const returnObj = {
            result: false,
            errors: {
                equalTo: true
            }
        };
        const runFn = equalTo( data );
        expect( runFn ).toEqual( returnObj );
    } );

    test( 'validationRules: equalTo -> field in data-equal-to does not exists', () => {
        const el = document.querySelector('[name="field-3-equalto"]');
        const data = {
            fieldEl: el
        };
        expect( () => { equalTo( data ) } ).toThrow( new TypeError('Cannot read property \'value\' of null') );
    } );

});