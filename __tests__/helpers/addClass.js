
import { addClass } from '../../src/modules/helpers/addClass';

describe( 'Add Class', () => {

    beforeEach(() => {
        document.body.innerHTML = '<div id="mock"></div><div class="mock"></div><div class="mock"></div><div class="mock"></div>';
    } );

    test( 'Add classes to an HTML Element', () => {
        let el = document.querySelector( '#mock' );
        addClass( el, 'test-class' );
        expect( el.classList.contains( 'test-class' ) ).toBe( true );
    } );

    /* test( 'Passing only 1 argument ( node element )', () => {
        let el = document.querySelector( '#mock' );
        const classList = [ ...el.classList];
        const expectedResult = addClass( el );
        expect( classList ).toEqual( [...el.classList] );
        expect( expectedResult ).toEqual( [el] );
    } );

    test( 'Passing only 1 argument ( a string )', () => {
        let el = document.querySelector( '#mock' );
        const classList = [ ...el.classList];
        const expectedResult = addClass( 'test-class' );
        expect( classList ).toEqual( [...el.classList] );
        expect( expectedResult ).toEqual( [] );
    } );

    test( 'Passing element that does not exists', () => {
        let el = document.querySelector( '#non-existent-mock' );
        const expectedResult = addClass( el, 'test-class' );
        expect( true ).toBe( true );
        expect( expectedResult ).toEqual( [] );
    } );

    test( 'Passing 0 arguments', () => {
        const expectedResult = addClass();
        expect( true ).toEqual( true );
        expect( expectedResult ).toEqual( [] );
    } );

    test( 'Add classes to many HTML Elements', () => {
        let el = document.querySelectorAll( '.mock' );
        const expectedResult = addClass( el, 'test-class' );
        const expectTest = Array.from(el).filter(el => el.classList.contains( 'test-class' )).length === el.length;
        expect( expectTest ).toBe( true );
        expect( expectedResult ).toEqual( Array.from(el) );
    } );

    test( 'Many HTML Elements but no classes', () => {
        let el = document.querySelectorAll( '.mock' );
        const expectedResult = addClass( el );
        const expectTest = Array.from(el).filter(el => !el.classList.contains( 'test-class' )).length === el.length;
        expect( expectTest ).toBe( true );
        expect( expectedResult ).toEqual( Array.from(el) );
    } );

    test( 'Add classes to many HTML Elements but elements don\'t exist', () => {
        let el = document.querySelectorAll( '.mock-non-existing' );
        const expectedResult = addClass( el, 'test-class' );
        expect( true ).toBe( true );
        expect( expectedResult ).toEqual( [] );
    } ); */

} );
