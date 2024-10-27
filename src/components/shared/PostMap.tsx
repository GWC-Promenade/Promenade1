import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';
import React, { useState } from 'react'

// const CustomMap = () => {
  
// }

// const API_KEY = globalThis.GOOGLE_MAPS_API_KEY ?? (process.env.GOOGLE_MAPS_API_KEY as string);
const PostMap = () => {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  console.log(API_KEY)

  // shows marker on London by default
  const [markerLocation, setMarkerLocation] = useState({
    lat: 51.509865,
    lng: -0.118092,
  });

  console.log("custom map");

  return (
    // <div className="map-container">
      <APIProvider apiKey={API_KEY}>
        <Map
          // style={{ borderRadius: "20px" }}
          // defaultZoom={13}
          // defaultCenter={markerLocation}
          // gestureHandling={"greedy"}
          // disableDefaultUI
          mapId={'a45f50503e0bd946'}
          defaultZoom={3}
          defaultCenter={markerLocation}
          gestureHandling={'greedy'}
          disableDefaultUI
        >
          <AdvancedMarker position={markerLocation} />
        </Map>
      </APIProvider>
    // </div>
  )
}


export default PostMap

