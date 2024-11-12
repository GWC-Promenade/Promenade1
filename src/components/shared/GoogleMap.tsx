

import { APIProvider, Map } from '@vis.gl/react-google-maps';

// @ts-expect-error unused
const API_KEY = globalThis.GOOGLE_MAPS_API_KEY ?? ("AIzaSyCyEgdE6jHCW_aA0oDqEFkzt9tfCAphYFg");

const GoogleMap = () => (
  <APIProvider
    solutionChannel='GMP_devsite_samples_v3_rgmbasicmap'
    apiKey={API_KEY}>
    <Map
      defaultZoom={8}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
    />
  </APIProvider>
);

export default GoogleMap
