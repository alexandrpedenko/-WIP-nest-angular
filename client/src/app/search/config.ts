import { SearchScopeEnum } from "./types";

export const PAGINATION = {
  limit: 2,
  skip: 0
};

export const SEARCH_OPTIONS = [
  { value: SearchScopeEnum.UserName, label: 'People' },
  { value: SearchScopeEnum.Posts, label: 'Posts' }
];
