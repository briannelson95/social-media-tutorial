import React from 'react'
import Card from './Card'

export default function ProfileInfo() {
    return (
        <Card noPadding={false}>
            <h2 className='text-3xl mb-2'>About Me</h2>
            <p className='mb-2 text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque voluptatibus voluptates reprehenderit exercitationem sequi aperiam, labore commodi sit sint mollitia quisquam sapiente beatae odit magni vitae possimus perferendis. Exercitationem, optio!</p>
            <p className='mb-2 text-sm'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit facere repellendus eos officiis, ea iure earum quos fugiat, veritatis suscipit a obcaecati impedit esse distinctio accusantium? Nemo, doloribus. Pariatur, delectus.</p>
        </Card>
    )
}
