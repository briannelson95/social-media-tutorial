import React from 'react'

export default function Card({children}: any) {
    return (
        <div className='bg-white shadow-md shadow-gray-300 rounded-md p-4 mb-4'>
            {children}
        </div>
    )
}
