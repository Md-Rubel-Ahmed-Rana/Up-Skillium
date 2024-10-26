import dynamic from 'next/dynamic';
import Image from 'next/image';
import banner from '../../../../public/assets/courseImages/courseBanner.jpg';

const Carousel = dynamic(() => import("antd/lib/carousel"), { ssr: false });

const overlayStyle: React.CSSProperties = {
  background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7))',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1,
};

const textStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '20%',
  left: '10%',
  zIndex: 2,
  color: 'white',
  textAlign: 'left',
};

const CoursesBanner: React.FC = () => (
  <div className='pt-16 relative'>
    <Carousel effect="fade" autoplay>
      <div className="relative">
        <div style={overlayStyle}></div>
        <Image src={banner} alt='banner' layout="responsive" width={1200} height={600} className="object-cover" />
        <div style={textStyle}>
          <h2 className="text-4xl font-bold mb-2">Welcome!</h2>
          <p className="text-lg">Explore our curated courses to enhance your skills and career.</p>
          <button className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-lg hover:bg-blue-600">
            Explore Courses
          </button>
        </div>
      </div>
    </Carousel>
  </div>
);

export default CoursesBanner;
