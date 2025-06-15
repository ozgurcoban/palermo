import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Environment variable for webhook security
const REVALIDATE_TOKEN = process.env.REVALIDATE_TOKEN

export async function POST(request: NextRequest) {
  try {
    // Verify webhook token
    const token = request.nextUrl.searchParams.get('token')
    
    if (!REVALIDATE_TOKEN) {
      console.error('REVALIDATE_TOKEN not configured')
      return NextResponse.json(
        { message: 'Revalidation token not configured' },
        { status: 500 }
      )
    }

    if (token !== REVALIDATE_TOKEN) {
      console.error('Invalid revalidation token')
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      )
    }

    // Parse the webhook payload
    const body = await request.json()
    
    // Extract document type and ID from Sanity webhook payload
    const { _type, _id, slug } = body

    console.log('Revalidation request received:', { _type, _id, slug })

    // Define paths to revalidate based on content type
    const pathsToRevalidate: string[] = []

    switch (_type) {
      case 'home':
        // Revalidate home page for both locales
        pathsToRevalidate.push('/', '/en')
        break
      
      case 'categories':
      case 'foods':
      case 'subcategories':
      case 'wines':
        // Revalidate menu pages for both locales
        pathsToRevalidate.push('/menu', '/en/menu')
        // Also revalidate home page as it may display menu items
        pathsToRevalidate.push('/', '/en')
        break
      
      case 'lunch':
        // Revalidate lunch pages for both locales
        pathsToRevalidate.push('/lunch', '/en/lunch')
        // Also revalidate home page as it may display lunch info
        pathsToRevalidate.push('/', '/en')
        break
      
      case 'contact':
      case 'faq':
        // Revalidate all pages as contact/FAQ info may appear in layouts
        pathsToRevalidate.push('/', '/en', '/menu', '/en/menu', '/lunch', '/en/lunch')
        break
      
      default:
        // For unknown types, revalidate all main pages to be safe
        pathsToRevalidate.push('/', '/en', '/menu', '/en/menu', '/lunch', '/en/lunch')
        console.log(`Unknown document type: ${_type}, revalidating all pages`)
    }

    // Perform revalidation
    const results = []
    for (const path of pathsToRevalidate) {
      try {
        revalidatePath(path, 'page')
        results.push({ path, status: 'success' })
        console.log(`Revalidated path: ${path}`)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error)
        results.push({ path, status: 'error', error: errorMessage })
        console.error(`Failed to revalidate path ${path}:`, error)
      }
    }

    // Also revalidate by layout to ensure nested routes are updated
    try {
      revalidatePath('/', 'layout')
      results.push({ path: '/ (layout)', status: 'success' })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      results.push({ path: '/ (layout)', status: 'error', error: errorMessage })
    }

    return NextResponse.json({
      message: 'Revalidation completed',
      documentType: _type,
      documentId: _id,
      revalidated: results,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Revalidation error:', error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    return NextResponse.json(
      { 
        message: 'Revalidation failed',
        error: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

// Handle GET requests for testing
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')
  
  if (!REVALIDATE_TOKEN) {
    return NextResponse.json(
      { message: 'Revalidation token not configured' },
      { status: 500 }
    )
  }

  if (token !== REVALIDATE_TOKEN) {
    return NextResponse.json(
      { message: 'Invalid token' },
      { status: 401 }
    )
  }

  return NextResponse.json({
    message: 'Revalidation endpoint is working',
    timestamp: new Date().toISOString(),
    usage: 'POST to this endpoint with Sanity webhook payload and ?token=YOUR_TOKEN'
  })
}