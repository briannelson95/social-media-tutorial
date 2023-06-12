"use client"

import React from 'react'
import Card from './Card'
import { Auth } from '@supabase/auth-ui-react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

const customTheme = {
    default: {
        colors: {
            brand: 'rgb(59, 130, 246)',
            brandAccent: 'rgb(147, 197, 253)',
            brandButtonText: 'white',
        }
    }
}

export default function LoginCard() {
    const supabase = useSupabaseClient();
    return (
        <Card noPadding>
            <Auth
                supabaseClient={supabase}
                theme='default'
                providers={['google', 'github']}
                onlyThirdPartyProviders={true}
                appearance={{ 
                    theme: customTheme,
                    style: {
                        input: {
                            borderRadius: '0.375rem',
                            padding: '0.5rem'
                        },
                        button: {
                            padding: '0.5rem',
                            margin: '0.25rem',
                            border: 'none',
                            borderBottom: '1px solid rgb(243, 244, 246)',
                            
                        }
                    }
                }}
            />
        </Card>
    )
}
