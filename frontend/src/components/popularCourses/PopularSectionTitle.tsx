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
    const titleChildren = titleRef.current?.children;

    if (titleChildren) {
     
      gsap.to(titleChildren, {
        color: () => gsap.utils.random(colors),
        duration: 1,
        repeat: -1,  
        yoyo: true, 
        stagger: 0.1,  
        ease: "none",
      });
    }
  }, []);

  return (
    <div className="text-center py-4 mt-16">
      <h2 ref={titleRef} className="text-6xl font-extrabold font-serif text-gray-800">
        Upskillium Popular Courses
      </h2>
      <p
        ref={introTextRef}
        className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto font-black font-serif"
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
