# Google Analytics Troubleshooting Guide

## Current Implementation Analysis

### 1. Environment Variables
- **GA Measurement ID**: `G-QJK285TFJ0` (present in .env.local)
- **Environment check**: The ID is properly prefixed with `NEXT_PUBLIC_` which makes it available on the client side

### 2. Google Analytics Component (`/src/components/GoogleAnalytics.tsx`)
**Key findings:**
- Uses `"use client"` directive for client-side execution
- Checks for cookie consent before loading GA
- Has proper consent state management
- Wrapped in Suspense boundary

**Potential Issues:**
1. **Default consent state**: Line 89 sets `analytics_storage: 'granted'` by default when GA loads, which might conflict with GDPR requirements
2. **Race condition**: The consent check happens after GA scripts might already be loading

### 3. Cookie Banner Implementation (`/src/components/CookieBanner.tsx`)
**Key findings:**
- Properly saves consent to localStorage
- Dispatches `cookie-consent-updated` event
- Analytics is set to `false` by default (line 35)

### 4. Tracking Library (`/src/lib/gtag.ts`)
**Key findings:**
- Has `canTrack()` function that checks:
  - `NODE_ENV === 'production'`
  - `VERCEL_ENV !== 'preview'`
  - GA_TRACKING_ID exists
- All tracking functions check `canTrack()` before executing

**Potential Issue:**
- The `VERCEL_ENV` check might be preventing tracking if not properly set in production

### 5. Layout Integration (`/src/app/(user)/[locale]/layout.tsx`)
**Key findings:**
- GoogleAnalytics component is conditionally rendered based on `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- CookieBanner is rendered at the bottom

## Identified Issues and Solutions

### Issue 1: Default Consent State Conflict
In `GoogleAnalytics.tsx`, line 89 sets default consent to 'granted', but the cookie banner defaults analytics to false.

**Solution:**
```typescript
// Change line 89 from:
analytics_storage: 'granted'
// To:
analytics_storage: 'denied'
```

### Issue 2: VERCEL_ENV Check in Production
The `canTrack()` function in `gtag.ts` checks for `VERCEL_ENV !== 'preview'`, but this env variable might not be set in non-Vercel deployments.

**Solution:**
```typescript
// Update canTrack() function to:
export const canTrack = () => {
  return (
    typeof window !== 'undefined' &&
    process.env.NODE_ENV === 'production' &&
    GA_TRACKING_ID &&
    // Only check VERCEL_ENV if it exists
    (!process.env.VERCEL_ENV || process.env.VERCEL_ENV !== 'preview')
  );
};
```

### Issue 3: Missing gtag Function Check
Some tracking calls might fire before gtag is available.

**Solution:**
Already implemented - all tracking functions check for `window.gtag` existence.

### Issue 4: Timing of GA Script Loading
The GoogleAnalytics component might not re-render when consent is given.

**Current implementation is correct** - it listens for storage events and custom events.

## Testing Checklist

1. **Check in browser console:**
   ```javascript
   // Check if GA is loaded
   typeof window.gtag
   
   // Check consent state
   localStorage.getItem('cookie-consent')
   
   // Check if tracking ID is available
   process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
   ```

2. **Network tab checks:**
   - Look for requests to `googletagmanager.com/gtag/js`
   - Check for collect requests to Google Analytics

3. **Debug tracking:**
   - Install Google Analytics Debugger Chrome extension
   - Check Real-Time reports in GA4 dashboard

## Recommended Fixes

1. Fix the default consent state in GoogleAnalytics component
2. Update the canTrack() function to handle non-Vercel deployments
3. Add debug logging in production to identify where tracking fails

## Implementation Priority

1. **High**: Fix default consent state conflict
2. **High**: Update VERCEL_ENV check
3. **Medium**: Add production debug logging
4. **Low**: Add retry mechanism for failed tracking calls