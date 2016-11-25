  // Twilio Credentials
var accountSid = 'ACdb7f78ac4f8d7daf206ea336c1dde288';
var authToken = '205f30c8b12a4c0f4da4b5b5f2a2cf3a';

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

client.messages.create({
    to: "+1604-123-1234",
    from: "+16042394685",
    body: "This is a message sent from server.js",
}, function(err, message) {
    console.log(message.sid);
});
