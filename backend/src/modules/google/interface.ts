type IAttendee = {
  email: string;
  responseStatus: string;
  organizer: boolean;
};

type ICreator = {
  name: string;
  email: string;
};

export type ICreateMeetLink = {
  summary: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  timeZone?: "America/Los_Angeles";
  attendees?: IAttendee[];
  creator: ICreator;
};
