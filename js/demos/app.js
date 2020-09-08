
import Form from '../../dist/formjs-esm.js';

const formEl = document.querySelector('form');
const formInstance = new Form( formEl );
// OPTIONAL STEP
formInstance.validateFilledFields().then(function( fields ){
    console.log('validated fields', fields);
});
