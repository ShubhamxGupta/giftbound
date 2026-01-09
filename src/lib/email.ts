import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendMagicLink(email: string, magicLink: string, eventName: string) {
  if (!process.env.RESEND_API_KEY) {
    console.log('===========================================================')
    console.log(`📧 MOCK EMAIL TO: ${email}`)
    console.log(`Subject: Join ${eventName}`)
    console.log(`Magic Link: ${magicLink}`)
    console.log('===========================================================')
    return
  }

  try {
    const { data, error } = await resend.emails.send({
        from: 'Secret Santa <onboarding@resend.dev>', // Use default for developer mode
        to: email, 
        subject: `Your Invite to ${eventName} 🎅`,
        html: `
            <div style="font-family: sans-serif; padding: 20px; text-align: center; color: #333;">
                <h1 style="color: #e11d48;">🎅 Secret Santa Invite</h1>
                <p>You've been invited to join <strong>${eventName}</strong>!</p>
                <br/>
                <a href="${magicLink}" style="display: inline-block; background-color: #e11d48; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                    Join Event
                </a>
                <br/><br/>
                <p style="font-size: 12px; color: #888;">
                    This link expires in 7 days.
                </p>
                <p style="font-size: 10px; color: #aaa;">
                    Powered by Resend
                </p>
            </div>
        `
    })

    if (error) {
        console.error('Resend Error:', error)
         // Fallback logging if API fails
         console.log('fallback mock link:', magicLink)
    } else {
        console.log(`[PROD] Email sent to ${email} via Resend. ID: ${data?.id}`)
    }
  } catch (error) {
    console.error('Failed to send email:', error)
  }
}
