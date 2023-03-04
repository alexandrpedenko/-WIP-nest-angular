export interface SearchFormFieldValue {
  query: string;
  scope: string;
}

export interface SearchControlOption {
  value: string;
  label: string;
}

export type SearchControlOptions = SearchControlOption[];
