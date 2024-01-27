const express = require('express');
const app = express();
let PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('server/public'));

// Global variable that will contain all of the
// calculation objects:
let calculations = [];

calculations.push({numOne: 3, numTwo: 5, operator: '+', result: 8});
calculations.push({numOne: 11, numTwo: 7, operator: '-', result: 4});


// Here's a wonderful place to make some routes:

// GET /calculations

app.get('/calculations', function(req, res){
  res.send(calculations);
});

// POST /calculations

app.post('/calculations', function(req, res){
  let numOne = req.body.numOne;
  let numTwo = req.body.numTwo;
  let operator = req.body.operator;
  // console.log('numOne', numOne);
  // console.log('numTwo', numTwo);
  // console.log('operator', operator);
  let result;
  switch (operator) {
    case '+':
      result = Number(numOne) + Number(numTwo);
      break;
    case '-':
      result = numOne - numTwo;
      break;
    case '*':
      result = numOne * numTwo;
      break;
    case '/':
      result = numOne / numTwo;
      break;
  }
  // console.log('result', result);
  calculations.push({
    numOne: numOne,
    numTwo: numTwo,
    operator: operator,
    result: result
  });

  res.send(201);
})


// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
