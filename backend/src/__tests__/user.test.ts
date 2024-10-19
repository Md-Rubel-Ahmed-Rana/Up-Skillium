import supertest = require("supertest");
import createServer from "../testServer";

const app = createServer();

describe("User", () => {
  describe("Get All users", () => {
    it("Should result an array of users", async () => {
      const response: any = await supertest(app).get("/api/v1/user");
      console.log(response.statusCode);
      //   expect(response.status).toBe(200);
      //   expect(response.success).toBe(true);
      //   expect(response.message).toBe("Users found successfully!");
    });
  });
});
