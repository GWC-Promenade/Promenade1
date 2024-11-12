import { Transportation } from '@/types';
import { ToggleGroup, ToggleGroupItem } from '@radix-ui/react-toggle-group';
import React from 'react'
import TransportationIcon from '../shared/TransportationIcon';

interface SelectTransportationProps {
  transportation: Transportation[];
  setTransportation: React.Dispatch<React.SetStateAction<Transportation[]>>;
}

const SelectTransportation: React.FC<SelectTransportationProps> = ({transportation, setTransportation}) => {
  console.log("In SelectTransportation: transportation=", transportation);

  // @ts-expect-error unused
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
        <TransportationIcon transportation={Transportation.Bike as string} />
      </ToggleGroupItem>

      <ToggleGroupItem value={Transportation.Walk}
      className={`option-hover ${transportation.includes(Transportation.Walk) && "option-select"}`}>
        <TransportationIcon transportation={Transportation.Walk as string} />
      </ToggleGroupItem>

      <ToggleGroupItem value={Transportation.Bus}
      className={`option-hover ${transportation.includes(Transportation.Bus) && "option-select"}`}>
        <TransportationIcon transportation={Transportation.Bus as string} />
      </ToggleGroupItem>

    </ToggleGroup>
  )
}

export default SelectTransportation