import UserProfileHeader from '@/components/UserProfileHeader';

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <main className='relative'>
            <UserProfileHeader>
                {children}
            </UserProfileHeader>
        </main>
    )
}
