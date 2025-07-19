import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    const data = await req.json();
    const { name, phone, message } = data;

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER, // твоя почта
                pass: process.env.EMAIL_PASS  // пароль или app password
            }
        });

        await transporter.sendMail({
            from: `"Заявка с сайта" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: 'Новая заявка',
            text: `
        Имя: ${name}
        Телефон: ${phone}
        Сообщение: ${message}
      `
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Email error:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
