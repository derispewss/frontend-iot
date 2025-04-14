import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    const slug = params.slug
    try {
        const response = await fetch(`https://kln00qfp-3000.asse.devtunnels.ms/users?hari=${slug}`)
        const result = await response.json()
        return NextResponse.json(result, { status: 200 })
    } catch (error) {
        return NextResponse.json((error as Error).message, { status: 500 })
    }
}
