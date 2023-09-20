
import { checkFieldValidity } from '../src/modules/checkFieldValidity'
import { options } from '../src/modules/options'
import { validationRules } from '../src/modules/validationRules'
import { validationErrors } from '../js/test-modules/validationErrors'

describe( 'checkFieldValidity', () => {

    beforeEach(() => {
        document.body.innerHTML = `
        <form name="my-form">
            <div data-formjs-question>
                <input name="custom" type="text" data-subtype="custom" minlength="3" required />
            </div>
            <div data-formjs-question>
                <input name="field-70" type="radio" value="1" required />
                <input name="field-70" type="radio" value="2" required />
                <input name="field-70" type="radio" value="3" data-require-more="" id="req-more-2" checked required />
                <input name="field-70-more" type="text" data-required-from="#req-more-2" required />
            </div>
        </form>`
    } )

    test( 'checkFieldValidity - all agrs - $field obj is fake 1', async () => {
        const el = document.querySelector('[name="aaa"]')
        const returnObj = {
            $field: el,
            result: false
        }
        const promiseRun = await checkFieldValidity( el, options.fieldOptions, validationRules, validationErrors )
        return expect( promiseRun ).toEqual( returnObj )
    } )

    test( 'checkFieldValidity - all agrs - $field string is fake 2', async () => {
        const el = '[name="aaa"]'
        const returnObj = {
            $field: '[name="aaa"]',
            result: false
        }
        const promiseRun = await checkFieldValidity( el, options.fieldOptions, validationRules, validationErrors )
        return expect( promiseRun ).toEqual( returnObj )
    } )

    test( 'checkFieldValidity - all agrs - $field is req-more/from - to test focus', async () => {
        const el = document.querySelector('[name="field-70"]')
        const returnObj = {
            $field: el,
            result: true
        }
        const promiseRun = await checkFieldValidity( el, options.fieldOptions, validationRules, validationErrors )
        return expect( promiseRun ).toEqual( returnObj )
    } )

} )
