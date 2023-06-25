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
                if (result.data) {
                    setBio(result.data[0].bio)
                    fetchBio()
                }
            })
        setEditProfile(false)
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
                        className='bg-white shadow-md shadow-gray-300 rounded-md px-2 py-1 flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
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
                        className='border py-2 px-3 rounded-md w-full'
                    />
                    <input type="submit" value="Submit" className='px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors duration-200'/>
                </form>
            )}
            {!editProfile && bio !== null && (
                <p className='mb-2 text-sm'>{bio}</p>
            )}
            
        </Card>
    )
}
