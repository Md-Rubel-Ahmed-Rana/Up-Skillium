import { useGetUsersAnalyticsSummaryQuery } from "@/features/user";

const UserAnalyticsSummary = () => {
  const { data, isLoading } = useGetUsersAnalyticsSummaryQuery({});
  return <div></div>;
};

export default UserAnalyticsSummary;
