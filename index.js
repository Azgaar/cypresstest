const fs = require('fs');
const sender = require('./sender.js');
const PATH = "cypress/fixtures/mailinator.json";

const timestamp = new Date().toISOString(); // get current date and time in ISO
const testData = {
  url: "https://www.mailinator.com",
  recipient: "cypresstestproject",
  to: "cypresstestproject@mailinator.com",
  subject: "Cypress Test: " + timestamp,
  body: "This is an email body. Sent on " + timestamp
}

fs.writeFile(PATH, JSON.stringify(testData), err => {
  if (err) return console.error(err);
  sender.send(testData.to, testData.subject, testData.body);
  console.log('Test data stored to', PATH);
});