import { sendMail } from '../repositories/mailer.repository.js';

export class MailerController {
  async sendRecoveryMail(req, res, next) {
    try {
      const { email, subject, html } = req.body;
      const info = await sendMail({ to: email, subject, html });
      res.json({ message: 'Correo enviado', preview: info && info.messageId });
    } catch (error) {
      next(error);
    }
  }
}

export const mailerController = new MailerController();