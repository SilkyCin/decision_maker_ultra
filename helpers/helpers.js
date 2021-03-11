const mailgun = require("mailgun-js");
function sendMail (emailPerson, namePerson, links) {
  const DOMAIN = "sandbox215471a6d2194028801f124ffa8a49ed.mailgun.org";
  const mg = mailgun({apiKey: "550678450152d2c538cfaec72609afa8-29561299-b47257d3", domain: DOMAIN});
  const data = {
    from: "Mailgun Sandbox <postmaster@sandbox215471a6d2194028801f124ffa8a49ed.mailgun.org>",
    to: emailPerson,
	  subject: "Hello " + namePerson + ", here are your links!",
	  text: "Use the 'Admin link' to update the poll options and change" +
     "the poll topic/question and description. Share the 'Submission link' with" +
     "your friends.\n\nAdmin link: " + links.admin + "\nSubmission link: " + links.voting
  };
  mg.messages().send(data, function (error, body) {
	console.log(body);
  });
}

module.exports = { sendMail };
