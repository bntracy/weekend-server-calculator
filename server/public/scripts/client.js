console.log('client.js is sourced!');

onReady();

function onReady() {
    getCalculations();
}

function getCalculations() {
    axios({
        method: 'GET',
        url: '/calculations'
    }).then(function (response){
        console.log('Response is good', response);
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
