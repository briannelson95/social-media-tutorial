"use client"

import { supabase } from '@/lib/supabaseClient'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import React from 'react'

export default function AuthComponent({ children, }: { children: React.ReactNode }) {
    return (
        <>
            <SessionContextProvider
                supabaseClient={supabase}
                initialSession={null}
            >
                {children}
            </SessionContextProvider>
        </>
    )
}
