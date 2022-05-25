

// const google = require('googleapis')
// const geocoder = new google.maps.Geocoder()
// const maps = google.maps({
//     auth: 'AIzaSyBHh2Osuyw7QJFltMf7KNaZmXx-MQAq2Bo'
// })


// function codeAddress(address) {
//   geocoder.geocode( { 'address': address}, function(results, status) {
//     if (status === 'OK') {
//         console.log('geocoding successful')
//     } else {
//       alert('Geocode was not successful for the following reason: ' + status);
//     }
//   });
// }

// export default codeAddress

import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBHh2Osuyw7QJFltMf7KNaZmXx-MQAq2Bo"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)