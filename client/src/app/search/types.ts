import { SearchFormFieldValue } from '@shared/components/search-control/custom-search-control/types';
import { IPagination } from '@shared/types/pagination';
import { IUser } from '@user/types/user.interface';

export interface SearchState {
  users: IUser[],
  pagination: IPagination,
  searchQuery: SearchFormFieldValue
}
