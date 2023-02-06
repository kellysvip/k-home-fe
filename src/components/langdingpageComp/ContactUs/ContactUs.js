import React, { Fragment } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import "./ContactUs.css";
const ContactUs = () => {
  return (
    <Fragment>
      <section className="contact">
        <div className="contact-heading">
          <h2>Contact Us</h2>
        </div>
        <div className="container-contact">
          <div className="row-contact">
            <div className="column-contact">
              <div className="contact-widget">
                <div className="contact-widget-item">
                  <div className="icon-contact">
                    <LocationOnIcon fontSize="large" />
                  </div>
                  <div className="text-contact">
                    <h5>Address</h5>
                    <p className="">14 Phan Van Tri, Go Vap, HCMC</p>
                  </div>
                </div>

                <div className="contact-widget-item">
                  <div className="icon-contact">
                    <PhoneIcon fontSize="large" />
                  </div>
                  <div className="text-contact">
                    <h5>Contact Us</h5>
                    <p className="">0941923691 | 0906648572</p>
                  </div>
                </div>

                <div className="contact-widget-item">
                  <div className="icon-contact">
                    <MailIcon fontSize="large"/>
                  </div>
                  <div className="text-contact">
                    <h5>Mail</h5>
                    <p className="">saobien14123@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="column-contact">
              <div className="contact-form">
                <form action="">
                  <input type="text" placeholder="Name" />
                  <input type="email" placeholder="Email" />
                  <textarea placeholder="Comment"></textarea>
                  <button type="submit" className="site-btn">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="row-contact">
          <div className="map-column-contact">
            <div className="contact-map">
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.6944510652248!2d106.6858528438884!3d10.828308957384886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528f98ba40323%3A0xcda3812aa73e10d1!2zMTQgxJAuIFBoYW4gVsSDbiBUcuG7iywgUGjGsOG7nW5nIDUsIEfDsiBW4bqlcCwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1674837859945!5m2!1sen!2s"
                width="700"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default ContactUs;
