const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Assuming you have a mock database
const database = [
  { ID: 1, Number: 'EMP001', CommuteTime: 30, TravellingFlag: false },
  { ID: 2, Number: 'EMP002', CommuteTime: 40, TravellingFlag: false },
  // Add more employee data as needed
];

app.use(bodyParser.json());

// Endpoint to get commute time for an employee
app.get('/getCommuteTime/:employeeNumber', (req, res) => {
  const employeeNumber = req.params.employeeNumber;
  const employee = database.find((emp) => emp.Number === employeeNumber);

  if (employee) {
    res.status(200).json({ CommuteTime: employee.CommuteTime });
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
});

// Endpoint to set the travelling flag for an employee
app.post('/setTravellingFlag/:employeeNumber', (req, res) => {
  const employeeNumber = req.params.employeeNumber;
  const employee = database.find((emp) => emp.Number === employeeNumber);

  if (employee) {
    // Assuming the request body has a "TravellingFlag" property
    employee.TravellingFlag = req.body.TravellingFlag;
    res.status(200).json({ message: 'Travelling flag updated successfully' });
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
});

// Endpoint to get employee number
app.get('/getEmployeeNumber/:employeeId', (req, res) => {
  const employeeId = req.params.employeeId;
  const employee = database.find((emp) => emp.ID === parseInt(employeeId));

  if (employee) {
    res.status(200).json({ Number: employee.Number });
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
});

// Other endpoints...
app.get('/triggerBotCall/:employeeId', (req, res) => {
  const employeeId = req.params.employeeId;
  const employee = database.find((emp) => emp.ID === parseInt(employeeId));
  let callAcknowledged = false;

  if (employee) {
    // Generate a random boolean value
    const randomValue = Math.random();
    callAcknowledged = randomValue < 0.5;

    res.status(200).json({ status: callAcknowledged });
    return;
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
});



app.put('/updateStatus/:employeeId', async (req, res) => {
  const employeeId = req.params.employeeId;

  if (employeeId) {
    // Assuming the request body has a "TravellingFlag" property
    const employee = database.find((emp) => emp.ID === parseInt(employeeId));
    if (employee) {
      employee.TravellingFlag = req.body.TravellingFlag;
      res.status(200).json({ message: 'Travelling flag updated successfully' });
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } else {
    res.status(400).json({ error: 'Bad request. Employee ID is missing.' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});