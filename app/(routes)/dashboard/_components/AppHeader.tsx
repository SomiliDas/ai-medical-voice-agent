'use client'
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react'




const menuOptions = [
    {
        id : 1,
        name : 'Home',
        path :'/dashboard'
    },
    {
        id : 2,
        name : 'History',
        path :'/dashboard/history'
    },

    {
        id : 3,
        name : 'Billing',
        path :'/dashboard/billing'
    }
];



function AppHeader() {
  return (
    <div className='flex items-center justify-between w-full border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800 shadow '>
        <div className="flex items-center gap-2">
            <div className="size-12 rounded-full bg-white border border-2 border-gray-400 flex items-center justify-center text-2xl text-center "> ➕ </div>
            <h1 className="text-base font-bold md:text-2xl">MediVoice AI</h1>
        </div>
        <div className='hidden md:flex gap-12 items-center'>

            {
                    menuOptions.map((option, index)=>(
                        <Link key={index} href={option.path}>
                            <h2 className='hover:font-bold cursor-pointer transition-all'>{option.name}</h2>
                        </Link>
                    ))
            }

        </div>
        <UserButton/>
        
    </div>
  )
}

export default AppHeader;
