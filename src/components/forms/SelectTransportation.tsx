import { Transportation } from '@/types';
import { ToggleGroup, ToggleGroupItem } from '@radix-ui/react-toggle-group';
import React from 'react'

interface SelectTransportationProps {
  transportation: Transportation[];
  setTransportation: React.Dispatch<React.SetStateAction<Transportation[]>>;
}

const SelectTransportation: React.FC<SelectTransportationProps> = ({transportation, setTransportation}) => {
  const toggleTransportation = (selected: Transportation): string[] => {
    if(transportation.includes(selected)) {
      return transportation.filter((item) => item !== selected) as string[]; // remove the value from transportation modes (toggle off)
    }
    return [...transportation, selected] as string[]; // add the value to transportation modes (toggle on)
  }

  return (
    <ToggleGroup 
      type="multiple"
      value={transportation as string[]}
      onValueChange={(value) => {
        console.log("In ToggleGroup: Transportation=", value);
        setTransportation(value as Transportation[]);
      }}
      className="flex gap-2 flex-row justify-start"
    >
      <ToggleGroupItem value={Transportation.Bike}
      className={`option-hover ${transportation.includes(Transportation.Bike) && "option-select"}`}
      >
        Bike
      </ToggleGroupItem>

      <ToggleGroupItem value={Transportation.Walk}
      className={`option-hover ${transportation.includes(Transportation.Walk) && "option-select"}`}>
        Walk
      </ToggleGroupItem>

      <ToggleGroupItem value={Transportation.Bus}
      className={`option-hover ${transportation.includes(Transportation.Bus) && "option-select"}`}>
        Bus
      </ToggleGroupItem>

    </ToggleGroup>
  )
}

export default SelectTransportation