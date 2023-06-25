"use client"
import React, { useContext, useEffect, useState } from 'react'
import Card from './Card'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { ProfileContext } from '@/contexts/UserContext';
import { useParams } from 'next/navigation';

export default function ProfileInfo() {
    const session = useSession();
    const supabase = useSupabaseClient();

    const params = useParams()
    const profile: any = params.id;
    console.log(profile)

    const [bio, setBio]:any = useState('');

    useEffect(() => {
        supabase.from('profiles')
            .select('bio')
            .eq('id', profile)
            .then(result => {
                console.log(result)
                if(result.data) {
                    // setBio(result.data[0])
                    console.log(result.data[0].bio)
                } return;
            })
    }, [])

    return (
        <Card noPadding={false}>
            <h2 className='text-3xl mb-2'>About Me</h2>
            {/* {bio && (
                <p className='mb-2 text-sm'>{bio}</p>
            )} */}
            
        </Card>
    )
}
