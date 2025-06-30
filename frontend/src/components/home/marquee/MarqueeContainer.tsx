import { IDocument } from "@/types/common";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import CountDownCard from "./CountDownCard";

type Props = {
  documents: IDocument[];
};

const MarqueeContainer = ({ documents }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const animation = gsap.to(marqueeRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 60,
        ease: "linear",
      });

      const el = containerRef.current;

      const handleMouseEnter = () => animation.pause();
      const handleMouseLeave = () => animation.play();

      el?.addEventListener("mouseenter", handleMouseEnter);
      el?.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        el?.removeEventListener("mouseenter", handleMouseEnter);
        el?.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden py-6 w-full relative">
      <div
        ref={marqueeRef}
        className="flex w-max gap-8 marquee-track"
        style={{ willChange: "transform" }}
      >
        {[...documents, ...documents].map((item, index) => (
          <CountDownCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default MarqueeContainer;
