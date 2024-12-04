export interface ApiPage<T> {
  data: T[];
  page: number;
  count: number;
}
