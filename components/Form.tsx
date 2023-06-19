"use client"
import React, { useContext, useEffect, useState } from 'react';
import Card from './Card';
import Avatar from './Avatar';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { UserContext } from '@/contexts/UserContext';
import Image from 'next/image';
import BounceLoader from 'react-spinners/BounceLoader'

type Props = {
    onPost: any;
}

export default function Form({onPost}: Props) {
    const [content, setContent]:any = useState('');
    const [uploads, setUploads]:any = useState([]);
    const [isUploading, setIsUploading]: any = useState(false);

    const supabase = useSupabaseClient();
    const session = useSession();

    const {profile}:any = useContext(UserContext);

    function createPost(event: any) {
        event?.preventDefault()
        supabase.from('posts').insert({
            author: session?.user.id,
            content
        }).then(response => {
            if (!response.error){
                setContent('')
                if(onPost){
                    onPost()
                }
            }
        })
    }
    
    const handleAddPhotos = async (event: any) => {
        const files = event.target.files;
        if (files.length > 0) {
            setIsUploading(true);
            for (const file of files) {
                const newName = Date.now() + file.name;
                const result = await supabase
                    .storage
                    .from('photos')
                    .upload(newName, file)
                if (result.data){
                    const url = process.env.NEXT_PUBLIC_SUPABASE_URL + '/storage/v1/object/public/photos/' + result.data?.path
                    setUploads((prevUploads: any) => [...prevUploads, url])
                }
            }
            setIsUploading(false);
        }
    }

    // console.log(profile.avatar)
    return (
        <Card noPadding={false}>
            <form>
                <div className='flex gap-3'>
                    <Avatar size={12} url={profile?.avatar} />
                    {profile && 
                        <textarea 
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            rows={1} 
                            className='grow p-3' 
                            placeholder={`What's on your mind, ${profile?.name}?`} 
                        />
                    }
                </div>
                {isUploading && (
                    <>
                        <BounceLoader />
                    </>
                )}
                {uploads.length > 0 && (
                    <div className='w-full grid grid-cols-3 gap-3 my-2'>
                        {uploads.map((upload: any, index: number) => (
                            <div key={index} className='h-32 overflow-hidden rounded-md'>
                                <Image 
                                    key={index}
                                    src={upload}
                                    alt=""
                                    height={300}
                                    width={300}
                                    className='object-cover'
                                />
                            </div>
                        ))}
                    </div>
                )}
                <div className='flex gap-5 w-full items-center mt-2'>
                    <label className='flex gap-1 hover:cursor-pointer'>
                        <input type="file" className='hidden' multiple onChange={handleAddPhotos} />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        <p className='hidden md:visible'>Photos</p>
                    </label>
                    <button className='flex gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        <p className='hidden md:visible'>People</p>
                    </button>
                    <button className='flex gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <p className='hidden md:visible'>Check In</p>
                    </button>
                    <button className='flex gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                        </svg>
                        <p className='hidden md:visible'>Mood</p>
                    </button>
                    <button onClick={createPost} className='bg-blue-500 text-white px-6 py-2 rounded-md ml-auto'>
                        Share
                    </button>
                </div>
            </form>
        </Card>
    )
}
