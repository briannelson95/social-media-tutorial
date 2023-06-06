import React from 'react'
import Form from './Form'
import Post from './Post'

export default function Feed() {
    return (
        <div className='col-span-2'>
            <Form />
            <Post />
        </div>
    )
}
