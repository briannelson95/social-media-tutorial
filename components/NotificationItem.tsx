"use client"
import React, { useState } from 'react'
import Avatar from './Avatar'
import Link from 'next/link'

export default function NotificationItem({wasRead}: {wasRead?: boolean}) {

    return (
        <Link href={''}>
            <article className='flex gap-3 items-center border-b border-gray-200 py-4 px-6 relative hover:bg-gray-100 transition-colors'>
                <div className={`${wasRead ? 'hidden' : 'h-2 w-2 bg-blue-500 absolute left-2 rounded-full'}`} />
                {/* <Avatar /> */}
                <div>
                    <p>Jane Doe liked your photo</p>
                </div>
            </article>
        </Link>
    )
}
