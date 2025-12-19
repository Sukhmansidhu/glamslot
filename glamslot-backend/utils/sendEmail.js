const nodemailer = require("nodemailer");

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log(
  "EMAIL_PASS:",
  process.env.EMAIL_PASS ? "LOADED" : "NOT LOADED"
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

transporter.verify((error) => {
  if (error) {
    console.error("❌ Email transporter error:", error.message);
  } else {
    console.log("✅ Email server is ready to send messages");
  }
});

const sendGiftCardEmail = async (to, code, amount) => {
  await transporter.sendMail({
    from: `"GlamSlot 💇‍♀️" <${process.env.EMAIL_USER}>`,
    to,
    subject: "🎁 Your GlamSlot Gift Card",
    html: `
      <div style="font-family: Arial; line-height: 1.6;">
        <h2>🎉 You've received a GlamSlot Gift Card!</h2>

        <p><b>Gift Card Code:</b></p>
        <h3 style="letter-spacing:2px;">${code}</h3>

        <p><b>Amount:</b> ₹${amount}</p>

        <p>Redeem this code while booking your salon service.</p>

        <p>✨ Thank you for choosing <b>GlamSlot</b></p>
      </div>
    `,
  });
};
module.exports = sendGiftCardEmail;