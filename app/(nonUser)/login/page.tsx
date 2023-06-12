import LoginCard from '@/components/LoginCard'
import React from 'react'

export default function page() {
    return (
        <main className='h-screen flex items-center justify-center'>
            <section className='max-w-md w-full'>
                <h1 className='text-4xl text-gray-400 text-center mb-4'>Login</h1>
                <LoginCard />
            </section>
        </main>
    )
}
