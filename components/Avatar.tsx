import Image from 'next/image'
import React from 'react'

export default function Avatar() {
    return (
        <div className='w-12 h-12 rounded-full overflow-hidden'>
            <Image 
                src={'https://images.unsplash.com/photo-1567784177951-6fa58317e16b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'} 
                height={200} 
                width={200} 
                alt={''}
                className='object-cover'
            />
        </div>
    )
}