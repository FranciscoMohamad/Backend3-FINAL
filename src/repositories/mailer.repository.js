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

// Ejemplo de función para enviar mail
export async function sendMail({ to, subject, html }) {
  const transporter = await createEtherealTransporter();
  const info = await transporter.sendMail({
    from: '"Ecommerce" <no-reply@ecommerce.com>',
    to,
    subject,
    html,
  });
  // Imprime la URL de Ethereal para ver el mail
  console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info));
  return info;
}