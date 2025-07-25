import nodemailer from 'nodemailer';

const sendMail = async (to, subject, text) => {
    // Create a transporter (use your actual credentials or use environment variables)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,       // your email
            pass: process.env.MAIL_PASS        // app password (not your Gmail password)
        }
    });

    const mailOptions = {
        from: `"Payment Portal" <${process.env.MAIL_USER}>`,
        to,
        subject,
        text
    };

    await transporter.sendMail(mailOptions);
};

export default sendMail;