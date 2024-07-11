import { Bell, Menu, Mic, Search, Upload, User } from 'lucide-react'
import logo from '../assets/Logo.png'
import { Button } from '../components/Button'
import { useState } from 'react';

export function PageHeader() {

    const [showFullWidthSearch, setShowFullWidthSearch] = useState(false)

    return (
        <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
            <div className="flex gap-4 items-center flex-shrink-0">
                <Button variant={'ghost'} >
                    <Menu />
                </Button>
                <a href="/">
                    <img src={logo} alt="logo" className='h-6' />
                </a>
            </div>
            <form className="md:flex hidden flex-grow gap-4  justify-center ">
                <div className="flex flex-grow  max-w-[600px]">
                    <input type="search" placeholder='serach'
                        className='rounded-l-full border 
                        border-secondary-border  
                        shadow-inner
                        shadow-secondary
                        py-1 px-4 text-lg w-full
                        focus:border-blue-700 outline-none
                        ' />
                    <Button className='py-2 px-4 rounded-r-full border 
                        border-secondary-border border-l-0 flex-shrink-0 '>
                        <Search />
                    </Button>
                </div>
                <Button type="button" size="icon">
                    <Mic />
                </Button>

            </form>

            <div className={`flex flex-shrink-0 ${showFullWidthSearch ? "hidden" : "flex"}`}>
                <Button variant={'ghost'} size={'icon'} className="md:hidden"
                    onClick={() => setShowFullWidthSearch(true)}>
                    <Search />
                </Button>
                <Button variant={'ghost'} size={'icon'}>
                    <Mic />
                </Button>
                <Button variant={'ghost'} size={'icon'}>
                    <Upload />
                </Button>
                <Button variant={'ghost'} size={'icon'}>
                    <Bell />
                </Button>
                <Button variant={'ghost'} size={'icon'}>
                    <User />
                </Button>

            </div>
        </div>)
}