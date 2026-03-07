import { Link } from 'react-router'
import { PlusIcon } from "lucide-react"

const Navbar = () => {
    return (
        <header className='bg-base-200 border-b border-base-content/10 sticky top-0 z-50'>
        <div className='mx-auto max-w-6xl p-4'>
        <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold text-primary font-mono tracking-wider'>
                Product Management System</h1>
        <div className='flex items-center gap-4'>
        <Link to={"/create"} className="btn btn-primary">
        <PlusIcon className='size-5' /> <span>New Product</span>
        </Link>
        </div>
        </div>
        </div>
        </header>
    )
}

export default Navbar