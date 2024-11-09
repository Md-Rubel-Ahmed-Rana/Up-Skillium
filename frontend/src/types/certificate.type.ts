export type IGetCertificate = {
  id: string;
  userId: string;
  certificateUrl: string;
  course: {
    id: string;
    title: string;
  };
  createdAt: Date;
  updatedAt: Date;
};
