# GSI Contact Form — Lambda Function

## Setup

1. Create an AWS Lambda function (Node.js 20.x runtime)
2. Set the handler to `index.handler`
3. Add these environment variables:
   - `SENDGRID_API_KEY` — Your SendGrid API key
   - `TO_EMAIL` — e.g., `contact@gsi.com.mx`
   - `FROM_EMAIL` — Verified sender in SendGrid
   - `CORS_ORIGIN` — e.g., `https://gsi.com.mx`

4. Create an API Gateway (HTTP API) with:
   - POST /api/contact → Lambda integration
   - Enable CORS

5. Update the website's `VITE_API_URL` env variable to point to the API Gateway URL.

## Testing

```bash
curl -X POST https://your-api-gateway-url/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "company": "Test Corp",
    "email": "test@example.com",
    "phone": "+52 55 1234 5678",
    "country": "Mexico",
    "service": "Cash-In-Transit (CIT)",
    "message": "Testing the contact form."
  }'
```
