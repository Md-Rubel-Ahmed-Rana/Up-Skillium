import { ICategory } from "./interface";
import { Category } from "./model";

class Service {
  async createCategory(data: ICategory): Promise<void> {
    await Category.create(data);
  }
  async getCategories(): Promise<ICategory[]> {
    return await Category.find({});
  }
  async updateCategories(data: ICategory[]): Promise<void> {
    const bulkOps = data.map((category) => ({
      updateOne: {
        filter: { _id: category.id },
        update: { $set: category },
        upsert: true,
      },
    }));

    await Category.bulkWrite(bulkOps);
  }
  async deleteCategories(ids: string[]): Promise<void> {
    await Category.deleteMany({ _id: { $in: ids } });
  }
}

export const CategoryService = new Service();
