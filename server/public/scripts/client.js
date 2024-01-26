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
        // TODO: put the result on the DOM
    }).catch(function (error){
        console.log('error', error);
    });
}
