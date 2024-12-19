import { google } from "googleapis";
import { ICreateMeetLink } from "./interface";
import config from "../../config/envConfig";

const { google: googleCredentials } = config;

class Service {
  async createMeetLink(data: ICreateMeetLink): Promise<string> {
    const oauth2Client = new google.auth.OAuth2(
      googleCredentials.clientId,
      googleCredentials.clientSecret
    );
    const {
      summary = "Up-Skillium Live Class",
      description = "Join the live class on Google Meet",
      startDateTime,
      endDateTime,
      timeZone = "America/Los_Angeles",
      attendees,
      creator,
    } = data;
    oauth2Client.setCredentials({
      access_token: googleCredentials.accessToken,
      refresh_token: googleCredentials.refreshToken,
    });

    const calendar = google.calendar({
      version: "v3",
      auth: oauth2Client,
    });

    const response: any = calendar.events.insert({
      calendarId: "primary",
      conferenceDataVersion: 1,
      sendUpdates: "all",
      requestBody: {
        summary,
        description,
        start: {
          dateTime: startDateTime,
          timeZone: timeZone,
        },
        end: {
          dateTime: endDateTime,
          timeZone: timeZone,
        },
        attendees: attendees || [],
        visibility: "public",
        anyoneCanAddSelf: true,
        creator: {
          displayName: creator?.name,
          email: creator?.email,
          self: true,
        },
        organizer: {
          displayName: creator?.name,
          email: creator?.email,
          self: true,
        },
      },
    });

    const meetLink = response.data.conferenceData.entryPoints[0].uri;
    return meetLink;
  }
}

export const GoogleService = new Service();
