"use client"
import React, { useEffect, useState } from 'react'
import Card from './Card';
import Avatar from './Avatar';
import Cover from './Cover';
import ProfileTabs from './ProfileTabs';
import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react';
import { useParams } from 'next/navigation';
import { ProfileContext, UserContextProvider } from '@/contexts/UserContext';

export default function UserProfileHeader({children}: {children: React.ReactNode}) {
    const [profile, setProfile]:any = useState(null);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const params = useParams();
    const userId = params.id;
    const supabase = useSupabaseClient();
    const session = useSession();

    function fetchUser() {
        supabase.from('profiles')
            .select()
            .eq('id', userId)
            .then(result => {
                if (result.error) {
                    throw result.error;
                }
                if (result.data) {
                    setProfile(result?.data[0]);
                }
            })
    }

    useEffect(() => {
        if (!userId) {
            return;
        }
        fetchUser();

    }, [userId, fetchUser]);

    function saveProfile() {
        supabase.from('profiles')
            .update({
                name,
                location
            })
            .eq('id', session?.user.id)
            .then((result:any) => {
                if (!result.error) {
                    setProfile((prev:any) => ({...prev, name, location}))
                }
                setEditProfile(false)
            })

        
    }

    const [editProfile, setEditProfile] = useState(false);


    const isMyUser = userId === session?.user.id;
    return (
        <UserContextProvider>
            <ProfileContext.Provider value={profile}>
                <Card noPadding>
                    <section className='relative'>
                        <div className='h-56 bg-gray-400 rounded-t-md'>
                            {profile?.cover && (
                                <Cover url={profile?.cover} editable={isMyUser} onChange={fetchUser} />
                            )}
                        </div>
                        <div className='absolute -bottom-20 left-4 z-30'>
                            <Avatar url={profile?.avatar} size={'big'} editable={isMyUser} onChange={fetchUser} />
                        </div>
                    </section>
                    <section className='p-2 md:p-4 pb-0 md:pb-0'>
                        <div className='ml-36 flex justify-between'>
                            <div>
                                {editProfile && (
                                    <div className='space-y-2'>
                                        <input 
                                            type='text' 
                                            placeholder={'Your name'} 
                                            value={name}
                                            onChange={ev => setName(ev.target.value)}
                                            className='border py-2 px-3 rounded-md w-11/12'
                                        />
                                        <input
                                            type='text'
                                            placeholder={'Your location'}
                                            value={location}
                                            onChange={ev => setLocation(ev.target.value)}
                                            className='border py-2 px-3 rounded-md text-sm w-11/12'
                                        />
                                    </div>
                                )}
                                {!editProfile && (
                                    <>
                                        <h1 className='text-3xl font-bold'>
                                            {profile?.name}
                                        </h1>
                                        <div>
                                            <p className='text-gray-400 leading-4'>
                                                {profile?.location || !editProfile && isMyUser && "Add your location"}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div>
                                {isMyUser && !editProfile && (
                                    <button 
                                        className='bg-blue-500 text-white rounded px-2 py-1 flex gap-2 shadow-sm shadow-gray-400 hover:bg-blue-800 transition-colors duration-200 items-center'
                                        onClick={() => {
                                            setEditProfile(true);
                                            setName(profile.name);
                                            setLocation(profile.location)
                                        }} 
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                        Edit profile
                                    </button>
                                )}
                                {isMyUser && editProfile && (
                                    <div className='space-y-2'>
                                        <button 
                                            className='bg-white w-36 rounded px-2 py-1 flex gap-1 shadow-sm shadow-gray-400 hover:bg-gray-300 transition-colors duration-200 items-center'
                                            onClick={saveProfile}    
                                        >
                                            <div className='text-green-600'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            Save profile
                                        </button>
                                        <button 
                                            className='bg-white text-red-600 w-36 rounded px-2 py-1 flex gap-1 shadow-sm shadow-gray-400 hover:bg-gray-300 transition-colors duration-200 items-center'
                                            onClick={() => setEditProfile(false)}    
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <ProfileTabs userId={profile?.id} />
                    </section>
                </Card>
                {children}
            </ProfileContext.Provider>
        </UserContextProvider>
    )
}
