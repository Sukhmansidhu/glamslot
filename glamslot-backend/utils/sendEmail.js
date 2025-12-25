const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendGiftCardEmail = async (to, code, amount) => {
  try {
    await resend.emails.send({
      from: "GlamSlot <no-reply@glamslot.com>",
      to,
      subject: "🎁 Your GlamSlot Gift Card",
      html: `
        <div style="font-family: Arial; line-height: 1.6;">
          <h2>🎉 You've received a GlamSlot Gift Card!</h2>
          <p><b>Gift Card Code:</b></p>
          <h3>${code}</h3>
          <p><b>Amount:</b> ₹${amount}</p>
          <p>Redeem this code while booking your salon service.</p>
          <p>✨ Thank you for choosing <b>GlamSlot</b></p>
        </div>
      `,
    });

    console.log("✅ Gift card email sent to", to);
  } catch (error) {
    console.error("❌ Resend email error:", error);
    throw error;
  }
};

module.exports = sendGiftCardEmail;
















// // const nodemailer = require("nodemailer");
// const { Resend } = require("resend");
// const resend = new Resend(process.env.RESEND_API_KEY);
// console.log("EMAIL_USER:", process.env.EMAIL_USER);
// console.log(
//   "EMAIL_PASS:",
//   process.env.EMAIL_PASS ? "LOADED" : "NOT LOADED"
// );

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER, 
//     pass: process.env.EMAIL_PASS, 
//   },
// });

// transporter.verify((error) => {
//   if (error) {
//     console.error("❌ Email transporter error:", error.message);
//   } else {
//     console.log("✅ Email server is ready to send messages");
//   }
// });

// const sendGiftCardEmail = async (to, code, amount) => {
//   await resend.emails.send({
//     from: "GlamSlot <onboarding@resend.dev>",
//     to,
//     subject: "🎁 Your GlamSlot Gift Card",
//     html: `
//       <h2>🎉 You've received a GlamSlot Gift Card!</h2>
//       <p><b>Code:</b> ${code}</p>
//       <p><b>Amount:</b> ₹${amount}</p>
//     `,
//   });
// };

// // const sendGiftCardEmail = async (to, code, amount) => {
// //   await transporter.sendMail({
// //     from: `"GlamSlot 💇‍♀️" <${process.env.EMAIL_USER}>`,
// //     to,
// //     subject: "🎁 Your GlamSlot Gift Card",
// //     html: `
// //       <div style="font-family: Arial; line-height: 1.6;">
// //         <h2>🎉 You've received a GlamSlot Gift Card!</h2>

// //         <p><b>Gift Card Code:</b></p>
// //         <h3 style="letter-spacing:2px;">${code}</h3>

// //         <p><b>Amount:</b> ₹${amount}</p>

// //         <p>Redeem this code while booking your salon service.</p>

// //         <p>✨ Thank you for choosing <b>GlamSlot</b></p>
// //       </div>
// //     `,
// //   });
// // };
// module.exports = sendGiftCardEmail;