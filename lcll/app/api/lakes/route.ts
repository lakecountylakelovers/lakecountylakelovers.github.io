// app/api/lakes/route.ts
import { NextResponse } from 'next/server'

export interface LakeDetails {
  surfaceArea: number
  meanDepth: number
  lakePhosphorus: number
}

export async function GET() {
  // Replace this URL with your "Publish to web" CSV link
  const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRqBZIrngaJfekU4OcK0DMLCmQfpHvWDKluV1YhMa7KdkpokVX2LeujfUcqgf95k5uQ20Vfj5PLjTdj/pub?gid=0&single=true&output=csv'

  try {
    const response = await fetch(GOOGLE_SHEET_CSV_URL, {
      next: { revalidate: 0 }, // Set to 0 to bypass caching during testing
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch sheet. Status: ${response.status}`)
    }

    const csvText = await response.text()
    const lines = csvText.split(/\r?\n/).filter(line => line.trim() !== '')
    
    if (lines.length < 2) {
      return NextResponse.json({ error: 'Spreadsheet contains no data rows' }, { status: 400 })
    }

    // Clean headers: strips optional enclosing quotes, whitespace
    const headers = lines[0]
      .split(',')
      .map(h => h.replace(/^["']|["']$/g, '').trim())

    const lakeRegistry: Record<string, LakeDetails> = {}

    // Find the exact column indexes based on your sheet's headers
    const nameIndex = headers.indexOf('lake')
    const areaIndex = headers.indexOf('surfaceArea')
    const depthIndex = headers.indexOf('meanDepth')
    const tpIndex = headers.indexOf('lakePhosphorus')

    // If any column mapping is missing, fallback to standard column index array positions [0, 1, 2, 3]
    const finalNameIdx = nameIndex !== -1 ? nameIndex : 0
    const finalAreaIdx = areaIndex !== -1 ? areaIndex : 1
    const finalDepthIdx = depthIndex !== -1 ? depthIndex : 2
    const finalTpIdx = tpIndex !== -1 ? tpIndex : 3

    for (let i = 1; i < lines.length; i++) {
      // Splits commas but ignores commas inside quotation marks (in case names contain commas)
      const row = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
      
      const rawName = row[finalNameIdx]
      if (!rawName) continue

      const name = rawName.replace(/^["']|["']$/g, '').trim()

      if (name) {
        lakeRegistry[name] = {
          surfaceArea: parseFloat(row[finalAreaIdx]?.trim()) || 0,
          meanDepth: parseFloat(row[finalDepthIdx]?.trim()) || 0,
          lakePhosphorus: parseFloat(row[finalTpIdx]?.trim()) || 0,
        }
      }
    }

    return NextResponse.json(lakeRegistry)
  } catch (error: any) {
    console.error('CSV Parsing Error:', error)
    return NextResponse.json({ error: error.message || 'Failed to parse lake data' }, { status: 500 })
  }
}