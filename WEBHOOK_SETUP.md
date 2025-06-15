# Sanity Webhook Setup for On-Demand Revalidation

This project now supports on-demand revalidation via Sanity webhooks. When content is updated in Sanity, the Next.js site will be automatically revalidated instead of waiting for the 60-second ISR timeout.

## API Endpoint

The revalidation endpoint is available at: `/api/revalidate`

## Environment Variables

The following environment variables have been added:

- **Development**: `REVALIDATE_TOKEN=palermo_webhook_secret_2024_dev`
- **Production**: `REVALIDATE_TOKEN=palermo_webhook_secret_2024_prod`

## Sanity Webhook Configuration

### 1. Access Sanity Management Console

1. Go to [Sanity Management Console](https://www.sanity.io/manage)
2. Select your project: `Palermo Uppsala` (ID: `zax24rdo`)
3. Navigate to **API** → **Webhooks**

### 2. Development Webhook

Create a webhook for development with these settings:

- **Name**: `Next.js Revalidation (Development)`
- **URL**: `https://optimize-lcp--your-site-name.netlify.app/api/revalidate?token=palermo_webhook_secret_2024_dev`
  
  *Note: Replace with your actual Netlify deploy preview URL. Find it in your Netlify dashboard under your branch deploys.*
- **Dataset**: `development`
- **Trigger on**: `Create`, `Update`, `Delete`
- **Filter**: Leave empty (all document types)
- **HTTP method**: `POST`
- **API version**: `2023-05-03` (or latest)
- **Include drafts**: `No`

### 3. Production Webhook

Create a webhook for production with these settings:

- **Name**: `Next.js Revalidation (Production)`
- **URL**: `https://palermo-uppsala.se/api/revalidate?token=palermo_webhook_secret_2024_prod`
- **Dataset**: `production`
- **Trigger on**: `Create`, `Update`, `Delete`
- **Filter**: Leave empty (all document types)
- **HTTP method**: `POST`
- **API version**: `2023-05-03` (or latest)
- **Include drafts**: `No`

## Document Type Mapping

The revalidation endpoint intelligently handles different document types:

### Home Page (`home`)
- Revalidates: `/` and `/en`

### Menu Items (`categories`, `foods`, `subcategories`, `wines`)
- Revalidates: `/menu`, `/en/menu`, `/`, `/en`

### Lunch Configuration (`lunch`)
- Revalidates: `/lunch`, `/en/lunch`, `/`, `/en`

### Contact/FAQ (`contact`, `faq`)
- Revalidates: All pages (as they may appear in layouts)

### Unknown Types
- Revalidates: All main pages as a fallback

## Testing the Endpoint

### Test GET Request (Development)
```bash
curl -X GET "https://optimize-lcp--your-site-name.netlify.app/api/revalidate?token=palermo_webhook_secret_2024_dev"
```

### Test POST Request (Development)
```bash
curl -X POST "https://optimize-lcp--your-site-name.netlify.app/api/revalidate?token=palermo_webhook_secret_2024_dev" \
  -H "Content-Type: application/json" \
  -d '{"_type":"foods","_id":"test-id","title":"Test Food"}'
```

*Replace `optimize-lcp--your-site-name.netlify.app` with your actual Netlify deploy URL.*

## Security Features

- **Token Verification**: All requests must include the correct token
- **Environment-specific tokens**: Different tokens for dev/prod
- **Error Handling**: Comprehensive error logging and responses
- **Request Validation**: Validates JSON payload structure

## Logging

The endpoint logs:
- Successful revalidations per path
- Failed revalidations with error details
- Invalid token attempts
- Unknown document types
- Complete webhook payloads for debugging

## Response Format

### Success Response
```json
{
  "message": "Revalidation completed",
  "documentType": "foods",
  "documentId": "some-food-id",
  "revalidated": [
    {"path": "/menu", "status": "success"},
    {"path": "/en/menu", "status": "success"},
    {"path": "/", "status": "success"},
    {"path": "/en", "status": "success"},
    {"path": "/ (layout)", "status": "success"}
  ],
  "timestamp": "2025-06-15T01:37:46.382Z"
}
```

### Error Response
```json
{
  "message": "Invalid token",
  "timestamp": "2025-06-15T01:37:46.382Z"
}
```

## Benefits

1. **Instant Updates**: Content changes appear immediately instead of waiting up to 60 seconds
2. **Selective Revalidation**: Only relevant pages are revalidated, improving performance
3. **Bilingual Support**: Both Swedish and English versions are revalidated
4. **Fallback Safety**: Unknown content types trigger broad revalidation to ensure nothing is missed
5. **Security**: Token-based authentication prevents unauthorized revalidation attempts

## Monitoring

Check your deployment logs to monitor webhook activity:

- Successful revalidations will show which paths were updated
- Failed requests will include detailed error information
- All webhook attempts are timestamped for debugging

The existing 60-second ISR (`revalidate = 60`) remains as a fallback in case webhooks fail or are delayed.