import React from "react";
import GoogleMapReact from 'google-map-react';
import Geocode from "react-geocode";
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap(){

//     let latitude, longitude;
//   Geocode.setLanguage("en");
//   Geocode.setLocationType("ROOFTOP");
//   Geocode.enableDebug();
//   Geocode.fromAddress("14 Phan Van Tri, Go Vap").then(
//     (response) => {
//       const { lat, lng } = response.results[0].geometry.location;
//       latitude = lat;
//       longitude = lng;
//       console.log(lat, lng);
//     },
//     (error) => {
//       console.error(error);
//     }
//   );
//   const defaultProps = {
//     center: {
//       lat: latitude,
//       lng: longitude,
//     },
//     zoom: 11,
//   };
  const defaultProps = {
    center: {
      lat: 10.822930,
      lng: 106.690680
    },
    zoom: 11
  };

  return (
    <div style={{ height: '40vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}