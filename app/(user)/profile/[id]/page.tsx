"use client"

import Card from '@/components/Card';
import Post from '@/components/Post';
import { ProfileContext } from '@/contexts/UserContext';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import React, { useContext, useEffect, useState } from 'react'

export default function ProfilePosts() {
    const profile: any = useContext(ProfileContext);
    const userId = profile?.id;
    const supabase = useSupabaseClient();

    const [posts, setPosts]:any = useState([]);

    useEffect(() => {
        if(!userId) {
            return;
        }
        supabase.from('posts')
            .select('id, content, created_at, photos, profiles(id, name, avatar)')
            .eq('author', userId)
            .then(result => {
                if (!result.error) {
                    setPosts(result.data)
                }
            })

    }, [userId])

    return (
        <>
            {posts.length > 0 && posts.map((post: any) => (
                <Post key={post.id} {...post} />
            ))}
        </>
    )
}
