import { runFunctionsSequence } from "./helpers";

const beforeValidationOne = fieldObj => {
    fieldObj.first = true;

    return fieldObj;
};

const beforeValidationTwo = fieldObj => {
    return new Promise(function (resolve) {
        setTimeout(function () {
            fieldObj.two = true;
            resolve(fieldObj);
        }, 1000);
    });
};

const beforeValidationThree = fieldObj => {
    fieldObj.three = true;
    return fieldObj;
};

const functionsList = [
    beforeValidationOne,
    beforeValidationTwo,
    beforeValidationThree,
];


let i = 2;

//It blocks itself after first execution. Expected output -> [ 'Func one ended with result 1000', 'Func one ended with result 3000' ]
runFunctionsSequence( { functionsList, data: {},  } ).then( data => console.log( 'Test NO stopCondition', data ) ).catch( error => console.log( error ) );
//It blocks itself after first execution. Expected output -> [ 'Func one ended with result 1000' ]
runFunctionsSequence( { functionsList, data: {}, stopConditionFn: () => i++ == 3 } ).then( data => console.log( 'Test stopCondition', data ) ).catch( error => console.log( error ) );