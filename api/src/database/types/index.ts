import { FilterQuery, UpdateQuery } from "mongoose";

export interface IUpdateArguments<T> {
  entityFilterQuery: FilterQuery<T>;
  updateOperators?: UpdateQuery<T>;
  entityData?: Partial<T>;
}