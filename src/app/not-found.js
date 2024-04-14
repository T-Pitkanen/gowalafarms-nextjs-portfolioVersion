import Link from 'next/link';

const NotFound = () => {
    
    return <div className={'not-found'}>404 Site not found.  <span><Link href='/'>Back to Main Page</Link></span></div>

}

export default NotFound;