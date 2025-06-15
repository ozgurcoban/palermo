import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../../../../sanity/env'

const token = process.env.SANITY_API_READ_TOKEN
if (!token) {
  throw new Error(
    'A secret is provided but there is no `SANITY_API_READ_TOKEN` environment variable setup.',
  )
}
const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
})

export const dynamic = 'force-dynamic'
export const revalidate = 3600

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl.clone()
    
    // const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    //   client,
    //   url.toString(),
    // )
    // if (!isValid) {
    //   return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    // }
    
    // Enable Draft Mode using Next.js API
    draftMode().enable()
    
    return NextResponse.json({
      message: 'Draft mode enabled successfully',
      draftMode: true,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Draft mode error:', error)
    return NextResponse.json(
      { error: 'Failed to enable draft mode' },
      { status: 500 }
    )
  }
}