import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { benefits } from "./benefitsData";

// gsap.registerPlugin(ScrollTrigger);

const Benefits = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]); 

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (!card) return; 
      gsap.fromTo(
        card,
        {
          x: index % 2 === 0 ? -200 : 200,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <div className="py-20 overflow-hidden px-5">
      <h1 className="text-5xl font-bold text-center mb-16 text-yellow-900">
        Benefits of Learning With Us
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-5">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            ref={(el) => {
              cardsRef.current[index] = el; 
            }}
            className={`p-6 ${benefit.bgColor} text-white rounded-lg shadow-lg relative`}
          >
            <div
              className={`absolute top-0 left-0 w-16 h-16 ${benefit.ballColor} rounded-full -translate-x-6 -translate-y-6`}
            ></div>
            <div
              className={`absolute bottom-0 right-0 w-20 h-20 ${benefit.cornerColor} rotate-45 translate-x-6 translate-y-6`}
            ></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold">{benefit.title}</h2>
              <p className="mt-3">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Benefits;
