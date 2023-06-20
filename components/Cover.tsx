"use client"

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image'
import React, { useState } from 'react'
import { BounceLoader } from 'react-spinners';

type Props = {
    url: string;
    editable: boolean;
    onChange: any;
}

export default function Cover({url, editable, onChange}: Props) {
    const supabase = useSupabaseClient();
    const session = useSession();

    const [isUploading, setIsUploading]:any = useState(false)

    const updateCover = async (ev: any) => {
        const file = ev.target.files?.[0];

        if (file) {
            setIsUploading(true);
            const newName = Date.now() + file.name;
            const {data, error} = await supabase.storage
                .from('covers')
                .upload(newName, file);

            setIsUploading(false);

            if (error) throw error;
            if (data) {
                const url = process.env.NEXT_PUBLIC_SUPABASE_URL + '/storage/v1/object/public/covers/' + data?.path;
                supabase.from('profiles')
                    .update({
                        cover: url,
                    })
                    .eq('id', session?.user.id)
                    .then(result => {
                        if (!result.error && onChange) {
                            onChange();
                        }
                    })
            }
        }
    }

    return (
        <div className='h-56 overflow-hidden flex justify-center'>
            <div className='relative'>
                <Image
                    src={url}
                    alt=''
                    height={1000}
                    width={1000}
                    priority
                    className='h-56 object-cover rounded-t-md'
                />
            </div>
            {isUploading && (
                <div className='absolute w-full h-full flex items-center rounded-t-md inset-0 bg-white bg-opacity-80 z-10'>
                    <div className='inline-block mx-auto'>
                        <BounceLoader color='#3B82F6' />
                    </div>
                </div>
            )}
            {editable && (
                <div className='absolute bottom-2 right-2'>
                    <label className='bg-white rounded px-2 py-1 text-black flex gap-2 items-center'>
                        <input type='file' onChange={updateCover} className='hidden' />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                        </svg>
                        Change cover image
                    </label>
                </div>
            )}
        </div>
    )
}
