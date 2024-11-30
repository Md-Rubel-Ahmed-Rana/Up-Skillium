import ServiceContainer from "./ServiceContainer";

const OurServicesAndMissions = () => {
  return (
    <section className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-20 text-white relative">
      <div className="container mx-auto px-6">
        <h2 className="text-xl lg:text-4xl font-bold text-center text-white mb-4">
          Our Dedicated Services & Mission
        </h2>
        <p className="text-center text-white mb-12 max-w-2xl mx-auto">
          Empowering learners with comprehensive services designed to transform
          education into a journey of growth and success. Explore how our
          platform goes beyond traditional learning to support every step of
          your educational journey.
        </p>
        <ServiceContainer />
      </div>
    </section>
  );
};

export default OurServicesAndMissions;
