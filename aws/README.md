# GSI Website — AWS Deployment Guide

## Architecture

```
[Browser] → [CloudFront CDN] → [S3 Bucket (static files)]
                ↓
         [API Gateway] → [Lambda (contact form)] → [SendGrid]
```

## S3 Bucket Setup

1. Create an S3 bucket (e.g., `gsi-website-production`)
2. Enable static website hosting
3. Set index document: `index.html`
4. Set error document: `index.html` (for SPA routing fallback)
5. Block all public access (CloudFront will access via OAI)

## CloudFront Distribution

1. Create a CloudFront distribution
2. Origin: S3 bucket (use OAI for security)
3. Default root object: `index.html`
4. Custom error responses:
   - 403 → /index.html (200)
   - 404 → /index.html (200)
5. Deploy the CloudFront Function (`cloudfront-functions/url-rewrite.js`):
   - Event type: Viewer Request
   - This handles SPA routing for all URL paths
6. Enable compression (gzip, brotli)
7. Cache policy: CachingOptimized for assets, CachingDisabled for index.html
8. Set custom domain and SSL certificate via ACM

## Cache Strategy

| Path | Cache-Control | TTL |
|------|--------------|-----|
| `/index.html` | `no-cache, no-store, must-revalidate` | 0 |
| `/assets/*` | `max-age=31536000, public` | 1 year |
| `/media/*` | `max-age=2592000, public` | 30 days |

## Lambda + API Gateway

See `lambda/contact-form/README.md` for the contact form setup.

## Deployment Commands

```bash
# Build and optimize
npm run deploy:build

# Sync to S3 (update bucket name in package.json first)
npm run s3:sync

# Upload index.html with no-cache headers
npm run s3:sync-html

# Invalidate CloudFront cache
npm run cloudfront:invalidate

# Or do all at once
npm run deploy
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```bash
VITE_API_URL=https://xxx.execute-api.region.amazonaws.com
VITE_GTM_ID=GTM-XXXXXXX
```
