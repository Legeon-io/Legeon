import React, { useEffect, useState } from "react";

import image1 from "../../assets/job_interview_illustration_1.png";
import Img1 from "./1.jpg";
import Img2 from "./2.jpg";
import Img3 from "./3.jpg";

// add other images for caraousel
const slides = [image1, Img1, Img2, Img3];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [slides]);

  console.log(currentSlide);

  return (
    <div className="w-full h-full">
      <div className="">
        {slides.map((item, i) => (
          <>
            {i === currentSlide && (
              <img key={i} src={item} alt="" className="object-contain" />
            )}
          </>
        ))}
      </div>
      <div className="">
        
      </div>
    </div>
  );
};

export default Carousel;
