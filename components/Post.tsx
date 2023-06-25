"use client"

import React, { useContext, useEffect, useRef, useState } from 'react'
import Card from './Card'
import Avatar from './Avatar'
import Link from 'next/link'
import Image from 'next/image'
import ReactTimeAgo from 'react-time-ago'
import { UserContext } from '@/contexts/UserContext'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import toast from 'react-hot-toast'

type Props = {
    id: any;
    content: string;
    profiles: any;
    created_at: number;
    photos: string[];
}

export default function Post({id, content, profiles:authorProfile, created_at, photos}: Props) {
    const menu = useRef(null);
    const [dropDown, setDropDown] = useState(false);
    const [likes, setLikes]:any = useState([]);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments]:any = useState([]);
    const [saved, setSaved]:any = useState(false)
    const supabase = useSupabaseClient();

    useEffect(() => {
        fetchLikes()
        fetchComments()
        fetchSaved()
    }, [])

    function fetchLikes() {
        supabase.from('likes')
            .select()
            .eq('post_id', id)
            .then(result => {
                if(!result.error) {
                    setLikes(result.data)
                }
            })
    };

    function fetchComments() {
        supabase.from('posts')
            .select('*, profiles(*)')
            .eq('parent', id)
            .then(result => {
                if (!result.error){
                    setComments(result.data);
                }
            })
            
    };

    function fetchSaved() {
        supabase.from('saved_posts')
            .select()
            .eq('post_id', id)
            .eq('user_id', myProfile?.id)
            .then(result => {

            })
    }

    const {profile:myProfile}:any = useContext(UserContext);

    const handleClick = () => {
        setDropDown(!dropDown)
    }

    const closeOpenMenus = (e: any) => {
        //@ts-ignore
        if (menu.current && dropDown && !menu.current.contains(e.target)){
            setDropDown(false)
        }
    }

    const isLikedByMe = !!likes.find((like:any) => like.user_id === myProfile?.id);

    const handleLike = () => {
        if (isLikedByMe) {
            supabase.from('likes')
                .delete()
                .eq('post_id', id)
                .eq('user_id', myProfile.id)
                .then(() => {
                    fetchLikes();
                });
            return;
        }
        supabase.from('likes')
            .insert({
                post_id: id,
                user_id: myProfile.id,
            })
            .then(result => {
                fetchLikes()
            })
    };

    const postComment = (e: any) => {
        e.preventDefault();
        supabase.from('posts')
            .insert({
                content: commentText,
                author: myProfile.id,
                parent: id,
            })
            .then(result => {
                fetchComments();
                setCommentText('');
            })
    };

    const handleBookmark = () => {
        if (!saved) {
            supabase.from('saved_posts')
                .insert({
                    user_id: myProfile?.id,
                    post_id: id,
                })
                .then(result => {
                    setDropDown(false)
                    setSaved(true)
                    fetchSaved();
                })
        }
        if (saved) {
            supabase.from('saved_posts')
                .delete()
                .eq('post_id', id)
                .eq('user_id', myProfile?.id)
                .then((result) => {
                    setDropDown(false)
                    setSaved(false)
                    fetchSaved();
                });
            return;
        }
    }

    const handleDelete = () => {
        supabase.from('posts')
            .delete()
            .eq('id', id)
            .eq('author', myProfile.id)
            .then(result => {
                console.log(result)
                setDropDown(false)
                toast("Post deleted")
            })
    }

    document.addEventListener('mousedown', closeOpenMenus)

    return (
        <Card noPadding={false}>
            <div className='flex gap-3 w-full items-start relative'>
                <Link href={'/profile/'+authorProfile.id}>
                    <Avatar size={12} url={authorProfile.avatar} />
                </Link>
                <div>
                    <p><Link href={'/profile/'+authorProfile.id} className='font-semibold hover:underline'>{authorProfile.name}</Link> shared an <Link href={''} className='text-blue-500'>post</Link></p>
                    <p className='text-gray-500 text-sm'>
                        <ReactTimeAgo date={created_at} />
                    </p>
                </div>
                <button className='ml-auto text-gray-500' onClick={handleClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                </button>
                {dropDown && <div className='h-5 w-5 absolute z-50 top-1 right-1 cursor-pointer' /> }
                <div className={`absolute ${dropDown ? "z-40" : "-z-10"} bg-white top-6 -right-6 p-3 shadow-md shadow-gray-300 rounded-sm border border-gray-100 ${dropDown ? 'opacity-100': 'opacity-0'} transition-all duration-150`}>
                    <div ref={menu} className={`${dropDown ? 'opactity-100' : 'opacity-0'}`}>
                        <button onClick={handleBookmark} className='flex w-full items-center gap-2 py-2 px-2 hover:bg-blue-500/20 rounded-md hover:shadow shadow-grey-300'>
                            {saved && (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5" />
                                </svg>
                            )}
                            {!saved && (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={`w-6 h-6`}>
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                </svg>
                            )}
                            {saved ? "Remove from saved" : "Save post"}
                        </button>
                        <button className='flex w-full items-center gap-2 py-2 px-2 hover:bg-blue-500/20 rounded-md hover:shadow shadow-grey-300'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                            </svg>
                            Turn on notifications
                        </button>
                        <button className='flex w-full items-center gap-2 py-2 px-2 hover:bg-blue-500/20 rounded-md hover:shadow shadow-grey-300'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                            Hide post
                        </button>
                        <button 
                            onClick={handleDelete}
                            className='flex w-full items-center gap-2 py-2 px-2 text-red-500/40 hover:text-red-600 hover:bg-red-500/20 rounded-md hover:shadow shadow-grey-300 transition-all'
                            disabled={authorProfile.id !== myProfile.id}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                            Delete
                        </button>
                        <button className='flex w-full items-center gap-2 py-2 px-2 hover:bg-blue-500/20 rounded-md hover:shadow shadow-grey-300'>
                            <span className='text-yellow-500'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                </svg>
                            </span>
                            Report
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <p className='my-3 text-sm'>{content}</p>
                <div className='rounded-md w-full overflow-hidden space-y-2'>
                    {photos?.length > 0 && (
                        <div className='flex w-full gap-2'>
                            {photos.map((photo: any, index: number) => (
                                <Image
                                    key={index}
                                    src={photo}
                                    alt=''
                                    height={300}
                                    width={300}
                                    className='object-cover rounded-md'
                                />
                            ))}
                            
                        </div>
                    )}
                </div>     
            </div>
            <div className='mt-4 flex gap-8'>
                <button className='flex gap-2 items-center' onClick={handleLike}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${isLikedByMe && 'fill-pink-600 text-pink-600'}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                    {likes?.length}
                </button>
                <button className='flex gap-2 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                    {comments?.length}
                </button>
                <button className='flex gap-2 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                    </svg>
                    Share
                </button>
            </div>
            <div className='flex gap-3 mt-4'>
                <Avatar url={myProfile?.avatar} />
                <div className='border rounded w-full relative h-12 z-0'>
                    <form onSubmit={postComment}>
                        <input 
                            className='p-3 w-full' 
                            placeholder='Leave a comment' 
                            value={commentText}
                            onChange={ev => setCommentText(ev.target.value)}
                        />
                    </form>
                    <button className='absolute top-3 right-3 text-gray-400'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                        </svg>
                    </button>
                </div>
            </div>
            {comments?.length > 0 && (
                <div className='mt-2'>
                    {comments.map((comment:any) => (
                        <div key={comment.id} className='flex mt-2 gap-2 items-center'>
                            <Avatar url={comment.profiles.avatar} />
                            <div className='bg-gray-200 py-2 px-4 rounded-3xl'>
                                <div className='flex gap-1'>
                                    <Link href={`/profile/${comment.profiles.id}`} className='font-semibold block -mb-1 hover:underline'>
                                        {comment.profiles.name}
                                    </Link>
                                    <span className='text-sm text-gray-400'>
                                        <ReactTimeAgo timeStyle={'twitter'} date={comment.created_at} />
                                    </span>
                                </div>
                                <p className='text-sm'>{comment.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    )
}
