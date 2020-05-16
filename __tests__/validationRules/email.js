
import { email } from '../../src/modules/validationRules/email';

// TESTS FROM: https://flaviocopes.com/how-to-validate-email-address-javascript/

const validEmails = [
    'something@something.com',
    'something@something.name',
    'something@something.name.com',
    'something@some-thing.startups',
    'someone@localhost.localdomain',
    'someone@do-ma-in.com',
    'simple@example.com',
    'very.common@example.com',
    'other.email-with-dash@example.com',
    'fully-qualified-domain@example.com',
    'x@example.com',
    'example-indeed@strange-example.com',
    'example@s.solutions',
];

const invalidEmails = [
    'somebody@example',
    'somebody.example',
    '.wooly@example.com',
    'wo..oly@example.com',
    ' a@p.com',
    'a@p.com ',
    'test()@somebody.example',
    'test..x@somebody.example',
    'test..@somebody.example',
    'someone@127.0.0.1',
    'invalid:email@example.com',
    '@somewhere.com',
    'example.com',
    '@@example.com',
    'a space@example.com',
    'something@ex..ample.com',
    'a\b@c',
    '\"\"test\blah\"\"@example.com',
    'someone@somewhere.com@',
    'someone@somewhere.com@somewhere.com',
    'someone@somewhere_com',
    'someone@some:where.com',
    '.',
    'F/s/f/a@feo+re.com',
    'some+long+email+address@some+host-weird-/looking.com',
    'a @p.com',
    'ddjk-s-jk@asl-.com',
    'someone@do-.com',
    'somebody@-p.com',
    'somebody@-.com',
    'Abc.example.com',
    'A@b@c@example.com',
    'a"b(c)d,e:f;g<h>i[j\k]l@example.com',
    'just"not"right@example.com ',
    'this is"not\allowed@example.com',
    'this\ still\"not\\allowed@example.com',
    '1234567890123456789012345678901234567890123456789012345678901234+x@example.com',
    'john..doe@example.com ',
    'john.doe@example..com '
];

describe( 'validationRules: email', () => {

    for (const emailAddress of validEmails) {
        test( `Email passed as "${emailAddress}"`, () => {
            const expectTest = email( emailAddress );
            const expectedResult = true;
            expect( expectTest.result ).toBe( expectedResult );
        } );
    }
    for (const emailAddress of invalidEmails) {
        test( `Email passed as "${emailAddress}"`, () => {
            const expectTest = email( emailAddress );
            const expectedResult = false;
            expect( expectTest.result ).toBe( expectedResult );
        } );
    }

    test( 'Email not passed', () => {
        const expectTest = email();
        const expectedResult = false;
        expect( expectTest.result ).toBe( expectedResult );
    } );

} );
