import nodemailer from 'nodemailer';

export async function createEtherealTransporter() {
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

export async function sendMail({ to, subject, html }) {
  const transporter = await createEtherealTransporter();
  const info = await transporter.sendMail({
    from: '"Ecommerce" <no-reply@ecommerce.com>',
    to,
    subject,
    html,
  });

  console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info));
  return info;
}