import React from "react";
import GoogleMapReact from "google-map-react";
import Geocode from "react-geocode";
import { useState } from "react";
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap({position}) {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  Geocode.setApiKey("AIzaSyB7k9PV0bxEXkF2WdtcOxA2AQJ139IeGY4");
  Geocode.setLanguage("en");
  Geocode.setLocationType("ROOFTOP");
  Geocode.enableDebug();
  Geocode.fromAddress(position).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      setLatitude(lat);
      setLongitude(lng);
    },
    (error) => {
      // console.error(error);
    }
  );
 

  const defaultProps = {
    center: {
      lat: latitude || 10.8305256,
      lng: longitude || 106.681947,
    },
    zoom: 12,
  };
  console.log("defaultProps", defaultProps);
  return (
    <div style={{ height: "40vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyB7k9PV0bxEXkF2WdtcOxA2AQJ139IeGY4" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
      >
        <AnyReactComponent lat={latitude} lng={longitude} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
}
