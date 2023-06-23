"use client"

import ProfilePhotos from '@/components/ProfilePhotos'
import { ProfileContext } from '@/contexts/UserContext';
import React, { useContext, useEffect } from 'react'

export default function ProfilePhotosPage() {
    return (
        <div>
            <ProfilePhotos />
        </div>
    )
}
