"use client"

import React from 'react'
import Card from './Card'
import Link from 'next/link'
import { redirect, usePathname, useRouter } from 'next/navigation'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Navigation() {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = useSupabaseClient();
    const session = useSession();

    const activeElemnet = 'text-sm md:text-base bg-blue-500 text-white md:-mx-10 px-2 md:px-10 rounded-md shadow-md shadow-gray-300';
    const nonActiveElement = 'text-sm md:text-base md:-mx-4 px-2 md:px-4 rounded-md hover:bg-blue-500/20 hover:shadow-md hover:shadow-gray-300 transition-all hover:scale-110';
    
    return (
        <div className='fixed -bottom-5 md:sticky md:top-4 w-full'>
            <Card noPadding={false}>
                <div className='p-0 md:px-4 md:py-2'>
                    <h2 className='text-gray-400 mb-3 hidden md:visible'>Navigation</h2>
                    <ul className='flex justify-between md:block'>
                        <li className={`${pathname === '/' ? activeElemnet : nonActiveElement} my-1`}>
                            <Link href={'/'} className='flex gap-2 py-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                                <p className="hidden md:block">Home</p>
                            </Link>
                        </li>
                        <li className={`${pathname.includes('profile') ? activeElemnet : nonActiveElement} my-1`}>
                            <Link href={`/profile/${session?.user.id}`} className='flex gap-2 py-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <p className="hidden md:block">Profile</p>
                            </Link>
                        </li>
                        <li className={`${pathname === '/saved' ? activeElemnet : nonActiveElement} my-1`}>
                            <Link href={'/saved'} className='flex gap-2 py-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                </svg>
                                <p className="hidden md:block">Saved Posts</p>
                            </Link>
                        </li>
                        <li className={`${pathname === '/notifications' ? activeElemnet : nonActiveElement} my-1`}>
                            <Link href={'notifications'} className='flex gap-2 py-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                </svg>
                                <p className="hidden md:block">Notifications</p>
                            </Link>
                        </li>
                        <li className={`${pathname === '/logout' ? activeElemnet : nonActiveElement} my-1`}>
                            <button 
                                className='flex gap-2 py-3'
                                onClick={async () => {
                                    await supabase.auth.signOut()
                                    redirect('/login')
                                  }
                                }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                </svg>
                                <p className="hidden md:block">Logout</p>
                            </button>
                        </li>
                    </ul>
                </div>
            </Card>
        </div>
    )
}
