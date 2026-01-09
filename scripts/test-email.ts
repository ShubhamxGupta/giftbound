import { Resend } from 'resend'
import dotenv from 'dotenv'
import path from 'path'

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

async function testEmail() {
    const key = process.env.RESEND_API_KEY
    if (!key) {
        console.error('No API Key found')
        return
    }
    console.log('Testing with Key:', key.slice(0, 5) + '...')
    
    const resend = new Resend(key)

    try {
        const { data, error } = await resend.emails.send({
            from: 'Secret Santa <onboarding@resend.dev>',
            to: 'delivered@resend.dev', // Test address that always succeeds (simulated)
            subject: 'Test Email',
            html: '<p>Test</p>'
        })

        if (error) {
            console.error('Resend API Error:', error)
        } else {
            console.log('Success!', data)
        }
    } catch (e) {
        console.error('Exception:', e)
    }
}

testEmail()
