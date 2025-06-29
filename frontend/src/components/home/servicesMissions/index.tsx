import ServiceContainer from "./ServiceContainer";
import ServiceHeader from "./ServiceHeader";

const OurServicesAndMissions = () => {
  return (
    <section className="w-full  py-20 relative">
      <div className="container mx-auto flex flex-col gap-10 px-6">
        <ServiceHeader />
        <ServiceContainer />
      </div>
    </section>
  );
};

export default OurServicesAndMissions;
