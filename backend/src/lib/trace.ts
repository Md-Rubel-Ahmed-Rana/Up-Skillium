import { UUIDService } from "./uuid";

class Service {
  generateAPIRequestTraceId(): string {
    return UUIDService.generateWithoutDash();
  }
}

export const TraceService = new Service();
