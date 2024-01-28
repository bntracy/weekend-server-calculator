# Server Side Calculator

## Description

A basic calculator that handles all calculation logic on a server. Client-side, inputs are accepted (two numbers and an operator). On clicking the equals sign, this data is sent to the server, which returns not only the most recent result but also the history of all calculations that have been made so far. The client script renders this history on the page, along with prominently displaying the most recent result. A "C" button is available to clear inputs at any time.

Stretch goals completed: the POST request only happens if all necessary input is ready. The calculator also checks for division by zero. There is a button available to clear the calculation history, using a DELETE request. Clicking on an entry in the calculation history re-runs that calculation. Finally, there is a link to a second page where the calculator looks more like a calculator.
