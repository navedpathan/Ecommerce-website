import { useRouter } from 'next/router';
import { useEffect } from 'react';

const MyAccount = () => {
    let router = useRouter();
    useEffect(() => {
        if(!localStorage.getItem('token')){
            router.push('/')
          }
    }, [router])
    
  return (
    <div>myaccount</div>
  )
}

export default MyAccount