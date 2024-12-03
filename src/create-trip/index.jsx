import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { chatSession } from '@/service/AIModal';
import { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog"
import { doc, setDoc} from "firebase/firestore"; 
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { db } from '@/service/firbaseConfig';

function CreateTrip() {
  const [place, setPlace] = useState();

  const [formData, setFormData] = useState([])
  const [openDailog, setOpenDailog] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData);
  }, [formData])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)

  })

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user')

    if (!user) {
      setOpenDailog(true)
      return;
    }

    if (formData?.noOfDays > 5 && !formData?.location || !formData?.budget || !formData?.traveler) {
      toast("Please fill all details")
      return;
    }
    setLoading(true);
    const FINAL_PROMT = AI_PROMT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays)
    const result = await chatSession.sendMessage(FINAL_PROMT);

    console.log("--", result?.response?.text())
    setLoading(false);
    SaveAiTrip(result?.response?.text())
  }

  const SaveAiTrip = async (TripData) => {

    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString()
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });
    setLoading(false);
  }
  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDailog(false)
      OnGenerateTrip()
    })
  }
  return (
    <div className='sm:px-10 md:px-32 lg:px56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>
        Саяхат армандарыңызбен бізбен бөлісіңіз🚢🧳✈️
      </h2>
      <div className='mt-3 text-gray-500 text-xl'>
        Тек кейбір негізгі ақпаратты толықтырсаңыз, сонда біздің жоспарлаушы сіздің қалауыңыз бойынша саяхат жоспарын құрып береді.
      </div>
      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>Қайда барғыңыз келеді?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={
              {
                place,
                onChange: (v) => { setPlace(v); handleInputChange('location', v) }
              }
            }
          />
        </div>
      </div>
      <div>
        <h2 className='text-xl my-3 font-medium'>Сапарыңызды неше күнге жоспарлап отырсыз?</h2>
        <Input placeholder={'Example: 3'} type="number"
          onChange={(e) => handleInputChange('noOfDays', e.target.value)}
        />
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>Сіздің бюджетіңіз қандай?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item, index) => (
            <div key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border cursor-pointer rounded-lg 
            hover:shadow-lg
            ${formData?.budget == item.title && 'shadow-lg border-black'}`}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>Келесі шытырман оқиғаңызда кіммен саяхаттауды жоспарлап отырсыз?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelesList.map((item, index) => (
            <div key={index}
              onClick={() => handleInputChange('traveler', item.people)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
            ${formData?.traveler == item.people && 'shadow-lg border-black'}
            `}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className='my-10 justify-center flex'>
        <Button
          disabled={loading}
          onClick={OnGenerateTrip}>
          {loading ?
            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />: 'Құру'
          }
          </Button>
      </div>
      <Dialog open={openDailog}>
        <DialogContent>
          <DialogTitle>Sign</DialogTitle>
          <DialogHeader>
            <DialogDescription>
              <img src="src/assets/logo.svg" />
              <h2 className='font-bold text-lg mt-7'>Sign in With Google</h2>
              <div>Sign in to the App with Google authentication security</div>

              <Button
                disabled={loading}
                onClick={login} 
                className="w-full mt-5 flex gap-4 items-center">
                <FcGoogle className='h-7 w-7' />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>

  )
}

export default CreateTrip