const router =require("express").Router();
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

router.post('/sendCampaignEmail', (req, res) => {
    console.log("In Send Campaign Email");
    emailData=req.body.emailDetail;
    console.log(emailData);



    const SCOPES = [
        'https://mail.google.com/',
        'https://www.googleapis.com/auth/gmail.modify',
        'https://www.googleapis.com/auth/gmail.compose',
        'https://www.googleapis.com/auth/gmail.send'
      ];
      // The file token.json stores the user's access and refresh tokens, and is
      // created automatically when the authorization flow completes for the first
      // time.
      const TOKEN_PATH = 'token.json';
      
      // Load client secrets from a local file.
      
      
      function makeBody(to, from, subject, message) {
        var str = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
            "MIME-Version: 1.0\n",
            "Content-Transfer-Encoding: 7bit\n",
            "to: ", to, "\n",
            "from: ", from, "\n",
            "subject: ", subject, "\n\n",
            message
        ].join('');
        
        //var encodedMail="mk";
        // var encodedMail = new Buffer(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
        var encodedMail = new Buffer.from(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
            return encodedMail;
      }
      
      function sendMessage(auth) {
        const gmail = google.gmail({version: 'v1', auth});
        var raw = makeBody(emailData.receiverMail, 'ahmadf1788@gmail.com', emailData.subject, emailData.message);
        gmail.users.messages.send({
            auth: auth,
            userId: 'me',
            resource: {
                raw: raw
            }
        }, function(err, response) {
            // res.send(err || response)
        });
      }
      
      
      
      
      // fs.readFile('credentials.json', (err, content) => {
      //   if (err) return console.log('Error loading client secret file:', err);
      //   // Authorize a client with credentials, then call the Gmail API.
      //   authorize(JSON.parse(content), listLabels);
      // });
      // C:\Users\FIROZ AHMAD\Downloads\Final_Year_Project\7April\trackio-backend\routes\credentials.json
      // C:\Users\FIROZ AHMAD\Downloads\Final_Year_Project\7April\trackio-backend\credentials.json
      
      fs.readFile('credentials.json', function processClientSecrets(err, content) {
        if (err) {
            console.log('Error loading client secret file: ' + err);
            return;
        }
        // Authorize a client with the loaded credentials, then call the
        // Gmail API.
        authorize(JSON.parse(content), sendMessage);
      });
      
      /**
       * Create an OAuth2 client with the given credentials, and then execute the
       * given callback function.
       * @param {Object} credentials The authorization client credentials.
       * @param {function} callback The callback to call with the authorized client.
       */
      function authorize(credentials, callback) {
        const {client_secret, client_id, redirect_uris} = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);
      
        // Check if we have previously stored a token.
        fs.readFile(TOKEN_PATH, (err, token) => {
          if (err) return getNewToken(oAuth2Client, callback);
          oAuth2Client.setCredentials(JSON.parse(token));
          callback(oAuth2Client);
        });
      }
      
      /**
       * Get and store new token after prompting for user authorization, and then
       * execute the given callback with the authorized OAuth2 client.
       * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
       * @param {getEventsCallback} callback The callback for the authorized client.
       */
      function getNewToken(oAuth2Client, callback) {
        const authUrl = oAuth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        rl.question('Enter the code from that page here: ', (code) => {
          rl.close();
          oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
              if (err) return console.error(err);
              console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
          });
        });
      }



   console.log("Mail Has been send");


   // console.log(campaignData);
    // const newCampaign= new Campaign({
    //     campaignName: campaignData.campaignName,
    //     dailyProspectNumber:campaignData.dailyProspectNumber
    //   })
    
    // newCampaign.save();
    //   console.log("DATA HAS BEEN SAVED");

  
   });


 module.exports = router;