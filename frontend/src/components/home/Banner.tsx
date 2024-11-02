import dynamic from "next/dynamic";
import Image from "next/image";
import img1 from "../../../public/assets/bannerImg/n1.jpg";
import img2 from "../../../public/assets/bannerImg/n2.jpg";
import img3 from "../../../public/assets/bannerImg/n3.jpg";

const Carousel = dynamic(() => import("antd/lib/carousel"), { ssr: false });

const Banner: React.FC = () => (
  <div className="pt-16">
    <Carousel autoplay effect="fade">
      <div className="relative h-[70vh]">
        <Image src={img1} alt="Banner 1" layout="fill" objectFit="cover" />
        <div className="absolute inset-0 bg-black opacity-40 flex justify-center items-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold">Upskillium LMS </h2>
        </div>
      </div>

      <div className="relative h-[70vh]">
        <Image src={img2} alt="Banner 2" layout="fill" objectFit="cover" />
        <div className="absolute inset-0 bg-black opacity-40 flex justify-center items-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold">Upskillium LMS</h2>
        </div>
      </div>

      <div className="relative h-[70vh]">
        <Image src={img3} alt="Banner 3" layout="fill" objectFit="cover" />
        <div className="absolute inset-0 bg-black opacity-40 flex justify-center items-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold">Upskillium LMS</h2>
        </div>
      </div>
    </Carousel>
  </div>
);

export default Banner;
