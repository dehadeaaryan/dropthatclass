import { headers } from 'next/headers'
import { auth } from '@/lib/auth'

export async function GET(request: Request) {
    const session = await auth()
    const headersList = headers()
    const referer = headersList.get('referer')

    return new Response('Hello, DropThatClass', {
        status: 200,
        headers: { referer: referer as string },
    })
}