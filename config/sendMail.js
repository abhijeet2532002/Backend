import mailConfig from "./mailConfig.js";
const { transpoter } = mailConfig;

class AccountMailer {
  info = null;

  sendMail = (payment) => {
    transpoter.sendMail({
      from: "javaprogramming58@gmail.com",
      to: payment.email,
      cc: "abhijeetkumar2532002@gmail.com",
      subject: "✅ Payment Successful - Course Access Details",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <h2 style="color: #4CAF50;">🎉 Payment Successful!</h2>
            <p>Hi <strong>${payment.fullName}</strong>,</p>
            <p>Thank you for your payment of <strong>₹${payment.amount}</strong> for the <strong>${payment.course}</strong> course.</p>
            <p>Your transaction ID is <strong>${payment.transaction}</strong>.</p>
            
            <h3>📷 Payment Slip</h3>
            <img src="${payment.image}" alt="Payment Screenshot" style="max-width: 100%; border-radius: 4px; border: 1px solid #ddd;" />

            <p style="margin-top: 20px;">🚀 You can now start your course by joining our Telegram group:</p>
            <a href="https://t.me/startlearningdummy" target="_blank" style="display: inline-block; padding: 10px 15px; background-color: #0088cc; color: white; text-decoration: none; border-radius: 4px;">
              Join Telegram Group
            </a>

            <p style="margin-top: 30px;">If you have any questions, feel free to reply to this email.</p>
            <p style="color: #999;">Happy Learning!<br/>Coding Studio Team</p>
          </div>
        </div>
      `,
    });
  };
}

export default new AccountMailer();
