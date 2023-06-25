"use client"
import React, { useContext, useEffect, useState } from 'react'
import Card from './Card'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { ProfileContext } from '@/contexts/UserContext';

export default function ProfileInfo() {
    const session = useSession();
    const supabase = useSupabaseClient();

    const profile: any = useContext(ProfileContext);
    console.log(profile)

    const [bio, setBio]:any = useState('');

    useEffect(() => {
        supabase.from('profiles')
            .select('bio')
            .eq('id', profile?.id)
            .then(result => {
                console.log(result)
                if(!result.error) {
                    setBio(result.data?.[0])
                }
            })
    }, [])

    return (
        <Card noPadding={false}>
            <h2 className='text-3xl mb-2'>About Me</h2>
            {bio === null ? (
                <>Nothing to show yet...</>
            ) : (
                <p className='mb-2 text-sm'>{bio}</p>
            )}
            
        </Card>
    )
}
