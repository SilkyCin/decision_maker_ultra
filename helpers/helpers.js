const mailgun = require("mailgun-js");
require('dotenv').config();
function sendMail (emailPerson, namePerson, links) {
  const DOMAIN = process.env.MAILGUN_DOMAIN;
  const mg = mailgun({apiKey: process.env.MAILGUN_API, domain: DOMAIN});
  const data = {
    from: process.env.MAILGUN_SANDBOX_FROM,
    to: emailPerson,
	  subject: `Hello ${namePerson}, here are your links!`,
	  text: `Use the 'Admin link' to update the poll options,
    change the poll topic/question, and description.
    Share the 'Submission link' with your friends.
    \n\nAdmin link: ${links.admin}
    \nSubmission link: ${links.voting}
    `
  };
  mg.messages().send(data, function (error, body) {
	console.log(body);
  });
}
module.exports = { sendMail };

