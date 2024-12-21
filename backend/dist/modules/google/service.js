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
const apiError_1 = __importDefault(require("../../shared/apiError"));
const { google: googleCredentials } = envConfig_1.default;
class Service {
    createMeetLink(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const oauth2Client = new googleapis_1.google.auth.OAuth2(googleCredentials.clientId, googleCredentials.clientSecret);
            const { summary = "Up-Skillium Live Class", description = "Join the live class on Google Meet", startDateTime, endDateTime, timeZone = "America/Los_Angeles", attendees, } = data;
            oauth2Client.setCredentials({
                access_token: googleCredentials.accessToken,
                refresh_token: googleCredentials.refreshToken,
            });
            const calendar = googleapis_1.google.calendar({
                version: "v3",
                auth: oauth2Client,
            });
            try {
                const response = yield calendar.events.insert({
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
                const meetLink = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.hangoutLink;
                return meetLink;
            }
            catch (error) {
                console.log(`Failed to create meet link. Error: ${error}`);
                throw new apiError_1.default(400, `Failed to create meet link. Error: ${error === null || error === void 0 ? void 0 : error.message}`);
            }
        });
    }
}
exports.GoogleService = new Service();
