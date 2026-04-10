import gsap from "gsap";
import { useEffect, useRef } from "react";

type Props = {
  benefit: any;
  index: number;
};

const BenefitCard = ({ benefit, index }: Props) => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const loadGsap = async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
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
    };

    loadGsap();
  }, []);

  return (
    <div
      key={benefit?.id}
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
        <h2 className="text-lg lg:text-2xl font-bold">{benefit.title}</h2>
        <p className="mt-3">{benefit.description}</p>
      </div>
    </div>
  );
};

export default BenefitCard;
