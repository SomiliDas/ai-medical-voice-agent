import { UserButton } from '@clerk/nextjs';
import React from 'react'




const menuOptions = [
    {
        id : 1,
        name : 'Home',
        path :'/home'
    },
    {
        id : 2,
        name : 'History',
        path :'/history'
    },

    {
        id : 3,
        name : 'Pricing',
        path :'/pricing'
    },
    {
        id : 4,
        name : 'Profile',
        path :'/profile'
    }
];



function AppHeader() {
  return (
    <div className='flex items-center justify-between w-full border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800 shadow '>
        <div className="flex items-center gap-2">
            <div className="size-12 rounded-full bg-white border border-2 border-gray-400 flex items-center justify-center text-2xl text-center "> ➕ </div>
            <h1 className="text-base font-bold md:text-2xl">MediVoice AI</h1>
        </div>
        <div className='hidden md:flex gap-12 items-centre'>

            {
                    menuOptions.map((option, index)=>(
                        <div key={index}>
                            <h2 className='hover:font-bold cursor-pointer transition-all'>{option.name}</h2>
                        </div>
                    ))
            }

        </div>
        <UserButton/>
        
    </div>
  )
}

export default AppHeader;
