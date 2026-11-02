import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

async function verifyCaptcha(token: string, ip?: string): Promise<boolean> {
    const params = new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY || '',
        response: token,
    });
    if (ip) params.append('remoteip', ip);

    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params,
        signal: AbortSignal.timeout(5000),
    });
    const data = await res.json();
    return data.success === true;
}

export async function POST(req: Request) {
    let data: any;
    try {
        data = await req.json();
    } catch {
        return NextResponse.json({ success: false, error: 'bad_request' }, { status: 400 });
    }

    const { name, phone, message, captchaToken } = data;

    if (!phone || typeof phone !== 'string') {
        return NextResponse.json({ success: false, error: 'phone_required' }, { status: 400 });
    }

    if (!captchaToken || typeof captchaToken !== 'string') {
        return NextResponse.json({ success: false, error: 'captcha_missing' }, { status: 400 });
    }

    try {
        const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
        const human = await verifyCaptcha(captchaToken, ip);
        if (!human) {
            return NextResponse.json({ success: false, error: 'captcha_failed' }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Заявка с сайта" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: 'Новая заявка',
            text: `
        Имя: ${name}
        Телефон: ${phone}
        Сообщение: ${message}
      `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Contact error:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
