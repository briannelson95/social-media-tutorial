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

    const [bio, setBio]:any = useState('');
    const [editProfile, setEditProfile] = useState(false);

    useEffect(() => {
        fetchBio()
    }, []);

    function fetchBio() {
        supabase.from('profiles')
            .select('bio')
            .eq('id', profile)
            .then(result => {
                if(result.data) {
                    setBio(result.data[0].bio)
                } return;
            })
    }

    const saveEdits = (e: any) => {
        e.preventDefault()
        supabase.from('profiles')
            .update({
                bio
            })
            .eq('id', session?.user.id)
            .then((result:any) => {
                if (!result.error) {
                    setBio(result.data[0].bio)
                }
                setEditProfile(false)
            })
    }

    const isMyUser = profile === session?.user.id;

    return (
        <Card noPadding={false}>
            <div className='flex justify-between'>
                <h2 className='text-3xl mb-2'>About Me</h2>
                {isMyUser && !editProfile && (
                    <button 
                        onClick={() => {
                            setEditProfile(true);
                        }} 
                        className='bg-white shadow-md shadow-gray-300 px-2 py-1 flex'>
                        Edit Bio
                    </button>
                )}
                
            </div>
            {editProfile && (
                <form onSubmit={saveEdits}>
                    <textarea 
                        rows={5}
                        placeholder={"A little about yourself"}
                        value={bio}
                        onChange={e => setBio(e.target.value)}
                        className='border py-2 px-3 rounded-md'
                    />
                    <input type="submit" value="Submit"/>
                </form>
            )}
            {!editProfile && bio !== null && (
                <p className='mb-2 text-sm'>{bio}</p>
            )}
            
        </Card>
    )
}
