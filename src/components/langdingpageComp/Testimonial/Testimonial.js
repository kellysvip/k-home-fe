import React, { useState } from "react";
import styled from "styled-components";
import { MdArrowForward, MdArrowBack } from "react-icons/md";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import PText from "./PText";
import SectionTitle from "./SectionTitle";
const testimonials = [
  {
    id: 1,
    name: "Tram Duong",
    title: "Student",
    org: "UEH",
    desc: "The service is very good, it helps me find a place to live quickly, especially it is extremely reputable",
  },
  {
    id: 2,
    name: "Ngu Pham Anh",
    title: "Student",
    org: "OU",
    desc: "Finding accommodation in HCMC is very good, an ideal service for students",
  },
  {
    id: 3,
    name: "Phuc Tran Cong",
    title: "Student",
    org: "IUH",
    desc: "I hope the service will be better in the future, they did a great job in HCMC",
  },
];
const TestimonialSectionStyles = styled.div`
  overflow-x: hidden;
  padding: 3rem 0;
  text-align: center;
  background: #fff;
  .testimonial__wrapper {
    position: relative;
    max-width: 700px;
    margin: 0 auto;
  }
  .testimonial__info {
    width: 100%;
    height: fit-content;
    background-color: var(--deep-dark);
    border-radius: 12px;
    margin-top: 3rem;
  }
  .testimonial__desc {
    .para {
      text-align: center;
    }
  }
  .testimonial__name {
    margin-top: 2rem;
    font-family: "Montserrat Bold";
    font-size: 2.2rem;
  }
  .testimonial__title {
    font-size: 1.6rem;
    margin-top: 0.3rem;
  }
  .arrows {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      width: 30px;
      pointer-events: none;
    }
    .next,
    .prev {
      margin: 0 0.5rem;
      width: fit-content;
      background-color: var(--deep-dark);
      padding: 0.5rem 2rem;
      border-radius: 8px;
      cursor: pointer;
    }
  }
  .fade-enter {
    opacity: 0;
    transform: scale(0.96);
    z-index: 1;
  }
  .fade-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: 250ms ease-in;
    transition-property: transform, opacity;
    z-index: 1;
  }
  .fade-exit {
    transform: scale(1);
    opacity: 1;
  }
  .fade-exit-active {
    opacity: 0;
    transform: scale(0.96);
    transition: 200ms ease-in;
    transition-property: transform, opacity;
  }
`;

export default function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = testimonials[activeIndex];

  function handleNext() {
    if (activeIndex >= testimonials.length - 1) {
      setActiveIndex(0);
    } else {
      setActiveIndex((oldIndex) => oldIndex + 1);
    }
  }
  function handlePrev() {
    if (activeIndex === 0) {
      setActiveIndex(testimonials.length - 1);
    } else {
      setActiveIndex((oldIndex) => oldIndex - 1);
    }
  }

  return (
    <TestimonialSectionStyles>
      <div className="container">
        <SectionTitle
          subheading="see what our clients say about us"
          heading="Testimonials"
        />
        <div className="testimonial__wrapper">
          <SwitchTransition component={null}>
            <CSSTransition key={activeSlide.id} timeout={300} classNames="fade">
              <div className="testimonial__info">
                <div className="testimonial__desc">
                  <PText>{activeSlide.desc}</PText>
                </div>
                <h2 className="testimonial__name">{activeSlide.name}</h2>
                <p className="testimonial__title">
                  {activeSlide.title}, <br /> {activeSlide.org}
                </p>
              </div>
            </CSSTransition>
          </SwitchTransition>
        </div>

        <div className="arrows">
          <div
            className="prev"
            onClick={handlePrev}
            role="button"
            tabIndex={0}
            onKeyDown={handlePrev}
          >
            <MdArrowBack />
          </div>
          <div
            className="next"
            onClick={handleNext}
            role="button"
            tabIndex={0}
            onKeyDown={handleNext}
          >
            <MdArrowForward />
          </div>
        </div>
      </div>
    </TestimonialSectionStyles>
  );
}
