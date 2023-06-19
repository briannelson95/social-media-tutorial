import React from 'react'
import Form from './Form'
import Post from './Post'

type Props = {
    posts: any;
    // onPost: any;
}

export default function Feed({posts}: Props) {
    return (
        <div className='col-span-2'>
            <Form />
            {posts ? 
                posts.map((post: any) => (
                    <Post key={post.create_at} {...post} />
                ))
                : 'Loading posts'
            }
        </div>
    )
}
