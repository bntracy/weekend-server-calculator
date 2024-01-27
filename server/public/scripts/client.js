// console.log('client.js is sourced!');

let operator = '';
onReady();

function onReady() {
    getCalculations();
}

function getCalculations() {
    axios({
        method: 'GET',
        url: '/calculations'
    }).then(function (response){
        // console.log('Response is good', response);
        let calculationHistory = response.data;
        // put the result on the DOM
        document.getElementById('resultHistory').innerHTML = '';
        for (let eachCalc of calculationHistory) {
            document.getElementById('resultHistory').innerHTML += `<li>${eachCalc.numOne} ${eachCalc.operator} ${eachCalc.numTwo} = ${eachCalc.result}</li>`;
        }
        // display the most recent result, if there is one
        if (calculationHistory.length) {
            let mostRecent = calculationHistory[calculationHistory.length - 1];
            document.getElementById('recentResult').innerHTML = `<h2>${mostRecent.result}</h2>`;
        }
    }).catch(function (error){
        console.log('error', error);
    });
}

function add(event) {
    event.preventDefault();
    operator = '+';
    // console.log('add button clicked');
}

function subtract(event) {
    event.preventDefault();
    operator = '-';
}

function multiply(event) {
    event.preventDefault();
    operator = '*';
}

function divide(event) {
    event.preventDefault();
    operator = '/';
    // console.log('operator', operator);
}

function equals(event) {
    event.preventDefault();
    let numOne = Number(document.getElementById('first-number').value);
    let numTwo = Number(document.getElementById('second-number').value);
    axios({
        method: 'POST',
        url: '/calculations',
        data: {
            numOne: numOne,
            numTwo: numTwo,
            operator: operator
        }
    }).then(function(response) {
        // console.log('response is good', response);
        getCalculations();
        document.getElementById('first-number').value = '';
        document.getElementById('second-number').value = '';
    }).catch(function(error) {
        console.log('error', error);
    });
}