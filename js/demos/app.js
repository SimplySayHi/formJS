
import Form from '../../dist/formjs-esm.js';

const $form = document.querySelector('form');
const formInstance = new Form( $form );
// OPTIONAL STEP
formInstance.validateFilledFields().then(function( fields ){
    console.log('validated fields', fields);
});
