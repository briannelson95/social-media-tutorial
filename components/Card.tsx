import React from 'react'

export default function Card({children, noPadding}: {children: React.ReactNode, noPadding?: boolean}) {
    return (
        <div className={`bg-white shadow-md shadow-gray-300 rounded-md ${noPadding ? 'p-0' : 'p-4'} mb-4 h-fit`}>
            {children}
        </div>
    )
}
