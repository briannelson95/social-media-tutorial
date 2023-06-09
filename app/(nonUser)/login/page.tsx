"use client"
import LoginCard from '@/components/LoginCard'
import { supabase } from '@/lib/supabaseClient';
import { useSession } from '@supabase/auth-helpers-react'
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function LoginPage() {
    const session = useSession();
    const supabaseClient = supabase;
    const router = useRouter();

    useEffect(() => {
        if (session) redirect('/')
    }, [session, router]);

    return (
        <main className='h-screen flex items-center justify-center'>
            <section className='max-w-sm w-full'>
                <h1 className='text-4xl text-gray-400 text-center mb-4'>Login</h1>
                <LoginCard />
            </section>
        </main>
    )
}
