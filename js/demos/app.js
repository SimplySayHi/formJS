
import Form from '../../dist/formjs-esm.js';

const formEl = document.querySelector('form');
const formInstance = new Form( formEl );
formInstance.init().then(function( obj ){
    console.log('formInstance obj.instance', obj.instance);
    console.log('formInstance obj.fields', obj.fields);
});
