import { runFunctionsSequence } from "./helpers.mjs";

const syncFuncOne = () => {
    let i = 0;

    for(; i < 1000; i++ ) {  }

    return `Func one ended with result ${i}`;
};

const syncFuncTwo = () => {
    let i = 0;

    for(; i < 3000; i++ ) {  }

    return `Func two ended with result ${i}`;
};

const functionsList = [
    syncFuncOne,
    syncFuncTwo,
];

//It blocks itself after first execution. Expected output -> [ 'Func one ended with result 1000', 'Func one ended with result 3000' ]
runFunctionsSequence( { functionsList, data: {},  } ).then( data => console.log( data ) ).catch( error => console.log( error ) );
//It blocks itself after first execution. Expected output -> [ 'Func one ended with result 1000' ]
runFunctionsSequence( { functionsList, data: {}, stopConditionFn: () => true } ).then( data => console.log( data ) ).catch( error => console.log( error ) );