import React from "react";
// import AboutUs from "../components/langdingpageComp/AboutUs/AboutUs";
import ContactUs from "../components/langdingpageComp/ContactUs/ContactUs";
import ImageSlider from "../components/langdingpageComp/ImageSlider";
import Introduce from "../components/langdingpageComp/Introduce/Introduce";
import Propert from "../components/langdingpageComp/propert/Propert";
import Testimonial from "../components/langdingpageComp/Testimonial/Testimonial";
import MainHeader from "../layouts/MainHeader";

const LandingPage = () => {
  const slides = [
    {
      url: "https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60",
      title: "beach",
    },
    {
      url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aG9tZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60",
      title: "boat",
    },
    {
      url: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aG9tZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60",
      title: "forest",
    },
    {
      url: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8aG9tZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60",
      title: "city",
    },
    {
      url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGhvbWV8ZW58MHx8MHx8&auto=format&fit=crop&w=1000&q=60",
      title: "italy",
    },
  ];
  const containerStyles = {
    width: "70%",
    height: "280px",
    margin: "10px auto",
  };
  return (
    <div>
      <MainHeader/>
      <Introduce/>
      <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>
      {/* <AboutUs /> */}
      <Propert/>
      <Testimonial/>
    <ContactUs/>
    </div>
  );
};

export default LandingPage;
