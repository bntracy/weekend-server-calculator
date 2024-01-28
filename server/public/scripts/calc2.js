let numOneEntered = false;
let operatorEntered = false;
let numTwoEntered = false;

function addInput(event) {
    event.preventDefault();
    document.getElementById('inputBox').value += event.target.textContent;
    if (!numOneEntered && event.target.classList.contains('digit')) {
        numOneEntered = true;
        document.getElementById('add-button').disabled = false;
        document.getElementById('subtract-button').disabled = false;
        document.getElementById('multiply-button').disabled = false;
        document.getElementById('divide-button').disabled = false;
    }
    if (!operatorEntered && event.target.classList.contains('operator')) {
        operatorEntered = true;
        document.getElementById('add-button').disabled = true;
        document.getElementById('subtract-button').disabled = true;
        document.getElementById('multiply-button').disabled = true;
        document.getElementById('divide-button').disabled = true;
        document.getElementById('decimal-button').disabled = false;
    }
    if (operatorEntered && !numTwoEntered && event.target.classList.contains('digit')) {
        numTwoEntered = true;
        document.getElementById('equals-button').disabled = false;
    }
    if (event.target.id === 'decimal-button') {
        document.getElementById('decimal-button').disabled = true;
    }
}

function clearInput(event) {
    event.preventDefault();
    document.getElementById('inputBox').value = '';
    document.getElementById('add-button').disabled = true;
    document.getElementById('subtract-button').disabled = true;
    document.getElementById('multiply-button').disabled = true;
    document.getElementById('divide-button').disabled = true;
    document.getElementById('equals-button').disabled = true;
    document.getElementById('decimal-button').disabled = false;
    numOneEntered = false;
    operatorEntered = false;
    numTwoEntered = false;
}

function equals(event) {
    event.preventDefault();
    let inputString = document.getElementById('inputBox').value;
    let operator = '';
    let operatorIndex;
    for (let i = 0; i < inputString.length; i++) {
        if (inputString[i] === '+' || inputString[i] === '-' || inputString[i] === '*' || inputString[i] === '/') {
            operator = inputString[i];
            operatorIndex = i;
        }
    } // end for loop
    let numOne = inputString.slice(0, operatorIndex);
    let numTwo = inputString.slice(operatorIndex + 1);
    numOne = Number(numOne);
    numTwo = Number(numTwo);
    if (numTwo === 0 && operator === '/') {
        alert("Cannot divide by zero");
        return false;
    }
    axios({
        method: 'POST',
        url: '/calculations',
        data: {
            numOne: numOne,
            numTwo: numTwo,
            operator: operator
        }
    }).then(function(response) {
        getCalculations();
        document.getElementById('inputBox').value = '';
        document.getElementById('add-button').disabled = true;
        document.getElementById('subtract-button').disabled = true;
        document.getElementById('multiply-button').disabled = true;
        document.getElementById('divide-button').disabled = true;
        document.getElementById('equals-button').disabled = true;
        document.getElementById('decimal-button').disabled = false;
        numOneEntered = false;
        operatorEntered = false;
        numTwoEntered = false;
    }).catch(function(error){
        console.log('error', error);
    });
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

onReady();

function onReady() {
    getCalculations();
    document.getElementById('add-button').disabled = true;
    document.getElementById('subtract-button').disabled = true;
    document.getElementById('multiply-button').disabled = true;
    document.getElementById('divide-button').disabled = true;
    document.getElementById('equals-button').disabled = true;
}

function clearHistory(event) {
    event.preventDefault();
    axios({
        method: 'DELETE',
        url: '/calculations'
    }).then(function(response) {
        // console.log('response is good', response);
        getCalculations();
        document.getElementById('recentResult').innerHTML = '';
    }).catch(function(error) {
        console.log('error', error);
    });
}