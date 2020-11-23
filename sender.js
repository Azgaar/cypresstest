const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const TOKEN_PATH = 'token.json';

module.exports.send = function (to, subject, body) {
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // authorize a client with loaded credentials, then call the Gmail API
    authorize(JSON.parse(content), sendMessage, to, subject, body);
  });
}

function authorize(credentials, callback, to, subject, body) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback, to, subject, body);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client, to, subject, body);
  });
}

function getNewToken(oAuth2Client, callback, to, subject, body) {
  const authUrl = oAuth2Client.generateAuthUrl({access_type: 'offline', scope: ['https://www.googleapis.com/auth/gmail.send']});
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({input: process.stdin, output: process.stdout});
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client, to, subject, body);
    });
  });
}

function sendMessage(auth, to, subject, body) {
  const gmail = google.gmail({version: 'v1', auth});
  const raw = makeBody(to, 'maxganiev1990@gmail.com', subject, body);
  gmail.users.messages.send({auth: auth, userId: 'me', resource: {raw: raw}}, (err, res) => {
    if (err) return console.log(err);
    console.log("Gmail API. Email is sent. Status", res.status);
  });
}

function makeBody(to, from, subject, message) {
	const str = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
		"MIME-Version: 1.0\n",
		"Content-Transfer-Encoding: 7bit\n",
		"to: ", to, "\n",
		"from: ", from, "\n",
		"subject: ", subject, "\n\n",
		message
  ].join('');
  const btoa = Buffer.from(str).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
	return btoa;
}
