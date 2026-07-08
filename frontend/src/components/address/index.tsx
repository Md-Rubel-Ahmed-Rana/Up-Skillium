import { useGetUserAddressQuery } from "@/features/address";
import NoAddressFound from "./NoAddressFound";

const Address = () => {
  const { data, isLoading, error } = useGetUserAddressQuery({
    role: "student",
  });
  console.log(data, error);
  const errors = error as any;

  if (errors && errors?.status === 404) {
    return <NoAddressFound message={errors?.data?.message || undefined} />;
  }

  return <div>Address</div>;
};

export default Address;
