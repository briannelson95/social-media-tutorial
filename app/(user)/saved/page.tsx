"use client"

import Post from '@/components/Post'
import { UserContextProvider } from '@/contexts/UserContext';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import React, { useEffect, useState } from 'react'

export default function SavedPage() {
    const [posts, setPosts]:any = useState([]);
    const session = useSession();
    const supabase = useSupabaseClient();

    useEffect(() => {
        if (!session?.user.id) {
            return;
        }
        supabase.from('saved_posts')
            .select('post_id')
            .eq('user_id', session?.user.id)
            .then(result => {
                if (!result.error) {
                    const postIds = result.data.map(item => item.post_id);
                    supabase.from('posts')
                        .select('*, profiles(*)')
                        .in('id', postIds)
                        .then(result => {
                            if (!result.error) {
                                setPosts(result.data)
                            }
                        })
                }
            })

    }, [session?.user.id])
    return (
        <main>
            <UserContextProvider>
                <h1 className='text-3xl mb-4 text-gray-400'>Saved Posts</h1>
                {posts.length > 0 && posts.map((post: any) => (
                    <Post key={post.id} {...post} />
                ))}
            </UserContextProvider>
        </main>
    )
}
