import { db } from '@/service/firbaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection.jsx';
import Hotels from '../components/Hotels.jsx';
import PlacesToVisit from '../components/PlacesToVisit.jsx';
import Footer from '../components/Footer.jsx';

function Viewtrip() {

  const {tripId} = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(()=>{
    tripId && GetTripData();
  }, [tripId])

  /*
  * Используется для получения информации о поездке из FireBase
  */

  const GetTripData = async() => {
    const docRef = doc(db, 'AITrips', tripId);
    const docSnap = await getDoc(docRef);
    
    if(docSnap.exists()){
      console.log("Document:", docSnap.data());
      setTrip(docSnap.data());
    }
    else{
      console.log("No Such Document");
      toast('No trip Found!')
    }
  }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      {/* Information Section */}
      <InfoSection trip = {trip} />



      {/* Recommend Hotels */}
      <Hotels trip = {trip} />
      {/* Daily Plan */}

      <PlacesToVisit trip = {trip}/>
      {/* Footer */}
      <Footer trip = {trip}/>
    </div>
  )
}

export default Viewtrip