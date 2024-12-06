export interface ApiPage<T> {
  data: T[];
  page: number;
  until: number;
}
