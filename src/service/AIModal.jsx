import { GoogleGenerativeAI } from "@google/generative-ai";


  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "\"Do not use links from example.com. Instead, find images and information from reliable websites on the internet, such as official attraction websites, travel portals, or image resources like Unsplash, Pexels, or Wikimedia Commons. Provide accurate and verified links in the data.\""},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"location\": \"Paris, France\",\n  \"totalDays\": 5,\n  \"traveler\": \"Solo Traveler\",\n  \"budget\": 1500,\n  \"hotels\": [\n    {\n      \"HotelName\": \"Hotel Saint-André des Arts\",\n      \"HotelAddress\": \"6 Rue Jacques Callot, 75006 Paris, France\",\n      \"Price\": \"100-150$/night (estimate)\",\n      \"hotelImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Hotel_Saint-André_des_Arts%2C_Paris.jpg/800px-Hotel_Saint-André_des_Arts%2C_Paris.jpg\",\n      \"geoCoordinates\": [48.8530, 2.3404],\n      \"rating\": 4.5, \n      \"description\": \"Charming boutique hotel in the Latin Quarter.  (Note: Rating is an estimate and should be verified on booking sites.)\"\n    },\n    {\n      \"HotelName\": \"Generator Paris\",\n      \"HotelAddress\": \"1 Rue de la Bastille, 75004 Paris, France\",\n      \"Price\": \"70-120$/night (estimate)\",\n      \"hotelImageUrl\": \"https://dynamic-media.cdn.cnn.com/api/v1/image/3000000000235813/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2F200625152631-generator-paris-exterior-super-169.jpg\",\n      \"geoCoordinates\": [48.8523, 2.3697],\n      \"rating\": 4.2, \n      \"description\": \"Stylish hostel with private rooms and social atmosphere. (Note: Rating is an estimate and should be verified on booking sites.)\"\n    },\n    {\n      \"HotelName\": \"HotelF1 Paris Porte de Châtillon\",\n      \"HotelAddress\": \"17 Rue de la Convention, 75015 Paris, France\",\n      \"Price\": \"40-70$/night (estimate)\",\n      \"hotelImageUrl\": \"https://www.hotelf1.com/medias/3366/hotel-f1-paris-porte-de-chatillon-03.jpg?context=bWFzdGVyfGltYWdlc3wyNDY1N3xpbWFnZS9qcGVnfGZjYy9jMjYvOTY4NDQ5NDU5OTY5MC5qcGVnfGI2ZGE5M2E5YzI1MDljY2Q0Y2Y0NjZhODk3ZGQxYjNkMDY4NDc3YmI4YjI5ZGI3ZTUwNDI0N2YxYzQwYTJiZWE\",\n      \"geoCoordinates\": [48.8289, 2.3002],\n      \"rating\": 3.8, \n      \"description\": \"Budget-friendly hotel outside the city center (requires metro). (Note: Rating is an estimate and should be verified on booking sites.)\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"plan\": [\n        {\n          \"placeName\": \"Eiffel Tower\",\n          \"placeDetails\": \"Iconic wrought-iron lattice tower.\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Tour_Eiffel_Wikimedia_Commons.jpg/1280px-Tour_Eiffel_Wikimedia_Commons.jpg\",\n          \"geoCoordinates\": [48.8584, 2.2945],\n          \"ticketPricing\": \"26€ (approx. - check official site for current pricing)\",\n          \"timeTravel\": \"3-4 hours\"\n        },\n        {\n          \"placeName\": \"Champ de Mars\",\n          \"placeDetails\": \"Gardens surrounding Eiffel Tower, great for picnics.\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Champ_de_Mars_Eiffel_Tower_view.jpg/1280px-Champ_de_Mars_Eiffel_Tower_view.jpg\",\n          \"geoCoordinates\": [48.8566, 2.2950],\n          \"ticketPricing\": \"Free\",\n          \"timeTravel\": \"1-2 hours\"\n        }\n      ],\n      \"bestTime\": \"Afternoon/Evening (for Eiffel Tower lights)\"\n    },\n    // ... (rest of the itinerary - similar structure for other days)\n    \"day2\": {\n      \"plan\": [\n        {\n          \"placeName\": \"Louvre Museum\",\n          \"placeDetails\": \"Home to the Mona Lisa and other masterpieces.\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Louvre_Museum_Pyramid.jpg/1280px-Louvre_Museum_Pyramid.jpg\",\n          \"geoCoordinates\": [48.8606, 2.3376],\n          \"ticketPricing\": \"17€ (approx. - check official site for current pricing)\",\n          \"timeTravel\": \"4-5 hours\"\n        },\n        {\n          \"placeName\": \"Tuileries Garden\",\n          \"placeDetails\": \"Formal garden between Louvre and Place de la Concorde.\",\n          \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Tuileries_Garden_Paris_2018.jpg/1280px-Tuileries_Garden_Paris_2018.jpg\",\n          \"geoCoordinates\": [48.8646, 2.3276],\n          \"ticketPricing\": \"Free\",\n          \"timeTravel\": \"1-2 hours\"\n        }\n      ],\n      \"bestTime\": \"Morning (to avoid crowds)\"\n    }\n    // ... (Add Day 3, Day 4, Day 5 with similar details)\n\n  }\n}\n```\n\nRemember to complete the itinerary by adding Days 3, 4, and 5 with similar detail and image sourcing from reputable websites.  Always double-check pricing on official websites before your trip.  Hotel ratings should also be verified on sites like Booking.com, TripAdvisor, etc.  The provided ratings are estimates.\n"},
          ],
        },
      ],
    });
  

  