/* eslint-disable react-hooks/exhaustive-deps */
import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";
import { benefits } from "./benefitsData";

const BenefitsItems: React.FC = () => {
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        const card = cardRefs.current[index];
        if (entry.isIntersecting) {
          if (card) {
            gsap.to(card, {
              opacity: 1,
              x: 0,
              duration: 1.5 + index * 0.2,
              ease: "power3.out",
            });
          }
        } else {
          if (card) {
            gsap.to(card, {
              opacity: 0,
              x: -200,
              duration: 1,
              ease: "power3.in",
            });
          }
        }
      });
    }, observerOptions);

    cardRefs.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) {
          observer.unobserve(card);
        }
      });
    };
  }, []);

  return (
    <div className="relative w-full h-auto py-20 bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold text-center mb-10 text-blue-600 absolute top-10">
        Our Programming Education Benefits
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-5 mt-20">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) cardRefs.current[index] = el;
            }}
            className={`transform transition-all opacity-0 translate-x-[-200px] p-6 ${benefit.bgColor} text-white rounded-lg shadow-xl overflow-hidden`}
          >
            <div
              className={`absolute top-0 left-0 w-16 h-16 ${benefit.ballColor} rounded-full -translate-x-6 -translate-y-6`}
            ></div>

            <div
              className={`absolute bottom-0 right-0 w-20 h-20 ${benefit.cornerColor} rotate-45 translate-x-6 translate-y-6`}
            ></div>

            <div className="relative z-10">
              <h2 className="text-2xl font-bold">{benefit.title}</h2>
              <p className="text-sm mt-3">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsItems;
