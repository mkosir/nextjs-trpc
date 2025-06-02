import type { SendMailOptions } from 'nodemailer';
import nodemailer from 'nodemailer';

const EMAIL_MESSAGE = {
  subject: 'All Todos Completed!',
  text: 'Congratulations! All your to-do items have been marked as complete.',
} as const satisfies SendMailOptions;

export const sendCompletionEmail = async () => {
  if (process.env.EMAIL_MODE === 'test') {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const info = await transporter.sendMail({
      from: '"Todo App" <test@example.com>',
      to: 'test@example.com',
      ...EMAIL_MESSAGE,
    });

    // eslint-disable-next-line no-console
    console.log('📧 Test email sent. Preview URL:', nodemailer.getTestMessageUrl(info));
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_ADDRESS,
    to: process.env.EMAIL_ADDRESS,
    ...EMAIL_MESSAGE,
  });
};
