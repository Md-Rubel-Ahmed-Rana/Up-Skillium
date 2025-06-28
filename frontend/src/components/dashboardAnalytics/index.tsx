import AssignmentSubmissionAnalytics from "./AssignmentSubmissionAnalytics";
import CertificateAnalytics from "./CertificateAnalytics";
import EnrollmentAnalytics from "./EnrollmentAnalytics";
import StudentProgressAnalytics from "./StudentProgressAnalytics";
import UserAnalyticsSummary from "./UserAnalyticsSummary";

const Analytics = () => {
  return (
    <div>
      <UserAnalyticsSummary />
      <EnrollmentAnalytics />
      <CertificateAnalytics />
      <StudentProgressAnalytics />
      <AssignmentSubmissionAnalytics />
    </div>
  );
};

export default Analytics;
