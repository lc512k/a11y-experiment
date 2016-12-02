var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require('body-parser')

var TRANSPORT = process.env.TRANSPORT;

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport(TRANSPORT);

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', express.static(__dirname + '/public'));
app.post('/thankyou', function (req, res) {
	console.log(req.body)

	var options = {
		from: '"a11y survey" <no-reply@ft.com>',
		to: 'laura.carvajal@ft.com',
		subject: req.body.name,
		text: JSON.stringify(req.body)
	};

	transporter.sendMail(options, function (emailError, data) {
		if (emailError) {
			console.log('Error sending emails', emailError);
			return;
		}
		console.log('email sent!')
	});

	res.sendFile(path.join(__dirname + '/public/thankyou.html'));
})
app.listen(3000, function() { console.log('listening')});