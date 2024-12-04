import ServiceContainer from "./ServiceContainer";
import ServiceHeader from "./ServiceHeader";

const OurServicesAndMissions = () => {
  return (
    <section className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600  text-white py-20 relative">
      <div className="container mx-auto flex flex-col gap-10 px-6">
        <ServiceHeader />
        <ServiceContainer />
      </div>
    </section>
  );
};

export default OurServicesAndMissions;
