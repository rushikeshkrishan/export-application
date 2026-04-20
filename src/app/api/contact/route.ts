import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, product, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields" },
        { status: 400 }
      );
    }

    // In a real application, you would configure these environment variables
    // For local testing, we setup a mock transporter or use a dummy inbox
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.ethereal.email",
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // If no credentials, just simulate success (useful for immediate demo without failing)
    if (!process.env.SMTP_USER) {
      console.log(`[Mock Email] New Inquiry from ${name} (${email}) - Product: ${product}\nMessage: ${message}`);
      return NextResponse.json({ success: true, mock: true }, { status: 200 });
    }

    const mailOptions = {
      from: `Export Application <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER, // The admin email
      subject: `New Inquiry from ${name} - ${product || "General Inquiry"}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; border: 1px solid #eaeaea; border-radius: 10px;">
          <h2 style="color: #0B3D2E;">New Contact form submission</h2>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;"/>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p><strong>Product Interest:</strong> ${product || "N/A"}</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p style="margin: 0;"><strong>Message:</strong></p>
            <p style="margin-top: 10px; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("API Contact Error: ", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
