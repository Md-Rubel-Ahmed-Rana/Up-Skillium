import { servicesData } from "@/constants/services";

import ServiceCard from "./ServiceCard";

const ServiceContainer = () => {
  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8">
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
