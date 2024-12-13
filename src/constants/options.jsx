export const SelectTravelesList = [
    {
        id:1,
        title:'Тек мен',
        desc:'Жеке саяхатшы',
        icon:'🌍',
        people: '1'
    },
    {
        id:2,
        title:'Жұп',
        desc:'Екі жан бірге жаңа әлемдер ашады',
        icon:'🥂',
        people: '2 People'
    },
    {
        id:3,
        title:'Отбасы',
        desc:'Отбасымен бірге қызықты саяхатқа аттаныңыз',
        icon:'👨‍👩‍👧‍👦',
        people: '3 to 5 People'
    },
    {
        id: 4,
        title: 'Достар',
        desc: 'Үздік достармен бірге көңілді саяхат',
        icon: '🔥',
        people: '5 to 10 People',
    }
    
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Шығындарды бақылау',
        icon:'💸'
    },
    {
        id:2,
        title:'Moderate',
        desc:'Шығындар орташа деңгейде',
        icon:'💰'
    },
    {
        id:3,
        title:'Luxury',
        desc:'Шығындар туралы алаңдамаңыз',
        icon:'💎'
    }
]

export const AI_PROMT = 'Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'