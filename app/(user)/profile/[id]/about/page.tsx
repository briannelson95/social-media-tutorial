"use client"
import React from 'react'
import { useParams, usePathname } from 'next/navigation'
import ProfileInfo from '@/components/ProfileInfo'

export default function ProfileAboutPage() {
    return (
        <div>
            <ProfileInfo />
        </div>
    )
}
