
import { checkFormValidity } from '../src/modules/checkFormValidity';
import { options } from '../src/modules/options';
import { validationRules } from '../src/modules/validationRules';
import { validationErrors } from '../src/modules/validationErrors';

describe( 'checkFormValidity', () => {

    const $ = (strNum) => {
        return document.querySelector(`form [name="field-${strNum}"]`);
    };

    options.fieldOptions.beforeValidation = [];

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
                <input name="field-17" type="checkbox" value="app-notiifcation" />
            </div>
            <div data-formjs-question>
                <input name="field-18" type="checkbox" value="sms" data-checks="[1,2]" required />
                <input name="field-18" type="checkbox" value="email" required />
                <input name="field-18" type="checkbox" value="app-notiifcation" required />
            </div>
            <div data-formjs-question>
                <input name="field-19" type="checkbox" value="sms" data-checks="[1,2]" required checked />
                <input name="field-19" type="checkbox" value="email" required />
                <input name="field-19" type="checkbox" value="app-notiifcation" required />
            </div>
            <div data-formjs-question>
                <input name="field-20" type="checkbox" value="sms" data-checks="[1,2]" required checked />
                <input name="field-20" type="checkbox" value="email" required checked />
                <input name="field-20" type="checkbox" value="app-notiifcation" required checked />
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
            
        </form>`;
    } );

    test( 'checkFormValidity -> form not valid', () => {
        const returnObj1 = {
            fields: [
                // FIELD TO SKIP
                { fieldEl: $('00'), result: true },

                // NOT REQUIRED
                { fieldEl: $('01'), result: true },
                { fieldEl: $('02'), result: true },

                // REQUIRED
                { fieldEl: $('03'), result: false, errors:{empty:true} },
                { fieldEl: $('04'), result: false, errors:{rule:true, email:true, missingAtChar:true} },
                { fieldEl: $('05'), result: false, errors:{rule:true, email:true, missingDomain:true, missingExtensionDot:true, missingExtension:true} },
                { fieldEl: $('06'), result: false, errors:{rule:true, email:true, missingExtensionDot:true, missingExtension:true} },
                { fieldEl: $('07'), result: false, errors:{rule:true, email:true, minlengthExtension:true} },
                { fieldEl: $('08'), result: true },
                { fieldEl: $('09'), result: true },

                // DATA-VALIDATE-IF-FILLED
                { fieldEl: $('10'), result: true },
                { fieldEl: $('11'), result: false, errors:{rule:true, email:true, missingAtChar:true} },
                { fieldEl: $('12'), result: true },

                // CHECKBOX
                { fieldEl: $('13'), result: true },
                { fieldEl: $('14'), result: true },
                { fieldEl: $('15'), result: false, errors:{empty:true} },
                { fieldEl: $('16'), result: true },

                // DATA-CHECKS
                { fieldEl: $('17'), result: true },
                { fieldEl: $('18'), result: false, errors:{empty:true} },
                { fieldEl: $('19'), result: true },
                { fieldEl: $('20'), result: false, errors:{rule:true, checkbox:true, checks:true, maxChecks:true} },

                // DATE
                { fieldEl: $('21'), result: true },
                { fieldEl: $('22'), result: false, errors:{empty:true} }, // WITH TYPE DATE, 2012-99-12 IS SEEN AS EMPTY
                { fieldEl: $('23'), result: true },

                // DATA-EQUAL-TO
                { fieldEl: $('24'), result: true },
                { fieldEl: $('24-equalto'), result: true },

                { fieldEl: $('25'), result: true },
                { fieldEl: $('25-equalto'), result: true },

                { fieldEl: $('26'), result: true },
                { fieldEl: $('26-equalto'), result: false, errors:{rule:true, equalTo:true} },
                // { fieldEl: $('27') }, // JS ERROR BECAUSE "field-27-" IS NOT AN EXISTING FIELD NAME

                // DATA-EXACT-LENGTH
                { fieldEl: $('28'), result: true },
                { fieldEl: $('29'), result: true },
                { fieldEl: $('30'), result: false, errors:{rule:true, exactLength:true, maxlength:true} },
                { fieldEl: $('31'), result: false, errors:{rule:true, exactLength:true, minlength:true} },
                { fieldEl: $('32'), result: false, errors:{rule:true, exactLength:true, maxlength:true} },

                // DATA-LENGTH
                { fieldEl: $('33'), result: true },
                { fieldEl: $('34'), result: true },
                { fieldEl: $('35'), result: false, errors:{rule:true, length:true, stringLength:true, minlength:true} },
                { fieldEl: $('36'), result: false, errors:{rule:true, length:true, stringLength:true, maxlength:true} },
                // { fieldEl: $('37') }, // JS ERROR BECAUSE "data-length" IS NOT A VALID JSON ARRAY

                // MAX
                { fieldEl: $('38'), result: true },
                { fieldEl: $('39'), result: true },
                { fieldEl: $('40'), result: true },
                { fieldEl: $('41'), result: false, errors:{rule:true, max:true} },
                { fieldEl: $('42'), result: true },
                { fieldEl: $('43'), result: true },
                { fieldEl: $('44'), result: true },
                { fieldEl: $('45'), result: false, errors:{rule:true, max:true} },

                // MAXLENGTH
                { fieldEl: $('46'), result: true },
                { fieldEl: $('47'), result: false, errors:{rule:true, maxlength:true} },

                // MIN
                { fieldEl: $('48'), result: true },
                { fieldEl: $('49'), result: false, errors:{rule:true, min:true} },
                { fieldEl: $('50'), result: true },
                { fieldEl: $('51'), result: true },
                { fieldEl: $('52'), result: true },
                { fieldEl: $('53'), result: false, errors:{rule:true, min:true} },
                { fieldEl: $('54'), result: true },
                { fieldEl: $('55'), result: true },

                // MINLENGTH
                { fieldEl: $('56'), result: true },
                { fieldEl: $('57'), result: false, errors:{rule:true, minlength:true} },

                // NUMBER
                { fieldEl: $('58'), result: true },
                { fieldEl: $('59'), result: false, errors:{empty:true} }, // WITH TYPE NUMBER, 'asd' IS SEEN AS EMPTY
                { fieldEl: $('60'), result: false, errors:{empty:true} },

                // PATTERN
                { fieldEl: $('61'), result: true },
                { fieldEl: $('62'), result: false, errors:{rule:true, pattern:true} },
                { fieldEl: $('63'), result: false, errors:{empty:true} },
                { fieldEl: $('64'), result: false, errors:{empty:true} },

                // RADIO
                { fieldEl: $('65'), result: true },
                { fieldEl: $('66'), result: true },
                { fieldEl: $('67'), result: false, errors:{rule:true, radio:true} },
                { fieldEl: $('68'), result: false, errors:{empty:true} },

                // REQ-MORE/FROM
                { fieldEl: $('69'), result: true },
                { fieldEl: $('69-more'), result: true },

                { fieldEl: $('70'), result: true },
                { fieldEl: $('70-more'), result: false, errors:{empty:true} },
                
                { fieldEl: $('71'), result: true },
                { fieldEl: $('71-more'), result: true },
                
                { fieldEl: $('72'), result: false, errors:{empty:true} },
                { fieldEl: $('72-more'), result: true },

                { fieldEl: $('73'), result: true },
                { fieldEl: $('73-more'), result: false, errors:{rule:true} }

            ],
            result: false
        };
        return checkFormValidity( document.querySelector('form'), options.fieldOptions, validationRules, validationErrors ).then(obj1 => {
            expect( obj1 ).toMatchSnapshot( returnObj1 );
        });
    } );

    test( 'checkFormValidity -> form not valid with skip field', () => {
        const returnObj2 = {
            fields: [
                { fieldEl: $('00'), result: true },

                // NOT REQUIRED
                { fieldEl: $('01'), result: true },
                { fieldEl: $('02'), result: true },

                // REQUIRED
                { fieldEl: $('03'), result: false, errors:{empty:true} },
                { fieldEl: $('04'), result: false, errors:{rule:true, email:true, missingAtChar:true} },
                { fieldEl: $('05'), result: false, errors:{rule:true, email:true, missingDomain:true, missingExtensionDot:true, missingExtension:true} },
                { fieldEl: $('06'), result: false, errors:{rule:true, email:true, missingExtensionDot:true, missingExtension:true} },
                { fieldEl: $('07'), result: false, errors:{rule:true, email:true, minlengthExtension:true} },
                { fieldEl: $('08'), result: true },
                { fieldEl: $('09'), result: true },

                // DATA-VALIDATE-IF-FILLED
                { fieldEl: $('10'), result: true },
                { fieldEl: $('11'), result: false, errors:{rule:true, email:true, missingAtChar:true} },
                { fieldEl: $('12'), result: true },

                // CHECKBOX
                { fieldEl: $('13'), result: true },
                { fieldEl: $('14'), result: true },
                { fieldEl: $('15'), result: false, errors:{empty:true} },
                { fieldEl: $('16'), result: true },

                // DATA-CHECKS
                { fieldEl: $('17'), result: true },
                { fieldEl: $('18'), result: false, errors:{empty:true} },
                { fieldEl: $('19'), result: true },
                { fieldEl: $('20'), result: false, errors:{rule:true, checks:true, checkbox:true, maxChecks:true} },

                // DATE
                { fieldEl: $('21'), result: true },
                { fieldEl: $('22'), result: false, errors:{empty:true} }, // WITH TYPE DATE, 2012-99-12 IS SEEN AS EMPTY
                { fieldEl: $('23'), result: true },

                // DATA-EQUAL-TO
                { fieldEl: $('24'), result: true },
                { fieldEl: $('24-equalto'), result: true },

                { fieldEl: $('25'), result: true },
                { fieldEl: $('25-equalto'), result: true },

                { fieldEl: $('26'), result: true },
                { fieldEl: $('26-equalto'), result: false, errors:{rule:true, equalTo:true} },
                // { fieldEl: $('27') }, // JS ERROR BECAUSE "field-27-" IS NOT AN EXISTING FIELD NAME

                // DATA-EXACT-LENGTH
                { fieldEl: $('28'), result: true },
                { fieldEl: $('29'), result: true },
                { fieldEl: $('30'), result: false, errors:{rule:true, exactLength:true, maxlength:true} },
                { fieldEl: $('31'), result: false, errors:{rule:true, exactLength:true, minlength:true} },
                { fieldEl: $('32'), result: false, errors:{rule:true, exactLength:true, maxlength:true} },

                // DATA-LENGTH
                { fieldEl: $('33'), result: true },
                { fieldEl: $('34'), result: true },
                { fieldEl: $('35'), result: false, errors:{rule:true, length:true, stringLength:true, minlength:true} },
                { fieldEl: $('36'), result: false, errors:{rule:true, length:true, stringLength:true, maxlength:true} },
                // { fieldEl: $('37') }, // JS ERROR BECAUSE "data-length" IS NOT A VALID JSON ARRAY

                // MAX
                { fieldEl: $('38'), result: true },
                { fieldEl: $('39'), result: true },
                { fieldEl: $('40'), result: true },
                { fieldEl: $('41'), result: false, errors:{rule:true, max:true} },
                { fieldEl: $('42'), result: true },
                { fieldEl: $('43'), result: true },
                { fieldEl: $('44'), result: true },
                { fieldEl: $('45'), result: false, errors:{rule:true, max:true} },

                // MAXLENGTH
                { fieldEl: $('46'), result: true },
                { fieldEl: $('47'), result: false, errors:{rule:true, maxlength:true} },

                // MIN
                { fieldEl: $('48'), result: true },
                { fieldEl: $('49'), result: false, errors:{rule:true, min:true} },
                { fieldEl: $('50'), result: true },
                { fieldEl: $('51'), result: true },
                { fieldEl: $('52'), result: true },
                { fieldEl: $('53'), result: false, errors:{rule:true, min:true} },
                { fieldEl: $('54'), result: true },
                { fieldEl: $('55'), result: true },

                // MINLENGTH
                { fieldEl: $('56'), result: true },
                { fieldEl: $('57'), result: false, errors:{rule:true, minlength:true} },

                // NUMBER
                { fieldEl: $('58'), result: true },
                { fieldEl: $('59'), result: false, errors:{empty:true} }, // WITH TYPE NUMBER, 'asd' IS SEEN AS EMPTY
                { fieldEl: $('60'), result: false, errors:{empty:true} },

                // PATTERN
                { fieldEl: $('61'), result: true },
                { fieldEl: $('62'), result: false, errors:{rule:true, pattern:true} },
                { fieldEl: $('63'), result: false, errors:{empty:true} },
                { fieldEl: $('64'), result: false, errors:{empty:true} },

                // RADIO
                { fieldEl: $('65'), result: true },
                { fieldEl: $('66'), result: true },
                { fieldEl: $('67'), result: false, errors:{rule:true, radio:true} },
                { fieldEl: $('68'), result: false, errors:{empty:true} },

                // REQ-MORE/FROM
                { fieldEl: $('69'), result: true },
                { fieldEl: $('69-more'), result: true },

                { fieldEl: $('70'), result: true },
                { fieldEl: $('70-more'), result: false, errors:{empty:true} },
                
                { fieldEl: $('71'), result: true },
                { fieldEl: $('71-more'), result: true },
                
                { fieldEl: $('72'), result: false, errors:{empty:true} },
                { fieldEl: $('72-more'), result: true },

                { fieldEl: $('73'), result: true },
                { fieldEl: $('73-more'), result: false, errors:{rule:true, email:true} }

            ],
            result: false
        };
        return checkFormValidity( document.querySelector('form'), options.fieldOptions, validationRules, validationErrors, $('00') ).then(obj2 => {
            expect( obj2 ).toMatchSnapshot( returnObj2 );
        });
    } );

});