import sendgrid from "@sendgrid/mail"

sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

async function sendEmail(req, res) {
  try {
    await sendgrid.send({
      to: "fullthrust.fleettools@gmail.com",
      from: "fullthrust.fleettools@gmail.com",
      subject: `Full Thrust Fleet Tools feedback`,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Feedback</title>
        <meta name="description" content="Feedback">
        <meta name="author" content="Full Thrust Fleet Tool">
        <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
        <link rel="stylesheet" href="css/styles.css?v=1.0">
      </head>
      <body>
        <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">              
        </div>
        <div class="container" style="margin-left: 20px;margin-right: 20px;">
          <h3>You've got a new feedback</h3>
          <table style="text-align: left;">
            <tr>
              <th>From 1 to 10, how likely it is you will use this tool?</th>
              <td>${req.body.likelyToUse}</td>
            </tr>
            <tr>
              <th>How often do you play Full Thrust?</th>
              <td>${req.body.playingFrequency}</td>
            </tr>
            <tr>
              <th>Open feedback</th>
              <td>${req.body.openFeedback}</td>
            </tr>
          </table>
        </div>
      </body>
      </html>`,
    })
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message })
  }
  return res.status(200).json({ error: "" })
}

export default sendEmail
