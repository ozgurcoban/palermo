# Palermo Uppsala - Restaurant Website

A modern, multilingual restaurant website built with Next.js 14, TypeScript, Sanity CMS, Shadcn and Tailwind CSS. The website features a full menu system, lunch specials, news section, and integrated content management.

## Features

- **Multilingual Support**: Swedish and English language support with next-intl
- **Content Management**: Sanity CMS with separate development and production environments
- **Restaurant Menu**: Dynamic menu with categories, subcategories, and wine selection
- **Lunch System**: Lunch specials management
- **News/Blog**: News and updates section
- **Animations**: Smooth animations using Framer Motion and GSAP
- **Contact Form**: Email integration using Resend
- **Responsive Design**: Mobile-first responsive design
- **SEO Optimized**: Built with Next.js 14 App Router for optimal performance

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **CMS**: Sanity v3
- **Styling**: Tailwind CSS + Shadcn UI
- **Animations**: Framer Motion, GSAP
- **Internationalization**: next-intl
- **Forms**: React Hook Form + Zod validation
- **Email**: Resend

## Prerequisites

- Node.js 18+ and npm
- Sanity account (for CMS)
- Resend API key (for contact form)

## Environment Variables

The project uses a secure environment variable setup:

### Environment Files Structure

- **`.env.local`** - Contains sensitive API keys
- **`.env.development`** - Development-specific public settings
- **`.env.production`** - Production-specific public settings

### Setup Instructions

1. Copy the example file to create your local environment:

```bash
cp .env.local.example .env.local
```

2. Create environment-specific files:

```bash
# Create development environment file
echo "NEXT_PUBLIC_SANITY_DATASET=development
NEXT_PUBLIC_SANITY_PROJECT_ID=zax24rdo
NEXT_PUBLIC_VERCEL_URL=localhost:3000" > .env.development

# Create production environment file
echo "NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_PROJECT_ID=zax24rdo
NEXT_PUBLIC_VERCEL_URL=www.palermo-uppsala.se" > .env.production
```

3. Fill in your API keys in `.env.local`:

```env
# Sensitive API keys - DO NOT COMMIT
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
INSTAGRAM_KEY=your_instagram_key
SANITY_API_READ_TOKEN=your_sanity_token

# Google Analytics (production only)
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id
```

### How It Works

- **Next.js automatically loads** the correct files based on environment:
  - Development: `.env.local` + `.env.development`
  - Production: `.env.local` + `.env.production`
- **`.env.local` takes precedence** over other environment files
- **Sanity dataset** is automatically set:
  - Development: `NEXT_PUBLIC_SANITY_DATASET=development`
  - Production: `NEXT_PUBLIC_SANITY_DATASET=production`

### Security Note

- Never commit API keys, tokens, or sensitive environment variables to the repository
- All environment files are kept local for security

## Installation

1. Clone the repository:

```bash
git clone git@github.com:nerotheman/palermo.git
cd palermo
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables (see above)

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

### Project Structure

```
palermo/
├── src/
│   ├── app/
│   │   ├── (admin)/         # Sanity Studio routes
│   │   └── (user)/          # Public website routes
│   ├── components/          # React components
│   ├── lib/                 # Utility functions
│   ├── types/               # TypeScript types
│   └── providers/           # React providers
├── sanity/                  # Sanity configuration
│   ├── schemas/             # Content schemas
│   └── lib/                 # Sanity utilities
├── messages/                # i18n translation files
├── public/                  # Static assets
└── ...config files
```

### Key Features Implementation

#### Internationalization

The site supports Swedish (default) and English. Language switching is handled by next-intl with locale-specific routing:

- `/` - Swedish homepage
- `/en` - English homepage
- `/meny` - Swedish menu
- `/en/menu` - English menu

#### Sanity CMS

Two Sanity datasets are configured:

- **Development**: For testing and development at `/studio/development`
- **Production**: For live content at `/studio/production`

#### Menu System

- Categories and subcategories for food items
- Separate wine list with categories
- Price display and descriptions
- Multilingual support for all menu items

#### Animation System

- Page transitions with Framer Motion
- Text animations with custom MaskText component
- Scroll-triggered animations with FadeUp component
- Image galleries with carousel functionality

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

Build the project:

```bash
npm run build
```

The build output will be in `.next` directory. Follow your platform's Next.js deployment guide.

## Content Management

### Accessing Sanity Studio

- Development: `https://palermo-uppsala/studio/development`
- Production: `https://palermo-uppsala/studio/production`

### Content Types

1. **Pages**

   - Home Page
   - About Page
   - Lunch Page

2. **Menu**

   - Food Items
   - Wine Items
   - Categories
   - Subcategories

3. **Other**
   - News/Blog posts
   - Contact information

## Code Style

- ES modules with destructured imports
- TypeScript for all files (avoid `any` type)
- Server components by default
- Client components only when needed (marked with `"use client"`)
- Conventional commits in English

## Contributing

1. Create a feature branch
2. Make your changes
3. Run type checking: `npm run typecheck`
4. Test in both Swedish and English locales
5. Check responsive design
6. Build before committing: `npm run build`
7. Commit with conventional commits format: `type: description`

## License

This project is private and proprietary.

## Support

For issues or questions, please contact the development team.
