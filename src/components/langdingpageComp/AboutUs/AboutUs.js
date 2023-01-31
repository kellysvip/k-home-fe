import React, { Fragment, useState } from "react";
import "./About.css";

const AboutUs = () => {
  const [toggleTab, setToggleTab] = useState(1);
  const toggleState = (index) => {
    setToggleTab(index);
  };
  return (
    <Fragment>
      <section className="about">
        <div className="row">
          <div className="column">
            <div className="about-img"></div>
          </div>

          <div className="column">
            <div className="tabs">
              <div
                className={
                  toggleTab === 1 ? "single-tab active-tab" : "single-tab"
                }
                onClick={() => toggleState(1)}
              >
                <h2>About</h2>
              </div>

              <div
                className={
                  toggleTab === 2 ? "single-tab active-tab" : "single-tab"
                }
                onClick={() => toggleState(2)}
              >
                <h2>Skills</h2>
              </div>

              <div
                className={
                  toggleTab === 3 ? "single-tab active-tab" : "single-tab"
                }
                onClick={() => toggleState(3)}
              >
                <h2>Experience</h2>
              </div>
            </div>

            <div className="tab-content">
              {/* About Content */}

              <div
                className={
                  toggleTab === 1 ? "content active-content" : "content"
                }
              >
                <h2>My Story</h2>
                <p>
                  I'm a hardware student, but found myself more suited to
                  software. June 2022 I decided to take a web design course from
                  CoderSchool and it seems I made the right choice
                </p>
                <h3>Future plans </h3>
                <p>
                  I think I'm good with the backend, so in the future I decided
                  to become a backend-developer. This must be a tough road, and I
                  need to try my best
                </p>
              </div>

              {/* Skills Content */}

              <div
                className={
                  toggleTab === 2 ? "content active-content" : "content"
                }
              >
                <h2>Skills</h2>
                <p>
                  Currently taking "FullStack Web" course at CoderSchool, but in
                  the future, I want to develop myself in backend field
                </p>

                <div className="skills-row">
                  <div className="skills-column">
                    <div className="progress-wrap">
                      <h3>Developer</h3>
                      <div className="progress">
                        <div className="progress-bar">
                          <span>70%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="skills-column">
                    <div className="progress-wrap">
                      <h3>Designer</h3>
                      <div className="progress">
                        <div className="progress-bar Designer">
                          <span>50%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="skills-column">
                    <div className="progress-wrap">
                      <h3>Javascript</h3>
                      <div className="progress">
                        <div className="progress-bar Javascript">
                          <span>65%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="skills-column">
                    <div className="progress-wrap">
                      <h3>Office</h3>
                      <div className="progress">
                        <div className="progress-bar PhotoShop">
                          <span>50%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience Content */}

              <div
                className={
                  toggleTab === 3 ? "content active-content" : "content"
                }
              >
                <div className="exp-column">
                  <h3>Student</h3>
                  <span>Oct 2020 - Now</span>
                  <p>
                    Currently studying at the University of Information
                    Technology, majoring in computer engineering
                  </p>
                </div>

                <div className="exp-column">
                  <h3>Student of Coderschool</h3>
                  <span>June 2022 - Jan 2023</span>
                  <p>Learn the course "FullStack Web" at CoderSchool </p>
                </div>

                {/* <div className="exp-column">
                  <h3>Photoshop</h3>
                  <span>2017-2022</span>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Enim error rem dicta perferendis et qui obcaecati labore
                    accusantium cupiditate libero.
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default AboutUs;
