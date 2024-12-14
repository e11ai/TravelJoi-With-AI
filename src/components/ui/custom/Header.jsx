import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog"
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';

function Header() {
  
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDailog, setOpenDailog] = useState(false);
  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)

  })

  
  useEffect(() => {
    console.log(user)
  },[])

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDailog(false);
      window.location.reload()
    })
  }

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <img src="/logo.svg" />
      <div>
        {user ?
          <div className='flex items-center gap-3'>
            <a href="/create-trip" className="text-black no-underline hover:no-underline">
            <Button variant="outline" className="rounded-full">+ Жоспар құру</Button>
            </a>
            <a href="/my-trips" className="text-black no-underline hover:no-underline">
            <Button variant="outline" className="rounded-full">Менің жоспарларым</Button>
            </a>
            <Popover>
              <PopoverTrigger className='bg-white'>
                <img src={user?.picture} className='h-[35px] w-[35px] rounded-full bg-white' />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className='cursor-pointer' onClick={()=>{
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>
                  Logout
                </h2>
              </PopoverContent>
            </Popover>

          </div>
          :
          <Button onClick={()=>setOpenDailog(true)}>Кіру</Button>
        }
      </div>
      <Dialog open={openDailog}>
        <DialogContent>
          <DialogTitle>Кіру</DialogTitle>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className='font-bold text-lg mt-7'>Google аккаунтпен кіру</h2>
              <div>Google аутентификация қауіпсіздігі арқылы платформаға кіріңіз</div>

              <Button
                onClick={login} 
                className="w-full mt-5 flex gap-4 items-center">
                <FcGoogle className='h-7 w-7' />
                Google аккаунтпен кіру              
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Header