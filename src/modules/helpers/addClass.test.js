import { addClass } from "./addClass";

describe( 'Add class', () => {
    let el;

    beforeEach(() => { 
        document.body.innerHTML = '<div id="mock"></div>'; 
    } );

    it( 'Add classes to an HTMLElement', () => {
        el = document.querySelector( '#mock' );
        const { classList } = el;

        addClass( el, 'test-class' )

        expect( classList.contains( 'test-class' ) ).toBe( true );
    } );

    it( 'Doesn\'t fail if no element is provided', () => {
        el = document.querySelector( '#non-existent-mock' );        

        addClass( el, 'test-class' )

        //It will not reach this point if it fails
        expect( true ).toBe( true );
    } );

    it( 'Doesn\'t alter classlist if no CSS classes are provided', () => {
        el = document.querySelector( '#mock' );        
        const classList = [ ...el.classList];

        addClass( el, '' )

        //It will not reach this point if it fails
        expect( classList ).toEqual( [...el.classList] );
    } );

} );