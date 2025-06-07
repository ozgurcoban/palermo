# reCAPTCHA v3 Setup Guide

## 1. Create reCAPTCHA Keys

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin/create)
2. Fill in the form:
   - **Label**: Palermo Uppsala
   - **reCAPTCHA type**: Select "reCAPTCHA v3"
   - **Domains**: Add your domains:
     - `localhost` (for development)
     - `palermo-uppsala.se`
     - `www.palermo-uppsala.se`
     - Any other domains you use
3. Accept the reCAPTCHA Terms of Service
4. Click "Submit"

## 2. Copy Your Keys

After creating the reCAPTCHA, you'll see:
- **Site Key**: This goes in `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- **Secret Key**: This goes in `RECAPTCHA_SECRET_KEY`

## 3. Update Environment Variables

Update your `.env.local` file:

```env
# Google reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_actual_site_key_here
RECAPTCHA_SECRET_KEY=your_actual_secret_key_here
```

## 4. Test the Implementation

1. Start the development server: `npm run dev`
2. Navigate to the contact form
3. Fill out and submit the form
4. Check the browser console for any reCAPTCHA errors
5. Check the server logs for verification results

## How It Works

1. **Client-side**: The form automatically generates a reCAPTCHA token when submitted
2. **Server-side**: The token is verified with Google's API before processing the form
3. **Score threshold**: Set to 0.5 (adjustable in `_actions.ts`)
   - Scores range from 0.0 (likely bot) to 1.0 (likely human)
   - You can adjust the threshold based on your needs

## Troubleshooting

- **"reCAPTCHA not available" error**: Check that your site key is correct
- **"reCAPTCHA verification failed" error**: Check your secret key
- **Low score warnings**: Normal user interactions typically score 0.7-0.9
  - If legitimate users are blocked, lower the threshold in `_actions.ts`

## Production Deployment

Make sure to add the environment variables to your production environment (Vercel, etc.)