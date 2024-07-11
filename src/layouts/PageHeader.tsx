import { Menu } from 'lucide-react'
import logo from '../assets/Logo.png'
import { Button } from '../components/Button'

export function PageHeader() {
    return <div className="flex gap-10 lg:gap-20
    justify-between">
        <div className="flex gap-4 items-center flex-shrink-0">
            <Button variant={'ghost'} className='bg-red-600'>
                <Menu />
            </Button>
            <a href="/">
                <img src={logo} alt="logo" className='h-6' />
            </a>
        </div>

        <div>

        </div>

        <div>3</div>
    </div>
}