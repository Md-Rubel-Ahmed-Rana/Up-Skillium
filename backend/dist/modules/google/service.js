"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleService = void 0;
const googleapis_1 = require("googleapis");
const envConfig_1 = __importDefault(require("../../config/envConfig"));
const { google: googleCredentials } = envConfig_1.default;
class Service {
    createMeetLink(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const oauth2Client = new googleapis_1.google.auth.OAuth2(googleCredentials.clientId, googleCredentials.clientSecret);
            const { summary = "Up-Skillium Live Class", description = "Join the live class on Google Meet", startDateTime, endDateTime, timeZone = "America/Los_Angeles", attendees, creator, } = data;
            oauth2Client.setCredentials({
                access_token: googleCredentials.accessToken,
                refresh_token: googleCredentials.refreshToken,
            });
            const calendar = googleapis_1.google.calendar({
                version: "v3",
                auth: oauth2Client,
            });
            const response = calendar.events.insert({
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
                        displayName: creator === null || creator === void 0 ? void 0 : creator.name,
                        email: creator === null || creator === void 0 ? void 0 : creator.email,
                        self: true,
                    },
                    organizer: {
                        displayName: creator === null || creator === void 0 ? void 0 : creator.name,
                        email: creator === null || creator === void 0 ? void 0 : creator.email,
                        self: true,
                    },
                },
            });
            const meetLink = response.data.conferenceData.entryPoints[0].uri;
            return meetLink;
        });
    }
}
exports.GoogleService = new Service();
