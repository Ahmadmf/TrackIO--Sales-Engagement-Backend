const router =require("express").Router();
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const { gmail } = require("googleapis/build/src/apis/gmail");
const Base64 = require('js-base64').Base64;
const { atobPolyfill } = require("js-base64");

router.get('/tracker.png',function(req,res){

  // var buf = new Buffer([
  //   0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00,
  //   0x80, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x2c,
  //   0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x02,
  //   0x02, 0x44, 0x01, 0x00, 0x3b
  // ]);
  // response.set('Content-Type', 'image/png');
  // response.end(buf, 'binary');
  // //outer.emit('event:opened'); 
  // console.log("email opened");

  var fs=require('fs');
  console.log("In Tracker");
  var buf = new Buffer([
    0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00,
    0x80, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x2c,
    0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x02,
    0x02, 0x44, 0x01, 0x00, 0x3b]);
    res.writeHead('200', {'Content-Type': 'image/png'});
    res.end(buf,'binary');
  
});

// router.on('event:opened', function(email) {
//   console.log('Email was opened');
//   console.log(email.to);
//   console.log(email.subject);
// });

router.post('/sendCampaignEmail', (req, res) => {
    console.log("In Send Campaign Email");
    emailData=req.body.emailDetail;
   let emails=emailData.receiverMail.split("\n");

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
        // var str = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
        //     "MIME-Version: 1.0\n",
        //     "Content-Transfer-Encoding: 7bit\n",
        //     "to: ", to, "\n",
        //     "from: ", from, "\n",
        //     "subject: ", subject, "\n\n",
        //     message
        // ].join('');
        var str = ["Content-Type: text/html; charset=\"UTF-8\"\n",
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
          const emailLines=[];
          emailLines.push('From: \Firoz Ahmad\ <ahmadf1788@gmail.com>');
          emailLines.push('To: firozahmad1788@gmail.com');
          emailLines.push('Content-type: text/html;charset=iso-8859-1');
          emailLines.push('MIME-Version: 1.0');
          emailLines.push('Subject: New future subject here');
          emailLines.push('\n\n');
          emailLines.push('And the body text goes here');
          emailLines.push('<img src="http://localhost:8080/" alt="sdsc"/>');
          //emailLines.push('<img src="https://wallpapercave.com/wp/wp1962032.jpg" alt=""/>');
          const email =emailLines.join('\r\n').trim(); 

          const gmail = google.gmail('v1');

          const base64EncodedEmail = Base64.encodeURI(email);
          base64EncodedEmail.replace(/\+/g, '-').replace(/\//g, '_')
         // console.log(base64EncodedEmail);

  gmail.users.messages.send({
    auth: auth,
    userId: 'me',
    resource: {
      raw: base64EncodedEmail
    }
  }, (err, response) => {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    //console.log(response);
  });

        // const gmail = google.gmail({version: 'v1', auth});

        // for(var i=0;i<emails.length;i++){
        //   var raw = makeBody(emails[i], 'ahmadf1788@gmail.com', emailData.subject, emailData.message);
      


        // gmail.users.messages.send({
        //     auth: auth,
        //     userId: 'me',
        //     resource: {
        //         raw: raw
        //     }
        // }, function(err, response) {
        //     // res.send(err || response)
        // });
        // }
        // var raw = makeBody(emailData.receiverMail, 'ahmadf1788@gmail.com', emailData.subject, emailData.message);
      


        // gmail.users.messages.send({
        //     auth: auth,
        //     userId: 'me',
        //     resource: {
        //         raw: raw
        //     }
        // }, function(err, response) {
        //     // res.send(err || response)
        // });
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