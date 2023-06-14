import Card from '@/components/Card'
import NotificationItem from '@/components/NotificationItem'
import React from 'react'

export default function NotificationPage() {
    return (
        <main>
            <h1 className='text-3xl mb-4 text-gray-400'>Notifications</h1>
            <Card noPadding>
                <NotificationItem wasRead={false} />
                <NotificationItem wasRead={false}/>
                <NotificationItem wasRead={true} />
                <NotificationItem wasRead={true} />
            </Card>
        </main>
    )
}
