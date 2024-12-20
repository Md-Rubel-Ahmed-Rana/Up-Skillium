export type ICreateLiveClass = {
  title: string;
  description: string;
  instructor: string;
  course: string;
  creator: string;
  startDateTime: string;
  endDateTime: string;
  duration: number;
  meetingLink: string;
  topics?: string[];
  tags?: string[];
};
