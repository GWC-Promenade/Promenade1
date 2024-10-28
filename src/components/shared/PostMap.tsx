import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';
import React, { useState } from 'react'

interface PostMapProps {
  location: google.maps.LatLngLiteral;
}

// const API_KEY = globalThis.GOOGLE_MAPS_API_KEY ?? (process.env.GOOGLE_MAPS_API_KEY as string);
const PostMap: React.FC<PostMapProps> = ({location}) => {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  console.log(API_KEY)

  const defaultLocation: google.maps.LatLngLiteral = {
    lat: 30.29125,
    lng: 97.74211,
  }

  const shownLocation = location.lat && location.lng ? location : defaultLocation;
  const [markerLocation, setMarkerLocation] = useState(shownLocation);

  console.log("custom map");
  console.log("location:", markerLocation)

  return (
    <>
      <APIProvider apiKey={API_KEY}>
        <Map className="map-container"
          // mapId={'a45f50503e0bd946'}
          defaultZoom={3}
          defaultCenter={markerLocation}
          gestureHandling={'greedy'}
          disableDefaultUI
        >
          {/* <AdvancedMarker position={markerLocation} /> */}
        </Map>
      </APIProvider>
    </>
      
  )
}


export default PostMap

