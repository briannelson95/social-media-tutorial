"use client"

import { supabase } from '@/lib/supabaseClient';
import { SessionContextProvider, useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { redirect } from 'next/navigation';
import React from 'react'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)

export default function Session({ children }: { children: React.ReactNode}) {

    return (
        <SessionContextProvider
            supabaseClient={supabase}
            initialSession={null}
        >
            {children}
        </SessionContextProvider>
    )
}
