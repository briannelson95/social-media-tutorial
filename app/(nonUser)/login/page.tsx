import Card from '@/components/Card'
import React from 'react'

export default function page() {
    return (
        <main className='h-screen flex items-center justify-center'>
            <section className='max-w-md w-full'>
                <Card>
                    <h1 className='text-3xl'>Login</h1>
                    <button>Login with Google</button>
                </Card>
            </section>
        </main>
    )
}
