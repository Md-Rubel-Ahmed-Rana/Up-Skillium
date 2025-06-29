import { servicesData } from "@/constants/services";

import ServiceCard from "./ServiceCard";

const ServiceContainer = () => {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {servicesData.map((service, index) => (
        <ServiceCard
          key={service?.id}
          service={service}
          index={index}
          length={servicesData?.length}
        />
      ))}
    </div>
  );
};

export default ServiceContainer;
