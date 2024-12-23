type IAttendee = {
  email: string;
  responseStatus?: string;
  organizer?: boolean;
};

export type ICreateMeetLink = {
  summary: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  timeZone?: "America/Los_Angeles";
  attendees?: IAttendee[];
};
