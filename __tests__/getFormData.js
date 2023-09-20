
import { getFormFields } from '../src/modules/helpers'
import { getFormData } from '../src/modules/optionsUtils/getFormData'

// TODO: ADD TESTS FOR FIELDS OUTSIDE form ELEMENT

describe( 'getFormData', () => {

    beforeEach(() => {
        document.body.innerHTML = `
        <form name="my-form">
            <div data-formjs-question>
                <input name="field-01" type="text" value="hello world " />
            </div>
            <div data-formjs-question>
                <input name="field-02" type="radio" value="1" checked />
                <input name="field-02" type="radio" value="2" />
                <input name="field-02" type="radio" value="3" data-require-more="" id="req-more-2" />
                <input name="field-02-more" type="text" data-required-from="#req-more-2" />
            </div>
            <div data-formjs-question>
                <input name="field-02b" type="radio" value="1" />
                <input name="field-02b" type="radio" value="2" />
            </div>
            <div data-formjs-question>
                <input name="obj.text" type="text" value="hello world in obj" />
            </div>
            <div data-formjs-question>
                <input name="obj.nested.text" type="text" value="hello world nested" />
            </div>
            <div data-formjs-question>
                <input name="obj.nested.again.text" type="text" value="hello world nested again" />
            </div>
            <div data-formjs-question>
                <input name="field-03" type="checkbox" value="sms" data-checks="[1,2]" />
                <input name="field-03" type="checkbox" value="email" checked />
                <input name="field-03" type="checkbox" value="app-notification" checked />
            </div>
            <div data-formjs-question>
                <input name="list[].1___title" type="text" value="New Title" />
            </div>
            <div data-formjs-question>
                <input name="list[].1___extra.text2" type="text" value="New Title 2 in obj 1" />
            </div>
            <div data-formjs-question>
                <input name="list[].1___description" type="text" value="My new description text is very long" />
            </div>
            <div data-formjs-question>
                <input name="list[].1___privacy" type="checkbox" checked />
            </div>
            <div data-formjs-question>
                <input name="list[].1___extra.text" type="text" value="New Title in obj 1" />
            </div>
            <div data-formjs-question>
                <input name="list[].1___extra.extra2.text" type="text" value="New Title in extra obj 2" />
            </div>
            <div data-formjs-question>
                <input name="list[].1___extra.text3" type="text" value="New Title 3 in obj 1" />
            </div>
            <div data-formjs-question>
                <select name="field-04">
                    <option>choose an option</option>
                    <option value="1">option 1</option>
                    <option value="2" selected>option 2</option>
                    <option value="3">option 3</option>
                </select>
            </div>
            <div data-formjs-question>
                <select name="field-05" multiple>
                    <option>choose an option</option>
                    <option value="1" selected>option 1</option>
                    <option value="2" selected>option 2</option>
                    <option value="3">option 3</option>
                </select>
            </div>
        </form>`
    } )

    test( 'getFormData Test - No trim values', () => {
        const $form = document.querySelector('form')
        const $filteredFields = getFormFields($form, { file: false, excludeData: false })

        const expectTest = getFormData.bind({$form})( $filteredFields )
        const extectedResult = {
            'field-01': 'hello world ',
            'field-02': '1',
            'field-02b': null,
            'field-02-more': '',
            obj: {
                text: 'hello world in obj',
                nested: {
                    text: 'hello world nested',
                    again: {
                        text: 'hello world nested again'
                    }
                }
            },
            'field-03': ['email', 'app-notification'],
            list: [
                {
                    title: 'New Title',
                    description: 'My new description text is very long',
                    privacy: true,
                    extra: {
                        text: 'New Title in obj 1',
                        text2: 'New Title 2 in obj 1',
                        text3: 'New Title 3 in obj 1',
                        extra2: {
                            text: 'New Title in extra obj 2'
                        }
                    }
                }
            ],
            'field-04': '2',
            'field-05': ['1', '2']
        }
        return expect( expectTest ).toEqual( extectedResult )
    } )

    test( 'getFormData Test - Trim values', () => {
        const $form = document.querySelector('form')
        const $filteredFields = getFormFields($form, { file: false, excludeData: false })

        const expectTest = getFormData.bind({$form})( $filteredFields, true )
        const extectedResult = {
            'field-01': 'hello world',
            'field-02': '1',
            'field-02b': null,
            'field-02-more': '',
            obj: {
                text: 'hello world in obj',
                nested: {
                    text: 'hello world nested',
                    again: {
                        text: 'hello world nested again'
                    }
                }
            },
            list: [
                {
                    title: 'New Title',
                    description: 'My new description text is very long',
                    privacy: true,
                    extra: {
                        text: 'New Title in obj 1',
                        text2: 'New Title 2 in obj 1',
                        text3: 'New Title 3 in obj 1',
                        extra2: {
                            text: 'New Title in extra obj 2'
                        }
                    }
                }
            ],
            'field-03': ['email', 'app-notification'],
            'field-04': '2',
            'field-05': ['1', '2']
        }
        return expect( expectTest ).toEqual( extectedResult )
    } )

} )
