import { Card, Row, Col } from "antd/lib";
import cardData from "../StudentFacilities/facilities"; 
import gsap from "gsap";
import React, { useEffect, useRef } from "react";

const FacilitiesItems = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((el) => {
      if (el) {
        gsap.fromTo(
          el,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.to(el, {
          background: "linear-gradient(120deg, rgba(255, 120, 0, 0.3), rgba(60, 180, 255, 0.3))",
          backgroundSize: "200% 200%",
          backgroundPosition: "0% 50%",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "linear",
        });
      }
    });
  }, []);

  return (
    <div className="py-8 flex justify-center">
      <div className="relative w-full max-w-5xl">
        <Row gutter={[24, 48]} justify="center">
          {cardData.map((card, index) => (
            <Col key={card.id} xs={24} sm={24} md={12} lg={10}>
              <div
                ref={(el) => { cardsRef.current[index] = el; }}
                className="flex justify-center"
              >
                <Card
                  title={<h3 className="text-xl font-semibold text-gray-800">{card.title}</h3>}
                  bordered={false}
                  className="shadow-lg rounded-xl overflow-hidden transform transition-transform duration-300 ease-out hover:scale-105"
                  style={{
                    background: "rgba(240, 242, 245, 0.8)",
                    padding: "20px",
                  }}
                >
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {card.description}
                  </p>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default FacilitiesItems;

