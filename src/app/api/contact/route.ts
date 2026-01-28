import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  service: z.string().min(1),
  message: z.string().min(10),
})

const RECIPIENT_EMAILS = [
  'lecour@ac-remodelingservice.com',
  'leleac1987@gmail.com',
]

export async function POST(request: Request) {
  if (!resend) {
    console.error('RESEND_API_KEY is not configured')
    return NextResponse.json(
      { error: 'Email service not configured' },
      { status: 500 }
    )
  }

  try {
    const body = await request.json()

    const result = contactSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const { name, email, phone, service, message } = result.data

    const { data, error } = await resend.emails.send({
      from: "Leo's Home Experts <onboarding@resend.dev>",
      to: RECIPIENT_EMAILS,
      replyTo: email,
      subject: `New Quote Request: ${service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #1e3a5f; padding: 20px; text-align: center;">
            <h1 style="color: #d4a84b; margin: 0;">New Quote Request</h1>
          </div>

          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #1e3a5f; margin-top: 0;">Contact Information</h2>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #1e3a5f;">Name:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #1e3a5f;">Email:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                  <a href="mailto:${email}" style="color: #1e3a5f;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #1e3a5f;">Phone:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                  <a href="tel:${phone}" style="color: #1e3a5f;">${phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #1e3a5f;">Service:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${service}</td>
              </tr>
            </table>

            <h3 style="color: #1e3a5f; margin-top: 25px;">Project Details</h3>
            <div style="background-color: white; padding: 15px; border-radius: 8px; border-left: 4px solid #d4a84b;">
              <p style="margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
          </div>

          <div style="background-color: #1e3a5f; padding: 15px; text-align: center;">
            <p style="color: #ffffff; margin: 0; font-size: 14px;">
              Leo's Home Experts | Houston, TX
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
