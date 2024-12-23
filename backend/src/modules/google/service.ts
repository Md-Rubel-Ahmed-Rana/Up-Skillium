import { google } from "googleapis";
import { ICreateMeetLink } from "./interface";
import config from "../../config/envConfig";
import ApiError from "../../shared/apiError";

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
    } = data;
    oauth2Client.setCredentials({
      access_token: googleCredentials.accessToken,
      refresh_token: googleCredentials.refreshToken,
    });

    const calendar = google.calendar({
      version: "v3",
      auth: oauth2Client,
    });

    try {
      const response: any = await calendar.events.insert({
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
          conferenceData: {
            createRequest: {
              requestId: `req-${Date.now()}`,
              conferenceSolutionKey: { type: "hangoutsMeet" },
            },
          },
        },
      });
      const meetLink = response?.data?.hangoutLink;
      return meetLink;
    } catch (error: any) {
      throw new ApiError(
        400,
        `Failed to create meet link. Error: ${error?.message}`
      );
    }
  }
}

export const GoogleService = new Service();
