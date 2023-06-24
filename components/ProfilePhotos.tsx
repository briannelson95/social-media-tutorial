import React from 'react'
import Card from './Card'
import Image from 'next/image'

export default function ProfilePhotos() {
    return (
        <Card noPadding={false}>
            <div className='grid grid-cols-2 gap-4'>
                <div className='w-full h-auto max-h-64 overflow-hidden rounded-md'>
                    <Image
                        src={'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'}
                        alt={''}
                        height={500}
                        width={500}
                        className='object-cover w-full h-full object-center'
                    />
                </div>
                <div className='w-full h-auto max-h-64 overflow-hidden rounded-md'>
                    <Image
                        src={'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'}
                        alt={''}
                        height={500}
                        width={500}
                        className='object-cover w-full h-full object-center'
                    />
                </div>
                <div className='w-full h-auto max-h-64 overflow-hidden rounded-md'>
                    <Image
                        src={'https://images.unsplash.com/photo-1434394354979-a235cd36269d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1451&q=80'}
                        alt={''}
                        height={500}
                        width={500}
                        className='object-cover w-full h-full object-center'
                    />
                </div>
                <div className='w-full h-auto max-h-64 overflow-hidden rounded-md'>
                    <Image
                        src={'https://images.unsplash.com/photo-1456428199391-a3b1cb5e93ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80'}
                        alt={''}
                        height={500}
                        width={500}
                        className='object-cover w-full h-full object-center'
                    />
                </div>
            </div>
        </Card>
    )
}
