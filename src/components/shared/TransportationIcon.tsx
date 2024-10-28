import React from 'react'

const imagePaths: { [key: string]: string } = {
  bike: 'assets/icons/bike.svg',
  walk: 'assets/icons/walk.svg',
  bus: 'assets/icons/bus.svg',
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