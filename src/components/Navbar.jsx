import React from 'react'
import Image from 'next/image'
import SearchBox from './SearchBox'
import { UserIcon } from './assets'
import Link from 'next/link'

const Navbar = () => {
    return (
        <div>
            <div className='bg-black w-full py-4 px-4'>
            <div className='flex justify-between items-center'>
                <Link href="/">
                    <Image src="https://www.weblly.in/images/logo.svg" width={100} height={100} alt="Logo" />
                </Link>
                <div className='w-1/3'>
                    <SearchBox />
                </div>
                <Link href="/create">
                    <button className='hover:text-white text-orange-600 border hover:bg-orange-600 border-orange-600 rounded-xl px-4 py-2 flex justify-center items-center'>
                        <UserIcon />&nbsp; Employee
                    </button>
                </Link>
            </div>
        </div>
       
        </div>
    )
}

export default Navbar
