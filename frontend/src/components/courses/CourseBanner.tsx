import Image from "next/image";
import banner from "../../../public/assets/courseImages/courseBanner.jpg";
import { Carousel } from "antd/lib";

const CoursesBanner: React.FC = () => (
  <div className="relative">
    <Carousel effect="fade" autoplay>
      <div className="relative">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-black/40 to-black/70 z-10"></div>
        <Image
          src={banner}
          alt="banner"
          layout="responsive"
          width={1200}
          height={600}
          className="object-cover rounded-lg"
        />
        <div className="absolute bottom-[20%] left-[10%] z-20 text-white text-left">
          <h2 className="text-4xl font-bold mb-2">Welcome!</h2>
          <p className="text-lg">
            Explore our curated courses to enhance your skills and career.
          </p>
          <button className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-lg hover:bg-blue-600">
            Explore Courses
          </button>
        </div>
      </div>
    </Carousel>
  </div>
);

export default CoursesBanner;
