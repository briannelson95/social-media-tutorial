import React from 'react'
import Card from './Card'
import Avatar from './Avatar'
import Link from 'next/link'

export default function ProfiledFriends() {
    return (
        <Card noPadding={false}>
            <h2 className='text-3xl mb-2'>Friends</h2>
            <div>
                <ul>
                    <li className='w-full hover:bg-gray-100 hover:rounded-md p-2 border-b'>
                        <Link href={''} className='flex gap-2 '>
                            <Avatar />
                            <div>
                                <h3 className='text-xl font-semibold'>Jane Doe</h3>
                                <p className='text-gray-400'>5 mutual friends</p>
                            </div>
                        </Link>
                    </li>
                    <li className='w-full hover:bg-gray-100 hover:rounded-md p-2 border-b'>
                        <Link href={''} className='flex gap-2 '>
                            <Avatar />
                            <div>
                                <h3 className='text-xl font-semibold'>Adam Smith</h3>
                                <p className='text-gray-400'>1 mutual friends</p>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </Card>
    )
}
