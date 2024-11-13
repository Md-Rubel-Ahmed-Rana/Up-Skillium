/* eslint-disable react/no-unescaped-entities */
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const StudentPanelTitle: React.FC = () => {
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
    <div className="text-center py-10">
      <h2
        ref={titleRef}
        className="text-3xl md:text-6xl font-semibold mb-4"
      >
        Upskillium's Student Panel
      </h2>
      <p
        ref={introTextRef}
        className="text-lg md:text-xl text-gray-600 mx-auto max-w-2xl"
      >
        Here you can manage your courses, track your progress, and connect with
        fellow students. Start your journey towards success with all the tools
        you need at your fingertips.
      </p>
    </div>
  );
};

export default StudentPanelTitle;
