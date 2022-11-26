import { FilterQuery, Model, Document } from "mongoose";
import { GetEntityDto } from "@dtos/request";

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async findOne(
    entityQuery: FilterQuery<T>,
    projection?: Record<string, unknown>
  ): Promise<T | null> {
    return this.entityModel.findOne(entityQuery, projection).exec();
  }

  async find({searchField, searchValue, skip = 0, limit}: GetEntityDto): Promise<T[] | null> {
    const filterQuery = {};
    if (searchField) {
      filterQuery[searchField] = { $regex: searchValue, $options: "i" };
    }
    const query = this.entityModel.find(filterQuery)
      .sort({ _id: 1 }) // TODO: refactor in future accordingly sorting functionality
      .skip(skip);
    if (limit) {
      query.limit(limit);
    }
    return query;
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    entityData: Partial<T>,
  ): Promise<T> {
    return await this.entityModel.findOneAndUpdate(entityFilterQuery, entityData, {
      new: true,
    }).exec();
  }

  async create(entityData: Partial<T>): Promise<T> {
    const entity = new this.entityModel(entityData);
    return entity.save();
  }

  async delete(userFilterQuery: FilterQuery<T>): Promise<T> {
    return this.entityModel.findOneAndDelete(userFilterQuery).exec();
  }

  async deleteMany(userFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = this.entityModel.deleteMany(userFilterQuery);
    return (await deleteResult).deletedCount >= 1;
  }
}
