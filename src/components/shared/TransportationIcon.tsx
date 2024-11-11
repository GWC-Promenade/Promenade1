import React from 'react'

import bikeImg from '/assets/icons/bike.svg';
import walkImg from '/assets/icons/walk.svg';
import busImg from '/assets/icons/bus.svg';

const imagePaths: { [key: string]: string } = {
  bike: bikeImg,
  walk: walkImg,
  bus: busImg,
}

const TransportationIcon: React.FC<{ transportation: string }>= ({transportation}) => {
  const imagePath = imagePaths[transportation];
  console.log("In TransportationIcon: for transportation=", transportation, ", imagePath=", imagePath)

  return imagePath ? (
    <>
      <img 
        src={imagePath}
        alt={transportation}
        className="p-1 px-4 w-20 h-12 invert-white"
      />
    </>
    
  ) : (
    <p>Icon for {transportation} not found </p>
  )
}

export default TransportationIcon