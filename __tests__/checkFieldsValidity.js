
import { checkFieldsValidity } from '../src/modules/checkFieldsValidity'
import { options } from '../src/modules/options'
import { validationRules } from '../src/modules/validationRules'
import { validationErrors } from '../js/test-modules/validationErrors'
import { getFormFields } from '../src/modules/helpers'

describe( 'checkFieldsValidity', () => {

    const $ = (strNum) => {
        return document.querySelector(`form [name="field-${strNum}"]`)
    }

    beforeEach(() => {
        document.body.innerHTML = `
        <form name="my-form">

            /* FIELD TO SKIP */
            <div data-formjs-question>
                <input name="field-00" type="email" value="a@a.aa" required />
            </div>

            /* NOT REQUIRED */
            <div data-formjs-question>
                <input name="field-01" type="email" value="" />
            </div>
            <div data-formjs-question>
                <input name="field-02" type="email" value="aaa" />
            </div>

            /* REQUIRED */
            <div data-formjs-question>
                <input name="field-03" type="email" value="" required />
            </div>
            <div data-formjs-question>
                <input name="field-04" type="email" value="aaa" required />
            </div>
            <div data-formjs-question>
                <input name="field-05" type="email" value="a@" required />
            </div>
            <div data-formjs-question>
                <input name="field-06" type="email" value="a@a" required />
            </div>
            <div data-formjs-question>
                <input name="field-07" type="email" value="a@a.a" required />
            </div>
            <div data-formjs-question>
                <input name="field-08" type="email" value="a@a.aa" required />
            </div>
            <div data-formjs-question>
                <input name="field-09" type="text" data-subtype="email" value="a@a.aa" required />
            </div>

            /* DATA-VALIDATE-IF-FILLED */
            <div data-formjs-question>
                <input name="field-10" type="email" value="" data-validate-if-filled />
            </div>
            <div data-formjs-question>
                <input name="field-11" type="email" value="a" data-validate-if-filled />
            </div>
            <div data-formjs-question>
                <input name="field-12" type="email" value="a@a.aa" data-validate-if-filled />
            </div>

            /* CHECKBOX */
            <div data-formjs-question>
                <input name="field-13" type="checkbox" />
            </div>
            <div data-formjs-question>
                <input name="field-14" type="checkbox" checked />
            </div>
            <div data-formjs-question>
                <input name="field-15" type="checkbox" required />
            </div>
            <div data-formjs-question>
                <input name="field-16" type="checkbox" required checked />
            </div>

            /* DATA-CHECKS */
            <div data-formjs-question>
                <input name="field-17" type="checkbox" value="sms" data-checks="[1,2]" />
                <input name="field-17" type="checkbox" value="email" />
                <input name="field-17" type="checkbox" value="app-notification" />
            </div>
            <div data-formjs-question>
                <input name="field-18" type="checkbox" value="sms" data-checks="[1,2]" required />
                <input name="field-18" type="checkbox" value="email" required />
                <input name="field-18" type="checkbox" value="app-notification" required />
            </div>
            <div data-formjs-question>
                <input name="field-19" type="checkbox" value="sms" data-checks="[1,2]" required checked />
                <input name="field-19" type="checkbox" value="email" required />
                <input name="field-19" type="checkbox" value="app-notification" required />
            </div>
            <div data-formjs-question>
                <input name="field-20" type="checkbox" value="sms" data-checks="[1,2]" required checked />
                <input name="field-20" type="checkbox" value="email" required checked />
                <input name="field-20" type="checkbox" value="app-notification" required checked />
            </div>

            /* DATE */
            <div data-formjs-question>
                <input name="field-21" type="date" value="2012-12-12" required />
            </div>
            <div data-formjs-question>
                <input name="field-22" type="date" value="2012-99-12" required />
            </div>
            <div data-formjs-question>
                <input name="field-23" type="text" data-subtype="date" value="2012/12/12" required />
            </div>

            /* DATA-EQUAL-TO */
            <div data-formjs-question>
                <input name="field-24" type="text" value="hello" />
                <input name="field-24-equalto" type="text" value="" data-equal-to="field-24" />
            </div>
            <div data-formjs-question>
                <input name="field-25" type="text" value="hello" required />
                <input name="field-25-equalto" type="text" value="hello" data-equal-to="field-25" required />
            </div>
            <div data-formjs-question>
                <input name="field-26" type="text" value="hello" required />
                <input name="field-26-equalto" type="text" value="hello-" data-equal-to="field-26" required />
            </div>
            <!-- <div data-formjs-question>
                <input name="field-27" type="text" value="hello" required />
                <input name="field-27-equalto" type="text" value="hello" data-equal-to="field-27-" required />
            </div> -->

            /* DATA-EXACT-LENGTH */
            <div data-formjs-question>
                <input name="field-28" type="text" value="h" data-exact-length="5" />
            </div>
            <div data-formjs-question>
                <input name="field-29" type="text" value="hello" data-exact-length="5" required />
            </div>
            <div data-formjs-question>
                <input name="field-30" type="text" value="hellohello" data-exact-length="5" required />
            </div>
            <div data-formjs-question>
                <input name="field-31" type="text" value="he" data-exact-length="5" required />
            </div>
            <div data-formjs-question>
                <input name="field-32" type="text" value="hellohello" data-exact-length="a" required />
            </div>

            /* DATA-LENGTH */
            <div data-formjs-question>
                <input name="field-33" type="text" data-length="[3,20]" value="V" />
            </div>
            <div data-formjs-question>
                <input name="field-34" type="text" data-length="[3,20]" value="Valerio" required />
            </div>
            <div data-formjs-question>
                <input name="field-35" type="text" data-length="[3,20]" value="a" required />
            </div>
            <div data-formjs-question>
                <input name="field-36" type="text" data-length="[3,20]" value="ValerioValerioValerio" required />
            </div>
            <!-- <div data-formjs-question>
                <input name="field-37" type="text" data-length="3,20" value="Valerio" required />
            </div> -->

            /* MAX */
            <div data-formjs-question>
                <input name="field-38" type="number" max="10" value="7" />
            </div>
            <div data-formjs-question>
                <input name="field-39" type="number" max="10" value="7" required />
            </div>
            <div data-formjs-question>
                <input name="field-40" type="number" max="10" value="11" />
            </div>
            <div data-formjs-question>
                <input name="field-41" type="number" max="10" value="11" required />
            </div>
            <div data-formjs-question>
                <input name="field-42" type="date" max="2012-12-12" value="2012-12-11" />
            </div>
            <div data-formjs-question>
                <input name="field-43" type="date" max="2012-12-12" value="2012-12-11" required />
            </div>
            <div data-formjs-question>
                <input name="field-44" type="date" max="2012-12-12" value="2012-12-13" />
            </div>
            <div data-formjs-question>
                <input name="field-45" type="date" max="2012-12-12" value="2012-12-13" required />
            </div>

            /* MAXLENGTH */
            <div data-formjs-question>
                <input name="field-46" type="text" maxlength="10" value="hello" required />
            </div>
            <div data-formjs-question>
                <input name="field-47" type="text" maxlength="10" value="hellohellohello" required />
            </div>

            /* MIN */
            <div data-formjs-question>
                <input name="field-48" type="number" min="10" value="7" />
            </div>
            <div data-formjs-question>
                <input name="field-49" type="number" min="10" value="7" required />
            </div>
            <div data-formjs-question>
                <input name="field-50" type="number" min="10" value="11" />
            </div>
            <div data-formjs-question>
                <input name="field-51" type="number" min="10" value="11" required />
            </div>
            <div data-formjs-question>
                <input name="field-52" type="date" min="2012-12-12" value="2012-12-11" />
            </div>
            <div data-formjs-question>
                <input name="field-53" type="date" min="2012-12-12" value="2012-12-11" required />
            </div>
            <div data-formjs-question>
                <input name="field-54" type="date" min="2012-12-12" value="2012-12-13" />
            </div>
            <div data-formjs-question>
                <input name="field-55" type="date" min="2012-12-12" value="2012-12-13" required />
            </div>

            /* MINLENGTH */
            <div data-formjs-question>
                <input name="field-56" type="text" minlength="10" value="hellohellohello" required />
            </div>
            <div data-formjs-question>
                <input name="field-57" type="text" minlength="10" value="hello" required />
            </div>

            /* NUMBER */
            <div data-formjs-question>
                <input name="field-58" type="number" value="7" required />
            </div>
            <div data-formjs-question>
                <input name="field-59" type="number" value="asd" required />
            </div>
            <div data-formjs-question>
                <input name="field-60" type="number" required />
            </div>

            /* PATTERN */
            <div data-formjs-question>
                <input name="field-61" type="text" pattern="^(IT){0,1}[0-9]{11}$" value="12345678901" required />
            </div>
            <div data-formjs-question>
                <input name="field-62" type="text" pattern="^(IT){0,1}[0-9]{11}$" value="123" required />
            </div>
            <div data-formjs-question>
                <input name="field-63" type="text" pattern="^(IT){0,1}[0-9]{11}$" required />
            </div>
            <div data-formjs-question>
                <input name="field-64" type="text" pattern="^(IT){0,1}[0-9]{p11}$" required />
            </div>

            /* RADIO */
            <div data-formjs-question>
                <input name="field-65" type="radio" value="accepted" required checked />
                <input name="field-65" type="radio" value="" required />
            </div>
            <div data-formjs-question>
                <input name="field-66" type="radio" value="accepted" />
                <input name="field-66" type="radio" value="" checked />
            </div>
            <div data-formjs-question>
                <input name="field-67" type="radio" value="accepted" required />
                <input name="field-67" type="radio" value="" required checked />
            </div>
            <div data-formjs-question>
                <input name="field-68" type="radio" value="accepted" required />
                <input name="field-68" type="radio" value="" required />
            </div>

            /* REQ-MORE/FROM */
            <div data-formjs-question>
                <input name="field-69" type="radio" value="1" required />
                <input name="field-69" type="radio" value="2" required />
                <input name="field-69" type="radio" value="3" data-require-more="" id="req-more-1" checked required />
                <input name="field-69-more" type="text" data-required-from="#req-more-1" value="Hi" required />
            </div>
            <div data-formjs-question>
                <input name="field-70" type="radio" value="1" required />
                <input name="field-70" type="radio" value="2" required />
                <input name="field-70" type="radio" value="3" data-require-more="" id="req-more-2" checked required />
                <input name="field-70-more" type="text" data-required-from="#req-more-2" required />
            </div>
            <div data-formjs-question>
                <input name="field-71" type="radio" value="1" required checked />
                <input name="field-71" type="radio" value="2" required />
                <input name="field-71" type="radio" value="3" data-require-more="" id="req-more-3" required />
                <input name="field-71-more" type="text" data-required-from="#req-more-3" required />
            </div>
            <div data-formjs-question>
                <input name="field-72" type="radio" value="1" required />
                <input name="field-72" type="radio" value="2" required />
                <input name="field-72" type="radio" value="3" data-require-more="" id="req-more-4" required />
                <input name="field-72-more" type="text" data-required-from="#req-more-4" />
            </div>
            <div data-formjs-question>
                <input name="field-73" type="radio" value="1" required />
                <input name="field-73" type="radio" value="2" required />
                <input name="field-73" type="radio" value="3" data-require-more="" id="req-more-5" checked required />
                <input name="field-73-more" type="email" data-required-from="#req-more-5" value="a" required />
            </div>
            
        </form>`
    } )

    test( 'checkFieldsValidity -> form fields not valid', async () => {
        expect.assertions(1)
        const $form = document.querySelector('form')
        const $fields = getFormFields($form, { hidden: false })
        const returnObj1 = {
            fields: [
                // FIELD TO SKIP
                { $field: $('00'), result: true },

                // NOT REQUIRED
                { $field: $('01'), result: true },
                { $field: $('02'), result: true },

                // REQUIRED
                { $field: $('03'), result: false, errors:{empty:true} },
                { $field: $('04'), result: false, errors:{email:true, missingAtChar:true} },
                { $field: $('05'), result: false, errors:{email:true, missingDomain:true, missingExtensionDot:true, missingExtension:true} },
                { $field: $('06'), result: false, errors:{email:true, missingExtensionDot:true, missingExtension:true} },
                { $field: $('07'), result: false, errors:{email:true, minlengthExtension:true} },
                { $field: $('08'), result: true },
                { $field: $('09'), result: true },

                // DATA-VALIDATE-IF-FILLED
                { $field: $('10'), result: true },
                { $field: $('11'), result: false, errors:{email:true, missingAtChar:true} },
                { $field: $('12'), result: true },

                // CHECKBOX
                { $field: $('13'), result: true },
                { $field: $('14'), result: true },
                { $field: $('15'), result: false, errors:{empty:true} },
                { $field: $('16'), result: true },

                // DATA-CHECKS
                { $field: $('17'), result: true },
                { $field: $('18'), result: false, errors:{empty:true} },
                { $field: $('19'), result: true },
                { $field: $('20'), result: false, errors:{checkbox:true, checks:true, maxChecks:true} },

                // DATE
                { $field: $('21'), result: true },
                { $field: $('22'), result: false, errors:{empty:true} }, // WITH TYPE DATE, 2012-99-12 IS SEEN AS EMPTY
                { $field: $('23'), result: true },

                // DATA-EQUAL-TO
                { $field: $('24'), result: true },
                { $field: $('24-equalto'), result: true },

                { $field: $('25'), result: true },
                { $field: $('25-equalto'), result: true },

                { $field: $('26'), result: true },
                { $field: $('26-equalto'), result: false, errors:{equalTo:true} },
                // { $field: $('27') }, // JS ERROR BECAUSE "field-27-" IS NOT AN EXISTING FIELD NAME

                // DATA-EXACT-LENGTH
                { $field: $('28'), result: true },
                { $field: $('29'), result: true },
                { $field: $('30'), result: false, errors:{exactLength:true, maxlength:true} },
                { $field: $('31'), result: false, errors:{exactLength:true, minlength:true} },
                { $field: $('32'), result: false, errors:{exactLength:true, maxlength:true} },

                // DATA-LENGTH
                { $field: $('33'), result: true },
                { $field: $('34'), result: true },
                { $field: $('35'), result: false, errors:{length:true, minlength:true} },
                { $field: $('36'), result: false, errors:{length:true, maxlength:true} },
                // { $field: $('37') }, // JS ERROR BECAUSE "data-length" IS NOT A VALID JSON ARRAY

                // MAX
                { $field: $('38'), result: true },
                { $field: $('39'), result: true },
                { $field: $('40'), result: true },
                { $field: $('41'), result: false, errors:{max:true} },
                { $field: $('42'), result: true },
                { $field: $('43'), result: true },
                { $field: $('44'), result: true },
                { $field: $('45'), result: false, errors:{max:true} },

                // MAXLENGTH
                { $field: $('46'), result: true },
                { $field: $('47'), result: false, errors:{maxlength:true} },

                // MIN
                { $field: $('48'), result: true },
                { $field: $('49'), result: false, errors:{min:true} },
                { $field: $('50'), result: true },
                { $field: $('51'), result: true },
                { $field: $('52'), result: true },
                { $field: $('53'), result: false, errors:{min:true} },
                { $field: $('54'), result: true },
                { $field: $('55'), result: true },

                // MINLENGTH
                { $field: $('56'), result: true },
                { $field: $('57'), result: false, errors:{minlength:true} },

                // NUMBER
                { $field: $('58'), result: true },
                { $field: $('59'), result: false, errors:{empty:true} }, // WITH TYPE NUMBER, 'asd' IS SEEN AS EMPTY
                { $field: $('60'), result: false, errors:{empty:true} },

                // PATTERN
                { $field: $('61'), result: true },
                { $field: $('62'), result: false, errors:{pattern:true} },
                { $field: $('63'), result: false, errors:{empty:true} },
                { $field: $('64'), result: false, errors:{empty:true} },

                // RADIO
                { $field: $('65'), result: true },
                { $field: $('66'), result: true },
                { $field: $('67'), result: false, errors:{radio:true} },
                { $field: $('68'), result: false, errors:{empty:true} },

                // REQ-MORE/FROM
                { $field: $('69'), result: true },
                { $field: $('69-more'), result: true },

                { $field: $('70'), result: true },
                { $field: $('70-more'), result: false, errors:{empty:true} },
                
                { $field: $('71'), result: true },
                { $field: $('71-more'), result: true },
                
                { $field: $('72'), result: false, errors:{empty:true} },
                { $field: $('72-more'), result: true },

                { $field: $('73'), result: true },
                { $field: $('73-more'), result: false, errors:{email:true, missingAtChar:true} }

            ],
            result: false
        }
        const promiseRun = await checkFieldsValidity( $fields, options.fieldOptions, validationRules, validationErrors )
        return expect( promiseRun ).toEqual( returnObj1 )
    } )

    test( 'checkFieldsValidity -> form fields not valid with skip field', async () => {
        expect.assertions(1)
        const $form = document.querySelector('form')
        const $fields = getFormFields($form, { hidden: false })
        const returnObj2 = {
            fields: [
                { $field: $('00'), result: true },

                // NOT REQUIRED
                { $field: $('01'), result: true },
                { $field: $('02'), result: true },

                // REQUIRED
                { $field: $('03'), result: false, errors:{empty:true} },
                { $field: $('04'), result: false, errors:{email:true, missingAtChar:true} },
                { $field: $('05'), result: false, errors:{email:true, missingDomain:true, missingExtensionDot:true, missingExtension:true} },
                { $field: $('06'), result: false, errors:{email:true, missingExtensionDot:true, missingExtension:true} },
                { $field: $('07'), result: false, errors:{email:true, minlengthExtension:true} },
                { $field: $('08'), result: true },
                { $field: $('09'), result: true },

                // DATA-VALIDATE-IF-FILLED
                { $field: $('10'), result: true },
                { $field: $('11'), result: false, errors:{email:true, missingAtChar:true} },
                { $field: $('12'), result: true },

                // CHECKBOX
                { $field: $('13'), result: true },
                { $field: $('14'), result: true },
                { $field: $('15'), result: false, errors:{empty:true} },
                { $field: $('16'), result: true },

                // DATA-CHECKS
                { $field: $('17'), result: true },
                { $field: $('18'), result: false, errors:{empty:true} },
                { $field: $('19'), result: true },
                { $field: $('20'), result: false, errors:{checks:true, checkbox:true, maxChecks:true} },

                // DATE
                { $field: $('21'), result: true },
                { $field: $('22'), result: false, errors:{empty:true} }, // WITH TYPE DATE, 2012-99-12 IS SEEN AS EMPTY
                { $field: $('23'), result: true },

                // DATA-EQUAL-TO
                { $field: $('24'), result: true },
                { $field: $('24-equalto'), result: true },

                { $field: $('25'), result: true },
                { $field: $('25-equalto'), result: true },

                { $field: $('26'), result: true },
                { $field: $('26-equalto'), result: false, errors:{equalTo:true} },
                // { $field: $('27') }, // JS ERROR BECAUSE "field-27-" IS NOT AN EXISTING FIELD NAME

                // DATA-EXACT-LENGTH
                { $field: $('28'), result: true },
                { $field: $('29'), result: true },
                { $field: $('30'), result: false, errors:{exactLength:true, maxlength:true} },
                { $field: $('31'), result: false, errors:{exactLength:true, minlength:true} },
                { $field: $('32'), result: false, errors:{exactLength:true, maxlength:true} },

                // DATA-LENGTH
                { $field: $('33'), result: true },
                { $field: $('34'), result: true },
                { $field: $('35'), result: false, errors:{length:true, minlength:true} },
                { $field: $('36'), result: false, errors:{length:true, maxlength:true} },
                // { $field: $('37') }, // JS ERROR BECAUSE "data-length" IS NOT A VALID JSON ARRAY

                // MAX
                { $field: $('38'), result: true },
                { $field: $('39'), result: true },
                { $field: $('40'), result: true },
                { $field: $('41'), result: false, errors:{max:true} },
                { $field: $('42'), result: true },
                { $field: $('43'), result: true },
                { $field: $('44'), result: true },
                { $field: $('45'), result: false, errors:{max:true} },

                // MAXLENGTH
                { $field: $('46'), result: true },
                { $field: $('47'), result: false, errors:{maxlength:true} },

                // MIN
                { $field: $('48'), result: true },
                { $field: $('49'), result: false, errors:{min:true} },
                { $field: $('50'), result: true },
                { $field: $('51'), result: true },
                { $field: $('52'), result: true },
                { $field: $('53'), result: false, errors:{min:true} },
                { $field: $('54'), result: true },
                { $field: $('55'), result: true },

                // MINLENGTH
                { $field: $('56'), result: true },
                { $field: $('57'), result: false, errors:{minlength:true} },

                // NUMBER
                { $field: $('58'), result: true },
                { $field: $('59'), result: false, errors:{empty:true} }, // WITH TYPE NUMBER, 'asd' IS SEEN AS EMPTY
                { $field: $('60'), result: false, errors:{empty:true} },

                // PATTERN
                { $field: $('61'), result: true },
                { $field: $('62'), result: false, errors:{pattern:true} },
                { $field: $('63'), result: false, errors:{empty:true} },
                { $field: $('64'), result: false, errors:{empty:true} },

                // RADIO
                { $field: $('65'), result: true },
                { $field: $('66'), result: true },
                { $field: $('67'), result: false, errors:{radio:true} },
                { $field: $('68'), result: false, errors:{empty:true} },

                // REQ-MORE/FROM
                { $field: $('69'), result: true },
                { $field: $('69-more'), result: true },

                { $field: $('70'), result: true },
                { $field: $('70-more'), result: false, errors:{empty:true} },
                
                { $field: $('71'), result: true },
                { $field: $('71-more'), result: true },
                
                { $field: $('72'), result: false, errors:{empty:true} },
                { $field: $('72-more'), result: true },

                { $field: $('73'), result: true },
                { $field: $('73-more'), result: false, errors:{email:true, missingAtChar:true} }

            ],
            result: false
        }
        const promiseRun = await checkFieldsValidity( $fields, options.fieldOptions, validationRules, validationErrors, $('00') )
        return expect( promiseRun ).toEqual( returnObj2 )
    } )

})