import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const PopularSectionTitle = () => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const introTextRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (!titleRef.current || !introTextRef.current) return;

    const letters = titleRef.current.textContent?.split("") || [];
    titleRef.current.innerHTML = "";
    letters.forEach((letter) => {
      const span = document.createElement("span");
      span.textContent = letter;
      titleRef.current?.appendChild(span);
    });

    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#F3FF33"];

    gsap.timeline().fromTo(
      titleRef.current?.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        color: gsap.utils.wrap(colors),
        ease: "back.out(1.7)",
      }
    );

    // Introductory text animation
    gsap.fromTo(
      introTextRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1.5,
        delay: 1.5,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <div className="text-center py-4">
      <h2 ref={titleRef} className="text-6xl font-bold text-gray-800">
       Upskillium Popular Section
      </h2>
      <p
        ref={introTextRef}
        className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto"
      >
        Upskillium aims to empower students with skills for the future. Dive
        into an interactive journey where programming and freelancing come
        together to prepare you for a competitive market. Unlock your potential
        with hands-on training, real-world projects, and a support network
        designed to elevate your skills to new heights!
      </p>
    </div>
  );
};

export default PopularSectionTitle;
