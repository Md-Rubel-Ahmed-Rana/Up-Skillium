import { Card } from "antd/lib";
import NavigatorButton from "./NavigatorButton";
import WelcomeContainer from "./WelcomeContainer";

type ICarouselCard = {
  title: string;
  desc: string;
  image: string;
};

type Props = {
  course: ICarouselCard;
};

const CarouselCard = ({ course }: Props) => {
  return (
    <Card
      bordered={false}
      style={{
        height: "80vh",
        overflow: "hidden",
        backgroundImage: `url(${course.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        borderRadius: "0px",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "absolute",
          zIndex: 2,
          inset: 0,
          padding: "0 1.5rem",
          textAlign: "center",
          color: "#fff",
        }}
        className="flex flex-col justify-center items-center lg:gap-[5rem] gap-10"
      >
        <div className="hidden lg:block">
          <WelcomeContainer />
        </div>
        <div>
          <h2 className="text-lg lg:text-2xl font-semibold">{course.title}</h2>
          <p style={{ fontSize: "1rem", marginTop: 8, maxWidth: 600 }}>
            {course.desc}
          </p>
        </div>
        <div className="flex justify-center mb-10">
          <NavigatorButton />
        </div>
      </div>
    </Card>
  );
};

export default CarouselCard;
