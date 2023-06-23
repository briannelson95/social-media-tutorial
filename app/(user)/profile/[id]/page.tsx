"use client"
import Avatar from '@/components/Avatar'
import Card from '@/components/Card'
import Post from '@/components/Post'
import ProfileInfo from '@/components/ProfileInfo'
import ProfileFriends from '@/components/ProfileFriends'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ProfilePhotos from '@/components/ProfilePhotos'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Cover from '@/components/Cover'
import EditProfile from '@/components/EditProfile'

export default function ProfilePage() {
    const activeClasses = 'border-blue-500 text-blue-800 bg-blue-500/20  font-semibold';
    const hoverClasses = 'hover:border-gray-300 hover:bg-gray-300/50 transition-all';

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

    }, [userId,]);

    function saveProfile() {
        supabase.from('profiles')
            .update({
                name,
                location
            })
            .eq('id', session?.user.id)
            .then(result => {
                if (!result.error) {
                    setProfile((prev:any) => ({...prev, name, location}))
                }
                setEditProfile(false)
            })

        
    }

    const [showPosts, setShowPosts] = useState(true);
    const [showInfo, setShowInfo] = useState(false);
    const [showFriends, setShowFriends] = useState(false);
    const [showPhotos, setShowPhotos] = useState(false);
    const [editProfile, setEditProfile] = useState(false);

    const handleEdit = (setName?:any, setLocation?:any) => {
        setEditProfile(!editProfile);
        setName && setName()
        setLocation && setLocation()
    }

    const handleShowPosts = () => {
        setShowPosts(true);
        setShowInfo(false);
        setShowFriends(false);
        setShowPhotos(false)
    };

    const handleShowInfo = () => {
        setShowPosts(false);
        setShowInfo(true);
        setShowFriends(false);
        setShowPhotos(false)
    };

    const handleShowFriends = () => {
        setShowPosts(false);
        setShowInfo(false);
        setShowFriends(true);
        setShowPhotos(false)
    };

    const handleShowPhotos = () => {
        setShowPosts(false);
        setShowInfo(false);
        setShowFriends(false);
        setShowPhotos(true)
    }

    const isMyUser = userId === session?.user.id;

    return (
        <main className='relative'>
            {/* {editProfile && (
                <>
                    <EditProfile />
                </>
            )} */}
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
                <section className='p-2 md:p-4 pb-0'>
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
                    <div className='mt-10 flex text-xs md:text-base'>
                        <button 
                            className={`flex items-center gap-1 px-3 py-1 rounded-t-md border-b-4 ${showPosts ? activeClasses : hoverClasses}`}
                            onClick={handleShowPosts}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>  
                            <p className=''>Posts</p>
                        </button>
                        <button 
                            className={`flex items-center gap-1 px-3 py-1 rounded-t-md border-b-4 ${showInfo ? activeClasses : hoverClasses}`}
                            onClick={handleShowInfo}    
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg>
                            About
                        </button>
                        <button 
                            className={`flex items-center gap-1 px-3 py-1 rounded-t-md border-b-4 ${showFriends ? activeClasses : hoverClasses}`}
                            onClick={handleShowFriends}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                            </svg>
                            Friends
                        </button>
                        <button 
                            className={`flex items-center gap-1 px-3 py-1 rounded-t-md border-b-4 ${showPhotos ? activeClasses : hoverClasses}`}
                            onClick={handleShowPhotos}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            Photos
                        </button>

                    </div>
                </section>
            </Card>
            {/* {showPosts && (<Post />)}
            {showInfo && <ProfileInfo />}
            {showFriends && <ProfileFriends />}
            {showPhotos && <ProfilePhotos />} */}
        </main>
    )
}
