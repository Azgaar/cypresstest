# CypressTest

CypressTest is a test package created to playtest cypress.io and perform a simple test task: 
*send email via gmail api to instant mailbox and run cypress test to log email body to console*

## Installation

CypressTest requires [Node.js](https://nodejs.org/) v10.15+ to run.

Clone repository and install dependencies (cypress and googleapis).

```sh
$ git clone https://github.com/Azgaar/cypresstest.git
$ cd cypresstest
$ npm install
```

## Usage

Run `sender.js` to send a test email via gmail api and run cypress test in background mode. You will need access token to use gmail api. I can send it separately or a new one can be generated (it will require manual step from my side):

```sh
$ npm test
```

Send a test email via gmail api:

```sh
$ node sender.js
```

Open Cypress UI and run test manually:

```sh
$ npm cy:open
```

Amend `cypress/fixtures/mailinator.json` to set up test data if required.

## License

MIT