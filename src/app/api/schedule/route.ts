import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const response = await fetch('https://kln00qfp-3000.asse.devtunnels.ms/users')
        const result = await response.json()
        return NextResponse.json(result, { status: 200 })
    } catch (error) {
        return NextResponse.json((error as Error).message, { status: 500 })
    }
}
