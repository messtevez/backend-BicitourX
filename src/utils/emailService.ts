import nodemailer from "nodemailer";
import logger from '../utils/logger';

export const sendEmail = async (to: string, subject: string, text: string) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };

    try {
        await transporter.sendMail(mailOptions);
        logger.info(`Email enviado a ${to}`);
    } catch (error) {
        logger.error(`Error al enviar el email a ${to}:`, error);
    }
};