"use client"

import { useSession } from '@supabase/auth-helpers-react'
import { redirect } from 'next/navigation';
import React from 'react'

export default function Session({ children }: { children: React.ReactNode}) {


    return (
        <div>
            {children}
        </div>
    )
}
