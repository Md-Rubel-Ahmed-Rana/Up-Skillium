import { IEducation } from "./interface";
import { Education } from "./model";

class Service {
  async addEducation(data: IEducation): Promise<void> {
    await Education.create(data);
  }
  async getEducations(): Promise<IEducation[]> {
    return await Education.find({}).populate("user", "name email image");
  }
  async getEducation(id: string): Promise<IEducation | null> {
    return await Education.findById(id).populate("user", "name email image");
  }
  async getEducationsByUserId(userId: string): Promise<IEducation[]> {
    return await Education.find({ user: userId }).populate(
      "user",
      "name email image"
    );
  }
  async updateEducation(
    id: string,
    updatedData: Partial<IEducation>
  ): Promise<void> {
    await Education.findByIdAndUpdate(id, { $set: { ...updatedData } });
  }
  async deleteEducation(id: string): Promise<void> {
    await Education.findByIdAndDelete(id);
  }
}

export const EducationService = new Service();
