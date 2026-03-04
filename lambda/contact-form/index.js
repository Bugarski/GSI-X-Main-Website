/**
 * GSI Contact Form — AWS Lambda Handler
 * 
 * Receives form submissions from the website and sends emails via SendGrid.
 * 
 * Environment Variables Required:
 *   SENDGRID_API_KEY   — Your SendGrid API key
 *   TO_EMAIL           — Destination email (e.g., contact@gsi.com.mx)
 *   FROM_EMAIL         — Verified sender email in SendGrid
 *   CORS_ORIGIN        — Allowed origin (e.g., https://gsi.com.mx)
 * 
 * Deploy: AWS Lambda + API Gateway (HTTP API)
 * Runtime: Node.js 20.x
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

export async function handler(event) {
  if (event.requestContext?.http?.method === 'OPTIONS') {
    return { statusCode: 200, headers: CORS_HEADERS, body: '' };
  }

  if (event.requestContext?.http?.method !== 'POST') {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { fullName, company, email, phone, country, service, message } = body;

    if (!fullName || !email || !message) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Missing required fields: fullName, email, message' }),
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Invalid email address' }),
      };
    }

    const emailContent = {
      personalizations: [
        {
          to: [{ email: process.env.TO_EMAIL }],
          subject: `GSI Website Inquiry — ${service || 'General'} — ${fullName}`,
        },
      ],
      from: {
        email: process.env.FROM_EMAIL,
        name: 'GSI Website',
      },
      reply_to: {
        email: email,
        name: fullName,
      },
      content: [
        {
          type: 'text/html',
          value: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px;">
              <div style="background: #003d79; padding: 24px; color: #ffffff;">
                <h1 style="margin: 0; font-size: 20px;">New Inquiry — GSI Website</h1>
              </div>
              <div style="padding: 24px; background: #f9f9f9;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; width: 140px; vertical-align: top;">Name:</td>
                    <td style="padding: 8px 0;">${fullName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Company:</td>
                    <td style="padding: 8px 0;">${company || '—'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Email:</td>
                    <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Phone:</td>
                    <td style="padding: 8px 0;">${phone || '—'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Country/Region:</td>
                    <td style="padding: 8px 0;">${country || '—'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Service:</td>
                    <td style="padding: 8px 0;">${service || '—'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Message:</td>
                    <td style="padding: 8px 0; white-space: pre-wrap;">${message}</td>
                  </tr>
                </table>
              </div>
              <div style="padding: 16px 24px; background: #ebebeb; font-size: 12px; color: #767676;">
                Sent from gsi.com.mx contact form
              </div>
            </div>
          `,
        },
      ],
    };

    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailContent),
    });

    if (response.status === 202) {
      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({ success: true, message: 'Email sent successfully' }),
      };
    }

    const errorBody = await response.text();
    console.error('SendGrid error:', response.status, errorBody);

    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  } catch (err) {
    console.error('Lambda error:', err);

    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}
