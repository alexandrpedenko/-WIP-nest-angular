import { SearchFormFieldValue } from '@shared/components/search-control/custom-search-control/types';
import { IPagination } from '@shared/types/pagination';
import { IUser } from '@user/types/user.interface';
import { IPost } from '../posts/types/post';

export interface SearchState {
  users: IUser[],
  posts: IPost[],
  pagination: IPagination,
  searchQuery: SearchFormFieldValue,
  defaultSearchedPosts: IPost[],
}

export enum SearchScopeEnum {
  UserName = 'userName',
  Posts = 'posts'
}
