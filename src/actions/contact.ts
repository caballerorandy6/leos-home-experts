'use server'

import { Resend } from 'resend'
import { contactFormSchema, type ContactFormData, SHADE_COLORS } from '@/lib/validations'
import { SITE_CONFIG } from '@/lib/constants'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

export async function submitContactForm(
  data: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  if (!resend) {
    console.error('RESEND_API_KEY is not configured')
    return { success: false, error: 'Email service not configured' }
  }

  const result = contactFormSchema.safeParse(data)
  if (!result.success) {
    return { success: false, error: 'Invalid form data' }
  }

  const { name, email, phone, service, shadeColor, shadeCount, shades, message } = result.data

  const isPatio = service === 'patio-shades'

  // Get color label for display
  const colorLabel = shadeColor
    ? SHADE_COLORS.find((c) => c.id === shadeColor)?.label ?? shadeColor
    : null

  let measurementsHtml = ''
  if (isPatio) {
    // Add color row
    const colorHtml = colorLabel
      ? `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #1e3a5f;">
          Color:
        </td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${colorLabel}</td>
      </tr>
      `
      : ''

    // Add shade count row
    const countHtml = shadeCount
      ? `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #1e3a5f;">
          Number of Shades:
        </td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${shadeCount}</td>
      </tr>
      `
      : ''

    // Add measurements rows
    const shadesHtml = shades && shades.length > 0
      ? shades
          .map((shade, index) => {
            const widthDisplay = shade.width === 'unknown' ? 'Unknown' : `${shade.width} in`
            const heightDisplay = shade.height === 'unknown' ? 'Unknown' : `${shade.height} in`
            return `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #1e3a5f;">
              Shade ${index + 1}:
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
              ${widthDisplay} (W) × ${heightDisplay} (H)
            </td>
          </tr>
        `
          })
          .join('')
      : ''

    measurementsHtml = colorHtml + countHtml + shadesHtml
  }

  try {
    const { error } = await resend.emails.send({
      from: "Leo's Home Experts <no-reply@ac-remodelingservice.com>",
      to: [...SITE_CONFIG.emails],
      replyTo: email,
      subject: `New Quote Request: ${service}${isPatio ? ` (${colorLabel}, ${shadeCount} shade${shadeCount && shadeCount > 1 ? 's' : ''})` : ''}`,
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
              ${measurementsHtml}
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
      return { success: false, error: 'Failed to send email' }
    }

    return { success: true }
  } catch (error) {
    console.error('Server action error:', error)
    return { success: false, error: 'Internal server error' }
  }
}
