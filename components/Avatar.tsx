import { uploadUserImage } from '@/helpers/user'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { BounceLoader } from 'react-spinners'

type Props = {
    size?: any
    url: string
    editable?: boolean;
    onChange?: any;
}

export default function Avatar({size, url, editable, onChange}: Props) {
    const [isUploading, setIsUploading]:any = useState(false);
    const supabase = useSupabaseClient();
    const session = useSession();
    const userId = session?.user.id;
    const bucket = 'avatars';
    const profileCol = 'avatar';

    const handleAvatar = async (ev: any) => {
        const file = ev.target.files?.[0];

        if (file) {
            setIsUploading(true);
            await uploadUserImage({supabase, userId, file, bucket, profileCol});
            setIsUploading(false);
            if (onChange) onChange()
        }
    }

    return (
        <div className={` relative flex`}>
            <div className={`${size == "big" ? 'w-32 h-32' : 'w-12 h-12'} overflow-hidden rounded-full`}>
                {url ? (
                    <Image 
                        src={url} 
                        height={200} 
                        width={200} 
                        alt={''}
                        className='object-cover object-bottom'
                    />
                ) : (
                    <div className='bg-gray-300' />
                )} 
            </div>
            {isUploading && (
                <div className='absolute bg-white bg-opacity-80 w-full h-full overflow-hidden rounded-full flex justify-center items-center'>
                    <BounceLoader color='#3B82F6' />
                </div>
            )}
            {editable && (
                <label className='absolute bottom-1 right-1 bg-white text-black rounded-md shadow-gray-400 shadow-md p-1'>
                    <input type='file' className='hidden' onChange={handleAvatar} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </label>
            )}
            
        </div>
    )
}
