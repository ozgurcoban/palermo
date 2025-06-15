import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl.clone()
    
    // Exit the current user from "Draft Mode" using Next.js API
    draftMode().disable()
    
    return NextResponse.json({
      message: 'Draft mode disabled successfully',
      draftMode: false,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Disable draft mode error:', error)
    return NextResponse.json(
      { error: 'Failed to disable draft mode' },
      { status: 500 }
    )
  }
}